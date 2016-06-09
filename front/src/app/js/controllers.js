/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("IndexController", ["$scope", "$rootScope", "$location",
        function ($scope, $rootScope, $location) {
            $scope.criterio = "";
            $scope.searchFunc = function () {
                $location.path("/search/" + $scope.criterio);
            }


        }])
    .controller("SearchController", ["$scope", "$rootScope", "$http", "$location", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            //gloal configurations
            $rootScope.transparent = false;

            // local configurations
            $scope.map = false;
            $scope.searchResullt = null;
            $scope.criterio = $routeParams.criterio;

            // functions
            $scope.showMap = function (id) {

                if (id) {
                    //@action pintar los puntos del centro seleccionado
                }
                else {
                    if ($scope.map) {
                        //@action ocultar mapa
                        $scope.map = false;
                        return;
                    }
                    //@action pintar todos los puntos
                }
                $scope.map = true;

            };

            $scope.searchFunc = function () {
                if ($scope.criterio == "") {
                    // @action mensaje de  error
                    return;
                }
                $http.post($rootScope.urlBase + "/formationcenter/search", {search: $scope.criterio})
                    .success(function (data_result) {

                        console.log(data_result);
                        $scope.searchResullt = data_result;

                    })
                    .error(function (error) {
                        //@action mostrar error
                        console.log(error);
                    })
                ;
            };
            $scope.searchBtnFunc = function () {
                if ($scope.criterio == "") {
                    // @action mensaje de  error
                    return;
                }
                $scope.searchFunc();

            };

            //init
            if ($scope.criterio != "") {
                $scope.searchFunc();
            }

            $(".search-result-map").affix({
                offset: {top: 100}
            });

        }])
    .controller("FormationCenterController", ["$scope", "$rootScope", "$http", "$location","$routeParams",
        function ($scope, $rootScope,$http, $location,$routeParams) {
            //gloal configurations
            $rootScope.transparent = false;

            // local configurations
            $scope.map = false;
            $scope.formationCenter = $routeParams.id;

            $http.post($rootScope.urlBase + "/formationcenter/get", {search: $scope.criterio})
                .success(function (data_result) {

                    console.log(data_result);
                    $scope.formationCenter = data_result;

                })
                .error(function (error) {
                    //@action mostrar error
                    console.log(error);
                })
            ;


        }]);
