/*
name : AdShow.js
author : ht
date : 2016-12-07
update : adWidth,adHeight修改为obj.width(),obj.height()
*/
;
(function(){

	var defaults={
		adWidth:1000, //广告宽度
		adHeight:60,  //广告高度
		imgPages:5,   //图片张数
		imgType:'jpg', //图片格式
		imgPath:'images/', //图片路径
		//showEffect:'ease', //广告轮播效果
		hrefArr:[]  //a链接数组
		};

	$.fn.AdShow=function(options,undefined){

		var opts=$.extend(defaults,options,undefined),
		    obj=$(this),
			current=0,
			timer=null,

			//初始化
			Init=function(){
			    var oAdBox=$('<ul class="ad-wrapper" style="position:relative; width:'+obj.width()+'px; height:'+obj.height()+'px;"></ul>');
				obj.append(oAdBox);

			    //创建图片
				for(var i=0;i<opts.imgPages;i++){
					(function(i){
						var newImg=new Image();
						newImg.onload=function(){
							var img=document.createElement('img');
							img.src=this.src;

							var oLi=(i==0)?$('<li style="display:block; position:absolute; left:0; top:0;"></li>'):$('<li style="display:none; position:absolute; left:0; top:0;"></li>');
							var oA=(opts.hrefArr.length!=1)?$('<a href="'+opts.hrefArr[i]+'" target="_blank"></a>'):$('<a href="'+opts.hrefArr[0]+'" target="_blank"></a>');

							oA.append(img);
							oLi.append(oA);
							oAdBox.append(oLi);

							};
						newImg.src=opts.imgPath+(i+1)+'.'+opts.imgType;
						})(i);

					}
					ShowNow();
					StopShow();
					StartShow();
			},
			ShowNow=function(){
				timer=setInterval(function(){
					current++;
					if(current<opts.imgPages){
						$(obj).find('.ad-wrapper').children('li').eq(current).fadeIn(500).siblings().fadeOut(500);
						}
					else{
						current=0;
						$(obj).find('.ad-wrapper').children('li').eq(current).fadeIn(500).siblings().fadeOut(500);
						}
					},1000);
				},
			StopShow=function(){
				$('.ad-wrapper').on('mouseover',function(){
					clearInterval(timer);
					});

				},
			StartShow=function(){
				$('.ad-wrapper').on('mouseout',ShowNow);
				};


			return Init();

		}

	})();