require.config({
    paths:{
        "jquery":"../plugin/jQuery/jquery.min",
        'bootstrap':'../plugin/bootstrap/js/bootstrap.min',
        'angular':'../plugin/angular/angular.min',
        'angular-route': '../plugin/angular/angular-route.min',
        'angular-animate': '../plugin/angular/angular-animate.min',
        'angularAMD': '../plugin/angular/angularAMD.min',
        'angular-touch': '../plugin/angular/angular-touch.min',
        'myCookie':'../js/cookie',

        //µ¯³ö¿ò²å¼þ
        'jqueryConfirm':'../plugin/jqueryConfirm/js/jquery-confirm',
        'jquerySticky':'../plugin/jqueryConfirm/js/jquery.sticky.min',

        //editor.mdÒÀÀµÄ£¿é
        'marked': "../plugin/editor.md/lib/marked.min",
        'prettify': "../plugin/editor.md/lib/prettify.min",
        'raphael': "../plugin/editor.md/lib/raphael.min",
        'underscore': "../plugin/editor.md/lib/underscore.min",
        'flowchart': "../plugin/editor.md/lib/flowchart.min",
        'jqueryflowchart': "../plugin/editor.md/lib/jquery.flowchart.min",
        'sequenceDiagram': "../plugin/editor.md/lib/sequence-diagram.min",
        'katex': "../plugin/editor.md/lib/katex.min",
        'imageDialog': "../plugin/editor.md/plugins/image-dialog/image-dialog",
        'emojiDialog': "../plugin/editor.md/plugins/emoji-dialog/emoji-dialog",
        'linkDialog': "../plugin/editor.md/plugins/link-dialog/link-dialog",
        'referenceLinkDialog': "../plugin/editor.md/plugins/reference-link-dialog/reference-link-dialog",
        'codeBlockDialog': "../plugin/editor.md/plugins/code-block-dialog/code-block-dialog",
        'preformattedTextDialog': "../plugin/editor.md/plugins/preformatted-text-dialog/preformatted-text-dialog",
        'editormd':'../plugin/editor.md/editormd.amd',

        'app':'../js/app'
    },
    shim:{
        'bootstrap':['jquery'],
        'angularAMD': ['angular'],
        'angular-animate': ['angular'],
        'angular-route': ['angular'],
        'angular-touch': ['angular'],
        'editormd':['jquery']
    },
    deps:['app']
});
