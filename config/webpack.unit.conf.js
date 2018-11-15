const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./env.conf');

const webpackConfig = merge(baseWebpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    // module: {
    //     loaders: utils.styleLoaders()
    // },
    devtool: '#inline-source-map',
    vue: {
        loaders: {
            js: 'isparta'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.test.env
        })
    ]
});

delete webpackConfig.entry;

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
webpackConfig.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: config.path.sourceRoot
});

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some(function (loader, i) {
    if (loader.loader === 'babel') {
        loader.include = path.resolve(config.path.testRoot, 'unit');
        return true;
    }
});

// karma config
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        // this is the entry file for all our tests.
        files: ['../test/unit/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            '../test/unit/index.js': ['webpack', 'sourcemap']
        },
        // use the webpack config
        webpack: webpackConfig,
        // avoid walls of useless text
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true,
        coverageReporter: {
            dir: '../test/unit/coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
};