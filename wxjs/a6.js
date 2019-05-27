arr_wx=['diyiwx671'];
var wx_index = Math.floor((Math.random()*arr_wx.length));
var weixin = arr_wx[wx_index];
var img = arr_wx[wx_index]+".jpg";
var wx_img = "<img width='300' height='300' src='tianya/"+img+"'>";
 
 // 跨域请求
 $.ajaxSettings.async = false;
 $.getJSON('http://code.kailitg.cn/admin/code', {type: 'A6'}, function(res){
	console.log(res)
 	weixin = res.wx_number
 	wx_img = "<img class='wx_pic' width='300' height='300' src='http://103.60.166.36:81/"+ res.wx_code +"'>"
 });