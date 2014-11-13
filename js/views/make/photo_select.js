// 文件名称: pic_frame.js
//
// 创 建 人: chenshy
// 创建日期: 2014/08/28
// 描    述: 相机或相册选择界面
define([
    "jquery",
    "underscore",
    //"text!templates/make/fma_ui_photoselect.html",
    "text!templates/make/fma_ui_shapemarktaphold.html",
    "common/render/include",
    "tmp/base64"
],function($, _, photoSelectTpl,  createjs,base64) {

    /**
     * 相机选择页面
     */
    var PhoteSelect = function (parent) {
		/*
        this.template = _.template(photoSelectTpl);
        this.$el = $("<div>").attr("id","photo_select");
        this.$el.addClass("hide_photo_select");
        this.el = this.$el.get(0);
		*/
		/***
		*新添加的长按shape水印的时候显示上移一层和下移一层
		*/
		/*
		this.shapetaphold = _.template(shapeTapHoldTpl);
		this.$shapeEl = $("<div>").attr("id","shape_hold");
		this.$shapeEl.addClass("hide_shape_hold");
        this.shapeEl = this.$shapeEl.get(0);
		
		this.$shapeEl.html(this.shapetaphold);
		*/
		this.template = _.template(photoSelectTpl);
		this.$el = $("<div>").attr("id","shape_hold");
		this.$el.addClass("hide_shape_hold");
        this.el = this.$el.get(0);
        /**
         * 相机或相册选择完后的回调函数
         * @type {null}
         */
        this.photoCallback = null;

        this.$el.html(this.template);

        var self = this;

        setTimeout(function(){
            self.photoUL = self.$el.find("ul:first");
            self.photoUL.click(function(e){
                photoUlClick.call(self,e);
            });
			/*
            self.shapeUL = self.$shapeEl.find("ul:first");
            self.shapeUL.click(function(e){
                photoUlClick.call(self,e);
            });
			*/
        },0);
    };

    function photoUlClick(e){
        var li = $(e.target);
        var attr = li.attr("attr");
        if(attr){
            if(attr == "close"){
                this.hide();
            }else if(attr == "photo"){//从相机
                this.getNativePic("photo");
            }else if(attr == "album"){//从相册
                this.getNativePic("album");
            }else if (attr == "up"){
				alert("UP");
            }else if (attr == "down"){
				alert("down");
			}
        }
    }

    PhoteSelect.prototype.getNativePic = function(type,callback){
        var obj;

        if(callback){
            this.photoCallback = callback;
        }
    
        if(type == "photo"){
            obj = {
                quality : 45,
                destinationType:Camera.DestinationType.DATA_URL,
                sourceType:Camera.PictureSourceType.CAMERA,
                correctOrientation: true
            };
        }else{
            obj = {
                quality : 100,
//                sourceType : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
//                destinationType: navigator.camera.DestinationType.DATA_URL
                destinationType:Camera.DestinationType.DATA_URL,
                sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true
            };
        }
//        alert(obj)
        var self = this;
        navigator.camera.getPicture(function(url){//success
            self.hide();
            self.cameraDataHandle(url);
        },function(msg){//fail
            appLog(msg);
        },obj);
    };

    PhoteSelect.prototype.cameraDataHandle = function(url){
        var base64 = "data:image/png;base64," + url;
//            topEvent.trigger(LoadingView.SHOW_LOADING);
        var self = this;
        utils.loadImage(base64,function(img){
            //alert(img)
            var canvas = window.document.createElement("canvas");
//                alert(canvas)
            var context = canvas.getContext("2d");
            if(img.width > 2000 || img.height > 2000){
                canvas.width = img.width / 2;
                canvas.height = img.height / 2;
                context.drawImage(img,0,0,img.width,img.height,0,0,img.width / 2,img.height / 2);
                base64 = canvas.toDataURL("image/png",0.5);
            }else{
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img,0,0);
                base64 = canvas.toDataURL("image/png",1);
            }

            if(self.photoCallback){
                self.photoCallback(base64);
            }

            //清空相机缓存文件
            navigator.camera.cleanup(function(){
                //console.log("clean success");
            },function(){
                //console.log("clean fail")
            });
        });
    };

    PhoteSelect.prototype.show = function(callback){

        this.photoCallback = callback;
		
        this.$el.addClass("show_photo_select");
        this.$el.removeClass("hide_photo_select");
        this.$el.find("li").eq(0).addClass("fadeInUp");
        animation(this.$el.find("li"),1,150,"fadeInUp");
		
		//this.$shapeEl.addClass("show_shape_hold");
        //this.$shapeEl.removeClass("hide_shape_hold");
        //this.$shapeEl.find("li").eq(0).addClass("fadeInUp");
        //animation(this.$shapeEl.find("li"),1,150,"fadeInUp");
    };

    PhoteSelect.prototype.hide = function(){
		
        this.$el.addClass("hide_photo_select");
        this.$el.removeClass("show_photo_select");
        this.$el.find("li").removeClass("fadeInUp");
		
		//this.$shapeEl.addClass("hide_shape_hold");
        ///this.$shapeEl.removeClass("show_shape_hold");
        //this.$shapeEl.find("li").removeClass("fadeInUp");
    };
	/**
	*添加显示图形
	*
	**/

    PhoteSelect.prototype.showShapeHold = function(){
		/*
		alert("dsadasd" + this.$shapeEl);
        this.$shapeEl.addClass("show_shape_hold");
        this.$shapeEl.removeClass("hide_shape_hold");
        this.$shapeEl.find("li").eq(0).addClass("fadeInUp");
        animation(this.$shapeEl.find("li"),1,150,"fadeInUp");
		*/
    };

    PhoteSelect.prototype.hideShapeHold = function(){
		/*
        this.$shapeEl.addClass("hide_shape_hold");
        this.$shapeEl.removeClass("show_shape_hold");
        this.$shapeEl.find("li").removeClass("fadeInUp");
		*/
    };

    return PhoteSelect;
});
function animation(div,index,time,name){
    setTimeout(function(){
        div.eq(index).addClass(name);
        animation(div,index+1,time,"fadeInUp")
    },time)
}