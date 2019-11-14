$("#userForm").on('submit', function () {
    let userForm = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userForm,
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        },
    });
    return false;
});

$("#modifyBox").on('change', '#avatar', function () {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response)
            // 实现头像预览功能
            $("#preview").attr('src', response[0].avatar);
            // 设置隐藏域，到时候点击提交的时候讲图片地址提交给服务器
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
});

$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        let html = template('userTpl', {
            data: response
        });
        $("#userBox").html(html);
    }
});

$("#userBox").on('click', '.edit', function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/users/${id}`,
        success: function (response) {
            // console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});

$("#modifyBox").on('submit', '#modifyForm', function () {
    let editData = $(this).serialize();
    console.log(editData)
    let id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/users/${id}`,
        data: editData,
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert('用户修改失败');
        }
    });
    return false;
})