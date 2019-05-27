arr_wx=[""];
var wx_index = Math.floor((Math.random()*arr_wx.length));//,''
var stxlwx = arr_wx[wx_index];
var img =  arr_wx[wx_index]

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'P2'}, function(res){
	wxh_img = "http://code.kailitg.cn/"+res.wx_code
	stxlwx = res.wx_number
});