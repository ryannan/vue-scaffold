const path = require('path');
const fs = require('fs');
const argv = require('optimist').argv;
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./env.conf');
const pages = require('./page-entries');
const webpackConfig = require('./webpack.dev.conf');

if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env;

// 开发服务器默认端口，可以修改config或者修改node process.env参数修改
const port = process.env.PORT || config.dev.port;

// 开发环境热替换功能，基于node express服务器
const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// mock/proxy api requests
// if use proxy, set ./dev-server.js -proxy www.alm.com(proxy url)
const mockDir = path.resolve(__dirname, '../mock');
fs.readdirSync(mockDir).forEach(function (file) {
    const mock = require(path.resolve(mockDir, file));
    app.use(mock.api, argv.proxy ? proxyMiddleware({ target: 'http://' + argv.proxy }) : mock.response);
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// 静态文件
// const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
// app.use(staticPath, express.static('/src/assets/'));

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    var uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'production') {
        opn(uri)
    }
});
