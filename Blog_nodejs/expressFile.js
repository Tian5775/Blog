var fs = require('fs');
var file = {};
var a = "";

//读取目录
file.readdir = function(dir,func){
    fs.readdir(dir,function(err,files){
        if (err) {
            return console.error(err);
        }
        func(files);

        //遍历目录下的文件
        /*files.forEach( function (file){
            console.log( file );
        });*/
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
    var text = req.body.text;

    //判断是否修改了文件标题,是的话进行修改
    //如果是新文件，oldTitle = ""
    if(oldTitle != "" && title != oldTitle){
        fs.renameSync(oldTitle,title);
    }

    fs.writeFile(title,text,function(err){
        if(err){
            var message = {"message":"写入文件失败","result":0};
            func(message);
            return console.log(err);
        }

        var message = {"message":"写入文件成功","result":1};
        func(message);
    });
}

file.deleteFile = function(dir,req,func){
    var title = dir + req.body.title;

    fs.unlink(title, function(err){
        if(err){
            var message = {"message":"删除文件失败","result":0};
            func(message);
            return console.log(err);
        }

        var message = {"message":"删除文件成功","result":1};
        func(message);
    })
}

module.exports = file;