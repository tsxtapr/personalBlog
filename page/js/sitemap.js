var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: [],
    },
    computed: {

    },
    created: function(){
        axios({
            method: "get",
            url: "/queryAllBlog",
        }).then(function(resp){
            let myResp = resp.data.data;
            for(var i = 0; i < myResp.length; i ++){
                myResp[i].link = "/blog_detail.html?bid=" + myResp[i].id;
            }
            blogList.blogList = myResp;
        }).catch(function(resp){
            console.log("queryBlogId error");
        });
    },
});