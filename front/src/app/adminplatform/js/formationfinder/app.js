var app = angular.module("adminplatform", ['app.config',"ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap"])

.run(["$rootScope", "$cookieStore", "$location", 'CONFIG', function ($rootScope, $cookieStore, $location, CONFIG) {
    //events
    $rootScope.urlBase = CONFIG.BASE_URL;
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