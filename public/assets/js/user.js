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
});

$("#userBox").on('click', '.delete', function () {
    if (confirm('是否确认删除？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: `/users/${id}`,
            success: function (response) {
                location.reload();
            }
        });
    }
});
let selectAll = $('#selectAll');
let deleteMany = $('#deleteMany');
//点击全选框
selectAll.on('change', function () {
    let status = $(this).prop('checked');
    $("#userBox").find('input').prop('checked', status);
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
$("#userBox").on('change', '.userStatus', function () {
    let inputs = $("#userBox").find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    };
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
deleteMany.on('click', function () {
    let ids = [];
    let checkedUser = $("#userBox").find('input').filter(':checked');
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('是否确定批量删除')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload();
            }
        });
    }
})