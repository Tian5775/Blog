define(["app"],function(app){
    app.controller("home",function($scope){

        $(window).on('scroll', function (event) {
            console.log("ok");
        });
    });
});