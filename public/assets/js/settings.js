$('#logo').on('change',function(){
    let file = this.files[0];
    let formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            console.log(response[0].logo);
           $('#hiddenLogo').val(response[0].logo); 
           $('#preview').attr('src',response[0].logo);
        }
    });
});

$('#settingsForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});

$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        $('#hiddenLogo').val(response.logo); 
        $('#preview').attr('src',response.logo);
        $('input[name="title"]').val(response.title);
        $('input[name="comment"]').prop('checked',response.comment);
        $('input[name="review"]').prop('checked',response.review);
    }
});