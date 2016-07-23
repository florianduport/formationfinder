/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("IndexController", ["$scope", "$rootScope", "$location",
        function ($scope, $rootScope, $location) {
            $rootScope.transparent = $rootScope.relative = $rootScope.fullwidth = false;
            $rootScope.align = "center";
            $scope.criterio = "";
            $scope.searchFunc = function () {
                $location.path("/search/" + $scope.criterio);
            }


        }])
    .controller("SearchController", ["$scope", "$rootScope", "$http", "$location", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            //gloal configurations


            // local configurations
            $scope.map = false;
            $scope.searchResullt = null;
            $scope.search = {};
            $scope.search.name = $routeParams.criterio;

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
                if ($scope.search.name == "") {
                    // @action mensaje de  error
                    $scope.searchResullt = null;
                    return;
                }
                console.log($scope.search);
                $http.post($rootScope.urlBase + "/formationcenter/search", $scope.search)
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


            //init
            if ($scope.criterio != "") {
                $scope.searchFunc();
            }

            $(".search-result-map").affix({
                offset: {top: 100}
            });

        }])
    .controller("FormationCenterController", ["$scope", "$rootScope", "$http", "$location", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            //gloal configurations


            // local configurations
            $scope.map = false;
            $scope.formationCenter = $routeParams.id;
            $scope.hiddenSmallInfo = true;

            $scope.showDetails = function (index) {
                $scope.formationSelected = $scope.formationCenter.formations[index];
                $('#formationModal').modal('show');

            };
            $scope.bookFormation = function () {
                $('#formationModal').modal('hide');
                var id = $scope.formationSelected.id
                $('#formationModal').on('hidden.bs.modal', function (event) {
                    $('#formationModal').off('hidden.bs.modal');

                });

            }
            $http.post($rootScope.urlBase + "/formationcenter/", {id: $scope.criterio})
                .success(function (data_result) {

                    console.log(data_result);
                    $scope.formationCenter = data_result;

                })
                .error(function (error) {
                    //@action mostrar error
                    console.log(error);
                })
            ;


        }])
    .controller("BookFormationController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            $scope.currentStep = 1;
            $scope.completeStep = 1;
            $scope.steps = 3; //cantidad de pasos

            $scope.customer = {};
            $(".datepicker").datepicker().attr("readOnly", "readOnly");

            $scope.nextStep = function () {
                if ($("#nextBtn").hasClass("disabled"))return;
                if ($scope.currentStep < $scope.steps)
                    $scope.currentStep++;
                $scope.completeStep = $scope.completeStep < $scope.currentStep ? $scope.currentStep : $scope.completeStep;
            }
            $scope.previousStep = function () {
                if ($("#prevBtn").hasClass("disabled"))return;
                if ($scope.currentStep > 1)
                    $scope.currentStep--;
            }
            $scope.finishStep = function () {
                if ($("#finBtn").hasClass("disabled"))return;
                console.log($scope.customer);

            }

        }])
    .controller("FAQController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            $scope.faq = false;
            $http.post($rootScope.urlBase + "/faq")
                .success(function (data_result) {

                    console.log(data_result);
                    $scope.faq = data_result;

                })
                .error(function (error) {
                    //@action mostrar error
                    console.log(error);
                })
            ;

        }])
    .controller("FormationBookController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {

        $scope.customerData = {};

        $scope.book = function () {
            $http.post("http://localhost:1337/formation/bookFormation", {
                    "id": $routeParams.id,
                    "customerData": $scope.customerData
                })
                .success(function (data) {
                    console.log("===========================================================================================");
                    console.log(data);
                })
                .error(function (err){
                    console.log(err);
                });
        }
    }])

    .controller("TestimonySearchController", ["$scope", "$resource", function ($scope, $resource) {
        $scope.data = {};

        Post = $resource("http://localhost:1337/testimony/searchAllTestimonies",$scope.data);

        $scope.search = function () {
            $scope.testimonies = Post.query();

            console.log($scope.testimonies);
        };
    }])

;
