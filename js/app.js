define(['angularAMD', 'angular-route','jquery','bootstrap'],function(angularAMD,$,bootstrap){
	var app = angular.module('myApp',['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when('/article',angularAMD.route({
				templateUrl:'view/article.html',
				controller:'article',
				controllerUrl:'../js/article.js'
			}))
			.when('/nav',angularAMD.route({
				templateUrl:'view/nav.html',
				controller:'nav',
				controllerUrl:'../js/nav.js'
			}))
			.when('/login',angularAMD.route({
				templateUrl:'view/login.html',
				controller:'login',
				controllerUrl:'../js/login.js'
			}))
			.when('/registered',angularAMD.route({
				templateUrl:'view/registered.html',
				controller:'registered',
				controllerUrl:'../js/registered.js'
			}))
			.when('/forgetPwd',angularAMD.route({
				templateUrl:'view/forgetPwd.html',
				controller:'forgetPwd',
				controllerUrl:'../js/forgetPwd.js'
			}))
			.otherwise({
				redirectTo:'/article'
			});
	});

	app.run(function($rootScope,$location){
		$rootScope.loginName = "登录/注册";
		$rootScope.url = $location.host();

		//在手机界面上点击导航栏后自动收起导航栏
		$rootScope.menuClick = function(){
			var navMenu = angular.element(document.querySelector(".navMenu"));
			if(navMenu.hasClass("in")){
				navMenu.removeClass("in");
			}
		}

		// 路由请求完成
		$rootScope.$on('$routeChangeSuccess', function() {
		});
	});

	return angularAMD.bootstrap(app);
})
