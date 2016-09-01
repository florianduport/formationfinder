var app = angular.module("adminplatform", ["ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap"])

.run(["$rootScope", "$cookieStore", "$location", function ($rootScope, $cookieStore, $location) {
    //events
    $rootScope.urlBase = "http://137.74.172.220:1337";
    $rootScope.userToken = null;
    $rootScope.userAuthenticated = false;
    $rootScope.username = null;
    $rootScope.$on('$routeChangeStart', function (event, next) {
        //if (next.roles && ) {//&& !AuthService.usuario
        //    $location.path('/login'); //needs to login
        //}
        if(!$rootScope.userAuthenticated){
            $location.path('/');
        }
    }); //end of $on method.
}]); //End of run method.