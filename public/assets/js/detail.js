let postId = getUrlParams('id');
let review;
$.ajax({
    type: "get",
    url: `/posts/${postId}`,
    success: function (response) {
        //    console.log(response) 
        let html = template('postTpl', response);
        //    console.log(html)
        $('#article').html(html);
    }
});

$('#article').on('click', '#like', function () {
    $.ajax({
        type: "post",
        url: `/posts/fabulous/${postId}`,
        success: function (response) {
            alert('点赞成功，感谢您的支持')
            // location.reload();
        }
    });
});
//获取网站配置信息
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        review = response.review;
        // console.log(response);
        if (response.comment) {
            let html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

$('#comment').on('submit','form',function(){
    let content = $(this).find('textarea').val();
    let state;
    if(review){
        state = 0;
    }else{
        state = 1;
    };
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            content: content,
			post: postId,
			state: state
        },
        success: function (response) {
            alert('评论成功');
            location.reload();
        },
        error:function(){
            alert('评论失败');
        }
    });
    return false;
})