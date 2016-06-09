/**
 * Created by JKindelan on 5/20/2016.
 */
var app = angular.module("FormationFinder", ["ngResource", "ngRoute", "ngCookies"])
    //.value("auth", "/user/login")
    //.value("logout", "/user/logout")
    .run(["$rootScope","$cookieStore","$location",function ($rootScope, $cookieStore, $location) {
        //events
        $rootScope.transparent = true;
        $rootScope.urlBase = "/FormationFinder/peticiones";
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.roles ) {//&& !AuthService.usuario
                $location.path('/login'); //needs to login
            }

        });


    }]);

