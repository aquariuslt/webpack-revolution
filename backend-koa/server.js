/* Created by Aquariuslt on 5/20/17.*/

const Koa = require('koa');
const koaStatic = require('koa-static');

const app = new Koa();

app.use(koaStatic('public'));

app.listen(8080);