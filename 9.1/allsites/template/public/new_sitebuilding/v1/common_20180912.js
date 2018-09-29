/**
 * Created by huamengyu on 2018/9/12.
 */

(function(){
    function CommonObject () {
        var self = this;
        this.ua = navigator.userAgent;
        this.verifyCodeTimer = 0;
        this.coinErrorAnswerData = ['朝暮调情','沉梦听雨','冰依佳人','靳言深歆','散落在回忆里','甜心柠檬','流年飞漫天','最美的时光','幽姿花似雪',
            '蓝色海洋','紫色真话','最美长恨歌','离心掌门人','几行情书','温柔的眉眼','纯真的爱情','演绎余生','漂亮善良','倾听花开','彩色天空'];
        this.traceData = [
            {"traceClass":'trigger-promote',"traceClick": 'click',"traceActive": 'active5',"traceDesc": '去微信'},
            {"traceClass":'trigger-promote-active3',"traceClick": 'click',"traceActive": 'active3',"traceDesc": '去链接'},
            {"traceClass":'trigger-promote-active4',"traceClick": 'click',"traceActive": 'active4',"traceDesc": '打电话'},
            {"traceClass":'landing-page-download',"traceClick": 'click',"traceActive": 'active1',"traceDesc": '注册下载'},
            {"traceClass":'trigger-promote-active7',"traceClick": 'click',"traceActive": 'active7',"traceDesc": '反作弊滑块'},
            {"traceClass":'trigger-promote-active2',"traceClick": 'click',"traceActive": 'active2',"traceDesc": '表单提交'},
            {"traceClass":'trigger-promote-active6',"traceClick": 'click',"traceActive": 'active6',"traceDesc": '反作弊滑块验证失败'}
        ];
        this.landingPageSiteConfing = document.getElementById('landingPageSiteConfing');//配置项
        this.landingPagePromoteModule = document.getElementById('landingPagePromoteModule');//加粉
        this.landingPageDownloadModule  = document.getElementById('landingPageDownloadModule');//下载
        this.landingPageFormModule  = document.getElementById('landingPageFormModule');//表单
        this.landingPageTelModule  = document.getElementById('landingPageTelModule');//电话
        this.landingPageWechatModule  = document.getElementById('landingPageWechatModule');//填写链接跳转
        this.landingPageBaseTemplateModule  = document.getElementById('landingPageBaseTemplateModule');//行业分类，用于返回键劫持的
        this.landingPageSlidingBlockModule = document.querySelector('#landingPageSlidingBlockModule');//反作弊滑块
        this.landingPageSiteBuildingId = document.querySelector('#landingPageSiteBuildingId');//建站id
        if(self.landingPageSlidingBlockModule){
            var dataActive7 = {className:'trigger-promote-active7',innerHTML:0};
            self.createActiveDom(dataActive7);
            var dataActive6 = {className:'trigger-promote-active6',innerHTML:0};
            self.createActiveDom(dataActive6);
        }
        self.styleControl();
        if(self.landingPageBaseTemplateModule && self.landingPagePromoteModule){
            self.backTruncation();
        }

        if(self.landingPageSiteConfing){
            var data = self.landingPageSiteConfing.innerText;
            try{
                data = JSON.parse(data);
                if(data && ('hasCarousel' in data) && data['hasCarousel']){
                    self.callSwiper(data);
                }
                if(data && ('hasTimeCountDown' in data) && data['hasTimeCountDown']){
                    self.callTimeCountDown();
                }

                if(data && ('addCoins' in data) && data['addCoins']){
                    self.callAddCoins();
                    var member_id = self.getQueryString('iclimemberid');
                    if(member_id){
                        window.cpcJs = {};
                        window.cpcJs.backClient = function() {
                            self.showQuestionDialog();
                        }
                    }
                }
            }catch(e){}
        }
        if(self.landingPagePromoteModule){
            var promoteArr = self.landingPagePromoteModule.innerText;
            try{
                promoteArr = JSON.parse(promoteArr);
                if(promoteArr && promoteArr.length){
                    self.renderPromoteModule(promoteArr);
                }
            }catch(e){}
        }
        if(self.landingPageFormModule){
            var formList = self.landingPageFormModule.innerText;
            var dataActive2 = {className:'trigger-promote-active2',innerHTML:0};
            self.createActiveDom(dataActive2);
            try{
                formList = JSON.parse(formList);
                if(formList && formList.length){
                    self.renderFormModule(formList);
                }
            }catch(e){}
        }else{
            var componentForm = document.querySelectorAll('.component-form');
            if(componentForm && componentForm.length){
                for(var i=0;i<componentForm.length;i++){
                    componentForm[i].innerHTML = "";
                }
            }
        }
        if(self.landingPageDownloadModule){
            var data = self.landingPageDownloadModule.innerText;
            try{
                data = JSON.parse(data);
                if(data && ('android' in data || 'ios' in data)){
                    self.renderDownloadModule(data);
                }
            }catch(e){}
        }
        if(self.landingPageTelModule){
            var data = self.landingPageTelModule.innerText;
            if(document.getElementsByClassName('component-tel').length){
                self.createTelBannerModule(data);
            }else{
                self.createTFTelModule(data);
            }
        }
        if(self.landingPageWechatModule){
            self.goToUrlModule();
        }
        self.renderTrace(self.traceData);
        self.renderBusinessMealModule();
    }
    CommonObject.prototype.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    CommonObject.prototype.updateCopy = function (str){
        function getTargetInput() {
            var dom = document.createElement('input');
            dom.style.opacity = '0';
            dom.style.position = 'absolute';
            dom.style.fontSize = '12pt';
            dom.style.top = '-9999px';
            dom.style.left = '-9999px';
            document.body.appendChild(dom);
            return dom;
        }
        function copy(str) {
            var inputText = getTargetInput();
            inputText.setAttribute('readonly','');
            inputText.value = str;
            inputText.select();
            inputText.setSelectionRange(0, inputText.value.length);
            var result = document.execCommand('copy');
            document.body.removeChild(inputText);
            return result;
        }
        return copy(str);
    };
    CommonObject.prototype.styleControl = function(){
        var componentDownloadBanner = document.querySelectorAll('.component-download-banner');
        for(var i=0;i<componentDownloadBanner.length;i++){
            if(componentDownloadBanner[i].style.top == 'auto'){
                componentDownloadBanner[i].style.bottom = 0;
                document.body.style.paddingTop = 0;
            }else if(componentDownloadBanner[i].style.bottom == 'auto'){
                document.body.style.paddingTop = componentDownloadBanner[i].offsetHeight;
                componentDownloadBanner[i].style.top = 0;
            }
        }
        var customBtnComponent = document.querySelectorAll('.custom-btn-component');
        for(var j=0;j<customBtnComponent.length;j++){
            var btnParentNode = customBtnComponent[j].parentNode;
            if(btnParentNode.getAttribute('isfloat') == '2' || btnParentNode.getAttribute('isfloat') == '3'){
                if(btnParentNode.style.top == 'auto'){
                    btnParentNode.style.bottom = 0;
                }else if(btnParentNode.style.bottom == 'auto'){
                    btnParentNode.style.top = 0;
                }
                btnParentNode.style.left=0;
            }
        }
    };
    CommonObject.prototype.createActiveDom = function(option){
        var self = this;
        var element = document.body;
        var oDiv = document.createElement('div');
        oDiv.innerHTML = option.innerHTML;
        oDiv.className = option.className;
        oDiv.style.opacity = 0;
        oDiv.style.position = 'fixed';
        oDiv.style.zIndex = '-9999';
        oDiv.style.display = 'none';
        element.appendChild(oDiv);
    };
    CommonObject.prototype.createAddCoinDom = function(inner){
        var element = document.body;
        var oDiv = document.createElement('div');
        oDiv.innerHTML = '<div class="add-coin-title">添加成功</div><div class="add-coin-body">+'+inner+'</div>';
        oDiv.className = 'add-coin-box';
        element.appendChild(oDiv);
        var addCOinBox = document.querySelector('.add-coin-box');
        addCOinBox.style.display = 'block';
        setTimeout(function(){
            addCOinBox.style.display = 'none';
        },2000);
    };
    CommonObject.prototype.getAjaxCoin = function(coin,callback){
        var self = this;
        var host = 'http://api-ga.aiclk.com/motivateapp/mtvcallback/v2';
        // var host = 'http://192.168.66.11:9898/motivateapp/mtvcallback/v2';
        var member_id = self.getQueryString('iclimemberid');
        var search_id = self.getQueryString('iclicashsid');
        if(!member_id || !search_id){
            callback && callback();
            return false
        }
        try{
            var strLen = 4 - member_id.length%4;
            if(strLen == 4){
                strLen = 0;
            }
            for(var i=0;i<strLen;i++){
                member_id += '=';
            }
            member_id = $.base64.decode(member_id);
            var landingPageSiteBuildingId = document.querySelector('#landingPageSiteBuildingId');
            var resource_id = Number(landingPageSiteBuildingId.innerText);
            var data = {
                "member_id":member_id,
                "coin": parseInt(coin, 10),
                "search_id":search_id,
                "resource_type":1,
                "resource_id":resource_id,
                "module_id":2,
                "sign":"6435c61a1da39318f594688d30c34189"
            };
            if(callback){
                data.coin = 50;
                data.module_id = 1;
            }
            var sign = '';
            for(var i in data){
                sign+=data[i];
            }
            data.sign = md5(sign);
            var b = $.base64.encode(JSON.stringify(data));
            var url = host + '?' + b;
            jQuery.support.cors = true;
            $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                url:url,
                success:function(result){
                    result = JSON.parse(result);
                    if(result.code == 1){
                        self.createAddCoinDom(coin);
                    }
                    if(result.code != 1 && !callback){
                        var alertDialogSs = document.getElementById('alertDialogSs');
                        alertDialogSs.innerHTML = result.message;
                        alertDialogSs.style.display = 'block';
                        setTimeout(function(){
                            alertDialogSs.style.display = 'none';
                        },2000);
                    }
                    setTimeout(function(){
                        callback && callback();
                    },1000)
                }
            })
        }catch(e){
            callback && callback();
        }
    };
    CommonObject.prototype.sildingBlockModule = function(resSuccess){
        var self = this;
        var getTime = new Date().getTime();
        var random = Math.floor(Math.random()*10000);
        var userId = getTime + random;
        var coin = parseInt(Math.random()*(100-50+1)+50,10);
        var subTitle = '验证通过，+'+coin+'金币！';
        var data = {
            cid:'cpctest',
            // isTest:true,
            userId:userId,  // 如果有的话
            // custom:{ qid:123 },
            onresult:function(result){
                if(result){
                    if(document.querySelectorAll('.trigger-promote-active7')[0]){
                        document.querySelectorAll('.trigger-promote-active7')[0].click();
                    }
                    self.getAjaxCoin(coin,function(){
                        resSuccess && resSuccess();
                    })
                }
            },
            ontest:function(result){
                if(!result){
                    if(document.querySelectorAll('.trigger-promote-active6')[0]){
                        document.querySelectorAll('.trigger-promote-active6')[0].click();
                    }
                }
            }
        };
        if(subTitle){
            data.title = subTitle;
        }
        var recaptcha = _INNOTECHANTISPAM_.recaptchaDialog(data);
        var antispamDialogTitle = document.querySelector('.antispam_dialog_title');
        if(antispamDialogTitle){
            antispamDialogTitle.style.color = 'red';
        };
        var antispamIconPoint = document.querySelector('.antispam_icon_point');
        if(antispamIconPoint){
            antispamIconPoint.style.height = '40px';
            antispamIconPoint.style.width = '40px';
            antispamIconPoint.style.backgroundImage = 'url("/allsites/template/public/new_sitebuilding/image/icon_add _coin.png")'
        }
    };
    CommonObject.prototype.callSwiper = function(){
        window.addEventListener('load',function(){
            new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                initialSlide: 1,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true
                }
            });
        });
    };
    CommonObject.prototype.callTimeCountDown = function(){
        clearInterval(parseInt(sessionStorage.getItem('timerInterval'), 10));
        var wrapNode = document.getElementsByClassName('custom-online-component')[0].getElementsByClassName('count-down-wrap')[0].lastChild;
        if(!Boolean(sessionStorage.getItem('thisTime'))){
            sessionStorage.setItem('thisTime', wrapNode.innerText);
        }else{
            if(sessionStorage.getItem('thisTime') == '00:00:00:00'){
                wrapNode.innerHTML = '<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>';
                return;
            }else{
                wrapNode.innerHTML = '<span></span>:<span></span>:<span></span>:<span></span>';
            }
        }
        var businessTimer = setInterval(function () {
            sessionStorage.setItem('timerInterval', businessTimer);
            var timeArr = sessionStorage.getItem('thisTime').split(/\:|\：/),
                second = 0, i = 0;
            if (timeArr.length == 4) {
                second += parseInt(timeArr[0], 10) * 24 * 3600;
                i = 1;
            }
            second += parseInt(timeArr[i], 10) * 3600 + parseInt(timeArr[++i], 10) * 60 + parseInt(timeArr[++i], 10) - 1;
            if (second >= 0) {
                var s = second % 60; //s
                s = (s < 10 ? '0' + s : s);
                second = (second - s) / 60;
                var m = second % 60; //min
                m = (m < 10 ? '0' + m : m);
                second = (second - m) / 60;
                var h = second % 24; //hour
                h = (h < 10 ? '0' + h : h);
                var d = (second - h) / 24;//day
                d = (d < 10 ? '0' + d : d);
                document.getElementsByClassName('custom-online-component')[0].getElementsByClassName('count-down-wrap')[0].lastChild.innerHTML = '<span>' + d + '</span>:<span>' + h + '</span>:<span>' + m + '</span>:<span>' + s + '</span>';
                sessionStorage.setItem('thisTime', d + ':' + h + ':' + m + ':' + s);
            } else {
                clearInterval(businessTimer);
            }
        }, 1000);
    };
    CommonObject.prototype.callAddCoins = function(){
        var bannerWrapEle = document.getElementsByClassName('component-banner')[0],
            coinEle = document.createElement('span');
        bannerWrapEle.className += ' component-coin-banner';
        var bannerInner = bannerWrapEle.getElementsByClassName('banner-inner')[0],
            bannerButton = bannerWrapEle.getElementsByClassName('banner-button')[0];
        bannerInner.style.background = "url('/allsites/template/public/new_sitebuilding/image/pic-coinbanner-bg.png') no-repeat center";
        bannerButton.innerHTML = '+' + parseInt(Math.random()*(200-100+1)+100,10) + '金币';
        bannerButton.style.background = "url(/allsites/template/public/new_sitebuilding/image/pic-coinbanner-btn.png) no-repeat center";
        coinEle.className = 'banner-coins';
        coinEle.innerHTML = '添加微信';
        bannerInner.insertBefore(coinEle, bannerButton);
    };
    CommonObject.prototype.showQuestionDialog = function() {
        var self = this;
        var coinDialogNode = document.getElementsByClassName('coin-dialog-wrap');
        if(coinDialogNode.length){
            return;
        }else{
            var coinQuestionDialogEle = document.createElement('div'),
                coinContentWrapEle = document.createElement('div'),
                coinTitleEle = document.createElement('p'),
                coinQuestionWrapEle = document.createElement('div'),
                coinQuestionEle = document.createElement('div'),
                coinAnswerWrapEle = document.createElement('ul'),
                coinConfirmBtnEle = document.createElement('div');
            coinQuestionDialogEle.className = 'coin-dialog-wrap';
            coinContentWrapEle.className = 'coin-content-wrap';
            coinTitleEle.className = 'coin-dialog-title';
            coinTitleEle.innerHTML = '领' + document.getElementsByClassName('banner-button')[0].innerText.split('+')[1] + '啦';
            coinQuestionWrapEle.className = 'coin-question-wrap';
            coinQuestionEle.className = 'coin-question-title';
            coinQuestionEle.innerHTML = '您搜索的微信昵称是？';
            coinAnswerWrapEle.className = 'coin-answer-wrap';
            coinConfirmBtnEle.className = 'coin-confirm-btn';
            coinConfirmBtnEle.innerHTML = '完成';
            coinQuestionWrapEle.appendChild(coinQuestionEle);
            coinQuestionWrapEle.appendChild(coinAnswerWrapEle);
            coinContentWrapEle.appendChild(coinTitleEle);
            coinContentWrapEle.appendChild(coinQuestionWrapEle);
            coinContentWrapEle.appendChild(coinConfirmBtnEle);
            coinQuestionDialogEle.appendChild(coinContentWrapEle);
            document.body.appendChild(coinQuestionDialogEle);

            document.querySelector('.coin-answer-wrap').addEventListener('click',function(e){
                var target = e.target;
                document.querySelector('.coin-confirm-btn').classList.add('active');
                if(!(target.classList.contains('chosen') == true)){
                    for(var j=0;j<this.childNodes.length;j++){
                        this.childNodes[j].getElementsByTagName('span')[0].classList.remove('chosen');
                    }
                    target.classList.add('chosen');
                }
            });

            document.querySelector('.coin-confirm-btn').addEventListener('click',function(){
                var chosen = document.querySelector('.coin-answer-wrap').querySelectorAll('.chosen')[0];
                if(!chosen){
                    return;
                }
                if(chosen.innerText == document.querySelector('#landingPageAnswer').innerText){
                    document.getElementById('triggerActive9Trace').click();
                    self.getAjaxCoin(document.getElementsByClassName('banner-button')[0].innerText.split('+')[1].split('金币')[0]);
                }else{
                    var alertDialogSs = document.getElementById('alertDialogSs');
                    alertDialogSs.innerHTML = '验证失败';
                    alertDialogSs.style.display = 'block';
                    setTimeout(function(){
                        alertDialogSs.style.display = 'none';
                    },2000);
                }
                document.querySelectorAll('.coin-dialog-wrap')[0].style.display = 'none';
                document.querySelectorAll('.coin-confirm-btn')[0].classList.remove('active');
            })
        }
        function getAnswerData() {
            var customAnswerData = self.coinErrorAnswerData,
                shuffled = customAnswerData.slice(0),
                len = customAnswerData.length,
                min = len - 3, temp, index;

            while (len-- > min) {
                index = Math.floor((len + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[len];
                shuffled[len] = temp;
            }
            var formatListData = shuffled.slice(min),
                trueAnswer = document.querySelector('#landingPageAnswer').innerText;
            for(var i=0;i<3;i++){
                if(formatListData[i] === trueAnswer){
                    formatListData.splice(i,1,shuffled[0]);
                }
            }
            formatListData.push(trueAnswer);
            function randomsort(a, b) {
                return Math.random()>.5 ? -1 : 1;
            }
            return formatListData.sort(randomsort);
        };
        var answerListData = getAnswerData(),
            answerHtml = '';
        for(var i = 0; i < 4; i++){
            answerHtml += ('<li class="answer-item"><i>' + (i + 1) + '、</i><span>' + answerListData[i] + '</span>' + '</li>');
        }
        document.querySelector('.coin-answer-wrap').innerHTML = answerHtml;

        function renderTraceActive9(){
            window._iclicash = window._iclicash || [];
            var traceBtnEle = document.getElementById('triggerActive9Trace');
            if(!traceBtnEle){
                traceBtnEle = document.createElement('span');
                traceBtnEle.id = 'triggerActive9Trace';
                document.body.appendChild(traceBtnEle);
                window._iclicash.push([traceBtnEle, 'click', 'active10','加金币']);
            }
        };
        renderTraceActive9();
    };
    CommonObject.prototype.renderTrace = function(data){
        for(var k=0; k< data.length;k++){
            var l = document.getElementsByClassName(data[k]["traceClass"]).length;
            window._iclicash = window._iclicash || [];
            var btn;
            for(var i=0;i<l;i++){
                btn =document.getElementsByClassName(data[k]["traceClass"])[i];
                window._iclicash.push([btn, data[k]["traceClick"], data[k]["traceActive"],data[k]["traceDesc"]]);
            }
        }
    };
    //填写链接跳转
    CommonObject.prototype.goToUrlModule = function(){
        var self = this;
        var customInputUrl = self.landingPageWechatModule;
        if(customInputUrl && customInputUrl.innerText){
            var wx_url = customInputUrl.innerText;
            var g = document.getElementsByClassName('trigger-promote-active3').length;
            for (var i = 0; i < g; i++) {
                document.getElementsByClassName('trigger-promote-active3')[i].addEventListener('click', function() {
                    setTimeout(function() {
                        location.href = wx_url;
                    }, 1000);
                })
            }
        }
    };
    //加粉模块
    CommonObject.prototype.renderPromoteModule = function(promoteArr) {
        var self = this;
        var ua = self.ua;
        var index = Math.floor(Math.random()*promoteArr.length);
        var query = promoteArr[index];
        var wxid = query.promote;
        var answerNode = document.querySelector('#landingPageAnswer');
        answerNode && (answerNode.innerText = query.name);
        var imageUrl = query.imageUrl;
        var wx_text,wx_url,targetUrl,wx_logo;
        function callTraceWechatCheck(query){
            try{
                var url = window.location.href;
                var urlSearch = url.split('allsites/')[1].split('/');
                var userId = urlSearch[0];
                var siteIdMd5 = urlSearch[1];
                var wechatCheck = {
                    userId:userId,
                    siteIdMd5:siteIdMd5,
                    wechatPromote:query['promote']
                }
                wechatCheck = JSON.stringify(wechatCheck);
                window._iclicash = window._iclicash || [];
                var oSpan = document.createElement('span');
                oSpan.id = 'wechatCheck';
                oSpan.style.display = 'none';
                document.body.appendChild(oSpan);
                window._iclicash.push([oSpan, 'click', 'wechatCheck',wechatCheck]);
                document.querySelector('#wechatCheck').click();
            }catch(e){}
        }
        callTraceWechatCheck(query);
        if(query.type == 1){
            wx_text = '微信';
            wx_url = 'weixin://';
            wx_logo = "/allsites/template/public/new_sitebuilding/image/wx.gif";
        }else if(query.type == 0){
            wx_text = 'QQ';
            if(ua.indexOf("Android") > -1 || ua.indexOf("Linux") >-1){
                wx_url = 'mqqwpa://im/chat?chat_type=wpa&uin='+wxid+'&version=1&src_type=web';
            }else{
                wx_url = 'mqq://';
            }
            wx_logo = "/allsites/template/public/new_sitebuilding/image/qq.png";
        }else if(query.type == 3){
            wx_text = 'QQ群';
            wx_url = query.qrcodeUrl;
            wx_logo = "/allsites/template/public/new_sitebuilding/image/qq.png";
        }
        if(document.getElementsByClassName('banner-inner-icon')[0]){
            document.getElementsByClassName('banner-inner-icon')[0].querySelector('img').src = wx_logo;
        }
        if(document.getElementsByClassName('component-float-button')[0]){
            document.getElementsByClassName('component-float-button')[0].querySelector('img').src = wx_logo;
        }
        imageUrl = imageUrl ? '<img class="landing-page-qrcode" style="width:150px;height:150px;" src="'+imageUrl+'"/>' : "";
        var template_content = document.getElementsByTagName('body')[0].innerHTML;
        template_content = template_content.replace(/{{wechat}}/g,wxid);
        template_content = template_content.replace(/{{二维码}}/g,imageUrl);
        document.getElementsByTagName('body')[0].innerHTML = template_content.replace(/{{wechat_text}}/g,wx_text);
        window.iosClipboardFlag = false;
        function checkiOSClipboard(wxid,responseFunc){
            function setupWebViewJavascriptBridge(callback) {
                //第一次调用这个方法的时候，为false
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                //第一次调用的时候，为false
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                //把callback对象赋值给对象
                window.WVJBCallbacks = [callback];
                //加载WebViewJavascriptBridge_JS中的代码
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            }
            //驱动所有hander的初始化
            setupWebViewJavascriptBridge(function(bridge) {

                // 调用iOS端口方法
                bridge.callHandler('testObjcCallback', {'foo': wxid}, function(response) {
                    //iOS端口返回值
                    var info;
                    var alertDialogSs = document.getElementById('alertDialogSs');
                    if(response){
                        info = "复制成功";
                    }else{
                        info = "复制失败,请手动复制";
                    }
                    alertDialogSs.innerHTML = info;
                    alertDialogSs.style.display = 'block';
                    setTimeout(function(){
                        alertDialogSs.style.display = 'none';
                    },2000);
                    window.iosClipboardFlag = response;
                    responseFunc(wxid);
                });

            });
        }
        goWechat();
        function goWechat(){
            var g = document.getElementsByClassName('trigger-promote').length;
            for(var i =0;i<g;i++){
                document.getElementsByClassName('trigger-promote')[i].addEventListener('click',function(){
                    var newuser = self.getQueryString('newuser');
                    if(self.landingPageSlidingBlockModule && newuser){
                        window.updateCopyFlag = self.updateCopy(wxid);
                        self.sildingBlockModule(resSuccess);
                    }else{
                        resSuccess();
                    }
                });
            }
        };
        function resSuccess(){
            if(ua.indexOf('qukan')!=-1){
                location.href = 'tools?target=clipboard&value=' + wxid;
                setTimeout(function() {
                    location.href = wx_url;
                }, 1000);
            }else if(ua.indexOf('iOS_DH_CPC_OICLK') > -1){
                checkiOSClipboard(wxid,function(){
                    setTimeout(function() {
                        location.href = wx_url;
                    }, 1000);
                });
            }else{
                if(window.updateCopyFlag){
                    goTarget(window.updateCopyFlag,wx_text,wx_url);
                }else{
                    var result = self.updateCopy(wxid);
                    goTarget(result,wx_text,wx_url);
                }
            }
        };
        function goTarget(r,s,u){
            self.updateCopyInfo(r,s);
            if(r){
                setTimeout(function() {
                    location.href = u;
                }, 1000);
            }
        }
    };
    CommonObject.prototype.updateCopyInfo = function(r,s){
        var self = this,
            info = "";
        var alertDialogSs = document.getElementById('alertDialogSs');
        if(r){
            if(document.getElementsByClassName('component-coin-banner').length){
                self.addCoinDialogTip();
                return;
            }
            info = "复制成功";
        }else{
            info = "复制失败,请手动复制"+s+"号码";
        }
        alertDialogSs.innerHTML = info;
        alertDialogSs.style.display = 'block';
        setTimeout(function(){
            alertDialogSs.style.display = 'none';
        },2000);
    };
    CommonObject.prototype.addCoinDialogTip = function(){
        var coinDialogNodes = document.getElementsByClassName('addcoin-dialog-wrap')[0];
        if(Boolean(coinDialogNodes)){
            coinDialogNodes.style.display = 'block';
        }else{
            var coinDialogNodes = document.createElement('div'),
                dialogContentEle = document.createElement('div'),
                noticeEle = document.createElement('p'),
                successTipEle = document.createElement('p');
            coinDialogNodes.className = 'addcoin-dialog-wrap';
            dialogContentEle.className = 'addcoin-content';
            noticeEle.className = 'addcoin-notice';
            noticeEle.innerHTML = '添加微信后返回趣头条，回答问题即可领取金币！';
            successTipEle.className = 'addcoin-successtip';
            successTipEle.innerHTML = '微信号已复制成功';
            dialogContentEle.appendChild(noticeEle);
            dialogContentEle.appendChild(successTipEle);
            coinDialogNodes.appendChild(dialogContentEle);
            document.body.appendChild(coinDialogNodes);
        }
        setTimeout(function(){
            coinDialogNodes.style.display = 'none';
        }, 2000);
    };
    //拨打电话转化方式
    CommonObject.prototype.createTelBannerModule = function(tel){
        if(!!tel){
            document.getElementsByClassName('component-tel')[0].innerHTML = '';
            var div = document.createElement('div');
            div.className = 'trigger-promote-active4';
            div.style.width = '100%';
            div.style.height = '60px';
            div.style.backgroundImage = 'url(/allsites/template/public/tel-bg.png)';
            div.style.backgroundSize = '100%';
            div.style.backgroundRepeat = 'no-repeat';
            var a = document.createElement('a');
            a.style.color = '#fff';
            a.style.display = 'block';
            a.style.lineHeight = '60px';
            a.style.textAlign = 'center';
            a.innerHTML = '拨打电话：'+tel;
            a.setAttribute('href','tel:'+tel);
            div.appendChild(a);
            document.getElementsByClassName('component-tel')[0].appendChild(div);
        }
    };
    //电话+表单组件拨打电话转化方式
    CommonObject.prototype.createTFTelModule = function(tel){
        if(!!tel){
            var tfTelNode = document.getElementsByClassName('tf-tel')[0];
            tfTelNode && tfTelNode.setAttribute('href','tel:' + tel);
        }
    };
    CommonObject.prototype.renderDownloadModule = function(data){
        var self = this;
        var autoDownload = false;
        var btn = document.getElementsByClassName('landing-page-download');
        if(self.ua.indexOf("Android") > -1 || self.ua.indexOf("Linux") >-1){
            var downloadUrl = data.android;
        }else{
            var downloadUrl = data.ios;
        }
        if(downloadUrl.indexOf('//') == 0){
            downloadUrl = 'http:'+downloadUrl;
        }else if(!(downloadUrl.indexOf('http') > -1 && downloadUrl.indexOf('http') == 0)){
            downloadUrl = 'http://'+downloadUrl;
        }
        if(btn && btn.length){
            for(var i=0; i<btn.length;i++){
                btn[i].addEventListener('click',function(){
                    setTimeout(function() {
                        location.href = downloadUrl;
                    }, 1000);
                });
                if(btn[i].getAttribute('enabledownload') == 1){
                    autoDownload = true;
                }
            }
            if(autoDownload){
                setTimeout(function(){
                    location.href = downloadUrl;
                },5000);
            }
        }
    };
    CommonObject.prototype.backTruncation = function(){
        var self = this;
        var industryCategoryStyle = self.landingPageBaseTemplateModule;
        var styleIndex = 1;
        var subTitle = '导师一对一交流资格';
        // var textList = ['领取新用户大礼包','日入万元不是梦'];
        // var index = Math.floor(Math.random()*textList.length);
        var textTitle = '';
        if(industryCategoryStyle && industryCategoryStyle.innerText){
            var n = industryCategoryStyle.innerText;
            switch(n)
            {
                case 'onlineTemplate':
                    styleIndex = 1;
                    // textTitle = textList[index];
                    break;
                case 'financeTemplate':
                    styleIndex = 2;
                    break;
                case 'fatTemplate':
                    styleIndex = 3;
                    break;
                case 'novelTemplate':
                    styleIndex = 4;
                    subTitle = '阅读后续精彩内容';
                    break;
                case 'healthTemplate':
                    styleIndex = 5;
                    break;
                default:
                    styleIndex = 1;
            }
        }
        var tmplStr = '<div id="backTruncationDialog" class="backTruncationDialog">'+
            '<div class="back-truncationD-content-wrap back-bg-style-'+styleIndex+'">'+
            '<div class="truncationD-wx-area">'+
            '<p class="truncationD-wx-num">{{wechat}}</p>'+
            '<p class="truncationD-sub-title">'+ subTitle +'</p></div>'+
            '<button class="truncationD-wx-button trigger-promote" type="button">点击添加{{wechat_text}}</button>'+
            '<p class="truncationD-footer-text">'+textTitle+'</p>'+
            '<span class="truncationD-closeBtn"></span></div>'+
            '</div>';
        var divNode = document.createElement('div');
        divNode.innerHTML = tmplStr;
        document.body.appendChild(divNode);
        var t = location.href;
        if(t.indexOf('back=1')>0){
            document.getElementsByClassName('backTruncationDialog')[0].style.display="block";
        };

        document.body.addEventListener( 'click',function(e){
            var target = e.target;
            if(e.target.className==='truncationD-closeBtn'){
                document.getElementById('backTruncationDialog').style.display="none";
            }
        }, false);

        var androidVersion;

        function os() {
            var userAgent = navigator.userAgent;
            var index = userAgent.indexOf("Android");
            if (index >= 0) {
                androidVersion = parseFloat(userAgent.slice(index + 8));
                if (androidVersion >= 5.0) return true;
                else return false
            } else {
                return true
            }
        };
        if(os()){
            if(navigator.userAgent.indexOf('qukan') > -1 || navigator.userAgent.indexOf('clicash_android') > -1 || navigator.userAgent.indexOf('iOS_DH_CPC_OICLK') > -1) {
                // return true;
            } else {
                return false;
            }

            if (!history.state) {

                var intercetpUrl = t + '&back=1'
                history.replaceState({
                    page: "intercept",
                    entered: !1
                }, "", intercetpUrl), history.pushState({
                    page: "current"
                }, "", t)
            }
            window.onpopstate = function() {
                history.state && "intercept" == history.state.page && (history.state.entered || (history.replaceState({
                    page: "intercept",
                    entered: !0
                }, "", intercetpUrl)));
                location.reload()
            }
        }
    };
    CommonObject.prototype.renderFormModule = function(formList){
        var self = this;
        var style_index = formList[2] || 4;
        var html = '<div class="insert-form-content form_style_'+style_index+'">';
        $.each(formList[0],function(key,value){
            var sel = key == "address" ? '<select class="insert-form-province"></select><select class="insert-form-city" style="display: none;"></select>' : "";
            html+= '<div class="insert-form-list">'+
                '<span class="insert-form-title">'+value+'</span>'+sel+
                '<div class="insert-form-item template-insert-'+key+'">'+
                '<input name="'+key+'" id="form-'+key+'" type="text" value="" placeholder="请输入'+value+'"/>'+
                '</div>'+
                '</div>';
            if(key == "telephone"){
                html+= '<div class="insert-form-list">'+
                    '<span class="insert-form-title">验证码</span>'+
                    '<div class="insert-form-item template-insert-msg">'+
                    '<input class="form-msg-val" name="msg" id="form-msg" type="text" value="" placeholder="请输入验证码" maxlength="6"/>'+
                    '<span class="form-msg-verification-btn">发送</span>'+
                    '</div>'+
                    '</div>';
            }
        });
        html+='<div class="insert-form-list">'+
            '<button id="landingPageSave" style="margin-left: 50px;padding: 5px 10px;" class="btn btn-warning">提交</button>'+
            // '<button id="landingPageCancel" style="margin-left: 50px;padding: 5px 10px;" class="btn btn-warning">取消</button>'+
            '</div></div>';
        $('.component-form').html(html);
        var $insertFormProvince = $('.insert-form-province');
        if($insertFormProvince && $insertFormProvince.length){
            var regionTypes = window.regionTypes;
            var option = '';
            for(var i=0;i<regionTypes.length;i++){
                option += '<option value="'+regionTypes[i]['text']+'">'+regionTypes[i]['text']+'</option>';
            }
            $insertFormProvince.html(option);
            $('.insert-form-province').on('change',function(){
                var $this = $(this);
                var id = $this.val();
                var html_dom = '';
                $('.insert-form-city').hide();
                for(var i=0;i<regionTypes.length;i++){
                    if(regionTypes[i]['text'] == id && regionTypes[i]['children']){
                        var childrenList = regionTypes[i]['children'];
                        for(var k=0;k<childrenList.length;k++){
                            html_dom += '<option value="'+childrenList[k]['text']+'">'+childrenList[k]['text']+'</option>';
                        }
                        $('.insert-form-city').show().html(html_dom);
                    }
                }
            });
        }
        $(function(){
            $('#landingPageSave').click(function(){
                var $this = $(this);
                var formData = formList[0];
                var data = {};
                var sucess = true;
                $.each(formData,function(key,value){
                    if($.trim($('#form-'+key).val()) == ""){
                        alert('请输入'+value);
                        sucess = false;
                        return false;
                    };
                    if(key == 'telephone'){
                        if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test($('#form-'+key).val()))){
                            alert('请输入正确的'+value);
                            sucess = false;
                            return false;
                        }
                    };
                    if(key == 'idCard'){
                        if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test($('#form-'+key).val()))){
                            alert('请输入正确的'+value);
                            sucess = false;
                            return false;
                        }
                    };
                    if(key == 'remark'){
                        data['remarkTextarea'] = $('#form-remark').val();
                        data['remark'] = $('#form-remark').parent().siblings('.insert-form-title').text();
                    }else{
                        data[key] = $('#form-'+key).val();
                    }
                });

                if($('#form-msg').length){
                    var formMsg = $.trim($('#form-msg').val());
                    if(formMsg){
                        data.verify_code = formMsg;
                    }else{
                        alert('请输入验证码');
                        return false;
                    }
                }

                if($('.insert-form-province').val()){
                    data.province = $('.insert-form-province').val();
                }
                if($('.insert-form-city').val()){
                    data.city = $('.insert-form-city').val();
                }
                if(!sucess){
                    return false;
                };
                $this.attr('disabled','disabled');
                jQuery.support.cors = true;
                var url = formList[1].trim();
                if(document.querySelectorAll('.trigger-promote-active2')[0]){
                    document.querySelectorAll('.trigger-promote-active2')[0].click();
                }
                var mealNumNode = document.querySelector('.business-meal-num');
                if(mealNumNode){
                    var mealItem = document.querySelector('.business-meal-wrap').querySelector('input:checked').nextElementSibling.innerText,
                        mealNum = mealNumNode.innerText;
                    data.product_meal = mealItem + ', ' + mealNum;
                }
                $.ajax({
                    type:"post",
                    data:data,
                    url:url,
                    dataType:"json",
                    success:function(data){
                        if(data.success){
                            var successTip = '提交成功',
                                dialogTipNode = document.getElementById('landingPageFormDialogTip');
                            if(dialogTipNode && dialogTipNode.innerText){
                                successTip = dialogTipNode.innerText;
                            }
                            alert(successTip);
                            $.each(formData,function(ele,idx){
                                $('#form-'+ele).val("");
                            });
                            $('#form-msg').val("");
                        }else{
                            alert(data.message);
                        }
                        $this.removeAttr("disabled");
                        $('.form-msg-verification-btn').removeClass('disabled').text('发送');
                        clearInterval(self.verifyCodeTimer);
                    },
                    error: function () {
                        $this.removeAttr("disabled");
                    }
                });

            });
            $('#landingPageCancel').click(function(){
                $.each(formList[0],function(ele,idx){
                    $('#form-'+ele).val("");
                });
                $('#form-msg').val("");
            });
            if($('.form-msg-verification-btn').length){
                $('.component-form').on('click', '.form-msg-verification-btn:not(.disabled)', function(e){
                    var $target = $(e.target || e.srcElement),
                        telphone = $.trim($('#form-telephone').val()),
                        alertDialogSs = document.getElementById('alertDialogSs');
                    if((/^1[3|4|5|7|8][0-9]\d{8}$/.test(telphone))){
                        var second = 60;
                        self.verifyCodeTimer = setInterval(function () {
                            $target.addClass('disabled').text('发送('+ (--second) + 's)');
                            if(!second){
                                $target.removeClass('disabled').text('发送');
                                clearInterval(self.verifyCodeTimer);
                            }
                        }, 1000);
                        $.ajax({
                            type:'post',
                            data: {
                                telephone: telphone
                            },
                            url: $('#langingPageDomainName').text() + 'msg/send-verify-code',
                            success:function(data){
                                if(data.code != 0){
                                    alertDialogSs.innerHTML = data.msg;
                                    alertDialogSs.style.display = 'block';
                                    setTimeout(function(){
                                        alertDialogSs.style.display = 'none';
                                    }, 2000);
                                }
                            }
                        });
                    }else{
                        alertDialogSs.innerHTML = '请输入正确的电话号码';
                        alertDialogSs.style.display = 'block';
                        setTimeout(function(){
                            alertDialogSs.style.display = 'none';
                        }, 2000);
                        return;
                    }
                });
            }
        });
    };
    CommonObject.prototype.renderBusinessMealModule = function () {
        if(document.querySelector('.business-meal-num-down')){
            document.querySelector('.business-meal-num-down').onclick = function () {
                var mealNum = parseInt(document.querySelector('.business-meal-num').innerText, 10);
                if(mealNum > 1){
                    document.querySelector('.business-meal-num').innerText = --mealNum;
                }
            };
            document.querySelector('.business-meal-num-up').onclick = function () {
                var mealNum = parseInt(document.querySelector('.business-meal-num').innerText, 10);
                document.querySelector('.business-meal-num').innerText = ++mealNum;
            };
        }
    };
    new CommonObject();
}).call(this);