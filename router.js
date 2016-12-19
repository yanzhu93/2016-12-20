define(["backbone"], function(Backbone){
	var Router = Backbone.Router.extend({
		routes:{
			//左侧是要监听的属性名，右侧是触发的回调函数名
			home: "home",
			market: "market",
			order: "order",
			mine: "mine",
			jifen: "jifen"
		},
		home: function(){
			require(["modules/home/index.js"],function(home){
				home.init();
			});
		},
		market: function(){
			require(["modules/flashSalesSupermarket/flashSalesSupermarket.js"],function(market){
				market.init();
			});
		},
		order: function(){
			require(["modules/order/shoppingCart.js"],function(order){
				order.init();
			});
		},
		mine: function(){
			require(["modules/mine/my.js"],function(mine){
				mine.init();
			});
		},
		jifen: function(){
			require(["modules/jifen/pointReward.js"],function(jifen){
				jifen.init();
			});
		}
	});
	return new Router();
});