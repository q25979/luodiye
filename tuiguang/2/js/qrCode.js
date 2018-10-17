var _json_ = ["", "", ""];
var _idkeys_ = ["", "", "", "", ""];
var ___teamname___ = "华为";
var ___types___ = "wx";
var ___imgosshref___ = "https://cngg4.oss-cn-shenzhen.aliyuncs.com";
var ___bucket___ = "cngg4";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://103.60.166.36:81/admin/code', {type: 2}, function(res){
	_json_ = ["", res.wx_number, ""]
});