var stxlwx;
var wx_ewm;

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A3'}, function(res){
	wx_ewm = '<img style="width:300px" src="http://code.kailitg.cn/'+res.wx_code+'" alt="" />'
	stxlwx = res.wx_number
});