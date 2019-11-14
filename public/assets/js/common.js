$("#logout").on('click',function(){
    var isComfirm = confirm('是否确认退出？');
    if(isComfirm){
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (response) {
                location.href = 'login.html'
            },
            error:function(){
                alert('退出失败');
            }
        });
    }
})