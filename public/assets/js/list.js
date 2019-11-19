let categoryId = getUrlParams('categoryId');
$.ajax({
    type: "get",
    url: `/posts/category/${categoryId}`,
    success: function (response) {
        // console.log(response)
        let html = template('listTpl',{data:response});
        // console.log(html)
        $('#listBox').html(html);
    }
});
$.ajax({
    type: "get",
    url: `/categories/${categoryId}`,
    success: function (response) {
        // console.log(response)
        $('#categoryTitle').html(response.title)
    }
});