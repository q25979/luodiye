﻿ var stxlwx = '';
 var wx_ewm = "<img class='wx_pic' src='' alt=''>";
 var team_name = "掘金团队";
 var team_name1 = "鸿博";
 var team_name2 = "河北旺玺网络科技有限公司";

 // 跨域请求
 $.ajaxSettings.async = false;
 $.getJSON('http://wolunyun.com/admin/code', function(res){
 	stxlwx = res.wx_number
 	wx_ewm = "<img class='wx_pic' src='http://wolunyun.com/"+ res.wx_code +"'>"
 });


