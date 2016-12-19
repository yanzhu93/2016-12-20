define(["text!./flashSalesSupermarket.html","css!./flashSalesSupermarket.css","text!./fault2.html"], function(homePage){
		
	return {
		init:function(){
			if($(".market").children().size()>0){
				$(".market").show().siblings("div").hide();
			}else{
				$(".market").html(homePage).show().siblings("div").hide();
				$(function(){					
					//ajax请求菜单
					$.get("data/shopping.json",{},callbackFault1);
				});
			}
		}
	}
});
var flag1 = true,flag2 = true;
function callbackFault1(fault1){
	$("#tempBox").load("template/fault2.html",function(){
		var htmlstr = baidu.template("fault2",fault1);
		$("#fault-2").html(htmlstr);
		$("#fault2").remove();
		$(".page2-article").on("click","li",{data:fault1},changeShop);
		//第一个li添加默认class名
		$(".page2-article").find("li:eq(0)").addClass("page2-art-border");
		if((t||"undefined")!=="undefined"){
			$(".page2-article li[data-id='"+t+"']").trigger("click");
		}
		//分类框显示隐藏及箭头动画
		$(".page2-aside-top").off().on("click","li",function(){
			if($(this).attr("data-list")=="zonghe"){
				$(".page2-aside-top1").find("li:eq(0)").addClass("allshow").siblings().removeClass("allshow");
				if(flag1){
					$(this).find(".page2-jt1").css({"-webkit-transform": "rotate(180deg)"});
					flag1 = false;
				}else{
					$(this).find(".page2-jt1").css({"-webkit-transform": "rotate(0deg)"});
					flag1 = true;
				}
			}else if($(this).attr("data-list")=="all"){
				$(".page2-aside-top1").find("li:eq(0)").removeClass("allshow").siblings().addClass("allshow");
				if(flag2){
					$(this).find(".page2-jt1").css({"-webkit-transform": "rotate(180deg)"});
					flag2 = false;
				}else{
					$(this).find(".page2-jt1").css({"-webkit-transform": "rotate(0deg)"});
					flag2 = true;
				}
			}						
			$(".page2-aside-top1").toggle();			
		});
		//点击事件调用商品添加动画
		$(".page2-aside").off().on("click","span",picjump);
	});
}
//点击测边栏触发的函数
function changeShop(e,a){
	e = e || window.event;
	//获取到所有信息的文件对象
	var fault1 = e.data.data;
	//获取点击分类的id值
	var shopid = a || $(this).attr("data-id");
	//显示当前点击按钮的左边框其他的则移除
	$(this).addClass("page2-art-border").siblings().removeClass("page2-art-border");
	//判断当期点击的按钮是否加载过
	//加载过则显示当前对应的商品其他的隐藏
	if($("."+shopid).size()>0){
		$("."+shopid).show().siblings().hide();
	}else{
	//没有加载过则调用模板添加商品信息 其他的隐藏		
		var a = {"data":fault1.data,"shopid":shopid};
		$("#tempBox").load("template/fault2.html",function(){
			var htmlstr = baidu.template("fault3",a);
			$("#fault-3").children().hide();
			$("#fault-3").append($(htmlstr));
			$("#fault3").remove();
			//点击事件调用商品添加动画
			$(".page2-aside").off().on("click","span",picjump);			
		});
	}	
}
//添加商品动画函数
function picjump(e){
	var mid = $(this).attr("data-mid");
	var mname = $(this).attr("data-mname");
	var mpic = $(this).attr("data-mpic");
	var mimg = $(this).attr("data-mimg");
	
	//获取当前点击事件的节点class
	var c = e.target.getAttribute("class");
	//判断点击的按钮是添加还是删除
	if(c == "addproduct"){
		if(!localStorage[mid]){
			localStorage[mid] = JSON.stringify({name:mname,pic:mpic,id:mid,img:mimg,num:1});
		}else{
			var mdata = JSON.parse(localStorage[mid]);
			localStorage.removeItem(mid);
			mdata.num = Number(mdata.num)+1;
			localStorage[mid] = JSON.stringify(mdata);		
		}
		//添加 购物车内个数加1
		$(".shopNum").show().text(Number($(".shopNum").text())+1);
		//显示当前商品添加数量及删除按钮
		$(this).siblings("span").css("visibility","visible");
		//当前商品数量加1
		var productnum = $(this).siblings("span").eq(1);
		//当前商品数量使用本地存储的该商品的数量
		productnum.text(JSON.parse(localStorage[mid]).num || (Number(productnum.text())+1));
		//获取当前商品和购物车的位置坐标
		var that = $(this).closest("li").find(".product-img");	
		var left =that.offset().left;
		var top = that.offset().top-$("body").scrollTop();
		var nleft = $(".shopNum").offset().left;
		var ntop = $(".shopNum").offset().top-$("body").scrollTop();
		//添加CSS动画
		$('.style').html("@keyframes first{0%{width:100px;height:100px;border-radius: 50%;top:"+top+"px;left:"+left+"px;}10%{width: 80px;height:80px;top:"+(top-20)+"px;left:"+(left+(nleft-left)*0.4)+"px;}100%{width: 0%;height:0;top:"+ntop+"px;left:"+nleft+"px;}}");
		var a = that.clone().addClass('move').removeClass("product-img").appendTo($('body'));
		a.css({'animation':'first 1s'});
		//移除copy的节点
		setTimeout(function(){
			a.remove();
		},1000);
	}else if(c=="removeproduct"){
		var mdata = JSON.parse(localStorage[mid]);
		localStorage.removeItem(mid);
		if(Number(mdata.num) > 1){
			mdata.num = Number(mdata.num)-1;
			localStorage[mid] = JSON.stringify(mdata);
		}		
		//添加 购物车内个数减1
		$(".shopNum").show().text(Number($(".shopNum").text())-1);
		//当前商品数量减1
		var productnum2 = $(this).siblings("span").eq(0);
		productnum2.text(Number(productnum2.text())-1);
		//判断若当前商品个数为0时隐藏显示当前数量的节点
		if(productnum2.text()==0){
			$(this).add(productnum2).css("visibility","hidden");
		}
		//判断若购物车商品个数为0时隐藏显示购物车数量的节点
		if($(".shopNum").text()==0){
			$(".shopNum").hide();
		}
	}	
}
