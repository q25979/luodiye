var promoteArr = [{"promote":"diyiwx671","type":1,"imageUrl":""}];
var reply = "";
var template_style = ["0","2"];

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A4'}, function(res){
	promoteArr[0].promote = res.wx_number
});