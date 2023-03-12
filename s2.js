
var _bjjx = $("#bjjx_div").html();
if( _bjjx ) {
	var item_name = 'bjjx'+__ID__;
	localforage.setItem(item_name,_bjjx).then(function(val){});
}
$('<img src="'+_pic+'" alt="'+v_name+'" class="vlistpic" referrerpolicy="no-referrer" /><span class="pic-text text-right">'+v_note+'</span>').appendTo(".bgimg");
$(".lazyload").each(function(){
    var _t = $(this);
    var _src = _t.attr("data-original");
    if(_src ){
        _t.attr("src",_src);
    }
});
$("img.fcbox").removeAttr("src");
if ( $(window).width()< 768 ) {
    $(".juzhao img").attr("src","https://ldbbs.ldmnq.com/bbs/topic/images/2022-12/9e7e0278-d6aa-4df0-b095-957735699881.gif");
}
$("#detail-more").click(function(){
  $("#detail-more").hide();
  $("#detail-sq").css("display","inline");
  $(".detail-sketch").hide();
  $(".detail-content").show();
});
$("#detail-sq").click(function(){
  $("#detail-more").css("display","inline");
  $("#detail-sq").hide();
  $(".detail-sketch").show();
  $(".detail-content").hide();
});
loading = false;
var page = 2;
var get_more = function($type,$id_el){
    if ( loading ) {
      return;
    }
    showload();
    //_hmt.push(['_trackEvent', 'click', 'get_more', $type ]);
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
    get_more(typeid,"content_ul");
});
var loadImg = function(url) {
	setTimeout(function(){
		$('<img class="hide" src="'+url+'">').appendTo("body");
	},1500);
}
var __timestamp = Math.round(new Date() / 1000);
_dbtime = parseInt( _dbtime );
if(  __timestamp - _dbtime > 15*24*60*60 && parseInt(_update_hit)==1 ) {
    loadImg("/include/ajax.php?action=douban_update2&id="+__ID__);
}
var _H = new Date().getHours();
if( parseInt(_update_hit)==1  && ( _H >= 1 && _H <=10 )  ) {
    loadImg("/tpapi_v18921/?a=updatehit&id="+__ID__+"&ts="+__timestamp);
}
