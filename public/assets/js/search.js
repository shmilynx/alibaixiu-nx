let key = getUrlParams('key');
$.ajax({
    type: "get",
    url: `/posts/search/${key}`,
    success: function (response) {
        let html = template('searchTpl',{data:response});
        $('#listBox').html(html);
    }
});