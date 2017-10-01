myApp.controller('login',function($scope,$http){
    $scope.num = 11;
    $scope.login = function(){
        console.log($scope.num);
        $http.get('http://localhost:8888/').then(function(res){
            console.log(res);
        });
    }
})