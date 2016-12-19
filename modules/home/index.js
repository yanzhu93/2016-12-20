define(["text!./index.html","css!./index.css"], function(homePage){	
	return {
		init:function(){
			if($(".home").children().size()>0){
				$(".home").show().siblings("div").hide();
				//轮播图
				var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动(时间:毫秒)
				loop : true,//循环
				pagination : '.swiper-pagination',//分页器
				mousewheelControl : true,
				autoplayDisableOnInteraction : false,
			   });
				shopMore();
			}else{
				$(".home").html(homePage).show().siblings("div").hide();
				$(function(){
					//ajax请求菜单
					$.get("data/home.json",{},callbackFault);					
				});
			}			
		}
	}
});
//请求home数据的回调函数
function callbackFault(fault1){
	$("#tempBox").load("template/fault1.html",function(){
		var htmlstr = baidu.template("fault1",fault1);
		$("#fault-1").html(htmlstr);
		$("#fault1").remove();
		shopMore();
		//轮播图
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 2000,//可选选项，自动滑动(时间:毫秒)
			loop : true,//循环
			pagination : '.swiper-pagination',//分页器
			mousewheelControl : true,
			autoplayDisableOnInteraction : false,
		});
		//绑定事件触发添加商品动画
		$(".homemain").on("click",".imgjump",picjump1);
	});	
}
function picjump1(e){
	$(".shopNum").show().text(Number($(".shopNum").text())+1);
	var that = $(this).closest("li").find(".product-img");	
	var left =that.offset().left;
	var top = that.offset().top-($("body").scrollTop()||window.scrollY);
	var nleft = $(".shopNum").offset().left;
	var ntop = $(".shopNum").offset().top-($("body").scrollTop()||window.scrollY);
	$('.style').html("@keyframes first{0%{width:100px;height:100px;border-radius: 50%;top:"+top+"px;left:"+left+"px;}10%{width: 80px;height:80px;top:"+(top-20)+"px;left:"+(left+(nleft-left)*0.4)+"px;}100%{width: 0%;height:0;top:"+ntop+"px;left:"+nleft+"px;}}");
	var a = that.clone().addClass('move').removeClass("product-img").appendTo($('body'));
	a.css({'animation':'first 1s'});
	setTimeout(function(){
		a.remove();
	},1000);
	var hid = $(this).attr("data-hid");
	var hname = $(this).attr("data-hname");
	var hpic = $(this).attr("data-hpic");
	var himg = $(this).attr("data-himg");
	if(!localStorage[hid]){
		localStorage[hid] = JSON.stringify({name:hname,pic:hpic,id:hid,img:himg,num:1});
	}else{
		var data = JSON.parse(localStorage[hid]);
		localStorage.removeItem(hid);
		data.num = Number(data.num)+1;
		localStorage[hid] = JSON.stringify(data);		
	}
}

function shopMore(){
	$(".home-more").off().on("click",function(){
		var shopid = $(this).attr("data-shopid");
		t = shopid;
		$(".page2-article li[data-id="+shopid+"]").trigger("click");
		$("footer li:eq(1)").trigger("click");
	});
}
