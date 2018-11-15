const path = require('path');

module.exports = {
    // 目录路径
    path: {
        assetsRoot:　path.resolve(__dirname, '../dist'),
        sourceRoot: path.resolve(__dirname, '../src'),
        testRoot: path.resolve(__dirname, '../test')
    },

    // 生产环境配置
    pro: {
        env: {
            NODE_ENV: '"production"'
        },
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true
    },

    // 开发环境配置
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 9090,
        assetsSubDirectory: 'assets',
        assetsPublicPath: 'http://localhost'
    },

    // 测试环境配置
    test: {
        env: {
            NODE_ENV: '"test"'
        },
    }
}
