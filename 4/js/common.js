// JavaScript Document

 var Arr = ['shanshan307223','chen1290304204','yingzi178445']; 
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
	
