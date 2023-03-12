  var page = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
  var loading = false;
  var get_more = function($type,$id_el){
    if ( loading ) {
      return;
    }
    showload();
    _hmt.push(['_trackEvent', 'click', 'get_more', $type ]);
    loading = true;
    $.ajax({
      url : "/include/getdata.php?type="+$type+"&page="+page[$type],
      method : "get",
      success : function(ret){
        // console.log(ret);
        hideload();
        $(ret).appendTo("#"+$id_el);
        page[$type]++;
        setTimeout(function(){
          loading = false;
        },300);
      }
    });
  }
  
  
  
      
  var  do_search_index = function() {
    console.log( $(".homesoinput").val() );
    var k = $(".homesoinput").val();
    k = $.trim(k);
    console.log(k);
    if (!k) {
        alert("请输入影片关键词或者演员名字");
        return false;
    }
    location.href = '/s2.php?q='+$.trim(k);
  }

  $(".homesoinput").keydown(function() {
     if (event.keyCode == "13") { 
         do_search_index();
     }
 });
 $(".homesobtn").click(function(){
     do_search_index();
 });

var _gxhtml = '<span class="jrgx">今日更新</span>';
var _to2 = function(e) {
if(e <10) return '0' + e;
return e;
}
$(".stui-vodlist__box").each(function(){
var _t = $(this);
var _d = new Date();
var _m = _to2(_d.getMonth() + 1);
var _day = _to2(_d.getDate());
var _today = _m+'-'+_day;
var _ttoday = _t.attr("data-time");
if(_today==_ttoday) {
_t.find(".stui-vodlist__thumb").append(_gxhtml);
}
});
/*
$("#data_ul_dy").html("");
var _t = Math.round(new Date() / 1000);
var _tt = Math.round(_t / 3600);
$.ajax({
  url : "/include/getdata.php?type=1&page=1&v="+_tt,
  method : "get",
  success : function(ret){
    $("#data_ul_dy").html(ret);
  }
});
*/
TouchSlide({
slideCell:"#slideBox",
titCell:".hd ul",
mainCell:".bd ul",
effect:"leftLoop",
autoPlay:true,
autoPage:true //自动分页
});
TouchSlide( { slideCell:"#ranktabBox1",
effect:"leftLoop",
autoPlay:true,
endFun:function(i){
var bd = document.getElementById("ranktabBox1-bd");
bd.parentNode.style.height = bd.children[i].children[0].offsetHeight+"px";
if(i>0)bd.parentNode.style.transition="200ms";
}
} );
