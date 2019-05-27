var stxlwx;
var img;

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A11'}, function(res){
	stxlwx = res.wx_number
	img = "http://code.kailitg.cn/" + res.wx_code
});