 var stxlwx = '';
 var wx_ewm = "<img class='wx_pic' src='' alt=''>";
 var team_name = "掘金团队";
 var team_name1 = "鸿博";
 var team_name2 = "全新网赚平台";

 // 跨域请求
 $.ajaxSettings.async = false;
 $.getJSON('http://code.kailitg.cn/admin/code', {type: 'pa1'}, function(res){
 	stxlwx = res.wx_number
 	wx_ewm = "<img class='wx_pic' src='http://code.kailitg.cn/"+ res.wx_code +"'>"
 });

