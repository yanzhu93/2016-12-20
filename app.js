
//参数是键值对
require.config({
	paths:{
		//默认使用js文件省略掉文件类型
		"jquery":"js/jquery-1.11.2",
		// "jquery":["./js/jquery-1.11.2","./js/jquery-1.11.2"],
		"backbone":"js/backbone",
		"underscore":"./js/underscore",
		"text":"./js/text",
		"css":"./js/css",
		"baidu":"./js/baiduTemplate",
		"swiper":"js/swiper.min"
	}
});

require(['jquery','backbone','baidu','swiper','router.js'],function($,Backbone){
    //开启路由监听
    Backbone.history.start();
    //定位页面1秒后隐藏
    // if (navigator.geolocation){
    //     //使用navigator的geolocation属性获取位置相关信息  getCurrentPosition获取当前坐标 latitude  十进制数的纬度 longitude   十进制数的经度
    //     navigator.geolocation.getCurrentPosition(function(positionData){
    //         $(".po-icon").html("定位中。。。");
    //         document.write(positionData);
    //     }); 
    // }else{ 
    //     console.log("该浏览器不支持获取地理位置。"); 
    // }
    setTimeout(function(){
        var wordspace = new Backbone.Router();
        wordspace.navigate('home',{trigger: true});
    	$(".position").hide();
    	$("footer").find("li:eq(0)").addClass("foot_bj5");
        //创建变量存储本地存储中商品数量
        var sum = 0;
        for(var i in localStorage){
           sum += Number(JSON.parse(localStorage[i]).num);
        }
        //将商品数量在购物车中显示
        $(".shopNum").text(sum);
        //判断如果购物车数量大于0则显示数量
        if(sum>0){
            $(".shopNum").show();
        }      
    },1000);
    $(function(){
    	//切换页脚按钮背景图
    	$("footer").on("click","li",function(){
    		$("footer").find("li").removeClass("foot_bj5");
    		$(this).addClass("foot_bj5");
    	});
    });
});
var t;
