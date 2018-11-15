const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./env.conf');
const pages = require('./page-entries');

baseWebpackConfig.plugins = baseWebpackConfig.plugins || [];

// 根据模板插入css/js等生成最终HTML
pages.templates.forEach((template) => {
    htmlPlugin = new HtmlWebpackPlugin({
        // favicon:'./src/images/favicon.ico',
        title: template.title,
        // 生成的html存放路径，相对于 path
        filename: template.filename,
        // html模板路径
        template: template.template,
        // 告诉插件要引用entry里面的哪几个入口
        chunks: template.chunks,
        // 允许插件修改哪些内容，包括head与body
        inject: true,
        // 为静态资源生成hash值
        hash: true,
        // 压缩HTML文件
        minify: {
            // 移除HTML中的注释
            removeComments: true,
            // 删除空白符与换行符
            collapseWhitespace: false
        }
    });

    baseWebpackConfig.plugins.push(htmlPlugin);
});

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#source-map',

    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader'),
            stylus: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!stylus')
        },
        postcss: [require('postcss-cssnext')()]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.pro.env
        }),
        // occurence ensures consistent build hashes
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].min.css', {
            allChunks: true
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$', 'exports', 'require']
        })
    ]
});
