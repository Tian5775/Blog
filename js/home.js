define(["app"],function(app){
    app.controller("home",function($scope){
        $scope.checkedPage = 0;
        $scope.checkedPageCss = "checkedPage0"

        $scope.pageChange = function($event, $delta, $deltaX, $deltaY){
            if ($deltaY > 0 && $scope.checkedPage < 3){
                $scope.checkedPage ++;
            } else if ($deltaY < 0 && $scope.checkedPage > 0){
                $scope.checkedPage --;
            }
            $scope.checkedPageCss = "checkedPage" + $scope.checkedPage;
        }
    });
});