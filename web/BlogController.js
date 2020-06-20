var blogDao = require("../dao/BlogDao.js");
var tagsDao = require("../dao/TagsDao.js");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao.js");
var timeUtil = require("../util/TimeUtil.js");
var respUtil = require("../util/RespUtil.js");
var url = require("url");

var path = new Map();

function queryHotBlog(request, response){
    blogDao.queryHotBlog(6, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
};
path.set("/queryHotBlog", queryHotBlog);

function queryAllBlog(request, response){
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
};
path.set("/queryAllBlog", queryAllBlog);

function queryBlogById(request, response){
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid), function(result){});
    });
};
path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
};
path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request, response){
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result){
        for(var i = 0; i < result.length; i ++){
            result[i].content = result[i].content.replace(/<img[\w\W]*">/g, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
};
path.set("/queryBlogByPage", queryBlogByPage);

function editBlog(request, response){
    let params = url.parse(request.url, true).query;
    let tags = params.tags ? params.tags.replace(/ /g, "").replace("，", ",") : "";
    request.on("data", function(data){
        blogDao.insertBlog(params.title, data.toString().trim(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(",");
            for(var i = 0; i < tagList.length; i ++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    })
};
path.set("/editBlog", editBlog);

function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function(result){
        if(result == null || result.length == 0){
            insertTag(tag, blogId);
        } else{
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result){});
        }
    });
};

function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function(result){
        insertTagBlogMapping(result.insertId, blogId);
    });
};

function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result){});
};

module.exports.path = path;
