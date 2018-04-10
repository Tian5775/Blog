define(['jquery', 'bootstrap', 'angularAMD', 'angular-route', 'angular-animate', 'myCookie'],function($,bootstrap,angularAMD){
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
			.when('/file',angularAMD.route({
				templateUrl:'view/file.html',
				controller:'file',
				controllerUrl:'../js/file.js'
			}))
			.when('/edit',angularAMD.route({
				templateUrl:'view/edit.html',
				controller:'edit',
				controllerUrl:'../js/edit.js'
			}))
			.when('/detail',angularAMD.route({
				templateUrl:'view/detail.html',
				controller:'detail',
				controllerUrl:'../js/detail.js'
			}))
			.otherwise({
				redirectTo:'/home'
			});
	});

	app.run(function($rootScope,$location){
		var loginName = getCookie("UserName");
		var IsAministrator = getCookie("IsAministrator");
		$rootScope.loginName = "";
		$rootScope.hideLoginLi = true;
		$rootScope.hideUserLi = true;
		$rootScope.hideEditLi = true;
		if(loginName){
			$rootScope.loginName = "你好，" + loginName;
			$rootScope.hideLoginLi = true;
			$rootScope.hideUserLi = false;
			if(IsAministrator){
				$rootScope.hideEditLi = false;
			}
		} else {
			$rootScope.hideLoginLi = false;
			$rootScope.hideUserLi = true;
			$rootScope.hideEditLi = true;
		}
		$rootScope.url = $location.host();

		//在手机界面上点击导航栏后自动收起导航栏
		$rootScope.menuClick = function(){
			var navMenu = angular.element(document.querySelector(".navMenu"));
			if(navMenu.hasClass("in")){
				navMenu.removeClass("in");
			}
		}

		//退出登录
		$rootScope.loginOut = function(){
			$rootScope.loginName = "";
			$rootScope.hideLoginLi = false;
			$rootScope.hideUserLi = true;
			$rootScope.hideEditLi = true;
			deleteCookie("UserName");
			deleteCookie("logined");
			deleteCookie("IsAministrator");
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

	return angularAMD.bootstrap(app);
})
