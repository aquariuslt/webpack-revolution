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


为解决实际项目中遇到的问题做了其中一种实现,提供了一种较普遍的思路.

### 安装项目依赖

```bash
cd webpack-gulp-angularjs-boilerplate
npm install
```

### 项目说明


### 运行项目
```bash
npm run dev
```

### 与其他后台项目整合

与其他后台项目整合,前提是对后台项目的代码结构和运行过程有一定的了解,

本项目只从懂的几个技术栈展开描述:

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

### 总结