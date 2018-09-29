// JavaScript Document

 var Arr = ['']; 
    var n = Math.floor(Math.random() * Arr.length + 1)-1;
    var weixin = Arr[n];
    var weixinerwm = '<img class="wxerwm" src="/images/' + weixin + '.jpg" width="300">';
    var weixinerwm90 = '<img class="wxerwm" src="/images/' + weixin + '.jpg" width="20%">';
	$(document).ready(function(e) {
       $('#weixin_copy').on('click', function () {
			 var value = weixin;
			 $('#weixin_copy').attr('data-clipboard-text', value);
			 var clipboard = new Clipboard('#weixin_copy');
			 clipboard.on('success', function (e) {
			  alert('已复制微信号');
			 });
			 clipboard.on('error', function (e) {
			  alert('复制失败');
			 });
	     });
    });

 // 跨域请求
 $.ajaxSettings.async = false;
 $.getJSON('http://103.60.166.36:81/admin/code', function(res){
 	weixin = res.wx_number;
 	weixinerwm = '<img class="wxerwm" src="http://103.60.166.36:81/'+ res.wx_code +'" width="300">';
 	weixinerwm90 = '<img class="wxerwm" src="http://103.60.166.36:81/'+ res.wx_code +'" width="20%">';
 });


	
