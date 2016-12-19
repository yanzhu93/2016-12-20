$(function(){
	//ajax请求菜单
	$.get("data/home.json",{},callbackFault);
	

});
//请求home数据的回调函数
function callbackFault(fault1){
	$("#tempBox").load("template/fault1.html",function(){
		var htmlstr = baidu.template("fault1",fault1);
		$("#fault-1").html(htmlstr);
		$("#fault1").remove();
		//轮播图
		var mySwiper = new Swiper('.swiper-container', {
		autoplay: 2000,//可选选项，自动滑动(时间:毫秒)
		loop : true,//循环
		pagination : '.swiper-pagination',//分页器
		mousewheelControl : true,
		autoplayDisableOnInteraction : false,
	   });
		$("body").on("click",".imgjump",picjump);
	});	
}
function picjump(e){
	$(".shopNum").show().text(Number($(".shopNum").text())+1);
	var that = $(this).closest("li").find(".product-img");	
	var left =that.offset().left;
	var top = that.offset().top-$("body").scrollTop();
	var nleft = $(".shopNum").offset().left;
	var ntop = $(".shopNum").offset().top-$("body").scrollTop();
	$('.style').html("@keyframes first{0%{width:100px;height:100px;border-radius: 50%;top:"+top+"px;left:"+left+"px;}10%{width: 80px;height:80px;top:"+(top-20)+"px;left:"+(left+(nleft-left)*0.4)+"px;}100%{width: 0%;height:0;top:"+ntop+"px;left:"+nleft+"px;}}");
	var a = that.clone().addClass('move').removeClass("product-img").appendTo($('body'));
	a.css({'animation':'first 1s'});
	setTimeout(function(){
		a.remove();
	},1000);
}