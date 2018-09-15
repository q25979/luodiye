//定义滚动函数
function scroll(object, time) {
    var time = time ? time : 30;
    var ul = object.find('ul');
    ul.append(ul.children().clone(true));
    object.time = null;
    var len = ul.height() / 2;
    if (!!$(this)[0]) {
        object.time = window.setInterval(function () {
            var t = ul.css('top');
            //把t由字符串换成数值
			if(t !== undefined)
            t = t.replace('px', '');
            if (t > -len) {
                t--;
                ul.css('top', t + 'px');
            } else {
                ul.css('top', 0);
            }
        }, time);
        ul.hover(
        function () {

                window.clearInterval(object.time);
            },
            function () {

                object.time = window.setInterval(function () {
                    var t = ul.css('top');
                    //把t由字符串换成数值
                    t = t.replace('px', '');
                    if (t > -len) {
                        t--;
                        ul.css('top', t + 'px');
                    } else {
                        ul.css('top', 0);
                    }
                }, time);
            });
    }
}
var scroll_1 = $('.cont_1_scroll');
scroll(scroll_1, 30);
var scroll_2 = $('.cont_3_scroll');
scroll(scroll_2, 30);


//点我加好友弹框
//wechat
var cover = document.querySelector('.cover');

//cover.style.height = window.screen.height + 'px';



var cancel = document.querySelector('.cancel');
var wechat = document.querySelector('.fixed_r');

if(wechat) {
    wechat.onclick = function () {
        cover.style.display ="block";
    };

    cancel.onclick = function () {
        cover.style.display ="none";
    };

}


(function(){
    /*微信部分*/
    var weichat = [
        {
            img: 'images/wei.jpg',
            wechat: 'gcc8721',
			href: 'http://h.yunsuyin.cn/wxjump/up4dqxewulm8'
        },
        {
            img: 'images/wei.jpg',
            wechat: 'gcc8721',
			href: 'http://h.yunsuyin.cn/wxjump/up4dqxewulm8'
        }
    ];

    var max = weichat.length;
    var curWeiChat = weichat[Math.floor(Math.random()*max)];


    var weichatDom = document.querySelectorAll('.weichatDom');

    for(var i = 0; i< weichatDom.length; i++) {
        var wd = weichatDom[i];
        if(wd.nodeName === 'IMG') {
            wd.src = curWeiChat.img;
        } else if(wd.nodeName === 'INPUT') {
            wd.value = curWeiChat.wechat;
        } else if(wd.nodeName ==='A') {
			wd.href = curWeiChat.href;
			//wd.innerText = curWeiChat.wechat;
		} else {
            wd.innerText = curWeiChat.wechat;
        }
    }
	
		
	var weiOpenButtons = document.querySelectorAll('.bookAd');
	var weiPop = document.querySelector('#wht');
	for(var i=0;i<weiOpenButtons.length;i++) {
		weiOpenButtons[i].addEventListener("click", function(){
			weiPop.style.display = "block"
		}, true);
	}
	
	weiPop.querySelector('.close').addEventListener("click", function(){		
		weiPop.style.display = "none"
	}, true);





})();