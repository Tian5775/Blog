var db = require('./db');
var file = require('./expressFile');

function webGet(app){

    app.get('/loginIn',function(req,res){
        //确保用户输入了用户名和密码
        if(res.req.query && res.req.query.userName && res.req.query.userPassword){
            var Name = res.req.query.userName;
            var Password = res.req.query.userPassword;
            var sqlData = "select Name,Password,IsAministrator from [user] where name='" + Name + "'";
            db.sql(sqlData,function(err,result){
                if (err) {
                    console.log(err);
                    return;
                }

                var data = result.recordset;

                if(data.length > 0){
                    if(Password == data[0].Password){
                        data[0].result = 1;
                        delete data[0].Id;
                        delete data[0].Password;
                        res.send(data[0]);
                    }else{
                        res.send('{"message":"密码错误","result":0}');
                    }
                }else{
                    res.send('{"message":"该用户不存在","result":0}');
                }

                //res.send(resultData);
            });
        }else{
            res.send({"message":"请输入正确的用户名和密码","result":0})
        }

    });

    app.get('/checkUsername',function(req,res){
        if(res.req.query && res.req.query.userName){
            var Name = res.req.query.userName;
            var sqlData = "select * from [user] where name='" + Name + "'";

            db.sql(sqlData,function(err,result) {
                if (err) {
                    console.log(err);
                    return;
                }

                var data = result.recordset;

                if(data.length > 0){
                    res.send('{"message":"该用户名已存在!","result":0}');
                }else{
                    res.send('{"message":"该用户名可以使用!","result":1}');
                }
            });
        }
    });

    app.get('/registered',function(req,res){
        if(res.req.query && res.req.query.userName && res.req.query.password && res.req.query.question && res.req.query.answer){
            var name = res.req.query.userName;
            var password = res.req.query.password;
            var question = res.req.query.question;
            var answer = res.req.query.answer;

            var sqlData = "insert into [user] (Name,Password,Question,Answer) values ('" + name + "','" + password + "','" + question + "','" + answer + "') select * from [user] where Name='" + name + "'";

            db.sql(sqlData,function(err,result) {
                if (err) {
                    console.log(err);
                    return;
                }

                var data = result.recordset;

                if(data.length > 0){
                    res.send('{"message":"欢迎加入Tian-Blog,' + data[0].Name + '","result":1}');
                }else{
                    res.send('{"message":"创建用户失败","result":0}');
                }
            });
        } else {
            res.send('{"message":"请输入完整的信息","result":0}');
        }
    });

    app.get('/changePwd',function(req,res){
        if(res.req.query && res.req.query.userName && res.req.query.password && res.req.query.question && res.req.query.answer) {
            var name = res.req.query.userName;
            var password = res.req.query.password;
            var question = res.req.query.question;
            var answer = res.req.query.answer;

            db.sql("select * from [user] where name='" + name + "'",function(err,result) {
                if (err) {
                    console.log(err);
                    return;
                }

                var data = result.recordset;

                if (data.length > 0){
                    if(data[0].Question == question && data[0].Answer == answer){
                        var sqlData = "UPDATE [USER] SET Password='" + password + "' WHERE name='" + name + "'";
                        db.sql(sqlData,function(err,result){
                            if (err) {
                                console.log(err);
                                return;
                            }

                            res.send('{"message":"修改密码成功!","result":1}');
                        });
                    } else {
                        res.send('{"message":"输入的密保答案错误，请检查!","result":0}');
                    }
                } else {
                    res.send('{"message":"该用户不存在!","result":0}');
                }
            })
        } else {
            res.send('{"message":"请输入完整的信息","result":0}');
        }
    });

    //文件操作
    app.get('/readdir',function(req,res){
        file.readdir(function(data){
            res.send(data);
        })
    });

    app.post('/readFile',function(req,res){
        var dir = "../lib/md/";
        file.readFile(dir,req,function(data){
            res.send(data);
        });
    });

    app.post('/writeFile',function(req,res){
        var dir = "../lib/md/";
        file.writeFile(dir,req,function(data){
            res.send(data);
        });
    });

    app.post('/deleteFile',function(req,res){
        var dir = "../lib/md/";
        file.deleteFile(dir,req,function(data){
            res.send(data);
        });
    });
}

exports.webGet = webGet;