$('#file').on('change',function(){
    let file = this.files[0];
    let formData = new FormData();
    formData.append('image',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            console.log(response[0].image)
            $('#image').val(response[0].image);
        }
    });
});

$('#slidesForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});

$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        let html = template('slidesTpl',{data:response});
        $('#slidesBox').html(html);
    }
});
$('#slidesBox').on('click','.delete',function(){
    if(confirm('是否确认删除')){
        let id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: `/slides/${id}`,
            success: function (response) {
                location.reload();
            }
        });
    }
})