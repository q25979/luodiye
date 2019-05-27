(function(){
    var industryCategoryStyle = document.getElementById('industry-category-style');
    var styleIndex = 1;
    var subTitle = '导师一对一交流资格';
    if(industryCategoryStyle && industryCategoryStyle.innerText){
        var n = industryCategoryStyle.innerText;
        switch(n)
        {
        case 'onlineTemplate':
          styleIndex = 1;
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
                    '<p class="truncationD-footer-text">领取新用户大礼包</p>'+
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
        if(navigator.userAgent.indexOf('qukan') > -1) {
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
})()