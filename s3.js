
// 评论相关  javascript
// 刷新验证码
var set_code = function(){
    ///tpapi_v18921/?a=code
    $("#codeimg").attr("src","/tpapi_v18921/?a=code&v="+ (+new Date()) ).show();
}
$("#code_input").focus(function(){
    var code = $("#code_input").val();
    if( !code ){
        set_code();    
    }
});

$("#codeimg").click(function(){
    set_code();
});

$("#submit").click(function(){
    var code = $("#code_input").val();
    code = $.trim(code);
    var content = $("#content").val();
    content = $.trim(content);
    if( !code || code.length !=4 ){
        alert("验证码错误");
        return false;
    }
    if( !content ){
        alert("请输入留言内容");
        return false;
    }
    showload();
    $.ajax({
        url:"/tpapi_v18921/?a=handle",
        method:"post",
        data:{
            code:code,
            v_id:__ID__,
            content:content
        },success:function(ret){
            set_code();
            hideload();
            console.log(ret);
            if(ret.code==200){
                alert("留言成功，请等待审核和缓存更新。");
                $("#code_input").val('')
                $("#content").val('')
            }else{
                $("#code_input").val('');
                alert("提交失败，"+ret.msg);
            }
        },error:function(){
            set_code();
        }
    });
});
    
var $page = 2;
var get_comment = function($el,$vid) {
    showload();
    $.ajax({
        url:"/include/ajax.php",
        method:"get",
        data:{
            action:"get_comment",
            id:$vid,
            page:$page
        },success:function(ret){
            
            hideload();
            console.log(ret);
            console.log(ret.length);
            if( ret.length <1 ){
                // alert("没有更多了");
                $("#get_more_comments").hide();
            }else{
                $page+=1;
                
                var $html = '';
                for(var i=0;i<ret.length;i++){

$html += '<div class="stui-comment__item top-line clearfix">';
$html += '	<a class="avatar" href="javascript:;"><img class="face" src="https://m.360buyimg.com/babel/jfs/t1/95610/12/23005/7711/63ac74e5F95535310/e7cc9e4abfa3d352.jpg"></a>  ';            
$html += '	<div class="comment-head clearfix">';
$html += '		<span class="text-muted pull-right hidden-xs">'+ret[i].ip+'</span>';
$html += '		<h4 class="title">游客</h4>';
$html += '		<p class="font-12 text-muted">'+ret[i].time_str+'</p>     ';                 
$html += '	</div>';
$html += '	<div class="comment-cont clearfix">'+ ret[i].msg +'</div>';
$html += '</div>';


                }
                $($html).appendTo("#"+$el);
            }
        },error:function(){
            
        }
    });
}
$("#get_more_comments").click(function(){
    get_comment('comments_list_id',__ID__);
    $("#comments_list_id").css("height","auto");
});
