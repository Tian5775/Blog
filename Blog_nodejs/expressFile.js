var db = require('./db');
var fs = require('fs');
var file = {};
var a = "";

//读取目录
file.readdir = function(func){
    /*fs.readdir(dir,function(err,files){
        if (err) {
            return console.error(err);
        }
        func(files);
    });*/

    var sqlData = "SELECT * FROM dbo.FileList WHERE IsDelete=0 AND IsShow=1 ORDER BY UpdateTime DESC,Id";
    db.sql(sqlData,function(err,result){
        if (err) {
            func(err);
            return console.error(err);
        }

        var data = result.recordset;
        func(data);
    });
}

//读取文件
file.readFile = function(dir,req,func){
    var title = dir + req.body.title;

    fs.readFile(title,function(err,data){
        if(err){
            var errMessage = {"message":"","result":0};
            func(errMessage);
            return console.log(err);
        }

        var text = data.toString();
        var obj = {
            "text":text,
            "result":1
        }
        func(obj);
    })
}

//写入文件
file.writeFile = function(dir,req,func){
    var title = dir + req.body.title;
    var oldTitle = dir + req.body.oldTitle;
    var Id = req.body.Id;
    var text = req.body.text;

    //判断是否修改了文件标题,是的话进行修改
    //如果是新文件，oldTitle = "",id=""
    if(oldTitle != "" && title != oldTitle){
        fs.renameSync(oldTitle,title);
    }

    fs.writeFileSync(title,text);

    var Synopsis = text.substr(0,30);
    if(Id == ""){
        var sqlData = "INSERT INTO dbo.FileList ( Id , Name , CreateTime , Synopsis , UpdateTime , Writer , Remark , IsDelete , IsShow )" +
        "VALUES  ( NEWID() , '" + req.body.title + "' , GETDATE() , '" + Synopsis + "' , GETDATE() , 'tian' , '创建文件' , 0 , 1 )";
    } else {
        var sqlData = "UPDATE dbo.FileList SET Name='" + req.body.title + "',Synopsis='" + Synopsis + "',UpdateTime=GETDATE(),Remark='修改文件' WHERE Id='" + Id + "'";
    }

    db.sql(sqlData,function(err,result){
        if (err) {
            var message = {"message":"写入文件失败","result":0};
            func(message);
            return console.error(err);
        }

        var message = {"message":"写入文件成功","result":1};
        func(message);
    });
}

file.deleteFile = function(dir,req,func){
    var title = dir + req.body.title;
    var Id = req.body.Id;

    //fs.unlinkSync(title); //只将数据库里面的IsDelect改为1，不删除文件，便于以后添加回收站功能

    var sqlData = "UPDATE dbo.FileList SET IsDelete=1 WHERE Id='" + Id + "'";
    db.sql(sqlData,function(err,result){
        if (err) {
            var message = {"message":"删除文件失败","result":0};
            func(message);
            return console.error(err);
        }

        var message = {"message":"删除文件成功","result":1};
        func(message);
    });

    /*fs.unlink(title, function(err){
        if(err){
            var message = {"message":"删除文件失败","result":0};
            func(message);
            return console.log(err);
        }

        var message = {"message":"删除文件成功","result":1};
        func(message);
    })*/
}

module.exports = file;