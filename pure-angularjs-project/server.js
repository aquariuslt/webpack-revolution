/** Created by CUIJA on 05-19-2017.*/
var express = require('express');

var app = express();

app.use('/', express.static('static'));

app.listen(3000);