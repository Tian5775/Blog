define(['angularAMD', 'angular-route','jquery','bootstrap'],function(angularAMD,$,bootstrap){
	var app = angular.module('myApp',['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when('/article',angularAMD.route({
				templateUrl:'view/article.html',
				controller:'article',
				controllerUrl:'../js/article.js'
			}))
			.when('/login',angularAMD.route({
				templateUrl:'view/login.html',
				controller:'login',
				controllerUrl:'../js/login.js'
			}))
			.otherwise({
				redirectTo:'/article'
			});
	});

	app.run(function($rootScope){
		$rootScope.userName = "登录/注册";
	})

	return angularAMD.bootstrap(app);
})
