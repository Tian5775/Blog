define(["app"],function(app){
    app.controller("home",function($scope){
        $scope.checkedPage = 0;
        $scope.pageShow = [true,true,true,true];
         /*$scope.pageChange = function($event, $delta, $deltaX, $deltaY){
            //滚轮向下
            if($deltaY > 0){
                for(var i=0;i<$scope.pageShow.length-1;i++){
                    if($scope.pageShow[i]){
                        $scope.pageShow[i] = false;
                        $scope.pageShow[i+1] = true;
                        return;
                    }
                }
            }
            //滚轮向上
            else {
                for(var i=1;i<$scope.pageShow.length;i++){
                    if($scope.pageShow[i]){
                        $scope.pageShow[i] = false;
                        $scope.pageShow[i -1] = true;
                        return;
                    }
                }
            }
            return;
        }*/

        $scope.pageChange = function($event, $delta, $deltaX, $deltaY){
            if ($deltaY > 0 && $scope.checkedPage < 3){
                $scope.checkedPage ++;
            } else if ($deltaY < 0 && $scope.checkedPage > 0){
                $scope.checkedPage --;
            }
        }
    });
});