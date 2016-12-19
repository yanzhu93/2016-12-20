define(["text!./shoppingCart.html","css!./shoppingCart.css"], function(homePage){

	return {
		init:function(){
			$(".order").html(homePage).show().siblings("div").hide();
			//遍历本地存储的数据将商品加入页面
			var sum = 0;
			for(var i in localStorage){
				var a = JSON.parse(localStorage[i]);			
				var trhtml = '<tr class="group-item"><td class="group-item-checkbox" style="width:0.65rem"></td><td style="width:0.65rem"><div class="group-item-img-wrap" style="background-image:url('+a.img+')"></div></td><td><div class="group-item-name ui-ellipsis">'+a.name+'</div><div class="group-item-price" width="50px" data-opic="'+a.pic+'">￥'+a.pic+'</div><div class="group-item-num"><span class="order-removebtn" data-oid="'+a.id+'"></span><span class="order-num">'+a.num+'</span><span class="order-addbtn"  data-oid="'+a.id+'"></span></div></td></tr>';
				$(".group-list tbody").append(trhtml);
				sum += parseInt(a.pic*Number(a.num)*100);
			}
			$(".payfor").html("￥"+sum/100);
			//调用切换页面函数
			tableChange();
			//去逛逛返回首页
			$(".goshopping").on("click",function(){
				var wordspace = new Backbone.Router();
        		wordspace.navigate('home',{trigger: true});
			});
			//页面加减商品按钮添加事件	
			$(".group-item").on("click","span",orderchange);
			$(".group-item-checkbox").on("click",checkbox);									
		}
	}
});
function orderchange(e){
	//获取当前点击商品的个数标签
	var orderNum = $(this).closest(".group-item-num").find($(".order-num"));
	switch($(e.target).attr("class")){
		//添加商品
		case "order-addbtn":
			//当前商品个数加1
			orderNum.text(Number(orderNum.text())+1);
			//购物车商品数量加1			
			$(".shopNum").text(Number($(".shopNum").text())+1);
			//本地储存的当前商品个数加1
			var oid = $(this).attr("data-oid");
			var data = JSON.parse(localStorage[oid]);
			localStorage.removeItem(oid);
			data.num = Number(data.num)+1;
			localStorage[oid] = JSON.stringify(data);
			var price1 = parseInt(parseInt($(".payfor").text().substr(1)*100)+parseInt($(this).closest("tr").find($(".group-item-price")).attr("data-opic")*100));
			$(".payfor").html("￥"+price1/100);
			break;
		//删除商品
		case "order-removebtn":
			//本地储存的当前商品个数减1
			var oid = $(this).attr("data-oid");
			var data = JSON.parse(localStorage[oid]);
			localStorage.removeItem(oid);
			data.num = Number(data.num)-1;
			localStorage[oid] = JSON.stringify(data);
			var price1 = parseInt(parseInt($(".payfor").text().substr(1)*100)-parseInt($(this).closest("tr").find($(".group-item-price")).attr("data-opic")*100));
			$(".payfor").html("￥"+price1/100);
			//若商品数量减为0时移除当前商品行 清除本体存储的该商品
			if(orderNum.text()<=1){
				orderNum.closest("tr").remove();
				localStorage.removeItem(oid);
			}
			//否则当前商品数减一
			else{
				orderNum.text(Number(orderNum.text())-1);
			}
			//判断若购物车数量为0 则隐藏显示数量标签
			if($(".shopNum").text()<=1){
				$(".shopNum").hide();
			}
			//购物车数量减1
			$(".shopNum").text(Number($(".shopNum").text())-1);			
			//调用切换页面函数			
			tableChange();
			break;
		default:
			break;
	}
}
function tableChange(){
	//判断购物车是否有商品
	//有商品则显示商品去逛逛页面隐藏
	if($(".group-list tbody").children().size()>0){
		$(".page3-main").css("display","block");
		$(".page3-main2").css("display","none");
	}
	//没有商品则隐藏商品页面去逛逛页面显示
	else{
		$(".page3-main2").css("display","block");
		$(".page3-main").css("display","none");
	}
}
function checkbox(){
	$(this).toggleClass("group-item-checked");
	
	console.log($(this).attr("class"));
}