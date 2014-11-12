/**
 * Created by Administrator on 2014/11/12 0012.
 */

function opendialog(title,log,text,bgimg,yesimg,noImg){
   var ret;
    var strHtml = "<div id='dialog_div'> <p><img src ="+log+" /> "+text+"</p><img  src=" + yesimg + "/><img src="+noImg+"/>";
    //alert(strHtml);
   //var dlo = $("<p>"+text+"</p>");
    var dlo = $(strHtml);
   var dialog =  dlo.dialog(
        {
            hide: "", //点击关闭是隐藏,如果不加这项,关闭弹窗后再点就会出错.
            autoOpen:false,
            closeOnEscape: false,
            closeText: "hide",
            dialogClass: "my_dialog",
            height:200,
            width:300,
            draggable: false,
            modal:true, //蒙层（弹出会影响页面大小）
            title:title,
            overlay: {opacity: 0.5, background: "black" ,overflow:'auto'}
            /*
            buttons:[
                {
                    text: yesimg,
                    click: function() {
                        $(this).dialog("close");
                        ret = true;
                    }
                },
                {
                    text: noImg,
                    click: function() {
                        $(this).dialog("close");
                        ret = false;
                    }
                }

            ]
            */
        }
    );
    dialog.dialog('open');

    dialog.on( "dialogclose", function( event, ui ) {
        alert(ret);
    } );
}