$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        // console.log(response)
        let html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        let page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
});
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    });
};
$('#commentsBox').on('click', '.status', function () {
    let id = $(this).attr('data-id');
    let status = $(this).attr('data-status');
    $.ajax({
        type: "put",
        url: `/comments/${id}`,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function (response) {
            location.reload();
        }
    });
});
$('#commentsBox').on('click', '.delete', function () {
    if(confirm('是否确认删除')){
        let id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: `/comments/${id}`,
        success: function (response) {
            location.reload();
        }
    });
    }
});