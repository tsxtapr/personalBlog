var dbutil = require("./DBUtil.js");

function insertTag(tag, ctime, utime, success){
    let insertSql = "insert into tags (tag, ctime, utime) values (?, ?, ?)";
    let params = [tag, ctime, utime];
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

function queryTag(tag, success){
    let querySql = "select * from tags where tag = ?;";
    let params = [tag];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        } else{
            console.log(error);
        }
    });
    connection.end();
};

function queryAllTag(success){
    let querySql = "select * from tags;";
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        } else{
            console.log(error);
        }
    });
    connection.end();
};

module.exports = {
    insertTag: insertTag,
    queryTag: queryTag,
    queryAllTag: queryAllTag,
};









