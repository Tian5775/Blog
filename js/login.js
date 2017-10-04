define(["app"],function(app){
   app.controller("login",function($scope,$http){
       $scope.num = 11;
       $scope.login = function(){
           console.log($scope.num);
           $http.get('http://localhost:8888/loginIn').then(function(res){
               debugger;
               //console.log(res);
           });
       }
   }) ;
});