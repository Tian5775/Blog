define(["app"],function(app){
    app.controller("home",function($scope){
        $scope.testHide = false;
        $scope.test = function(){
            $scope.testHide = !$scope.testHide;
        }

        $scope.pageShow = [true,false,false,false];
        $scope.pageChange = function($event, $delta, $deltaX, $deltaY){
            if($deltaY > 0){
                for(var i=0;i<$scope.pageShow.length-1;i++){
                    if($scope.pageShow[i]){
                        $scope.pageShow[i] = false;
                        $scope.pageShow[i+1] = true;
                        return;
                    }
                }
            } else {
                for(var i=1;i<$scope.pageShow.length;i++){
                    if($scope.pageShow[i]){
                        $scope.pageShow[i] = false;
                        $scope.pageShow[i -1] = true;
                        return;
                    }
                }
            }
            return;
        }
    });
});