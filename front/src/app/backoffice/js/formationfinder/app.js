/**
 * Created by JKindelan on 5/20/2016.
 */
var app = angular.module("Backoffice", ["ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap",'ngMap',"checklist-model","rzModule"]).factory('PlaceLocation', ["$resource","$http","NgMap",function ($resource, $http,NgMap) {
        var PlaceLocation = {}

        PlaceLocation.searchAllPlace = function () {

        }

        PlaceLocation.searchPlace = function (formationName) {

        }

        //noinspection JSUnresolvedFunction
        return PlaceLocation;
    }])
    .run(["$rootScope", "$cookieStore", "$location", function ($rootScope, $cookieStore, $location) {
        //events
        $rootScope.transparent = true;
        $rootScope.username = "";
        $rootScope.formationcenterData = {}
        $rootScope.formationcenterData.formations = []
        $rootScope.formationcenterData.customers = []
        $rootScope.relative = true;
        $rootScope.fullwidth = true;
        $rootScope.align = "left";
        $rootScope.urlBase = "http://172.16.0.11:1337";
        $rootScope.userToken = null;
        $rootScope.userAuthenticated = false;
        $rootScope.formationCenter = null;
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $rootScope.transparent = $rootScope.relative =  $rootScope.fullwidth = true;
            $rootScope.align = "left";
            //if (next.roles && ) {//&& !AuthService.usuario
            //    $location.path('/login'); //needs to login
            //}

            if(!$rootScope.userAuthenticated){
                $location.path('/');
            }

        });


    }]);

