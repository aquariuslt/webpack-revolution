
## Simple-Webpack-AngularJS
在了解完前面两个项目的代码之后.
你见识到了:

- 一个最基础的可运行的`angularjs`项目
- 一个最基础的用`webpack`构建的js项目

那么如何结合两者,变成一个 用`webpack`构建的`angularjs`项目呢?

`simple-webpack-angularjs` 该项目的内容,即使一个结合第一和第二个项目代码样例而成的,用`webpack`构建的`angularjs`项目样例.

在展现出来的效果看,跟`pure-angularjs-project`的效果是一样的.

> 该项目样例在尽量不修改大量配置的情况下,实现了所需要的功能
> 实际上,该项目的配置,结构 还离 功能齐全的 可配置化的实际项目的结构
> 有稍大的差距.还不能作为一个正式的手脚架使用.
> 不过作为学习项目演变过程的样例,希望同学们能够从中汲取到一些关于webpack的知识.

### 安装项目依赖
```bash
cd simple-webpack-angularjs
npm install
```

### 项目说明
项目的结构大概如下
```
├── README.md
├── package.json
├── server.js
├── src
│   ├── app
│   │   └── routes.js
│   ├── favicon.ico
│   ├── index.html
│   └── main.js
├── webpack.config.js

```

结构与`pure-common-js`大概相同.

其中需要说明的是:
`src/app/routes.js` 等同于 第一个项目的 `static/js/app/routes.js`

`src/main.js`作为入口的js文件,功能上等同于第一个项目的`static/js/app/app.js`

### 运行项目
```bash
npm start
```

命令行里面会出现webpack打包的输出
之后在浏览器查看[http://127.0.0.1:4000](http://127.0.0.1:4000)

> 为了使多个项目能够同时运行方便比较,所以端口号分别取了3000,3001,4000端口

![simple-webpack-angularjs-min.gif](https://ooo.0o0.ooo/2017/05/21/592175cea4292.gif)

### 代码说明
主要查看的是 `src/main.js`,`src/app/routes.js`

1.main.js
```javascript
var angular = require('angular');
var uirouter = require('@uirouter/angularjs');

// import your routes config
var appRoutes = require('./app/routes');

module.exports = angular.module('ita-app', [
  'ui.router'
])
  .config(appRoutes)
;
```

此时回顾一下`pure-angularjs-project`的`app.js`

```javascript
(function () {
  angular.module('ita-app',
    ['ui.router']
  )
})();
```

我们可以看出`app.js` 里面只声明了`ita-app`的模块和对`ui.router`的依赖,没有声明route.

而在`main.js`里面:
先用`require('angular')`,`require('@uirouter/angularjs')`
对第三方的`angularjs`,`angular-ui-router`进行引用.

接着再声明一个新的叫`ita-app`的模块.
并且将该模块下声明的route都加载到这里

2.app/routes.js
```javascript
module.exports = function ($stateProvider) {
  $stateProvider
    .state({
      name: 'default',
      url: '',
      template: ' <h3>Hello ITA</h3>'
    })
    .state({
      name: 'home',
      url: '/',
      template: ' <h3>Hello ITA</h3>'
    })
    .state({
      name: 'about',
      url: '/about',
      template: '<h3>About: This is an ITA Application</h3>'
    });
};
```

此时在回顾一下`pure-angularjs-project`的`route.js`
```javascript
(function () {
  angular.module('ita-app')
    .config(function ($stateProvider) {
      $stateProvider
        .state({
          name: 'default',
          url: '',
          template: ' <h3>Hello ITA</h3>'
        })
        .state({
          name: 'home',
          url: '/',
          template: ' <h3>Hello ITA</h3>'
        })
        .state({
          name: 'about',
          url: '/about',
          template: '<h3>About: This is an ITA Application</h3>'
        });
    });
})();
```

与`pure-angularjs-project`  的 `routes.js`相比
主体功能是完全一样的,只需要export出去,在模块声明的地方用
`angular.module(moduleName,[]).config(${export的部分})`即可


实际运行效果是一样的.

> P.S. 找个在读的小伙伴测了下 貌似对上面这句不理解.
> 可以参考下面两个图,是相等的:

![1.png](https://ooo.0o0.ooo/2017/05/21/592187834c401.png)
![2.png](https://ooo.0o0.ooo/2017/05/21/5921878345d59.png)



### 思考
1. 查看生成的`public/main.bundle.js`
是否发现`angular.js`的源代码和`@uirouter/angularjs`的源代码已经包含在里面?
是否应该将业务代码与第三方依赖代码分开储存?
项目协作人数越来越多的时候,如何利用CommonJS的模块语法,实现AngularJS工程的模块化?
打包到一起的时候,如何在浏览器中方便的调试业务代码?
部署上生产环境的时候,是否需要制定不同环境的配置,譬如生产环境JS压缩等操作?

### 总结
该项目提供了一个使用angularjs,利用CommonJS语法组织工程代码的一个样例.