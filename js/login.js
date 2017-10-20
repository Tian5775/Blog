define(["app"],function(app){
   app.controller("login",function($scope,$http,$rootScope){
       $scope.num = 11;
       $scope.userName = '';
       $scope.userPassword = '';
       $scope.login = function(){
           $http({
               method:"get",
               url:"http://localhost:8888/loginIn?userName=" + $scope.userName + "&userPassword=" + $scope.userPassword
           }).then(
               function successCallback(response){
                   console.log("登陆成功");
                   $rootScope.loginName = "已登录";
               },
               function errorCallback(response){
                    console.log("登陆失败");
               }
           );
       }
   }) ;
});