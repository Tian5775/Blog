var db = require('./db');

function webGet(app){
    app.get('/loginIn',function(req,res){
        var a = ["请输入正确的用户名和密码"];
        //确保用户输入了用户名和密码
        if(res.req.query && res.req.query.userName && res.req.query.userPassword){
            var name = res.req.query.userName;
            var password = res.req.query.userPassword;
            var sqlData = "select * from [user] where name='" + name + "'";
            db.sql(sqlData,function(err,result){
                if (err) {
                    console.log(err);
                    return;
                }

                var data = result.recordset;

                if(data.length > 0){
                    res.send('["该用户存在"]');
                }else{
                    res.send('["该用户不存在"]');
                }

                //res.send(resultData);
            });
        }else{
            res.send(a)
        }

    });

    app.get('/loginOut',function(req,res){
        res.send('helloworld');
    });
}

exports.webGet = webGet;