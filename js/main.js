var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider.
	when('/index',{
		templateUrl:'view/index.html'
	}).
	when('/login',{
		templateUrl:'view/login.html'
	}).
	otherwise({
		redirectTo:'/login'
	});
});