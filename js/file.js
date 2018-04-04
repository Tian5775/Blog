define(["app","jquery","editormd"],function(app){
    app.controller("file",function($scope,$location,$http,$rootScope,$compile){
        $scope.fileList = [];
        $scope.nowPageNum = 1;
        $scope.pageSize = 10;
        $scope.previousButtonHide = false;
        $scope.nextButtonHide = false;

        $scope.fileLoad = function(){
            $http({
                withCredentials: true,
                method:"get",
                url:'http://' + $rootScope.url + ':8888/readdir'
            }).then(
                function successCallback(response){
                    if(response.data && response.data.length > 0){
                        $scope.fileList = response.data;
                        filePaging(response.data,$scope.pageSize);
                        changePage(response.data,1,$scope.pageSize);
                        $scope.nowPageNum = 1;
                    }
                    return false;
                },
                function errorCallback(response){
                    $.alert({
                        title: '',
                        content: '读取文件列表失败！',
                        autoClose: 'confirm|2000',
                        confirmButton: 'Yes'
                    });
                    return false;
                }
            );
        }

        //分页页码
        function filePaging(data,pageSize){
            var pageLength = Math.ceil(data.length / pageSize);//向上取整
            var html = "";
            html += '<li data-ng-hide="previousButtonHide"><a href="javascript:void(0)" aria-label="Previous" data-ng-click="previousPage()"><span aria-hidden="true">&laquo;</span></a></li>';

            for (var i = 0;i < pageLength ;i ++){
                var thisHtml = '<li><a href="javascript:void(0)" data-ng-click="pageNumClick(' + ( i + 1) + ')">' + ( i + 1) + '</a></li>';
                html += thisHtml;
            }

            html += '<li data-ng-hide="nextButtonHide"><a href="javascript:void(0)" aria-label="Next" data-ng-click="nextPage()"><span aria-hidden="true">&raquo;</span></a></li>';

            var ele = $compile(html)($scope);
            $("ul.pager").html(ele);
        }

        $scope.pageNumClick = function(num){
            if($scope.nowPageNum == num){
                return false;
            }

            changePage($scope.fileList,num,$scope.pageSize);
            $scope.nowPageNum = num;
        }

        $scope.previousPage = function(){
            if($scope.nowPageNum == 1){
                return false;
            }

            var newPageNum = $scope.nowPageNum - 1;
            changePage($scope.fileList,newPageNum,$scope.pageSize);
            $scope.nowPageNum = newPageNum;
        }

        $scope.nextPage = function(){
            var pageLength = Math.ceil($scope.fileList.length / $scope.pageSize);
            if($scope.nowPageNum == pageLength){
                return false;
            }

            var newPageNum = $scope.nowPageNum + 1;
            changePage($scope.fileList,newPageNum,$scope.pageSize);
            $scope.nowPageNum = newPageNum;
        }

        function changePage(data,pageNum,pageSize){
            var startNum = (pageNum - 1) * pageSize;
            var stopNum = pageNum * pageSize;
            stopNum = stopNum < data.length ? stopNum : data.length;
            var html = "";
            for(var i = startNum;i < stopNum;i ++){
                var thisFile = data[i];
                thisHtml  = '<div class="jumbotron"><h2>' + thisFile.Name + '</h2><p>' + thisFile.Synopsis + '</p><a class="btn btn-primary btn-lg" href="#/detail?fileName=' + thisFile.Name + '" data-ng-click="openFile($event)" role="button">Learn more</a></p></div>';
                html += thisHtml;
            }

            var ele = $compile(html)($scope);
            $(".fileList").html(ele);
            if(pageNum == 1){
                $scope.previousButtonHide = true;
            } else if($scope.previousButtonHide){
                $scope.previousButtonHide = false;
            }
            var pageLength = Math.ceil(data.length / pageSize);
            if(pageNum == pageLength){
                $scope.nextButtonHide = true;
            } else if($scope.nextButtonHide){
                $scope.nextButtonHide = false;
            }
        }

        $scope.openFile = function(event){
            console.log(event);
        }
    })
});