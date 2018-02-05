var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var expressGet = require('./expressGet');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);//请求源
    res.header("Access-Control-Allow-Headers", "Content-Type, *");//请求头类型
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//请求方式POST, GET, OPTIONS
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", "true");//是否支持cookie跨域
    next();
});

var server =app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
});

expressGet.webGet(app);