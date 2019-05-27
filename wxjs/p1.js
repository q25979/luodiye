var wxArr = ['diyiwx671'];
var wx_index = Math.floor((Math.random() * wxArr.length));
var stxlwx = wxArr[wx_index];
var wx_ewm = "<img src='adc/"+stxlwx+".png' alt=''>";
var team_name = "鸿博";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'P1'}, function(res){
	wx_ewm = '<img src="http://code.kailitg.cn/'+res.wx_code+'" alt="" />'
	stxlwx = res.wx_number
});