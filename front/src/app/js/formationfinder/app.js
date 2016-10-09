/**
 * Created by JKindelan on 5/20/2016.
 */
var app = angular.module("FormationFinder", ['app.config',"ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap",'ngMap',"checklist-model","pascalprecht.translate","rzModule"]).factory('PlaceLocation', ["$resource","$http","NgMap",function ($resource, $http,NgMap) {


    }])
    //.value("auth", "/user/login")
    //.value("logout", "/user/logout")
    .run(["$rootScope", "$cookieStore", "$location" , 'CONFIG', function ($rootScope, $cookieStore, $location,  CONFIG) {
        //events

        //First bower download dependencies


        ///Read config file

        ///If exist ip_server and port_server set else use default parameter
      //  $rootScope.transparent = true;
      //  $rootScope.relative = true;
       // $rootScope.fullwidth = true;
     //   $rootScope.align = "left";
        $rootScope.urlBase =   CONFIG.BASE_URL;//"http://localhost:1337";
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $rootScope.transparent = $rootScope.relative =  $rootScope.fullwidth = true;
            $rootScope.align = "left";
            if (next.roles) {//&& !AuthService.usuario
                $location.path('/login'); //needs to login
            }

        });


    }]);

