# Vue Compontent Scaffold

## 项目简介

基于vue组件化的前端开发环境，组件化开发的同时，使用express集成了开发环境的热替换，搭建了mock模拟数据，也可切换到mock代理服务器。
根据开发、生产环境的不同自动化编译打包，同时满足前后端分离后的模板管理

- 基础：es6、stylus
- vue生态：vue2.0、vue-router、vuex、vue-resource
- UI组件：element-ui
- 代码检测：eslint
- 构建工具：webpack
- 单元测试：karma、mocha、sinon-chai、phantomjs
- 本地开发服务器：express

## 安装运行

```
$ npm install
$ npm run dev
```

会自动打开浏览器，输入http://localhost:8080/setting.html即可访问

## 目录结构
```
├── config                            构建脚本和配置目录
│   ├── dev-client.js                   开发服务器热加载脚本，用于自动刷新浏览器
│   ├── dev-server.js                   启动开发服务器脚本
│   ├── env.conf.js                     环境参数配置
│   ├── pages-entries.js                入口及模板配置
│   ├── webpack.base.conf.js            webpack基础配置
│   ├── webpack.conf.js                 webpack完整配置，使用webpack-dev-server时可使用
│   ├── webpack.dev.conf.js             webpack开发环境配置
│   ├── webpack.pro.conf.js             webpack生产环境配置
│   └── webpack.unit.js                 karma单元测试配置
├── dist                              构建输出目录，执行生产环境构建后产生
├── mock                              本地mock数据目录
├── src                               源码目录
│   ├── assets                          静态资源目录，如images
│   ├── components                      组件目录
│       ├── base                          基础组件目录，如button等
│       ├── theme                         样式目录
│       ├── workbench                     workbench页面组件目录
│       └── Workbench.vue                 workbench页面容器，root级组件  
│   ├── config                          配置参数目录
│   ├── main                            页面入口目录
│   ├── router                          vue-router 目录
│   ├── store                           vuex 目录
│   └── pages                           页面目录(多页面使用不同的模板目录)
├── test                              测试目录
│   └── unit                            单元测试目录
│       ├── coverage                      单元测试覆盖率输出目录，执行单元测试后产生
│       ├── specs                         单元测试用例目录
│       └── index.js                      单元测试入口脚本
├── .babelrc                          babel配置文件
├── .eslintignore                     eslint忽略目录配置文件
├── .eslintrc                         eslint检测规则配置文件
├── index.html                        默认模板，不同的多页面模板可以自行配置，见 config/pages-entries
├── package.json
└── README.md
```

以上目录为脚手架初始化目录，后续会根据项目情况作些调整，比如加上一些常量stylus文件、和一些工具类的js文件，满足多页面组件化需求。

## 命令列表

```
# 开启本地开发服务器，基于内存的实时监控代码文件的变化，自动构建并刷新浏览器，默认端口为8080，可修改config/env.conf.js中的dev.port

$ npm run dev

# [不推荐]开启本地开发服务器，区别是该热替换功能是基于webpack-dev-server，基于硬盘，速度较慢，没有配置mock服务

$ npm run build  // 初次使用需要build一次生产环境
$ npm run dev-server    // 输入http://localhost:8080/dist/setting.html访问

# 使用生产环境配置构建项目，构建后的文件会输出至dist

$ npm run build

# 运行单元测试用例

$ npm run unit
```

## mock接口

前后端分离后，前后端定义好接口信息，前端通过 mock 的方式，即可开始编码，无需等待后端接口 ready。 项目的本地开发服务器是基于 express 搭建的，通过 express 的中间件机制，我们已经在 dev 环境中添加了接口 mock 功能。 开发时，接口的 mock 数据统一放在 mock 目录下，每个文件内如下：

```
module.exports = {

  // 接口地址
  api: '/api',

  // 返回数据
  response: function (req, res) {
    res.send(`
      <p>hello vue!</p>
    `);
  }
}
```

如果有搭建好的Mock服务，可使用proxy至mock服务，在packagejson中修改scripts.dev，加上proxy服务器地址，如下：

`"dev": "node ./config/dev-server.js --proxy www.xxx.com:port"`


## 单元测试

可以为每个组件编写单元测试，放在 test/unit/specs 目录下面, 单元测试用例的目录结构建议和测试的文件保持一致（相对于src），每个测试用例文件名以 .spec.js结尾。

`$ npm run unit // 遍历所有的 spec.js 文件`

产出测试报告在 test/unit/coverage 目录。

## 联调方式

前后端分离后，由于前后端的开发环境处于2台不同的机器上，前端的异步请求需要代理到后端机器中。

开发联调的时候，只需通过 proxy 参数运行 dev 脚本，代理至后端开发服务器，可修改 config/env.conf.js 中 dev.port 修改默认端口：

`"dev": "node ./config/dev-server.js --proxy www.xxx.com:port"`

生产部署时，可修改 config/env.conf.js 中 pro.assetsPublicPath 来配置上线 js、css 的 url。 然后执行

`$ npm run build`

## 部署方案

分离后前后端代码会存放在2个单独的 git 仓库中，构建过程也是分开的。后端构建时，需要依赖前端的构建结果。具体流程如下：

- 拉取前端项目代码
- 构建前端（构建结果放在dist目录）
- 拉取后端代码
- 将前端的构建结果（dist目录里的文件）复制到后端工程中
- 构建后端

## 相关资源

- vue 2.0中文：[https://cn.vuejs.org](https://cn.vuejs.org)
- vue-router 2.0中文：[http://router.vuejs.org/zh-cn/installation.html](http://router.vuejs.org/zh-cn/installation.html)
- vuex 2.0中文：[https://vuefe.cn/vuex/actions.html](https://vuefe.cn/vuex/actions.html)
- vue-resource：[https://github.com/pagekit/vue-resource](https://github.com/pagekit/vue-resource)
- element-ui：[http://element.eleme.io/](http://element.eleme.io/)
- es6教程：[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)
- stylus文档：[http://www.zhangxinxu.com/jq/stylus/](http://www.zhangxinxu.com/jq/stylus/)
- eslint：[http://eslint.cn/](http://eslint.cn/)
- mocha：[http://mochajs.org/](http://mochajs.org/)
- webpack：[https://webpack.github.io/docs/](https://webpack.github.io/docs/)
