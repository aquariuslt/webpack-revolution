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

### 思考与进阶

1. 如何为前端项目编写测试代码(单元测试,E2E测试)? 现有的项目结构是否能够方便整合测试代码?
2. 如何做持续集成, 用什么平台/工具进行持续集成? 业界主流喜欢用什么方案?

3. 所有的项目如何完全升级到ES6语法?
4. 这个项目结构能够方便的演变到其他前端框架吗?Vue,React?
5. 对Style有更高阶的要求,如何将less,sass整合起来?如何使用postcss结合工具处理样式代码?

6. Node.js 后端有什么能够类似这样的工程化经验?
