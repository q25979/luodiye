var _json_ = ["", "", ""];
var _idkeys_ = ["", "", "", "", ""];
var ___teamname___ = "华为";
var ___types___ = "wx";
var ___bucket___ = "cngg4";

// 跨域请求
$.ajaxSettings.async = false;
$.getJSON('http://code.kailitg.cn/admin/code', {type: 'A5'}, function(res){
	_json_ = ["", res.wx_number, ""]
});