//引入touch模块
define(["app","angular-touch"],function(app){
    app.controller("home",function($scope){
        $scope.checkedPage = 0;
        $scope.checkedPageCss = "checkedPage0"

        //page0动画样式
        $scope.AmtPage0Title = "Amt-page0-title";
        $scope.AmtBottomMain = "Amt-bottom-main";

        //page1动画样式
        $scope.AmtPage1Color = "";

        //page2动画样式
        $scope.AmtPage2Color = "";

        //page3动画样式
        $scope.AmtPage3Color = "";

        $scope.mousewheelChangePage = function($event){
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

            pageChage();
        }

        $scope.touchmoveChangePage = function(){
            if(!this.moveFuncReturn){
                if(this.startEvent.originalEvent){
                    var startY = this.startEvent.originalEvent.changedTouches[0].pageY;
                } else if(this.startEvent.changedTouches){
                    var startY = this.startEvent.changedTouches[0].pageY;
                }

                if(event.originalEvent){
                    var endY = event.originalEvent.changedTouches[0].pageY;
                } else if(event.changedTouches){
                    var endY = event.changedTouches[0].pageY;
                }

                var $deltaY = startY - endY;
                if($deltaY > 0  && $scope.checkedPage < 3){
                    $scope.checkedPage ++;
                    this.moveFuncReturn = true;
                    pageChage();
                } else if($deltaY < 0 && $scope.checkedPage > 0){
                    $scope.checkedPage --;
                    this.moveFuncReturn = true;
                    pageChage();
                }
            }
        }

        function pageChage (){
            $scope.checkedPageCss = "checkedPage" + $scope.checkedPage;

            //动画样式全部清空
            $scope.AmtPage0Title = "";
            $scope.AmtBottomMain = "";
            $scope.AmtPage1Color = "";
            $scope.AmtPage2Color = "";
            if($scope.checkedPage == 0){
                $scope.AmtPage0Title = "Amt-page0-title";
                $scope.AmtBottomMain = "Amt-bottom-main";
            } else if ($scope.checkedPage == 1){
                $scope.AmtPage1Color = "Amt-page1-color";
            }else if($scope.checkedPage == 2) {
                $scope.AmtPage2Color = "Amt-page2-color";
            } else if ($scope.checkedPage == 3){
                $scope.AmtPage3Color = "Amt-page3-color";
            }
        }
    });
});