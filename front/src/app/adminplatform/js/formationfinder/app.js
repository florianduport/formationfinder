var app = angular.module("adminplatform", ['app.config', "ngResource", "ngRoute",
        "ngCookies", "ngAnimate", "pascalprecht.translate",
        "ui.bootstrap", "angular-jwt"])

    //Configuration for security
    .config(function ($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.tokenGetter = ['config', function(config) {

            return localStorage.getItem('admin_token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })
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
            if (!$rootScope.userAuthenticated) {
                $location.path('/');
            }
        }); //end of $on method.
    }]); //End of run method.