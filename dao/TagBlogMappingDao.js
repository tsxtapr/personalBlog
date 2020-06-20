var dbutil = require("./DBUtil.js");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    let insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)";
    let params = [tagId, blogId, ctime, utime];
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

function queryByTag(tagId, page, pageSize, success){
    let querySql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    let params = [tagId, page * pageSize, pageSize];
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

function queryByTagCount(tagId, success){
    let querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    let params = [tagId];
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
    insertTagBlogMapping: insertTagBlogMapping,
    queryByTag: queryByTag,
    queryByTagCount: queryByTagCount,
};