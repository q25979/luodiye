var stxlwx;

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A9'}, function(res){
	stxlwx = res.wx_number
});