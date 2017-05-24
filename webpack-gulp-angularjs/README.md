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

### 代码说明 TODO

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
    }),
    new CopyWebpackPlugin(baseConfig.dir.assets)
  ]
});

module.exports = webpackProdConfig;
```

说明:


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


### 总结
在这一章节,我们大概了解到了:

- 使用gulp任务流控制webpack构建
- 拆分不同环境的webpack构建配置

### 思考
- 那么CSS也能通过webpack构建吗, CSS的哪种模块导入导出语法能够被`webpack`或其`loaders`正确识别?
- 那么项目的静态媒体资源,比如图标,字体,固定的logo图片等应该如何配置,也需要使用
require进行管理吗?使用webpack管理媒体资源的主流工作方式是怎样的?
- AngularJS 里面的directive,component,service,values,constant,service,factory等其他功能,应该在项目中如何运行
- ......

### 参考文章

[WebpackMerge是如何Merge Configuration的?](https://github.com/survivejs/webpack-merge)