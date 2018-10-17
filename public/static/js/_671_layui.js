/**
 * 基于layui，jq的后台控制，简化(代码组合)
 *
 * 时间：2018-10-3 22:05:41
 */

"use strict";

var _671_layui = function() {
	this.v = "1.0.0";
};

_671_layui.fn = _671_layui.prototype;

/**
 * 元素判空
 * @param  string	element	需要判空的元素
 * @return bool		true表示为空			
 */
_671_layui.fn.is_empty = function(element) {
	if (typeof element === "string" && element.length === 0) return true;
	if (typeof element === "undefined" || typeof element === undefined
		|| isNaN(element)
		|| element === null)
		return true;

	return false;
}

/**
 * 删除数据
 * @param  string id  需要删除的数据id
 * @param  string url 后台链接地址
 * @param  string key 表的主键，默认为id
 */
_671_layui.fn.deleted = function(id, url, key) {
	var that = this;
	var confirm = layer.confirm("确认删除该数据?", function() {
		layer.close(confirm);
		if (that.is_empty(key)) key = "id";

		layer.load(2);
		$.ajax({
			type: 'post',
			url : url,
			data: { key: id },
			timeout: 3000,
			success: function(data) {
				console.log("数据请求成功:", data);
				if (data.code == 0) {
					layer.msg(data.msg, {icon: 6, time: 1200}, function() {
						window.location.reload();
					});
					return ;
				}

				layer.msg(data.msg, {icon: 5, time: 1500})
			},
			error: function(err) {
				console.log("内部服务器错误:", err);
				layer.msg("内部服务器错误,状态码：" + err.status)
			},
			complete: function() {
				layer.closeAll("loading");
			}
		});
	});
}

// 默认调用
var _671 = new _671_layui();
