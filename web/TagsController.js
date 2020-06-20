var blogDao = require("../dao/BlogDao.js");
var tagsDao = require("../dao/TagsDao.js");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao.js");
// var timeUtil = require("../util/TimeUtil.js");
var respUtil = require("../util/RespUtil.js");
var url = require("url");

var path = new Map();

function queryRandomTags(request, response){
    tagsDao.queryAllTag(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? 1 : -1;
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
};
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response){
    let params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        } else{
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function(result){
                console.log(result);
                let blogListByTag = [];
                for(var i = 0; i < result.length; i ++){
                    blogDao.queryBlogById(result[i].blog_id, function(result){
                        blogListByTag.push(result[0]);
                    });
                }
                getResult(blogListByTag, result.length, response);
            });
        }
    });
};
path.set("/queryByTag", queryByTag);

function getResult(blogList, len, response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList, len, response);
        }, 10);
    } else {
        for(var i = 0; i < blogList.length; i ++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
};

function queryByTagCount(request, response){
    let params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(result){
        tagBlogMappingDao.queryByTagCount(result[0].id, function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        });
    });
};
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;