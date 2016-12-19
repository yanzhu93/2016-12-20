define(["text!./pointReward.html","css!./pointReward.css","text!./fault3.html"], function(homePage){	
	return {
		init:function(){
			if($(".jifen").children().size()>0){
				$(".jifen").show().siblings().hide();
			}else{
				$(".jifen").html(homePage).show().siblings("footer,.main").hide();
				$(function(){
					//ajax请求菜单
					$.get("data/jifen.json",{},callbackFault4);					
				});
			}			
		}
	}
});

//请求积分数据的回调函数
function callbackFault4(fault1){	
	$("#tempBox").load("modules/jifen/fault3.html",function(){
		var htmlstr = baidu.template("fault4",fault1);
		$("#fault-4").html(htmlstr);
		$("#fault4").remove();
		$(".phe-content").on("click",function(){
			$(".jifen").hide().siblings().show();
			$(".position").hide();
			var wordspace = new Backbone.Router();
        	wordspace.navigate('mine',{trigger: true});
			//$(".jifen").siblings($(".position")).hide();
			
		})
	});	
}