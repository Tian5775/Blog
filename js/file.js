define(["app","jquery","editormd"],function(app){
    app.controller("file",function($scope,$location,$http,$rootScope,$compile){
        $scope.fileLoad = function(){
            $http({
                withCredentials: true,
                method:"post",
                headers:{'Content-Type': 'application/json'},
                url:'http://' + $rootScope.url + ':8888/fileLoad'
            }).then(
                function successCallback(response){
                    if(response.data.result == 1){

                    }
                },
                function errorCallback(response){
                }
            );
        }
    })
});