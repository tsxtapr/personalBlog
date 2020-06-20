var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: [
            {id: "1", name: "dfadf", ctime: "5555555", comments: "dsgdgdg", options: ""},
            {id: "2", name: "sdfsadg", ctime: "566666", comments: "dsgdgdg", options: ""},
            {id: "3", name: "fdgrbh", ctime: "77777", comments: "dsgdgdg", options: ""},
        ],
    },
    computed: {
        reply: function(){
            return function(commentId, userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            };
        },
    },
    created: function(){
        let bid = -1;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid,
        }).then(function(resp){
            blogComments.comments = resp.data.data;
            for(var i = 0; i < blogComments.comments.length; i ++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        }).catch(function(resp){
            console.log("queryComments error");
        });
        axios({
            method: "get",
            url: "/qureyCommentsCountByBlogId?bid=" + bid,
        }).then(function(resp){
            // console.log(resp);
            blogComments.total = resp.data.data[0].count;
        }).catch(function(resp){
            console.log("qureyCommentscount error");
        });
    },
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: "",
    },
    computed: {
        changeCode: function(){
            return function(){
                axios({
                    method: "get",
                    url: "/queryRandomCode",
                }).then(function (resp) {
                    // console.log(resp);
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                }).catch(function (resp) {
                    console.log("randomCode error");
                });
            };
        },
        sendComment: function(){
            return function(){
                let code = document.getElementById("comment_code").value;
                if(code != sendComment.rightCode){
                    alert("code error");
                    return ;
                }
                let bid = -1;
                let reply = document.getElementById("comment_reply").value;
                let replyName = document.getElementById("comment_reply_name").value;
                let name = document.getElementById("comment_name").value;
                let email = document.getElementById("comment_email").value;
                let content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName,
                }).then(function(resp){
                    alert(resp.data.msg);
                }).catch(function(resp){
                    console.log("comment error");
                });
            };
        },
    },
    created: function () {
        this.changeCode();
    },
});