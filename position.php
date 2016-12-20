<?php
require_once "jssdk.php";
// appId  和 秘钥
$jssdk = new JSSDK("wx8206eb2435e95fc9", "2fcabb606ac866c303dd264312873841");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript">
	document.documentElement.style.fontSize = innerWidth/4.14 +"px";
    window.onresize =function(){
      document.documentElement.style.fontSize = innerWidth/4.14 + "px";
    }
    </script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="css/swiper.min.css">
    <script data-main = "app.js" type="text/javascript" src = "js/require.js"></script>
    <style>
		body{
			font-family:,"Myriad Set Pro","Lucida Grande","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif,'Microsoft Yahei',Simsun;
		    color: #333;
		    font-size: 0.16rem;
		}
		a{
			color:#333;
		}
		.position{
			position: absolute;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    background: center 30% no-repeat #ffd82b url(images/d2.png);
		    background-size: 60%;
		    z-index: 200;
		    overflow: hidden;
		}
		.po-icon{
			padding-top: 80%;
		    text-align: center;
		    line-height: 30px;
		    font-size: 14px !important;
		}
		.po-icon div{
			width: 36px;
		    height: 36px;
		    margin: auto;
		    background: center center no-repeat url(images/d1.png);
		    background-size: contain;
		    -webkit-animation: kf_boot_gps 2s infinite;
		}
		footer{
			width: 100%;
			height: 0.7rem;
			background-color: rgba(246,246,246,.95);
			position: fixed;
			z-index: 100;
			left:0;
			bottom: 0;
		}
		footer>ul{
			display: flex;
			width: 100%;
		}
		footer div{
			flex:1;
			text-align: center;
			line-height: 1.05rem;
		}
		.foot_bj1{
			background: url(images/5.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		.foot_bj2{
			background: url(images/2.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		.foot_bj3{
			background: url(images/3.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
			position: relative;
		}
		.shopNum{
		    background-color: #f40;
		    color: #fff;
		    line-height: 0.22rem;
		    width: 0.22rem;
		    text-align: center;
		    font-size: 0.13rem;
		    -webkit-transition: -webkit-transform .1s;
		    position: absolute;
		    display: none;
		    border-radius: 50%;
		    left: 50%;
		    top: .06rem;
		    margin-left: 0.15rem;
		}
		.foot_bj4{
			background: url(images/4.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		footer div:nth-of-type(1) .foot_bj5{
			background: url(images/1.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		footer div:nth-of-type(2) .foot_bj5{
			background: url(images/6.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		footer div:nth-of-type(3) .foot_bj5{
			background: url(images/7.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
		footer div:nth-of-type(4) .foot_bj5{
			background: url(images/8.png) no-repeat center 0.05rem;
			background-size: 0.35rem;
		}
    </style>
    <style class="style"></style>
</head>
<body>
	<div class="position">
		<div class="po-icon"><div></div>定位中</div>
	</div>
	<div id = "main">
		<div class = "home">			
		</div>
		<div class = "market"></div>
		<div class = "order"></div>
		<div class = "mine"></div>
	</div>
	<footer>
		<ul>
			<div><li class="foot_bj1"><a href="#home">首页</a></li></div>
			<div><li class="foot_bj2"><a href="#market">闪送超市</a></li></div>
			<div><li class="foot_bj3"><a href="#order">购物车</a><div class="shopNum">0</div></li></div>
			<div><li class="foot_bj4" ><a href="#mine">我的</a></li></div>
		</ul>
	</footer>
	<div class="jifen"></div>
	<div id="tempBox"></div>
<script>

	wx.config({
	    debug: true,
	    appId: '<?php echo $signPackage["appId"];?>',
	    timestamp: <?php echo $signPackage["timestamp"];?>,
	    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	    signature: '<?php echo $signPackage["signature"];?>',
	    jsApiList: [
	        'checkJsApi',
	        'onMenuShareWeibo',
	        'onMenuShareQZone',
	        'hideMenuItems',
	        'showMenuItems',
	        'hideAllNonBaseMenuItem',
	        'showAllNonBaseMenuItem',
	        'translateVoice',
	        'startRecord',
	        'stopRecord',
	        'onVoiceRecordEnd',
	        'playVoice',
	        'onVoicePlayEnd',
	        'pauseVoice',
	        'stopVoice',
	        'uploadVoice',
	        'downloadVoice',
	        'chooseImage',
	        'previewImage',
	        'uploadImage',
	        'downloadImage',
	        'getNetworkType',
	        'openLocation',
	        'getLocation',
	        'hideOptionMenu',
	        'showOptionMenu',
	        'closeWindow',
	        'scanQRCode',
	        'chooseWXPay',
	        'openProductSpecificView',
	        'addCard',
	        'chooseCard',
	        'openCard'
	    ]
	});
	var latitude = 0,longitude = 0;
	wx.ready(function () {
	    // 在这里调用 API
	    wx.getLocation({
	    success: function (res) {
	        latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	        longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	        var speed = res.speed; // 速度，以米/每秒计
	        var accuracy = res.accuracy; // 位置精度
	    },
	    cancel: function (res) {
	        alert('用户拒绝授权获取地理位置');
	    }
	});
	wx.openLocation({
	    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
	    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
	    name: '', // 位置名
	    address: '', // 地址详情说明
	    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
	    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
	});
	alert("纬度"+latitude+"经度"+longitude);
});
//在github上修改了
//我在本地改了
</script>
</body>
</html>
