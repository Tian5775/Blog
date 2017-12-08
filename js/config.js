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
        'app':'../js/app'
    },
    shim:{
        'bootstrap':['jquery'],
        'angularAMD': ['angular'],
        'angular-animate': ['angular'],
        'angular-route': ['angular'],
        'angular-touch': ['angular']
    },
    deps:['app']
});
