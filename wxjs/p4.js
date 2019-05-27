var wxArr = ['diyiwx671'];
var wx_index = Math.floor((Math.random() * wxArr.length));
var stxlwx = wxArr[wx_index];
var img = "";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'P4'}, function(res){
	img = '<img src="http://code.kailitg.cn/'+res.wx_code+'" alt="" />'
	stxlwx = res.wx_number
});