var arr_wx = ['biyiwx671']
var wx_index = Math.floor((Math.random() * arr_wx.length));
stxlwx = arr_wx[wx_index];
var wx = "<img src='2weima/"+stxlwx+".png'>";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'P3'}, function(res){
	wx = '<img src="http://code.kailitg.cn/'+res.wx_code+'" alt="" />'
	stxlwx = res.wx_number
});
