define(["app","jquery","editormd","imageDialog","emojiDialog","linkDialog","referenceLinkDialog","codeBlockDialog","preformattedTextDialog","jqueryConfirm","jquerySticky"],function(app,$,editormd) {
    app.controller("detail", function ($scope, $location, $http, $rootScope, $compile) {
        var testEditor;

        $scope.openFile = function(){
            console.log("openFile");
            var fileName = "../lib/md/" + $location.search().fileName;

            $.get(fileName, function(markdown) {
                testEditor = editormd.markdownToHTML("detail", {
                    markdown        : markdown,
                    htmlDecode      : "style,script,iframe",  // you can filter tags decode
                    emoji           : true,
                    taskList        : true,
                    tex             : true,  // 默认不解析
                    flowChart       : true,  // 默认不解析
                    sequenceDiagram : true,  // 默认不解析
                });
            });
        }

    });
});