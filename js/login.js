define(["app","myCookie"],function(app){
   app.controller("login",function($scope,$http,$rootScope){
       $scope.num = 11;
       $scope.userName = '';
       $scope.userPassword = '';
       $scope.login = function(){
           $http({
               withCredentials: true,
               method:"get",
               url:"http://localhost:8888/loginIn?userName=" + $scope.userName + "&userPassword=" + $scope.userPassword
           }).then(
               function successCallback(response){
                   if(response.data && response.data.result ){
                       if(response.data.result && response.data.result == 1){
                           $rootScope.loginName = "你好，" + response.data.Name;
                           setCookie("UserName",response.data.Name,365);
                           console.log("登录成功");
                       }else if(response.data.result && response.data.result == 0){
                            console.log(response.data.message);
                       }
                   }
               },
               function errorCallback(response){
                    console.log("登陆失败");
               }
           );
       }
   }) ;
});