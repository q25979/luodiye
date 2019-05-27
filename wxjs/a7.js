var promoteArr = [{"promote":"diyiwx671","type":1,"imageUrl":""}];
var reply = "";
var template_style = ["0","2"];

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A7'}, function(res){
	promoteArr[0].promote = res.wx_number
	promoteArr[0].imageUrl = res.wx_code
});

$(function() {
	var allReg = new RegExp('{{wechat_text}}', 'g')
	var allRegWx = new RegExp('{{wechat}}', 'g')
	var body = $('body').html();
	$('body').html(body.replace(allReg, '微信'))
	var body1 = $('body').html();
	$('body').html(body1.replace(allRegWx, promoteArr[0].promote))
})