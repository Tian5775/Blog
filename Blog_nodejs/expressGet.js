function webGet(app){
    app.get('/loginIn',function(req,res){
        res.send('hello world!');

    });

    app.get('/loginOut',function(req,res){
        res.send('hello world');
    });
}

exports.webGet = webGet;