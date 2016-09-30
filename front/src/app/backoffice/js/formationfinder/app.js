/**
 * Created by JKindelan on 5/20/2016.
 */
var app = angular.module("Backoffice", ['app.config',"ngResource", "ngRoute", "ngCookies","ngAnimate","ui.bootstrap",'ngMap',"checklist-model","pascalprecht.translate","rzModule"]).factory('PlaceLocation', ["$resource","$http","NgMap",function ($resource, $http,NgMap) {
        var PlaceLocation = {}

        PlaceLocation.searchAllPlace = function () {

        }

        PlaceLocation.searchPlace = function (formationName) {

        }

        //noinspection JSUnresolvedFunction
        return PlaceLocation;
    }])
    .run(["$rootScope", "$cookieStore", "$location",'CONFIG', function ($rootScope, $cookieStore, $location,CONFIG) {
        //events
        $rootScope.transparent = true;
        $rootScope.username = "";
        $rootScope.formationsize = 0;
        $rootScope.customersize = 0;
        $rootScope.formationcenterData = {}
        $rootScope.formationcenterData.formations = []
        $rootScope.formationcenterData.customers = []
        $rootScope.relative = true;
        $rootScope.fullwidth = true;
        $rootScope.align = "left";
        $rootScope.urlBase = CONFIG.BASE_URL;;
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

