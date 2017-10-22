require.config({
    paths:{
        "jquery":"../plugin/jQuery/jquery.min",
        'bootstrap':'../plugin/bootstrap/js/bootstrap.min',
        'angular':'../plugin/angular/angular.min',
        'angular-route': '../plugin/angular/angular-route.min',
        'angularAMD': '../plugin/angular/angularAMD.min',
        'myCookie':'../js/cookie',
        'app':'../js/app'
    },
    shim:{
        'bootstrap':['jquery'],
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },
    deps:['app']
});
