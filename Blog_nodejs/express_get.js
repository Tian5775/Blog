function webGet(app){
    app.get('/',function(req,res){
        res.send('hellow world!');
    });

    app.get('/1',function(req,res){
        res.send('hellow world!');
    });
}

exports.webGet = webGet;