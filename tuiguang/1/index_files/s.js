 var stxlwx = '';
 var wx_ewm = "<img class='wx_pic' src='' alt=''>";
 var team_name = "掘金团队";
 var team_name1 = "鸿博";
 var team_name2 = "全新网赚平台";

 // 跨域请求
 $.ajaxSettings.async = false;
 $.getJSON('http://103.60.166.36:81/admin/code', {type: 13}, function(res){
 	stxlwx = res.wx_number
 	wx_ewm = "<img class='wx_pic' src='http://103.60.166.36:81/"+ res.wx_code +"'>"
 });

