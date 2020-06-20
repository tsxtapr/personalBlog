var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: [],
    },
    computed: {
        randomColor: function(){
            return function(){
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")";
            };
        },
        randomSize: function(){
            return function(){
                let size = (Math.random() * 20 + 12) + "px";
                return size;
            };
        },
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryRandomTags",
        }).then(function(resp){
            let result = [];
            let myResp = resp.data.data;
            for(var i = 0; i < myResp.length; i ++){
                result.push({text: myResp[i].tag, link: "/?tag=" + myResp[i].tag});
            }
            randomTags.tags = result;
        }).catch(function(resp){
            console.log("queryTags error");
        });
    },
});

var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [],
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryHotBlog",
        }).then(function(resp){
            let result = [];
            let myResp = resp.data.data;
            for(var i = 0; i < myResp.length; i ++){
                let temp = {};
                temp.title = myResp[i].title;
                temp.link = "/blog_detail.html?bid=" + myResp[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        }).catch(function(resp){
            console.log("hotBlog error");
        });
    },
});

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [],
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryNewComments",
        }).then(function(resp){
            let result = [];
            let myResp = resp.data.data;
            for(var i = 0; i < myResp.length; i ++){
                let temp = {};
                temp.name = myResp[i].user_name;
                temp.date = myResp[i].ctime;
                temp.comment = myResp[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        }).catch(function(resp){
            console.log("newComments error");
        });
    },
});