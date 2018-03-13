define(["app","jquery","editormd","imageDialog","emojiDialog","linkDialog","referenceLinkDialog","codeBlockDialog","preformattedTextDialog","jqueryConfirm","jquerySticky"],function(app,$,editormd){
    app.controller("edit",function($scope,$location,$http,$rootScope,$compile){
        $scope.fileUlHtml = "";
        $scope.mdTitle = "";
        $scope.mdTitleOld = "";
        $scope.mdId = "";

        $scope.editLoad = function(){
            var UserName = getCookie("UserName");
            if(!UserName){
                $location.path("/login");
                return;
            }

            testEditor = editormd("editormd", {
                width   : "90%",
                height  : 640,
                syncScrolling : "single",
                emoji : true,
                saveHTMLToTextarea : true,
                path : "../plugin/editor.md/lib/"
            });
        }

        $scope.readdir = function(){
            $http({
                withCredentials: true,
                method:"get",
                url:"http://" + $rootScope.url + ":8888/readdir"
            }).then(
                function successCallback(response){
                    if(response.data && response.data.length > 0){
                        var data = response.data;
                        var thisHtml = "";
                        for(var i = 0; i < data.length; i++){
                            thisHtml += '<li data-ng-click="fileLiClick($event)" fileId=' + data[i].Id + '>' + data[i].Name + '</li>';
                        }

                        var ele = $compile(thisHtml)($scope);//避免li绑定的点击事件失效
                        /*angular.element('.fileList').html("");//清空文件列表
                        angular.element('.fileList').append(ele);*/
                        $(".fileList").html(ele);
                    }
                },
                function errorCallback(response){
                    console.log("error");
                }
            );
        }

        $scope.fileLiClick = function(event){
            var title = $(event.target).html();
            var id = $(event.target).attr("fileId");

            $scope.mdTitle = title;
            $scope.mdTitleOld = title;
            $scope.mdId = id;

            $http({
                withCredentials: true,
                method:"post",
                headers:{'Content-Type': 'application/json'},
                url:"http://" + $rootScope.url + ":8888/readFile",
                data :{
                    title: title
                }
            }).then(
                function successCallback(response){
                    if(response.data.result == 1){
                        var text = response.data.text;
                        testEditor.cm.setValue(text);
                    }
                },
                function errorCallback(response){
                    console.log("error");
                }
            );
        }

        $scope.editSubmit = function(){
            var mdTitle = $scope.mdTitle;
            var mdTitleOld = $scope.mdTitleOld;
            var mdId = $scope.mdId;
            var md = testEditor.getMarkdown();       // 获取 Markdown 源码
            //var b = testEditor.getHTML();           // 获取 Textarea 保存的 HTML 源码
            //var c = testEditor.getPreviewedHTML();  // 获取预览窗口里的 HTML，在开启 watch 且没有开启 saveHTMLToTextarea 时使用

            $http({
                withCredentials: true,
                method:"post",
                headers:{'Content-Type': 'application/json'},
                url:'http://' + $rootScope.url + ':8888/writeFile',
                data:{
                    title:mdTitle,
                    oldTitle:mdTitleOld,
                    Id:mdId,
                    text:md
                }
            }).then(
                function successCallback(response){
                    if(response.data.result == 1){
                        $scope.readdir();
                        $scope.mdTitleOld = $scope.mdTitle;
                        $.alert({
                            title: '',
                            content: '文件保存成功！',
                            autoClose: 'confirm|3000',
                            confirmButton: 'Yes'
                        });
                    }
                },
                function errorCallback(response){
                }
            );
        }

        $scope.deleteFile = function(){
            var title = $scope.mdTitleOld;
            var Id = $scope.mdId;
            $.confirm({
                title: '',
                content: '确定删除该文件?删除后不能恢复',
                confirmButton: 'Yes',
                cancelButton: 'NO',
                confirm: function(){
                    $http({
                        withCredentials: true,
                        method:"post",
                        headers:{'Content-Type': 'application/json'},
                        url:'http://' + $rootScope.url + ':8888/deleteFile',
                        data:{
                            title:title,
                            Id:Id
                        }
                    }).then(
                        function successCallback(response){
                            if(response.data.result == 1){
                                $scope.readdir();
                                $scope.mdTitle = "";
                                $scope.mdTitleOld = "";
                                testEditor.cm.setValue("");
                                $.alert({
                                    title: '',
                                    content: '文件已删除！',
                                    autoClose: 'confirm|2000',
                                    confirmButton: 'Yes'
                                });
                            }
                        },
                        function errorCallback(response){
                        }
                    );
                }
            });
        }

        $scope.newFile = function(){
            $scope.mdTitle = "";
            $scope.mdTitleOld = "";
            testEditor.cm.setValue("");
        }
    })
});