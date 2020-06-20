var blogDao = require("../dao/BlogDao.js");
var tagsDao = require("../dao/TagsDao.js");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao.js");
var commentDao = require("../dao/CommentDao.js");
var timeUtil = require("../util/TimeUtil.js");
var respUtil = require("../util/RespUtil.js");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();

function addComment(request, response){
    let params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
};
path.set("/addComment", addComment);

function queryRandomCode(request, response){
    let img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
};
path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response){
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result){
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
};
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response){
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function(result){
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
};
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

function queryNewComments(request, response){
    commentDao.queryNewComments(5, function(result){
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
};
path.set("/queryNewComments", queryNewComments);

module.exports.path = path;