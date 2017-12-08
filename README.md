# Webpack Revolution


目录:
- [Pure AngularJS Project](https://github.com/Aquariuslt/Webpack-Revolution/tree/master/pure-angularjs-project)
- [Pure CommonJS Project](https://github.com/Aquariuslt/Webpack-Revolution/tree/master/pure-commonjs-project)
- [Simple-Webpack-AngularJS](https://github.com/Aquariuslt/Webpack-Revolution/tree/master/simple-webpack-angularjs)
- [Webpack-Gulp-AngularJS](https://github.com/Aquariuslt/Webpack-Revolution/tree/master/webpack-gulp-angularjs)
- [Webpack-Gulp-AngularJS-Boilerplate](https://github.com/Aquariuslt/Webpack-Revolution/tree/master/webpack-gulp-angularjs-boilerplate)


## 前言

该代码示例描述了一个普通的前端项目进化到使用Webpack + Gulp 管理构建流的过程.

提供了一个现代化JavaScript工程化项目的模板与思路.

预备知识:
- 一些基础的`AngularJS`知识
- 一些`angular-ui-router`的知识
- `Webpack`的作用与简介
- `Gulp`的作用与简介



[代码下载](https://github.com/Aquariuslt/Webpack-Revolution)

![Project-Structure](https://ooo.0o0.ooo/2017/05/21/59210e605f1c3.png)

示例项目里面包含了若干个子项目,以上图红圈内的几个项目文件夹为示例:
从上往下依次是: 

1. 最原始的AngularJS项目
2. 使用Webpack构建的,以CommonJS方式编写的JS项目
3. 结合1,2的项目,使用Webpack,以CommonJS编写的AngularJS项目
5. 在3的基础上,使用Gulp任务流进行Webpack构建的一个AngularJS项目
4. 在5的基础上,将原来的AngularJS项目拆分成模块化,并添加CSS构建等模块


> P.S.为什么上面的顺序5和4会对调?因为在Github的网页上面显示的顺序不太对,按照字典序的排序 应该 `webpack-gulp-angularjs` 会在 `webpack-gulp-angularjs-boilerplate` 之前


接下来请跟着文档的步骤,下载项目自己动手运行.


运行需求环境:
git >=3  
npm >=3   
node >=6    


## Getting Start

### 把项目下载到本地
```bash
git clone https://github.com/Aquariuslt/Webpack-Revolution.git
cd Webpack-Revolution
```

## Pure-AngularJS-Project

### 安装项目依赖
```
cd pure-angularjs-project
npm install
```

### 项目说明
项目的文件夹目录大概如下
```
Macbook:pure-angularjs-project Aquariuslt$ tree
.
├── README.md
├── package.json
├── server.js
├── static
│   ├── favicon.ico
│   ├── index.html
│   └── js
│       ├── app
│       │   ├── app.js
│       │   └── routes.js
│       └── vendor
│           ├── angular-ui-router.js
│           └── angular.js

```

这是一个很原始的JavaScript项目,通过手动在`static/index.html`中添加JS,CSS文件的引用,接着使用`express`将`static`这个文件夹下的内容当成静态的前端资源文件提供出来.

### 运行项目

运行`npm start` 之后,我们可以在浏览器的[http://127.0.0.1:3000](http://127.0.0.1:3000) 看到效果

![pure-angularjs-project-runtime-min.gif](https://ooo.0o0.ooo/2017/05/21/592143245b71e.gif)

### 代码说明
1.static/index.html
```html
<!DOCTYPE html>
<html lang="en" ng-app="ita-app">
<head>
  <title>Pure AngularJS Application</title>
  <base href="/#!/">
  <meta charset="UTF-8">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
<!-- Header Area -->
<h2>Pure AngularJS Application</h2>
<a ui-sref="home">Home</a>
<a ui-sref="about">About</a>
<!-- Router View Area -->
<ui-view></ui-view>


<!-- Vendor JS Files -->
<script type="text/javascript" src="js/vendor/angular.js"></script>
<script type="text/javascript" src="js/vendor/angular-ui-router.js"></script>

<!-- Own Application JS Files -->
<script type="text/javascript" src="js/app/app.js"></script>
<script type="text/javascript" src="js/app/routes.js"></script>

</body>
</html>
```

负责引入`angular.js`,`angular-ui-router.js`
以及项目开发者自行编写的`app.js`与`routes.js`

2.static/app/app.js
```javascript
(function () {
  angular.module('ita-app',
    ['ui.router']
  )
})();
```

此处注册一个angular的module,叫做`ita-app`

3.static/app/routes.js
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

此处声明`ui-router`的三个路由的url:
分别是`/`, `/about`

4.server.js
```javascript
var express = require('express');

var app = express();

app.use('/', express.static('static'));

app.listen(3000);
```
此处表示使用express 监听3000端口,并以项目文件夹下的`static`作为静态资源的文件来提供服务.

### 总结
如同上面的运行时的GIF所示.
在不同的路由情况下,页面展现的内容不一样.

相信这个内容,在接触了Node.js的`express.js`
与`angular.js` 基本知识之后都能很容易的理解,简直是小菜一碟!



## Pure-CommonJS-Project

在了解了前面一个课程之后,我们开始接触最基础的一个利用Webpack打包的CommonJS的项目.

该样例的目的有两个:

其一是Webpack的简单Demo.

其二是使用Node.js的CommonJS语法进行JavaScript模块的导入导出.

说明流程是 先运行 后解释 先运行后解释!

### 安装项目依赖
```bash
cd pure-commonjs-project
npm install
```

### 项目说明

项目目录大以及说明概如下:
```
├── README.md
├── package.json
├── server.js
├── src
│   ├── app
│   │   ├── bar.js											--模块bar
│   │   └── foo.js											--模块foo
│   ├── index.html										    --默认的index.html
│   └── main.js												--项目的前端入口JavaScript文件
├── webpack.config.js									    --Webpack约定的默认配置文件名
```

### 运行项目
```bash
npm start
```

![pure-commonjs-project-start.png](https://ooo.0o0.ooo/2017/05/21/59214b2da94f7.png)

命令行里面会出现webpack打包的输出
之后在浏览器查看[http://127.0.0.1:3001](http://127.0.0.1:3001)

应该如下图般显示:
![pure-commonjs-prject-browser.png](https://ooo.0o0.ooo/2017/05/21/59214c1125273.png)

好,自己动手的过程到此告一段落.
请继续阅读文档下面的部分,看看中间到底发生了什么.


### 过程简介
在运行`npm start`之后,到底经过了什么样的操作呢?
大概是如下一个流程:

1.`npm start`命令,先指向了`package.json`里面`scripts`部分的`start`.
以`package.json`文件为例:`npm start`指向了一个`webpack && node server.js`的命令.

```json
{
  "name": "pure-commonjs-project",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "webpack && node server.js"      
  },
  "dependencies": {
    "express": "^4.15.3"
  },
  "devDependencies": {
    "html-webpack-plugin": "^2.28.0",
    "webpack": "^2.5.1"
  }
}
```

该命令表示,当全局安装了webpack,或者项目的`node_modules/.bin/`下面有webpack的可执行文件的时候.可以通过内置的命令`webpack`来执行打包的功能.

当执行完命令`webpack`之后,开始执行`node server.js`这一句命令.

使用`express.js`监听某个端口(3001),对某个文件夹(public)进行静态资源的监控.

讲到这里,相信大家已经大概知道
1.`npm start` 实际调用的其他命令
2.`webpack`这个命令,会执行打包构建的工作,把构建好的文件输出到指定的文件夹.

`webpack`命令的详细工作流程,在接下来的部分会讲到.

### 代码说明
在逐个代码文件进行说明的时候,可能发现整个项目的文件夹名字都跟第一个项目`pure-angularjs-project`有所不同了.

遵循主流的JavaScript前端项目的约定,我们把
项目的`index.html`和其他源代码的部分都放在`src`文件夹下.
将最后编译/构建/打包的文件都放在`public`文件夹下.

> 对于`public`文件夹这个命名,流行的别名有很多,这里取`public`为例子
> 还有一些其他流行的别名都可以使用:
> 譬如`static`(意为静态资源文件,第一个项目就是用这个来命名).
> 又如`dist`(意为distribution)
> 这些命名地位和意义相等,没有争论的必要,都可以用


对于代码说明, 我们先看`webpack.config.js`这个webpack的配置文件.
再对`src`下的源代码文件做逐一说明.


1.webpack.config.js

刚刚在执行`npm start`命令的时候,有些同学可能有困惑:
"我只执行了`webpack`这个命令,他怎么就帮我全部打包到`public`文件夹了?"

其实`webpack`命令执行的时候,按照其官方文档提供的说明和*约定*,在不指定任何参数的时候,默认会去读取项目目录下的`webpack.config.js`

所以使用纯的命令`webpack`,就相当于执行`webpack --conf webpack.config.js`.
去读取该配置文件进行打包.

现在我们来看一下`webpack.config.js`的内容

```javascript
var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve('public'),
    publicPath: '',
    filename: '[name].bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```

需要注意的几个部分是:
```javascript
entry: {
  main: './src/main.js'
}
```
`entry`部分说明了webpack将以`src/main.js`为打包的入口文件.
将其require的层层依赖最后都打包到一个文件里面.

```javascript
output: {
  path: path.resolve('public'),
  publicPath: '',
  filename: '[name].bundle.js',
  chunkFilename: '[id].[hash].chunk.js'
}
```
`output`部分说明了webpack读取入口文件之后,打包好的项目代码,以怎样的形式
输出.

在上面的例子中
`path`表示把所有的输出文件都放到`public`文件夹中.  
`filename`表示输出的`javascript`文件需要如何命名,这里的意思是,如果入口文件名为`main.js`,根据webpack对`[name].bundle.js`的格式化处理,将会输出成`main.bundle.js`

剩余的`publicPath`,`chunkFilename`目前暂时不用关心.

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  })
]
```
webpack有很多插件(包括官方提供的,和流行的第三方插件).
在配置文件的`plugins`字段描述了按生命的顺序加载并使用该插件对输出的文件进行处理.

里面用到的`HtmlWebpackPlugin`是一个很常用的插件,
在这里的意思大概是,他会以`src/index.html`作为模板,最后把输出的javascript,css等资源文件的链接插入到`index.html`合适的地方.

2.main.js   

```
require('./app/foo');
require('./app/bar');

console.log('load main.js');
document.write('<h1>Load main.js<h1>');
module.exports = {};
```

main.js作为入口文件,他希望做到的是先加载`foo.js`与`bar.js`
接着执行自己的内容,在控制台输出`load main.js`
接着在body里面插入一条`h1`的标签.

3.app/foo.js 与 app/bar.js  

foo.js
```javascript
console.log('load foo.js');
document.write('<h1>Load foo.js<h1>');
module.exports = {};
```

bar.js
```javascript
console.log('load bar.js');
document.write('<h1>Load bar.js<h1>');
module.exports = {};
```
foo.js 与 bar.js 如字面意思.

4.index.html  

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CommonJS Project</title>
</head>
<body>

<!-- There is no any js require here ! -->
</body>
</html>
```
需要注意的是,这里的`index.html`文件是没有任何引用javascript,css文件的显式声明的.

这就是上面提及的`webpack.config.js`里面的`HtmlWebpackPlugin`所做的工作!
可以对比一下作为原始模板的`src/index.html`与构建之后的`public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CommonJS Project</title>
</head>
<body>

<!-- There is no any js require here ! -->
<script type="text/javascript" src="main.bundle.js"></script>
</body>
</html>
```

webpack 在构建过程中插入了`main.bundle.js`的引用!

### 思考
以CommonJS的语法进行前端JavaScript代码的编写.
模块加载顺序,与直接内嵌在html文件中有什么不同?

如下图,我们把对`src/app/foo.js`的引用注释掉,再执行`npm start`.

构建后的代码有什么不同?浏览器的内容跟浏览器控制台输出的内容有什么不同?

```javascript
//require('./app/foo');
require('./app/bar');

console.log('load main.js');
document.write('<h1>Load main.js<h1>');
module.exports = {};
```

### 总结

通过这个普通的Webpack的Demo.

你应该体会到:

1. Webpack 构建打包的基础过程
2. 开始学习并习惯以CommonJS形式编写前端的JavaScript代码(这里的CommonJS形式并非JavaScript项目的模块化概念!)

并可能触发一些思考:

- 如何与`angular.js`,`jquery`甚至其他主流的javascript框架结合使用?
- 如何对webpack的配置进行根据不同环境的可配置化?(本地开发,生产环境,测试环境)
...... 





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
该项目提供了一个使用angularjs,利用CommonJS语法组织工程代码,使用Webpack进行构建打包的一个样例.



## Webpack-Gulp-AngularJS
通过基本的前端项目工程化的介绍,
我们大概了解了:
- Webpack的简介
- Gulp的简介与定位

通过之前的几个样例代码,
我们大概了解了:
- Webpack的基本使用方法
- Webpack的基本配置
- 使用CommonJS 编写原来的AngularJS项目

请注意回顾到里面样例代码的演变形式,
因为这一章节,主要的改动是引入gulp来使得项目构建流程化.

如果在阅读文档并且动手操作之后,还不了解前面1,2,3 三个部分的演变过程请将疑问提到[issues](https://github.com/Aquariuslt/Webpack-Revolution/issues)里面.
会根据情况进行文档的补充.


如果没有足够的理解,那么可能在阅读这一章节的时候就可能变成以下这个情况:

![算术入门.jpg](https://ooo.0o0.ooo/2017/05/23/5923c9999692c.jpg)


如果顺利的话,在这一章节,我们将了解以下的部分内容:
- 划分不同环境的Webpack构建配置
- Gulp与常见Gulp插件的一些介绍与使用
- Webpack与Gulp的结合使用
- Webpack-Dev-Server 带来的开发体验的巨大提升


涉及的项目文件更变有点多.

中间有任何不明白的地方 请立刻提issue, 以便做出修改 达到更好的教学效果.谢谢~

### 安装项目依赖
```bash
cd webpack-gulp-angularjs
npm install
```


### 项目说明
之前的项目里面,都是先运行,再解释.

这个章节的流程不一样:

1. 先讲述一些应用场景,了解背景
2. 再讲述改项目样例参考的灵感来源
3. 再介绍项目改变的部分
4. 介绍新增的部分的工具以及example的说明


##### 生产环境与开发环境的配置分离
无论是大小项目,可能都需要区分本地开发环境(Development),生产环境(Production/Release).
规模稍大以致能够更细分成本地开发环境,测试环境,集成开发环境,预生产环境 等更多不同的环境.

在不同的环境里面,项目展现出的各种配置可能不一样.

以JavaScript前端项目为例子.
可能不同环境的配置是不一样的,展现出来的区分在于:

本地开发环境: 
- 浏览器展现出的JavaScript代码,方便调试,定位问题.CSS,JS不会经过压缩,混淆,合并.
- 控制台输出全部级别的日志.
- API请求连接到的是本地/测试环境的后台服务器
- ....

生产环境:
- 为了符合最佳网站实践,浏览器加载页面时候的静态资源文件大小尽量小,请求数尽量少
- 控制台也不输出调试日志.
- ....




因此,根据此项目的情况,我们会将使用webpack构建的过程,分成本地开发环境,与生产环境两种配置.

在下文的文件说明中,会详细提及他们之间的变化.

现在大概对不同环境下,对应不同构建配置的必要性有个基本的了解了吧.


##### 构建任务流
如果之前接触过maven,或者gradle,可以发现:

在J2EE项目中,通常本地构建会有一些构建任务
使用maven的话
使用命令:
```bash
mvn clean
mvn package
```
抑或是使用gradle:
```bash
gradle clean
gradle build
```

这些都可以理解成包管理器/构建工具内置的任务流之一.

`xxx clean`的意思就是清除(删除)所有构建生成的文件.

`xxx package`的意思是编译并打包构建好的文件.

转换到node.js的情景:

既然npm本身不会带有这方面的内置的任务流(对于项目构建生成的文件,也没有约定在某一个/几个目录,比如maven的`/target`,gralde的`/build`).

所以一般是使用主流的任务流工具:gulp或者grunt 来代替完成这部分的工作.


参考过大部分主流的前端项目:
- Angular4团队 `@angular/cli`内置的webpack任务流
- `vue-cli`中使用webpack构建的任务流
- 其他主流项目

从这些项目中了解到的一些任务流的命名.
> P.S. 仅仅是希望大家能接受这种命名,不是我突发奇想,胡乱想出来的一些命名

如果使用gulp作为任务流工具,我们根据不同环境拆分配置的时候.
可能会有以下的任务流:

- gulp clean       清除默认的构建中生成的文件夹
- gulp build        构建用于部署的,生产环境用到的文件
- gulp serve        本地开发时,用于提供web服务的命令
- gulp test            执行单元测试,


好,大概了解了这章节的样例代码所涉及的概念.
接下来就开始描述项目结构的更变吧.

##### 项目结构

在实现与样例`pure-angularjs-project`,`simple-webpack-angularjs`相同的效果的情况下:
项目的结构大概如下:
```
.
├── README.md
├── gulpfile.js
├── package.json
├── src
│   ├── app
│   │   └── routes.js
│   ├── favicon.ico
│   ├── index.html
│   └── main.js
├── tasks
│   ├── build.js
│   ├── clean.js
│   ├── config
│   │   ├── base.config.js
│   │   ├── webpack.base.config.js
│   │   ├── webpack.dev.config.js
│   │   └── webpack.prod.config.js
│   ├── serve.js
│   └── util
│       └── path-util.js
└── yarn.lock

```


项目结构更变概括:
1. 在webpack的配置方面,为了拆分本地开发环境,我们将原来的位于项目根文件夹的`webpack.config.js`拆分成以下形式:

![webpack-config-dependencies.png](https://ooo.0o0.ooo/2017/05/23/5923f187ea0c8.png)

> P.S. 注意加粗黄线的部分,才是要注意的地方

现在把`webpack.config.js`
拆分成`webpack.base.config.js`,`webpack.dev.config.js`,`webpack.prod.config.js`三个文件

其中`webpack.dev.config`是基于`webpack.base.config`的开发运行时配置

而`webpack.prod.config.js`是基于`webpack.base.config`的生产环境构建配置

因为中间配置的内容比较复杂,但项目技术框架选型定下之后(目前样例选择的是AngularJS),三个以webpack开头的配置文件改动频率相当小.

因此我把改动频率较大,只需开发者关心且修改频率可能很大的部分抽取到`base.config.js`里面.

等下会说明该部分内容.

2. 使用gulp进行构建任务流之后, 我们将通过 gulp 调用webpack进行前端代码的构建任务.

因此, webpack的配置文件,被移动到`tasks/config`文件夹中

我们将通过 `npm run dev`,`npm run build`,`npm run clean` 三个命令分别调用
`gulp serve`,`gulp build`,`gulp clean`.

根据 gulp 的约定, 执行gulp命令的时候,默认会读取 项目根目录下的 `gulpfile.js`加载task列表.

所以我们能看到`gulpfile.js`里面的内容,是导入`/tasks/`文件夹下的三个 tasks :`build`,`clean`,`serve`

```javascript
require('./tasks/clean');
require('./tasks/build');
require('./tasks/serve');
```

项目文件更变说明到此结束.
下面开始运行项目,先运行,后面在<b>代码说明</b>小章节解释每份配置的内容.

### 运行项目
现在项目有三种tasks可以执行:
- npm run clean: 表示清除项目构建生成的文件夹
- npm run build: 该task会先执行上面的`clean`操作,再以webpack生产环境配置,构建出生产环境需要用的静态资源文件
- npm run dev: 该task会启动一个`webpack-dev-server`,目前默认监听`5001`端口. 以webpack开发环境配置构建,可以将源代码内容的更变实时反映到浏览器上.


下面我们先按`build`,`clean`,`dev`这种顺序执行一次


1. build
```bash
npm run build
```

可以看到 执行 `gulp`的task的时候的一些输出

```
[09:14:53] Starting 'build'...
[09:14:53] Starting 'clean'...
[09:14:53] Starting 'clean:build'...
[09:14:53] Deleting build folder
[09:14:53] Starting 'clean:dist'...
[09:14:53] Deleting dist folder
[09:14:53] Finished 'clean:build' after 14 ms
[09:14:53] Finished 'clean:dist' after 7.12 ms
[09:14:53] Finished 'clean' after 17 ms
[09:14:53] Starting 'webpack'...
[09:14:53] Webpack building.
[09:14:59] Hash: 15ec065050c6b4d08cd6
Version: webpack 2.5.1
Time: 6444ms
                             Asset       Size  Chunks                    Chunk Names
      main.2949cd4c297786231109.js  425 bytes       0  [emitted]         main
    vendor.f7682f3c276a26fc48f2.js     301 kB       1  [emitted]  [big]  vendor
  main.2949cd4c297786231109.js.map    2.69 kB       0  [emitted]         main
vendor.f7682f3c276a26fc48f2.js.map    3.96 MB       1  [emitted]         vendor
                       favicon.ico    5.43 kB          [emitted]
                        index.html  534 bytes          [emitted]
chunk    {0} main.2949cd4c297786231109.js, main.2949cd4c297786231109.js.map (main) 711 bytes {1} [initial]
[rendered]
   [59] ./src/app/routes.js 438 bytes {0} [built]
   [89] ./src/main.js 273 bytes {0} [built]
chunk    {1} vendor.f7682f3c276a26fc48f2.js, vendor.f7682f3c276a26fc48f2.js.map (vendor) 1.7 MB [entry] [re
ndered]
    [4] ./~/@uirouter/core/lib/index.js 674 bytes {1} [built]
   [22] ./~/angular/index.js 48 bytes {1} [built]
   [23] ./~/@uirouter/angularjs/lib/services.js 6.36 kB {1} [built]
   [24] ./~/@uirouter/angularjs/lib/statebuilders/views.js 5.57 kB {1} [built]
   [31] ./~/@uirouter/angularjs/lib/stateProvider.js 6.14 kB {1} [built]
   [32] ./~/@uirouter/angularjs/lib/urlRouterProvider.js 7.66 kB {1} [built]
   [33] ./~/@uirouter/core/lib/globals.js 1.18 kB {1} [built]
   [58] ./~/@uirouter/angularjs/lib/index.js 721 bytes {1} [built]
   [60] ./~/@uirouter/angularjs/lib/directives/stateDirectives.js 24.4 kB {1} [built]
   [61] ./~/@uirouter/angularjs/lib/directives/viewDirective.js 15.9 kB {1} [built]
   [62] ./~/@uirouter/angularjs/lib/injectables.js 12.9 kB {1} [built]
   [64] ./~/@uirouter/angularjs/lib/stateFilters.js 1.51 kB {1} [built]
   [67] ./~/@uirouter/angularjs/lib/viewScroll.js 793 bytes {1} [built]
   [83] ./~/@uirouter/core/lib/url/index.js 385 bytes {1} [built]
   [88] ./~/angular/angular.js 1.25 MB {1} [built]
     + 73 hidden modules
Child html-webpack-plugin for "index.html":
         Asset    Size  Chunks  Chunk Names
    index.html  545 kB       0
    chunk    {0} index.html 541 kB [entry] [rendered]
        [0] ./~/lodash/lodash.js 540 kB {0} [built]
        [1] ./~/html-webpack-plugin/lib/loader.js!./src/index.html 817 bytes {0} [built]
        [2] (webpack)/buildin/global.js 509 bytes {0} [built]
        [3] (webpack)/buildin/module.js 517 bytes {0} [built]
[09:14:59] Webpack build done
[09:14:59] Finished 'webpack' after 6.52 s
[09:14:59] Finished 'build' after 6.54 s

```

之后查看生成的`public`文件夹

会发现有以下的文件:
```
favicon.ico
index.html
main.2949cd4c297786231109.js
main.2949cd4c297786231109.js.map
vendor.f7682f3c276a26fc48f2.js
vendor.f7682f3c276a26fc48f2.js.map
```

`main.2949cd4c297786231109.js`是压缩后的以`src/main.js`为入口的,不包括`node_modules`里面代码引用的构建出来的代码.

`vendor.f7682f3c276a26fc48f2.js`是压缩以后的,源代码中引用到的位于`node_modules`里面的代码. 这里包括了 `node_modules/angular/angular.js`,`node_modules/@uirouter/angularjs`

`main.2949cd4c297786231109.js.map`,`vendor.f7682f3c276a26fc48f2.js.map`
是前面的两个js文件的`source map`文件.
作为生产环境反向追踪源代码的手段.(目前只有Chrome支持)

> P.S. 因为webpack生产环境的配置里面output格式是`[name].[chunkhash].js`.
> 所以中间的一串字符串是一个hash值,每次相同的源代码只会生成相同的chunkhash值


2. clean
```
npm run clean
```

之后你会发现 `public` 文件夹已被删除


3. dev
```
npm run dev
```
当看到terminal输出`webpack: Compiled successfully`
的时候,就可以打开浏览器 [http://127.0.0.1:5001](http://127.0.0.1:5001)

同时请打开浏览器的console观察变化.

此时:
我们把项目源代码的编辑器,与浏览器分别置于整个电脑桌面的左右两边.

在编辑器内打开`src/index.html`并尝试做出一些修改,譬如把`<title>Simple Webpack Application</title>`修改成`<title>Not Simple Webpack Application</title>`.

同时观察浏览器的变化,就能看到浏览器立刻自动刷新并且反映出了结果.
我们也可以修改`src/app/routes.js`里面的`home` state的template.

浏览器也能够自动刷新出效果!

这就是`webpack-dev-server`的作用之一.

### 代码说明 


`tasks/util/path-util.js`

内容:

```javascript
var path = require('path');

const _root = path.resolve(__dirname, '../..');


function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}


module.exports.root = root;
```

说明:

有个必要说明的是这个`path-util.js`

webpack的配置里面,
有一个容易跌坑的地方,便是路径的表示形式.

有一些路径的表示形式是根目录的相对路径,如`./src/main.js`.

有一些路径的表示形式则是配置文件当前路径的相对路径,譬如各种loaders的覆盖路径.

所以这个path-util 是为了方便地统一以根目录为原始路径,调用node.js原生的`path.resolve` api, 来获得统一的系统绝对路径.


> P.S. 参考Angular官方文档中对webpack的一个tutorial[WEBPACK: AN INTRODUCTION](https://angular.io/docs/ts/latest/guide/webpack.html)
> 中提及的一个工具类helpers


`tasks/config/webpack.base.config.js`


`tasks/config/webpack.base.config.js`

内容:
```javascript
module.exports = {
  entry: {
    main: './src/main.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: []
};
```

这里放的是公共的项目entry

`tasks/config/webpack.dev.config.js`

内容
```javascript
var os = require('os');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');


var baseConfig = require('./base.config');
var webpackBaseConfig = require('./webpack.base.config');

var pathUtil = require('../util/path-util');


const PROTOCOL = 'http://';
const HOST = '127.0.0.1';
const PORT = 5001;

var webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.root(baseConfig.dir.build),
    publicPath: PROTOCOL + HOST + ':' + PORT,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    host: HOST,
    port: PORT
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.root('node_modules')
          ) === 0
        );
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

module.exports = webpackDevConfig;
```

说明:
这里开始配置文件相对上一个章节的样例,更变的非常多.

由于是本地开发时环境配置,所以多出的`devServer`选项指的是`webpack-dev-server`运行时的端口配置,本配置文件默认是5001端口.

在`plugins`方面:  `webpack.DefinePlugin`声明了一个前端构建时的环境变量,
按照此代码中的说明
可以在前端文件中使用表达式`process.env.NODE_ENV`,在构建过程中会被转译为对应的`development`字符串,并且在浏览器中不能通过 手敲'process.env.NODE_ENV' 取值. 

> 参考Webpack Definition Plugin[官方文档](https://webpack.js.org/plugins/define-plugin/) 


名为`vendor`的`webpack.optimize.CommonsChunkPlugin`的作用,则是将`angularjs`,`@uirouter/angularjs`这种第三方的类库与业务应用的代码分割成不同的文件.


> 思考: 这样分割的好处是什么?




`tasks/config/webpack.prod.config.js`

内容:
```javascript
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var baseConfig = require('./base.config');
var webpackBaseConfig = require('./webpack.base.config');

var pathUtil = require('../util/path-util');


var webpackProdConfig = merge(webpackBaseConfig, {

  devtool: 'source-map',
  output: {
    path: pathUtil.root(baseConfig.dir.dist),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.root('node_modules')
          ) === 0
        );
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: './' + baseConfig.dir.src + '/index.html',
      favicon: './' + baseConfig.dir.src + '/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })
  ]
});

module.exports = webpackProdConfig;
```

说明:

对于生产环境的配置,则主要是对构建出的文件做一连串的上线前准备,
包括但不限于:

- 最小化静态资源文件体积
- 将文件hash值加入到文件命名中
- .....

> 思考: 这里能看到一些与dev.config相同的plugins 配置,为什么会这样?


`tasks/clean.js`

内容:
```javascript
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var sequence = require('gulp-sequence');
var gutil = require('gulp-util');

var baseConfig = require('./config/base.config');

gulp.task('clean', sequence(['clean:build', 'clean:dist']));


gulp.task('clean:build', function () {
  gutil.log('Deleting build folder');
  return gulp.src(baseConfig.dir.build)
    .pipe(rimraf());
});


gulp.task('clean:dist', function () {
  gutil.log('Deleting dist folder');
  return gulp.src(baseConfig.dir.dist)
    .pipe(rimraf());
});
```

说明:

`clean:dist`,`clean:build`,`clean` 作用都是删除对应的文件夹.

介绍一下这里用到的`gulp`插件:

- `gulp-rimraf` 用于删除对应文件夹
- `gulp-sequence` gulp 任务流的顺序控制
- `gulp-util`常用来输出调试信息





`tasks/build.js`

内容:
```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('gulp-sequence');

var webpack = require('webpack');


var webpackProdConfig = require('./config/webpack.prod.config');

gulp.task('webpack', function (done) {
  gutil.log('Webpack building.');
  webpack(webpackProdConfig, function (error, stats) {
    if (error) {
      throw new gutil.PluginError('webpack', error);
    }
    gutil.log(stats.toString(webpackProdConfig.stats));
    gutil.log('Webpack build done');
    done();
  });
});

gulp.task('build', sequence(['clean'], ['webpack']));
```

说明:

build的任务流代码比较容易懂,意思就是先执行预先定义好的`clean`task.

接着执行`webpack`task: 根据`webpack.prod.config.js`构建出生产环境的资源文件


`tasks/serve.js`

内容:

```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('gulp-sequence');

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');
var addDevServerEntrypoints = require('webpack-dev-server/lib/util/addDevServerEntrypoints');

var webpackDevConfig = require('./config/webpack.dev.config');


gulp.task('serve', function () {
  gutil.log('Webpack building.');
  gutil.log(webpackDevConfig.devServer.host + ':' + webpackDevConfig.devServer.port);
  addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
  var compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer)
    .listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function (error) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }
    });
});
```

说明:

`serve`这个task,表示通过读取开发时webpack配置`webapck.dev.config`, 启动一个`webapck-dev-server`的实例.


### 总结
在这一章节,我们大概了解到了:

- 使用gulp任务流控制webpack构建
- 拆分不同环境的webpack构建配置

### 思考
- 那么CSS也能通过webpack构建吗, CSS的哪种模块导入导出语法能够被`webpack`或其`loaders`正确识别?
- 那么项目的静态媒体资源,比如图标,字体,固定的logo图片等应该如何配置,也需要使用
require进行管理吗?使用webpack管理媒体资源的主流工作方式是怎样的?
- AngularJS 里面的directive,component,service,values,constant,service,factory等其他功能,应该如何以CommonJS的形式编写?
- ......

### 参考文章

[WebpackMerge是如何Merge Configuration的?](https://github.com/survivejs/webpack-merge)




## Webpack-Gulp-AngularJS-Boilerplate

通过上一节样例的解析,我们了解到了一个基本的`webpack`+`angularjs`+`gulp`结合的,稍有眉目的工程代码.

但是要应用到实际项目中,还有很多明显的问题需要解决,包括但不限于:

通用部分:
- CSS,Fonts等资源文件如何进行打包?
- Server代码不是Node.js应用,如何与其他类型的后端项目结合在一起吗?

AngularJS部分:
- 如何管理angularjs的视图部分的html文件?
- 如何拆分angularjs的模块


这一章的样例代码,在上一章的基础上,添加了以下功能:

- 利用webpack的`ng-cache-loader`解析angularjs `html`视图文件
- 利用webpack的`style-loader`,`css-loader`提供css文件构建样例
- 提供`angularjs`项目功能模块化的一种实现思路与实现
- 提供与`koa`,`express`,`springboot`等常见后台工程的整合方案

- 添加`bootstrap`的css样式 (有需要可自行替换)
- 添加`angular-ui-bootstrap`作为基本的angular组件框架 (有需要可自行替换)
- 添加了一个可选的`webpack-dev-server-proxy`方便开发环境与单独分离的后台进行整合 (详情请见下文代码说明)


为解决实际项目中遇到的问题做了其中一种实现,提供了一种较普遍的思路.

### 安装项目依赖

```bash
cd webpack-gulp-angularjs-boilerplate
npm install
```


### 运行项目
```bash
npm run dev
```

### 与其他后台项目整合

与其他后台项目整合,前提是对后台项目的代码结构和运行过程有一定的了解,

本项目只从以下几个 ~~我只懂的~~ 技术栈展开描述:

- Node.js - Express
- Node.js - KOA2
- Java - SpringBoot(Maven)

我们先回顾一下`task/config/base.config.js`:

还记得`base.config.js`文件存在的意义吗?

> P.S. 在上一章有提及到这一句:  
> 因此我把改动频率较大,只需开发者关心且修改频率可能很大的部分抽取到`base.config.js`里面.

```js
module.exports = {
  dir: {
    src: 'src',
    build: 'build',

    // default: public
    // backend-springboot : ../backend-springboot/src/main/resources/public
    // backend-koa: ../backend-koa/public
    // backend-express:  ../backend-express/public
    dist: 'public'
  }
};
```

当前我们有三个后台类型的项目,没有任何功能,只是单纯的运行起来.

分别处于项目根目录下的`backend-express`,`backend-koa`,`backend-springboot`里面.

只要把`base.config.js`中的`dist`一值修改成 注释中的`backend-express`,`backend-koa`,`backend-springboot`其中一个的值.

在通过运行`npm run build`就能把生成的资源文件自动打包到对应项目的默认静态资源文件夹.

对于那些前后端项目相结合的项目,基本上生产环境的构建都可以通过这类指定输出目录/文件夹复制 的功能去实现.

### 代码说明

这一轮主为了实现上面提及的新功能, 添加的代码大概如下:

- 添加`bootstrap`的css样式 (有需要可自行替换)
- 利用webpack的`ng-cache-loader`解析angularjs `html`视图文件
- 利用webpack的`style-loader`,`css-loader`提供css文件构建样例
- 提供`angularjs`项目功能模块化的一种实现思路与实现
- 提供与`koa`,`express`,`springboot`等常见后台工程的整合方案

- 添加`angular-ui-bootstrap`作为基本的angular组件框架 (有需要可自行替换)
- 添加了一个可选的`webpack-dev-server-proxy`方便开发环境与单独分离的后台进行整合 (详情请见下文代码说明)


#### 依赖文件更变
因为使用了`bootstrap.css`和`angular-ui-router`,所以可以看到`package.json`里面多了这两个依赖.

##### bootstrap.css

在引入`bootstrap.css`方面, 修改的文件涉及下面几个方面:
- 全局的 `styles.css` 文件入口
- `webpack.base.config`关于bootstrap.css中定义的 `Glyphicons` 相关icon-font 的loaders

###### 全局的styles.css入口
1. 在src文件夹下, 新增了一个 `styles.css`
这个文件,主要是用来做样式文件的一个entry.

Q: 什么时候需要修改这个`styles.css`?

A: 修改style.css 入口文件一般的情景有:
- 新增了一些第三方(vendor)类库的, 样式文件位于 `node_modules` 文件夹下的css文件.
- 自定义的一些其他可拆分的css/less/sass 文件

如此样例所示: 只需要在里面使用`@import` 语法进行引入即可
```
@import "~bootstrap/dist/css/bootstrap.css";
```

###### webpack.config 新增 entry
同时也能看到`webpack.base.config,js`为了适应修改,新增了一个entry


```
entry: {
  main: './src/main.js'
}
```

变为

```
entry: {
  main: './src/main.js',
  styles: './src/styles.css'
}
```
###### webpack.config 新增 loaders

为了适应一些静态资源文件(偏样式方面)的加载, 新增了一系列loaders.

可以看到在`webpack.base.config.js`的`module`里的`rules`, 新增了如下的加载规则和对应的loaders:

```
{
  test: /\.css$/,
  exclude: pathUtil.root(baseConfig.dir.src, 'app'),
  loader: ExtractTextPlugin.extract({
    use: ['css-loader'],
    fallback: ['style-loader']
  })
},
{
  test: /\.css$/,
  include: pathUtil.root(baseConfig.dir.src, 'app'),
  loader: ExtractTextPlugin.extract({
    use: ['css-loader'],
    fallback: ['style-loader']
  })
},
{
  test: /\.(png|jpe?g|gif|ico)$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    useRelativePath: true,
    publicPath: './',
    name: '[name].[ext]'
  }
},
{
  test: /\.(woff|woff2|svg|ttf|eot)$/,
  loader: 'file-loader',
  options: {
    limit: 10000,
    useRelativePath: false,
    publicPath: './',
    name: '[name].[ext]'
  }
}
```

前两个规则(rules), 表示分别对应于位于`node_modules`和位于`src/app`文件夹下的所有目录的所有以`.css`结尾的文件.
通过`css-loader`进行加载.

> 思考: 这样分开有什么好的意义吗?

第三个规则, 表示在所有entry解析到的文件中, 根据不同的资源文件的后缀, 使用不同的loader.

并且在需要的时候, 可以把他们释放到指定的相对的路径, 亦或是当这个资源文件过小的时候, 以base64编码形式融合在打包好的css/js文件中, 而非独立文件.

第四个规则, 同第三个规则, 但是是用`file-loader`对字体相关的文件进行处理.

这里的第三个和第四个规则, 在加载`bootstrap.css`的过程中, 生效, 并做了如下处理:

在完整的`bootstrap.css`中,有如下一段引入`icon-font`的代码:
```
....
@font-face {
  font-family: 'Glyphicons Halflings';

  src: url('../fonts/glyphicons-halflings-regular.eot');
  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}
....
```
在原来位于`node_modules`文件夹下的文件结构时, 此段代码表示他会去读取`'../fonts/glyphicons-halflings-regular.eot'`.

我们来看一下这个`bootstrap/dist`下的文件结构:
```
├───css
│       bootstrap-theme.css
│       bootstrap-theme.css.map
│       bootstrap-theme.min.css
│       bootstrap-theme.min.css.map
│       bootstrap.css
│       bootstrap.css.map
│       bootstrap.min.css
│       bootstrap.min.css.map
│
├───fonts
│       glyphicons-halflings-regular.eot
│       glyphicons-halflings-regular.svg
│       glyphicons-halflings-regular.ttf
│       glyphicons-halflings-regular.woff
│       glyphicons-halflings-regular.woff2
│
└───js
        bootstrap.js
        bootstrap.min.js
        npm.js
```

因为上面第四个`file-loader`的配置,
webpack在进行构建解析的时候, 会把所需要的这些字体文件后缀的文件, 搬到最终 `dist` 文件夹下的根路径.

所以在webpack构建后的路径,我们再来找一下这个`font-face`字段:

```
@font-face {
  font-family: Glyphicons Halflings;
  src: url(glyphicons-halflings-regular.eot);
  src: url(glyphicons-halflings-regular.eot?#iefix) format("embedded-opentype"), url(glyphicons-halflings-regular.woff2) format("woff2"), url(glyphicons-halflings-regular.woff) format("woff"), url(glyphicons-halflings-regular.ttf) format("truetype"), url(glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format("svg")
}
```


#### webpack 与 angularjs 视图模板

在上面提及 webpack module rules 的时候, 我们已经看到了不止新增了4条rule.

还有一条 `ng-cache-loader` 的loader.

这个配置的意思是, 对于 非`src`目录下的`index.html`, 其他在项目中被entry 引用的`html`文件, 都会使用
`ng-cache-loader`进行加载, 直接将他变成一个 `angularjs`中的 `view template`.


具体用法, 可以参见上一个项目的 `src/app/routes.js` 的更变:

在上一个项目中, `src/app/routes.js` 大概是这样的:

在 `template` 字段直接进行模板 html内容的声明. 
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

使用了`ng-cache-loader`之后, 我们可以通过如下几种方式来引用 模板html文件.

举一种使用方式 :

```
module.exports = function ($stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      template: require('../layouts/login/login.html')
    })
    .state({
      name: 'register',
      url: '/register',
      template: require('../layouts/register/register.html')
    })
};
```


#### Webpack的开发时代理中间件

在过往的时候, 在大部分前后端分离开发的项目, 有一个比较蛋疼的地方就是: 
每一次前端资源文件更新 都需要将他转移到 后端文件夹对应的目录.

`webpack-dev-server`的proxy中间件, 则方便的实现了这些功能(相对于各种实现代理的工具,最重要的是他能够在进行代理的时候,支持websocket).

在刚才预先提供的后台简单项目`backend-springboot`里面, 提供了一个api, 其url为

[http://127.0.0.1:8080/api/v1/validate-json](http://127.0.0.1:8080/api/v1/validate-json)

而现在这个`webpack-gulp-angularjs-boilerplate`, 前端开发时, 默认是监听 5001 端口.

通过在`webpack.dev.config.js`的`devServer`中添加 proxy相关配置,
下面代码表示, 监听开发时端口(5001) 的所有发送到 `/api/*`的http请求, 都转发到
`127.0.0.1:8080`(你的后端服务器监听端口)

那么我们可以在前端开发时,通过访问 [http://127.0.0.1:5001/api/v1/validate-json](http://127.0.0.1:5001/api/v1/validate-json)
来实现代理转发的功能. 


```
proxy: {
  '/api': {
    target: 'http://127.0.0.1:8080/', 
    secure: false,
    ws: true
  }
}
```


### 总结

此项目可以用作Simple Project的一个前端方面的手脚架, 他遵循并通过现有的工具实现了一些前端工程方面常见的较佳实践.

但是前端工程化依然发展的很快, 此项目仅仅以`angularjs + commonjs语法`作为一个例子.
可以说为日后将要遇到的`Angular`,`Vue`,`React`等更先进的前端框架, 亦或是更高级的构建工具, 提供了一个基本的开发思维与工具升级实践.

希望在了解这个进化过程的基础上, 在遇到新的前端项目时候, 能够快速了解其构件流程, 举一反三, 快速上手.