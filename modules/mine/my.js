define(["text!./my.html","css!./my.css"], function(homePage){

	return {
		init:function(){
			//if($(".home").children().size()>0) return;
			$(".mine").html(homePage).show().siblings("div").hide();
		}
	}
});