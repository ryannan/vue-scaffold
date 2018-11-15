const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./env.conf');
const pages = require('./page-entries');

config.dev.port = process.env.PORT ? process.env.PORT : config.dev.port;
config.dev.assetsPublicPath = config.dev.assetsPublicPath + ':' + config.dev.port + '/';

module.exports = {
    // 入口文件地址
    entry: pages.entries,

    // 输出文件
    output: {
        path: config.path.assetsRoot,
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].min.js' : '[name].min.js',
        publicPath: process.env.NODE_ENV === 'production' ? config.pro.assetsPublicPath : config.dev.assetsPublicPath,
    },

    // loader加载器
    module: {
        // only lint local *.vue files
        preLoaders: [
            {
                test: /.vue$/,
                loader: 'eslint',
                exclude: /node_modules/
            },
            {
                test: /.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],

        loaders: [
            // vue loader
            { test: /\.vue$/, loader: 'vue' },
            // 转化es6语法
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            // 编译css并自动添加css前缀
            { test: /\.css$/, loader: 'style!css' },
            // // stylus 文件编译
            { test: /\.sty$/, loader: 'style!css!stylus' },
            // 图片转化，小于8k自动转化成base64编码
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=images/[name].[ext]' },
            // 图标字体
            { test: /\.(ttf|eot|svg|woff|woff2)+(\?\S*)?$/, loader: 'file?name=iconfont/[name].[ext]' }
        ]
    },

    vue: {
        loaders: {
            css: 'vue-style-loader!css-loader',
            stylus: 'vue-style-loader!css-loader!stylus'
        },
        postcss: [require('postcss-cssnext')()]
    },

    resolve: {
        // require时省略的扩展名
        extensions: ['', '.js', '.vue', '.css'],
        // 别名，可以直接使用别名来代替设定的路径
        alias: {
            'vue': 'vue/dist/vue.js',
            'components': path.join(config.path.sourceRoot, '/components'),
            'config': path.join(config.path.sourceRoot, '/config'),
            'assets': path.join(config.path.sourceRoot, '/assets')
        }
    }
};
