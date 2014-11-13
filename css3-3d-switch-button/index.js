/**
 * Created by Administrator on 2014/11/12 0012.
 */

function opendialog(log,text,yesimg,noImg, okCallback){
   var ret = false;
    var strHtml = "<div id='dialog_div' class='dialog_content'> <p><img class='logo' src ="+log+" /> "+text+"</p><img   class='yesBtn' src=" + yesimg + " /><img class='noBtn' src="+noImg+" />";
    //alert(strHtml);
   //var dlo = $("<p>"+text+"</p>");
    var dlo = $(strHtml);
   var dialog =  dlo.dialog(
        {
            hide: '', //点击关闭是隐藏,如果不加这项,关闭弹窗后再点就会出错.
            dialogClass: "my_dialog",
            height:340,
            width:350,
            draggable: false,
            modal:true, //蒙层（弹出会影响页面大小）
            overlay: {opacity: 0.5, background: "black" ,overflow:'auto'}
        }
    );
	$(".yesBtn").click(function(){
		ret = true;
		dialog.dialog("close");
	});

	$(".noBtn").click(function(){
		dialog.dialog("close");
	});
	//点击确认之后处理的回调函数
   dialog.on( "dialogclose", function( event, ui ) {
        if (ret)
        {
			okCallback();
        }
   } );
}

var myOk = function(){

	alert("OK");
}