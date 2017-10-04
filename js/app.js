/*
*/

define(['angularAMD', 'angular-route','jquery','bootstrap'],function(angularAMD,$,bootstrap){
	var app = angular.module('myApp',['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when('/article',angularAMD.route({
				templateUrl:'view/article.html'
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

	return angularAMD.bootstrap(app);
})
