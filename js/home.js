define(["app"],function(app){
    app.controller("home",function($scope){
        $scope.checkedPage = 0;
        $scope.checkedPageCss = "checkedPage0"

        //page0动画样式
        $scope.AmtPage0Title = "Amt-page0-title";
        $scope.AmtBottomMain = "Amt-bottom-main";

        //page1动画样式
        $scope.AmtPage1Color = "";

        $scope.pageChange = function($event){
            var $deltaY = 0;
            if($event.deltaY){
                $deltaY = $event.deltaY;
            } else if ($event.originalEvent){
                $deltaY = $event.originalEvent.deltaY;
            }
            if ($deltaY > 0 && $scope.checkedPage < 3){
                $scope.checkedPage ++;
            } else if ($deltaY < 0 && $scope.checkedPage > 0){
                $scope.checkedPage --;
            }
            $scope.checkedPageCss = "checkedPage" + $scope.checkedPage;

            //动画样式全部清空
            $scope.AmtPage0Title = "";
            $scope.AmtBottomMain = "";
            $scope.AmtPage1Color = "";
            if($scope.checkedPage == 0){
                $scope.AmtPage0Title = "Amt-page0-title";
                $scope.AmtBottomMain = "Amt-bottom-main";
            } else if($scope.checkedPage == 1) {
                $scope.AmtPage1Color = "Amt-page1-color";
            }
        }
    });
});