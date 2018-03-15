define(["app","jquery","editormd"],function(app){
    app.controller("file",function($scope,$location,$http,$rootScope,$compile){
        $scope.fileList = [];
        $scope.fileLoad = function(){
            $http({
                withCredentials: true,
                method:"get",
                url:'http://' + $rootScope.url + ':8888/readdir'
            }).then(
                function successCallback(response){
                    if(response.data && response.data.length > 0){
                        $scope.fileList = response.data;
                        var pageSize = 10;
                        filePaging(response.data,pageSize);
                        filePage(response.data,1,pageSize);
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
            var num = Math.ceil(data.length / pageSize);//向上取整
            var html = "";
            html += '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

            for (var i = 0;i < num ;i ++){
                var thisHtml = '<li><a href="#">' + ( i + 1) + '</a></li>';
                html += thisHtml;
            }

            html += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';

            var ele = $compile(html)($scope);
            $("ul.pager").html(ele);
        }

        function filePage(data,pageNum,pageSize){
            var startNum = (pageNum - 1) * pageSize;
            var stopNum = pageNum * pageSize;
            var html = "";
            for(var i = startNum;i < stopNum;i ++){
                var thisFile = data[i];
                thisHtml  = '<div class="jumbotron"><h2>' + thisFile.Name + '</h2><p>' + thisFile.Synopsis + '</p><a class="btn btn-primary btn-lg" href="javascript:void(0)" data-ng-click="openFile($event)" role="button">Learn more</a></p></div>';
                html += thisHtml;
            }

            var ele = $compile(html)($scope);
            $(".fileList").html(ele);
        }

        $scope.openFile = function(event){
            console.log(event);
        }
    })
});