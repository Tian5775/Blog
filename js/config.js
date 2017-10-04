require.config({
    paths:{
        "jquery":"../plugin/jQuery/jquery.min",
        'bootstrap':'../plugin/bootstrap/bootstrap.min',
        'angular':'../plugin/angular/angular.min',
        'angular-route': '../plugin/angular/angular-route.min',
        'angularAMD': '../plugin/angular/angularAMD.min',
        'app':'../js/app'
    },
    shim:{
        'bootstrap':['jquery'],
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },
    deps:['app']
});
