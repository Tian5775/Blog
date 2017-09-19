var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider.
	when('/article',{
		templateUrl:'view/article.html'
	}).
	when('/login',{
		templateUrl:'view/login.html'
	}).
	otherwise({
		redirectTo:'/article'
	});
});