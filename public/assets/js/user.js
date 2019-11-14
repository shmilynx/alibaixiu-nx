$("#userForm").on('submit',function(){
    var userForm = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userForm,
        success: function (response) {
            location.reload();
        },
        error:function(){
            alert('用户添加失败')
        },
    });
    return false;
});

$("#avatar").on('change',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData:false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success: function (response) {
            console.log(response)
            // 实现头像预览功能
            $("#preview").attr('src' ,response[0].avatar);
            // 设置隐藏域，到时候点击提交的时候讲图片地址提交给服务器
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
})