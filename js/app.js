define(['angularAMD', 'angular-route', 'angular-animate', 'jquery', 'bootstrap', 'myCookie'],function(angularAMD,$,bootstrap){
	var app = angular.module('myApp',['ngRoute','ngAnimate']);
	app.config(function($routeProvider){
		$routeProvider
			.when('/home',angularAMD.route({
				templateUrl:'view/home.html',
				controller:'home',
				controllerUrl:'../js/home.js'
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
				redirectTo:'/home'
			});
	});

	app.run(function($rootScope,$location){
		var loginName = getCookie("UserName");
		if(loginName){
			$rootScope.loginName = "你好，" + loginName;
		} else {
			$rootScope.loginName = "登录/注册";
		}
		$rootScope.url = $location.host();

		//在手机界面上点击导航栏后自动收起导航栏
		$rootScope.menuClick = function(){
			var navMenu = angular.element(document.querySelector(".navMenu"));
			if(navMenu.hasClass("in")){
				navMenu.removeClass("in");
			}
		}

		$rootScope.loginBtn = function(){
			var UserName = getCookie("UserName");
			if(UserName){
				$location.path("/home");//暂时跳转到首页，记得改为用户信息页
			} else {
				$location.path("/login");
			}
			console.log("ok");

		}

		// 路由请求完成
		$rootScope.$on('$routeChangeSuccess', function() {
		});
	});

	//注册滚轮事件
	app.directive('ngMousewheel', function(){
		return function(scope, element, attrs) {

			/*将 element 滚轮事件传递到 scope 上*/
			element.on('DOMMouseScroll mousewheel onmousewheel', function (event) {
				scope.$eval(attrs['ngMousewheel'], {
					$event: event
				});

				/*通知 scope 有异动发生*/
				scope.$digest();
			});

			/*在 destroy 时清除事件注册*/
			scope.$on('$destroy', function(){
				element.off('mousewheel');
			});
		};
	});

	app.directive('ngTouchmove', function(){
		return function(scope, element, attrs) {

			/*将 element 滚轮事件传递到 scope 上*/
			element.on('touchmove', function (event) {
				scope.$eval(attrs['ngTouchmove'], {
					$event: event
				});

				/*通知 scope 有异动发生*/
				scope.$digest();
			});

			/*在 destroy 时清除事件注册*/
			scope.$on('$destroy', function(){
				element.off('touchmove');
			});
		};
	});

	return angularAMD.bootstrap(app);
})
