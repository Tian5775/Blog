var mssql = require('mssql');
var db = {};
var config = {
    user: 'admin',
    password: '12345678',
    server: 'blog.cv9ruclo7tyw.ap-southeast-1.rds.amazonaws.com',
    database: 'blog',
    port:'1433'
};

db.sql = function (sql, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err){
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err){
                        console.log(err);
                        callback(err,null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};

module.exports = db;