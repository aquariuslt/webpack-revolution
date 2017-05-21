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