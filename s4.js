function hide_buffer(){
    $("#buffer").hide();
}
TouchSlide({
    slideCell:"#slideBox",
    titCell:".hd ul",
    mainCell:".bd ul",
    effect:"leftLoop",
    autoPlay:true,
    vis:2,
    autoPage:true //自动分页
});
function lost_xl(){
    var current_pre = location.origin;
    var src404 = '/jx/m3u8.php?vid='+current_pre+'/m3u8/6264188198763.m3u8';
	 $("#playbox").html('<iframe allowtransparency="true" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" width="100%" height="230" id="vod" src="' + src404 + '" frameborder=0 border=0 marginwidth=0 marginheight=0 scrolling="0" frameborder="0"></iframe>');	
}

function cheight(){
    if ( $(window).width()<768 ) {
        $("#playbox").css("height","230px");
    }else{
    	$("#playbox").css("height","450px");
    } 
}
try{
	if( typeof VideoInfoList == 'undefined' || !VideoInfoList || VideoInfoList == ''  ) { 
		lost_xl();
	}    
} catch(e){}
if( typeof VideoInfoList != 'undefined' && VideoInfoList.substring(0,3) == '$$$' ) {
    VideoInfoList = VideoInfoList.substring(3, VideoInfoList.length);
}
cheight();
$(window).resize(function() {
  cheight(); 
});
var isWap = !__isPc;
function getplayer(player){
    return false;
}
function compileStr(code){ //对字符串进行加密       
	var c=String.fromCharCode(code.charCodeAt(0)+code.length);
	for(var i=1;i<code.length;i++) {      
		c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
	}   
	return escape(c);   
}
function uncompileStr(code){      
	code=unescape(code);      
	var c=String.fromCharCode(code.charCodeAt(0)-code.length);      
	for(var i=1;i<code.length;i++){      
		c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));      
	}      
	return c;   
}
var __t = Math.round(new Date() / 1000);
function set_iframe_src(src) {
	$("#playbox").html(
        '<iframe class="zanpiancms-play-iframe" id="buffer" src="/loading.html" width="100%" height="450" frameborder="0" scrolling="no" style="position:absolute;z-index:9;"></iframe>'+
        '<iframe allowtransparency="true" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" width="100%" height="230" id="vod" src="' + src + '" frameborder=0 border=0 marginwidth=0 marginheight=0 scrolling="0" frameborder="0"></iframe>'
    );
    if ( $(window).width()<768 ) {
        $("#buffer").css("height","230px");
    }
    $("#vod").load(function(){
        var __t1 = Math.round(new Date() / 1000);
        if( __t1 - __t >3 ){
            hide_buffer();  
        }else{
            var _to = 4000 - (__t1 - __t)*1000;
            setTimeout(function(){
                hide_buffer(); 
            },_to);
        }
         
    });
    setTimeout(function(){
        hide_buffer(); 
    },14000);
}
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function handle_jx(vid,player){
    if( !vid || vid.indexOf("m3u8/speed") >-1 ){
        lost_xl();
        return false;
    }
    if (  vid.indexOf("http://") >-1 ) {
        vid = vid.replace("http://","https://");
    }
    if( player == 'mp4' || player == 'ckplayer' || player.indexOf("m3u8")>-1 || vid.indexOf(".m3u8")>-1   ){
		set_iframe_src( "/jx/m3u8.php?c=3&vid="+ vid );
    }else if(  player == 'link' || player.indexOf("yun")>-1 || player.indexOf("33uu")>-1 || player.indexOf("zy")>-1 ){
        set_iframe_src("/jx/yun.php?vid="+ vid );
    }else{
        lost_xl();
    }
}
function play(){
    console.log("play currnet");
    handle_jx(l3a8,playshow);
}
function play22() {
    console.log("play VideoInfoList");
    if( typeof VideoInfoList == 'undefined' || !VideoInfoList || VideoInfoList =='' ) {
        lost_xl();
        return false;
    }
    var d =  VideoInfoList.split("$$$");
	if( d.length<1 ){
	    d = [d];
	}
	var index_arr = location.href.split(".html")[0].split("/")[4].split("-");
	var num1 = index_arr[1];
	var num2 = index_arr[2];
	if( num1 >= d.length ){
	    num1 = d.length-1;
	}
	var tmp = d[num1];
	var tmpp = tmp.split("$$");
	var tmp2 = tmpp[1].split("#");
	if( num2 >= tmp2.length ){
	    num2 = tmp2.length-1;
	}
	
	var cur = tmp2[num2];
	var tmp3 = cur.split("$");
	var vid = tmp3[1];
	var player = typeof tmp3[2] == 'undefined' ? "" : tmp3[2];
    console.log("player:",player);
	if( !player ){
	    if( vid.indexOf("m3u8")>-1 ){
	        player = 'm3u8';
	    }else{
	        player = 'link';
	    }
	}
  	
  	handle_jx(vid,player);
	
};

// 获取下一集链接
var get_next_link = function() {
	$el = $("#next_link_a").attr("href");
	return $el?$el:"";
}
// console.log("get_next_link:",get_next_link());
// 获取专题
$.ajax({
  url:"/include/ajax.php",
  type:"get",
  data:{
	action:"col",
	id:__ID__
  },
  success:function(ret){
	if( ret.length>0 ) {
		console.log("被"+ret.length+"个专题收录");
		let topic_html = '';
		for(var i=0;i<ret.length;i++){
			var cur = ret[i];
			topic_html += '';
			topic_html += '<a class="topic_box_item" href="/topiclist/'+cur.id+'.html">';
			topic_html += '    <i class="fa fa-angle-double-right" aria-hidden="true"></i><i class="fa fa-diamond" aria-hidden="true"></i>被《'+cur.name+'》收录';
			topic_html += '</a>';
			
		}
		$(".topic_box").html(topic_html).show();
	}
  }
});

var sta_id = location.href.split("-")[1];
var cur_id = -1;   
var show_play_tab = function(id){
	if(  cur_id == id ){ 
		$(".play_box .stui-pannel_bd").slideUp();
		$(".play_box .stui-pannel_hd .more").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
		cur_id = -1;
		return; 
	}
	cur_id = id;
	$(".play_box .stui-pannel_bd").slideUp();
	$(".play_box .stui-pannel_hd .more").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
	$("#play_box_"+( parseInt(id) +1)).slideDown();
	$("#play_box_head_"+( parseInt(id) +1)+" .more").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
}

show_play_tab(sta_id);
  
$(".play_box .stui-pannel_hd").click(function(){
	show_play_tab( $(this).attr("data-id")-1 );
});
 
var loading = false;
var page = 2;
var get_more = function($type,$id_el){
    if ( loading ) {
      return;
    }
    showload();
    _hmt.push(['_trackEvent', 'click', 'get_more', $type ]);
    loading = true;
    $.ajax({
      url : "/include/getdata.php?fclass=6&page_size=6&type="+$type+"&page="+page,
      method : "get",
      success : function(ret){
          hideload();
        page+=1;
        $(ret).appendTo("#"+$id_el);
        setTimeout(function(){
          loading = false;
        },300);
      }
    });
}
var typeid = __TYPEID__;
$("#get_more").click(function(){
    get_more(typeid,"play_page_ul");
});
var loadImg = function(url) {
    $('<img class="hide" src="'+url+'">').appendTo("body");
}
var __timestamp = Math.round(new Date() / 1000);
_dbtime = parseInt( _dbtime );
if(  __timestamp - _dbtime > 5*24*60*60 && parseInt(_update_hit)==1 ) {
    setTimeout(function(){
        loadImg("/include/ajax.php?action=douban_update2&id="+__ID__);
    },1500);
}
var _H = new Date().getHours();
if( parseInt(_update_hit)==1  && ( _H >= 1 && _H <=10 )  ) {
    loadImg("/include/ajax.php?action=hit&id="+__ID__+"&ts="+__timestamp);
}

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}

function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}
function gen_uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString(); 
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

var uuid = '';
try{

	if( getCookie("uuid") ){
		uuid = getCookie("uuid");
	}else{
		uuid = gen_uuid();
		setCookie("uuid",uuid);
	}
	console.log("uuid:",uuid);
	print_log(1);
	setTimeout(function() {
		print_log(2);
	},30*1000);

}catch(e){
	
}

function print_log(type){
/*
	$.ajax({
		url:"/tpapi_v18921/?a=playerror",
		method:"post",
		data:{
			type:type,
			v_id:__ID__,
			current_url:location.href,
			uuid:uuid
		},success:function(ret){
			console.log(ret);
			console.log("打点成功,type:",type);
		},error:function(){
			
		}
	}); 
*/
}

function getBrowserInfo(){ 
        var ua = navigator.userAgent.toLocaleLowerCase(); 
        var browserType = null; 
        if (ua.match(/msie/) != null || ua.match(/trident/) != null) { 
            browserType = "IE"; 
            browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1]; 
        } else if (ua.match(/firefox/) != null) { 
            browserType = "火狐"; 
        }else if (ua.match(/ubrowser/) != null) { 
            browserType = "UC"; 
        }else if (ua.match(/opera/) != null) { 
            browserType = "欧朋"; 
        } else if (ua.match(/bidubrowser/) != null) { 
            browserType = "百度"; 
        }else if (ua.match(/metasr/) != null) { 
            browserType = "搜狗"; 
        }else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) { 
            browserType = "QQ"; 
        }else if (ua.match(/maxthon/) != null) { 
            browserType = "遨游"; 
        }else if (ua.match(/ucbrowser/) != null) { 
            browserType = "UC"; 
        }else if (ua.match(/chrome/) != null) { 
            var is360 = _mime("type", "application/vnd.chromium.remoting-viewer"); 
            function _mime(option, value) { 
                var mimeTypes = navigator.mimeTypes; 
                for (var mt in mimeTypes) { 
                    if (mimeTypes[mt][option] == value) { 
                        return true; 
                    } 
                } 
                return false; 
            } 
            if(is360){ 
                browserType = '360'; 
            }
        }else if (ua.match(/safari/) != null) { 
            browserType = "Safari"; 
        }
		return browserType;
} 
$(document).ready(function(){
	if( _update_hit == 0 ) {
		var browser = getBrowserInfo();
		if( browser == "UC" || browser == "QQ" || browser == "百度"|| browser == "搜狗" ) {
			lost_xl();
		}else{
			play();
		}
	}else{
		play();
	}
});
var currentliindex = 0;
$(".stui-content__playlist li a").each(function(click_index){
    var _t = $(this);

    _t.click(function(){

        var _l3a8 = '965ys_'+_t.data("l3a8");
    
        var ids = _t.data("ids");
        var _tt = _t.text();
        var newUrl = location.origin + '/play/'+__ID__+'-'+ ids +'.html';
        if( _l3a8 == l3a8 ) {
            return false;
        }
        l3a8 = _l3a8;
        if( _t.hasClass("copy") ){
            return true;
        }
        $(".stui-content__playlist li").removeClass("active");
        _t.parent("li").addClass("active");
        handle_jx(l3a8,playshow);
        $("#djjtxt").text( _tt );
		currentliindex = click_index;
        scroll(0,0);
        history.pushState(null,"《"+playn +"》-"+_tt+"-高清在线播放-965影视",newUrl);
    });
});  
$(".stui-content__playlist li a").each(function(e){ 
	if( "965ys_"+$(this).data("l3a8") == l3a8 ){ 
		currentliindex=e; 
	}  
});
$(".bprev").click(function(){
    if( currentliindex ==0 ) return false;
    var prev_el = $(".stui-content__playlist li a").eq(currentliindex-1);
    if( prev_el.hasClass("copy") ) return false;
    prev_el.trigger("click");
});
$(".bnext").click(function(){
    var next_el = $(".stui-content__playlist li a").eq(currentliindex+1);
    if( next_el.hasClass("copy") ) return false;
    next_el.trigger("click");
});
