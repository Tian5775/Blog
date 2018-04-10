define(["app","myCookie"],function(app){
   app.controller("login",function($scope,$http,$rootScope,$location){
       $scope.userName = '';
       $scope.userPassword = '';
       $scope.showMessage = false;
       $scope.message = "登陆失败";
       $scope.login = function(){
           if($scope.userName != '' && $scope.userPassword != ''){
               $scope.showMessage = false;
               $http({
                   withCredentials: true,
                   method:"get",
                   url:"http://" + $rootScope.url + ":8888/loginIn?userName=" + $scope.userName + "&userPassword=" + $scope.userPassword
               }).then(
                   function successCallback(response){
                       if(response.data){
                           if(response.data.result == 1){
                               $rootScope.loginName = "你好，" + response.data.Name;
                               $rootScope.hideLoginLi = true;
                               $rootScope.hideUserLi = false;
                               setCookie("UserName",response.data.Name,30);
                               setCookie("logined",true,30);
                               setCookie("IsAministrator",response.data.IsAministrator,30);
                               if(response.data.IsAministrator){
                                   $rootScope.hideEditLi = false;
                               }
                               $location.path("/article");
                           }else if(response.data.result == 0){
                               $scope.showMessage = true;
                               $scope.message = response.data.message;
                           }
                       }
                   },
                   function errorCallback(response){
                       $scope.showMessage = true;
                   }
               );
           }else{
               $scope.showMessage = true;
               $scope.message = "用户名和密码不能为空!";
           }
       }

   }) ;
});