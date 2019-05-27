var wxArr = ['diyiwx671']
var wx_index = Math.floor((Math.random() * wxArr.length));
var stxlwx = wxArr[wx_index];
var wx = "<img src='wx/"+stxlwx+".jpg' alt=''>";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A8'}, function(res){
	wx = '<img style="width:300px" src="http://code.kailitg.cn/'+res.wx_code+'" alt="" />'
	stxlwx = res.wx_number
});