## Simple Backend Express Application

一个`Node.js`+`Express`作为后台的普通应用.

## Usage

### Installation Dependencies
```bash
npm install
```

### Start Server
```bash
npm start
```

### Verify in Browser

Open [http://127.0.0.1:8080](http://127.0.0.1:8080)


## Tips

主要的内容位于`server.js`下面


```javascript
var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.listen(8080);
```

该段代码演示了一个使用`express`建立http服务器, 监听`8080`端口, 且以`public`作为静态资源文件夹对外提供服务的样例.
