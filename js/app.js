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
				templateUrl:'view/registered.html'
			}))
			.otherwise({
				redirectTo:'/article'
			});
	});

	app.run(function($rootScope,$location){
		$rootScope.loginName = "登录/注册";
		$rootScope.url = $location.host();
	})

	return angularAMD.bootstrap(app);
})
