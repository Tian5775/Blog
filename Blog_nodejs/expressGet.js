var db = require('./db');

function webGet(app){
    app.get('/loginIn',function(req,res){
        //确保用户输入了用户名和密码
        if(res.req.query && res.req.query.userName && res.req.query.userPassword){
            var Name = res.req.query.userName;
            var Password = res.req.query.userPassword;
            var sqlData = "select Name,Password from [user] where name='" + Name + "'";
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
                    res.send('{"message":"该用户可以使用!","result":1}');
                }
            });
        }
    });

    app.get('/registered',function(req,res){
        if(res.req.query && res.req.query.userName && res.req.query.password){
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
        }
    });
}

exports.webGet = webGet;