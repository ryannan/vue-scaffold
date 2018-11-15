const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./env.conf');

module.exports = {
    // 入口文件地址
    entry: {
        workbench: path.join(config.path.sourceRoot, '/main/workbench.js')
    },

    // 输出文件
    output: {
        path: config.path.assetsRoot,
        // filename: '[name].[chunkhash:8].min.js',
        filename: '[name].min.js',
        publicPath: '/dist/'
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
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            // stylus 文件编译
            { test: /\.sty$/, loader: ExtractTextPlugin.extract('style', 'css!stylus') },
            // 图片转化，小于8k自动转化成base64编码
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=81920&name=images/[name].[ext]' },
            // 图标字体
            { test: /\.(ttf|eot|svg|woff|woff2)+(\?\S*)?$/, loader: 'file?limit=10000&name=iconfont/[name].[ext]' }
        ]
    },

    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader'),
            stylus: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!stylus')
        },
        postcss: [require('postcss-cssnext')()]
    },

    devServer: {
        // contentBase: '/', //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        noInfo: true, //实时刷新
        port: config.dev.port
    },

    resolve: {
        // require时省略的扩展名
        extensions: ['', '.js', '.vue'],

        // 别名，可以直接使用别名来代替设定的路径
        alias: {
            'vue': 'vue/dist/vue.js',
            'components': path.join(config.path.sourceRoot, '/components'),
            'config': path.join(config.path.sourceRoot, '/config'),
            'assets': path.join(config.path.sourceRoot, '/assets')
        }
    },

    plugins: [
        new ExtractTextPlugin('[name].min.css', {
            allChunks: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']
        }),

        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // occurence ensures consistent build hashes
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // 根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            // favicon:'./src/images/favicon.ico',
            // 生成的html存放路径，相对于 path
            filename: path.join(config.path.assetsRoot, '/workbench.html'),
            // html模板路径
            template: path.join(config.path.sourceRoot, '/pages/workbench.html'),
            // 告诉插件要引用entry里面的哪几个入口
            chunks: ['workbench'],
            // 允许插件修改哪些内容，包括head与body
            inject: 'body',
            // 为静态资源生成hash值
            hash: true,
            // 压缩HTML文件
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 删除空白符与换行符
                collapseWhitespace: false
            }
        })
    ],

    devtool: '#eval-source-map'
};
