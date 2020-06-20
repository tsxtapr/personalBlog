var dbutil = require("./DBUtil.js");

function insertEveryDay(content, ctime, success){
    let insertSql = "insert into every_day (content, ctime) values (?, ?)";
    let params = [content, ctime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null){
            success(result);
        } else{
            console.log(error);
        }
    });
    connection.end();
};

function queryEveryDay(success){
    let querySql = "select * from every_day order by id desc limit 1;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function(error, result){
        if(error == null){
            success(result);
        } else{
            console.log(error);
        }
    });
    connection.end();
};

module.exports = {
    insertEveryDay: insertEveryDay,
    queryEveryDay: queryEveryDay,
};