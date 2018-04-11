var db = require('./db');
var user = require('./expressUser');
var file = require('./expressFile');

function webGet(app){

    //登录
    app.get('/loginIn',function(req,res){
        user.loginIn(req,function(data){
            res.send(data);
        });
    });

    //检查用户名是否已经存在
    app.get('/checkUsername',function(req,res){
        user.checkUsername(req,function(data){
            res.send(data);
        });
    });

    //用户注册
    app.get('/registered',function(req,res){
        user.registered(req,function(data){
            res.send(data);
        });
    });

    //修改密码
    app.get('/changePwd',function(req,res){
        user.changePwd(req,function(data){
            res.send(data);
        });
    });

    //获取用户信息
    app.get('/userInformation',function(req,res){
        user.userInformation(req,function(data){
            res.send(data);
        });
    });

    //修改用户信息
    app.get('/updateUserInformation',function(req,res){
        user.updateUserInformation(req,function(data){
            res.send(data);
        });
    });

    //文件操作
    //读取文件列表
    app.get('/readdir',function(req,res){
        file.readdir(function(data){
            res.send(data);
        })
    });

    //读取文件
    app.post('/readFile',function(req,res){
        var dir = "../lib/md/";
        file.readFile(dir,req,function(data){
            res.send(data);
        });
    });

    //写入文件
    app.post('/writeFile',function(req,res){
        var dir = "../lib/md/";
        file.writeFile(dir,req,function(data){
            res.send(data);
        });
    });

    //删除文件
    app.post('/deleteFile',function(req,res){
        var dir = "../lib/md/";
        file.deleteFile(dir,req,function(data){
            res.send(data);
        });
    });


}

exports.webGet = webGet;