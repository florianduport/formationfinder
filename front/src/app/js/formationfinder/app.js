/**
 * Created by JKindelan on 5/20/2016.
 */
var app = angular.module("FormationFinder", ["ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap",'ngMap',"checklist-model"]).factory('PlaceLocation', ["$resource","$http","NgMap",function ($resource, $http,NgMap) {
        var PlaceLocation = {}

        PlaceLocation.searchAllPlace = function () {

        }

        PlaceLocation.searchPlace = function (formationName) {

        }

        //noinspection JSUnresolvedFunction
        return PlaceLocation;
    }])
    //.value("auth", "/user/login")
    //.value("logout", "/user/logout")
    .run(["$rootScope", "$cookieStore", "$location", function ($rootScope, $cookieStore, $location) {
        //events
        $rootScope.transparent = true;
        $rootScope.relative = true;
        $rootScope.fullwidth = true;
        $rootScope.align = "left";
        $rootScope.urlBase = "http://localhost:1337";
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $rootScope.transparent = $rootScope.relative =  $rootScope.fullwidth = true;
            $rootScope.align = "left";
            if (next.roles) {//&& !AuthService.usuario
                $location.path('/login'); //needs to login
            }

        });


    }]);

