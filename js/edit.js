define(["app","jquery","editorMd"],function(app,$,editormd){
    app.controller("edit",function($scope){
        (function a(){
            editormd.loadCSS("/plugin/editor.md/lib/codemirror/addon/fold/foldgutter");

            testEditor = editormd("test-editormd", {
                width   : "90%",
                height  : 640,
                syncScrolling : "single",
                emoji : true,
                saveHTMLToTextarea : true,                // ±£¥ÊHTMLµΩTextarea
                path    : "../plugin/editor.md/lib/"
            });
        })();
    })
});