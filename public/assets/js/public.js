$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        // console.log(response)
        let randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `;
        let html = template.render(randomTpl,{data:response});
        // console.log(html)
        $('#randomBox').html(html);
        $('#listRandomBox').html(html);
    }
    
});
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}

$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        // console.log(response)
        let commentTpl = `
        {{each data}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
        {{/each}}
        `;
        let html = template.render(commentTpl,{data:response});
        // console.log(html)
        $('#commentBox').html(html);
        $('#listCommentBox').html(html)
    }
});

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let navTpl = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        let html = template.render(navTpl,{data:response});
        $('#navBox').html(html);
        $('#topNavBox').html(html);
        $('#listNavBox').html(html);
        $('#listTopNavBox').html(html);
    }
});

$('.search form').on('submit',function(){
  let keys = $(this).find('.keys').val();
  location.href = '/search.html?key='+keys;
  return false;
})