var db = require('./db');
var user = {};

user.loginIn = function(req,func){
    //确保用户输入了用户名和密码
    if(req.query && req.query.userName && req.query.userPassword){
        var Name = req.query.userName;
        var Password = req.query.userPassword;
        var sqlData = "select Name,Password,IsAministrator from [user] where name='" + Name + "'";
        db.sql(sqlData,function(err,result){
            if (err) {
                console.log(err);
                return;
            }

            var data = result.recordset;

            if(data.length > 0){
                if(Password == data[0].Password){
                    delete data[0].Id;
                    delete data[0].Password;
                    func({"data":data[0],"result":1});
                }else{
                    func({"message":"密码错误","result":0});
                }
            }else{
                func({"message":"该用户不存在","result":0});
            }

            //res.send(resultData);
        });
    }else{
        res.send({"message":"请输入正确的用户名和密码","result":0})
    }
}

user.checkUsername = function(req,func){
    if(req.query && req.query.userName){
        var Name = req.query.userName;
        var sqlData = "select * from [user] where name='" + Name + "'";

        db.sql(sqlData,function(err,result) {
            if (err) {
                console.log(err);
                return;
            }

            var data = result.recordset;

            if(data.length > 0){
                func({"message":"该用户名已存在!","result":0});
            }else{
                func({"message":"该用户名可以使用!","result":1});
            }
        });
    }
}

user.registered = function(req,func){
    if(req.query && req.query.userName && req.query.password && req.query.question && req.query.answer){
        var name = req.query.userName;
        var password = req.query.password;
        var question = req.query.question;
        var answer = req.query.answer;

        var sqlData = "insert into [user] (Name,Password,Question,Answer,IsAministrator) values ('" + name + "','" + password + "','" + question + "','" + answer + "',0) select * from [user] where Name='" + name + "'";

        db.sql(sqlData,function(err,result) {
            if (err) {
                console.log(err);
                return;
            }

            var data = result.recordset;

            if(data.length > 0){
                func({"message":"欢迎加入Tian-Blog,' + data[0].Name + '","result":1});
            }else{
                func({"message":"创建用户失败","result":0});
            }
        });
    } else {
        func({"message":"请输入完整的信息","result":0});
    }
}

user.changePwd = function(req,func){
    if(req.query && req.query.userName && req.query.password && req.query.question && req.query.answer) {
        var name = req.query.userName;
        var password = req.query.password;
        var question = req.query.question;
        var answer = req.query.answer;

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

                        func({"message":"修改密码成功!","result":1});
                    });
                } else {
                    func({"message":"输入的密保答案错误，请检查!","result":0});
                }
            } else {
                func({"message":"该用户不存在!","result":0});
            }
        })
    } else {
        func({"message":"请输入完整的信息","result":0});
    }
}

user.userInformation = function(req,func){
    if(req.query.userName){
        var name = req.query.userName;
        var sqlData = "select * from [user] where name = '" + name + "'";

        db.sql(sqlData,function(err,result){
            if (err) {
                console.log(err);
                func({"message":"用户信息查询失败！","result":0});
                return;
            }

            var data = result.recordset;

            func({"data":data,"result":1});
        });
    } else {
        func({"message":"查询的用户名不能为空！","result":0});
    }
}

user.updateUserInformation = function(req,func){
    var reqData = req.query;
    if(reqData.userName && reqData.password && reqData.question && reqData.answer){
        var sqlData = "UPDATE dbo.[user] SET PassWord='" + reqData.password + "',Question='" + reqData.question + "',Answer='" + reqData.answer + "' WHERE Name='" + reqData.userName + "' ";

        db.sql(sqlData,function(err,result){
            if (err) {
                console.log(err);
                func({"message":"更新用户信息失败！","result":0});
                return;
            }

            func({"message":"更新用户信息成功！","result":1});
        });
    } else {
        func({"message":"请输入完整的用户信息！","result":0});
    }
}

module.exports = user;