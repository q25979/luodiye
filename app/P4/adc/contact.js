
var clipboard = new ClipboardJS(".copy");

clipboard.on("success", function() {
    return goWechat();
});

// ----------------------------
// Get Contact Method
// ----------------------------

// go wechat
function goWechat() {
    window.location.href = "weixin://";
}

// ----------------------------
// Exit Message for WeChat
// ref: https://www.zhihu.com/question/40511430
// ----------------------------

// page history for display message
window.history.pushState({ }, "Page", "#");

// listen to history change event
window.addEventListener("popstate", function(e) {
    var alertMessage = confirm("您确定离开吗？这是一个千载难逢的好机会！");

    if(alertMessage === false ) {
        window.history.pushState({ }, "Page", "#");
        return false;
    }

    window.history.go(-1);
}, false);
