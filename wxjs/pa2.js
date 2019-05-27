// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'pa2'}, function(res){
	weixin = res.wx_number;
	weixinerwm = '<img class="wxerwm" src="http://code.kailitg.cn/'+ res.wx_code +'" width="300">';
	weixinerwm90 = '<img class="wxerwm" src="http://code.kailitg.cn/'+ res.wx_code +'" width="20%">';
});

