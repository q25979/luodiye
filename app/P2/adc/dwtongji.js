var js_url="";
var dw_uId="";
var dw_ref="";
var dw_url="";
var dw_gurl="";
var is_get="";
var copy_content="";
var copy_type="";
try{js_url=document.getElementById("dwtongji").src}
	catch(e){}
	try{dw_uId=getURLParam("dw",js_url)}
	catch(e){}
	try{dw_url=window.parent.location}catch(e){}
	try{dw_ref=window.parent.document.referrer}
	catch(e){}
	tj(1);

	setInterval(function(){var str=encodeURIComponent(window.getSelection(0).toString());
	if(str!=""&&copy_content!=str){
		copy_content=str;
		copy_type=1;
		setTimeout(tj(2),1)}
	},1000);

	document.addEventListener('copy',function(event){
			try{var str=encodeURIComponent(window.getSelection(0).toString());
					if(str!=""&&copy_content!=str){
						copy_content=str;
						copy_type=2;
						setTimeout(tj(2),1)
						}
				}
				catch(e){}}
	        );
    function tj(type){
		if(type==1){
			if(is_get!="ok"){
				  dw_gurl="https://www.dwtongji.com/look?dw_user_id="+dw_uId+"&dw_url="+escape(dw_url)+"&dw_ref="+escape(dw_ref)+"&v="+unique();
				  setTimeout('is_get="ok";dw_img = new Image;dw_img.src=dw_gurl;',1)}
		    }else{
			   if(type==2){
				   dw_gurl="https://www.dwtongji.com/copy?dw_user_id="+dw_uId+"&type="+copy_type+"&dw_url="+escape(dw_url)+"&dw_ref="+escape(dw_ref)+"&c="+copy_content+"&v="+unique();
				   setTimeout("dw_img = new Image;dw_img.src=dw_gurl;",1)
			   }
		}
	}





    function dwtj(auname){
		dw_gurl="https://www.dwtongji.com/copy?dw_user_id="+dw_uId+"&type="+3+"&dw_url="+escape(dw_url)+"&dw_ref="+escape(dw_ref)+"&c="+auname+"&v="+unique();
		setTimeout("dw_img = new Image;dw_img.src=dw_gurl;",1)

	}

    function getURLParam(strParamName,url){
		var strReturn="";
		var strHref=url.toLowerCase();
		if(strHref.indexOf("?")>-1){

			var strQueryString=strHref.substr(strHref.indexOf("?")+1).toLowerCase();
			var aQueryString=strQueryString.split("&");
			for(var iParam=0;iParam<aQueryString.length;iParam++){

				if(aQueryString[iParam].indexOf(strParamName.toLowerCase()+"=")>-1){
					var aParam=aQueryString[iParam].split("=");
					strReturn=aParam[1];
					break
				}

			}

		}
		return strReturn
	}
    function unique(){
		var time=(new Date()).getTime()+"-",i=0;return time+(i++)
	};
