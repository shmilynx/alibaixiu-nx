$('#addCategories').on('submit', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload();
        }
    })
    return false;
});
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl', {
            data: response
        });
        // 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
});