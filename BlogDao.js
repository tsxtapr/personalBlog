var dbutil = require("./DBUtil.js");

function insertBlog(title, content, tags, views, ctime, utime, success){
    let insertSql = "insert into blog (title, content, tags, views, ctime, utime) values (?, ?, ?, ?, ?, ?)";
    let params = [title, content, tags, views, ctime, utime];
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

function queryBlogByPage(page, pageSize, success){
    let querySql = "select * from blog order by id desc limit ?, ?";
    let params = [page * pageSize, pageSize];
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

function queryBlogCount(success){
    let querySql = "select count(1) as count from blog;";
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

function queryBlogById(id, success){
    let querySql = "select * from blog where id = ?;";
    let params = [id];
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

function queryAllBlog(success){
    let querySql = "select * from blog order by id desc;"; // 拉取数据的时候最好是倒序
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

function addViews(id, success){
    let updateSql = "update blog set views = views + 1 where id = ?;";
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function(error, result){
        if(error == null){
            success(result);
        } else{
            console.log(error);
        }
    });
    connection.end();
};

function queryHotBlog(size, success){
    let querySql = "select * from blog order by views desc limit ?;";
    let params = [size];
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
    insertBlog: insertBlog,
    queryBlogByPage: queryBlogByPage,
    queryBlogCount: queryBlogCount,
    queryBlogById: queryBlogById,
    queryAllBlog: queryAllBlog,
    addViews: addViews,
    queryHotBlog: queryHotBlog,
};