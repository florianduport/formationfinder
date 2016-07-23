/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("IndexController", ["$scope", "$rootScope", "$location",
        function ($scope, $rootScope, $location) {
            $rootScope.transparent = $rootScope.relative = $rootScope.fullwidth = false;
            $rootScope.align = "center";
            $scope.criterio = "";
            $scope.searchFunc = function () {

                if ($scope.criteria == "") {
                    // @action mensaje de  error
                    $scope.searchResullt = null;
                    return;
                }


                console.log("Buscando data")
                $location.path("/search/" + $scope.criteria);
            };


        }])
    .controller("SearchController", ["$scope", "$rootScope", "$http", "$location", "$routeParams",
        function ($scope, $rootScope, $http, $location, $routeParams) {
            //gloal configurations
            $scope.search = {};
            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };
            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }
            $scope.today = function() {
                $scope.search.initialDate  = new Date();
            };
            $scope.today();
            //gloal configurations
            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
            $scope.format = $scope.formats[0];
            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.tomorrow = function() {
                $scope.search.endDate  = tomorrow;
            };

            $scope.tomorrow()
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }

            // local configurations
            app = this;
            $scope.map = false;
            $scope.searchResullt = null;
            $scope.search = {};
            $scope.search.name = $routeParams.criteria;
            $scope.app = {}
            $scope.app.currentPage = 0;
            $scope.app.maxSize = 5;
            $scope.app.itemPerPage = 5;
            $scope.app.totalItems = 0;

            //data = 5;
            $routeParams.criteria = String($routeParams.criteria).trim()
            $scope.formationcenterlist = []
           // console.log("dddddd", $routeParams.criteria != 'undefined')
           // console.log("dddddd", String($routeParams.criteria).trim())
           // console.log("dddddd " + $routeParams.criteria)
     ////if criteria is empty

            $scope.alerts = [

            ];

//---------------------------------------------------------------------------------------------------------------
            ///Show modal with formation´s Formation Center information
            $scope.searchFuncList = function(){
                    $scope.errorValid = true
                    console.log("INSERTANDO ALERTA")
               // $scope.alerts.push( { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' });

                //$scope.errorMessage = "Probando "
                if ( typeof $scope.criteriaList == "undefined" || $scope.criteriaList == "")
                    $scope.criteriaList = ""
                $scope.search.name = $scope.criteriaList;
                $scope.app.currentPage = 0;
                $scope.countRecords();
                $scope.getPagableRecords();

            }

            $scope.closeAlert = function(index ) {
                $scope.alerts.splice(index, 1);
            }

            $scope.searchPlusInformation = function (formationId) {

            }

            $scope.countRecords = function() {

                if (  $scope.search.name != 'undefined'){
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if ( !isNaN(parseInt ($scope.search.name ))){

                        $http.post($rootScope.urlBase + "/Formation/countbyzipcode", {
                                zipcode:  $scope.search.name
                               })
                            .success(function (data_result) {
                                if (data_result.res != "OK") {
                                    $scope.app.totalItems = 0;
                                    return;
                                }
                                console.log("Cantidad de objetos " ,data_result.size )
                                $scope.app.totalItems = data_result.size
                                return;
                                // console.log("RESULTADOS", data_result)
                            })
                            .error(function (error) {
                                //@action mostrar error
                                $scope.errorMessage = error
                                console.log(error);
                                return
                            })
                        ;
                    }
                }


                if ( $scope.search.name == "undefined" )
                    $scope.search.name = ""

                $http.post($rootScope.urlBase + '/Formation/countbycity', {
                        city:  $scope.search.name
                    })
                    .success(function (data_result) {
                        if (data_result.res != "OK") {
                            $scope.app.totalItems = 0;
                            return;
                        }
                        console.log("Cantidad de objetos ---" ,data_result.size )
                        $scope.app.totalItems = data_result.size
                        return;
                        // console.log("RESULTADOS", data_result)
                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log(error);
                        return
                    })


                /*$http.get($rootScope.urlBase + "/formation/count")
                    .success(function(data,status,headers,config){

                        if (data.res != "OK") {
                            $scope.app.totalItems = 0;
                            return;
                        }
                        console.log("Cantidad de objetos " ,data.size )
                        $scope.app.totalItems = data.size
                    })
                    .error(function(data,status,header,config){
                        console.log(data);
                    });*/
            };

            $scope.getPagableRecords = function() {

                var pageData = 0;

                if ( $scope.app.currentPage > 0) {
                    pageData = $scope.app.currentPage - 1;
                    pageData = String(pageData)
                }

                //console.log("Pagination " ,pageData )

                if (  $scope.search.name != 'undefined'){
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if ( !isNaN(parseInt ($scope.search.name ))) {
                        console.log("Es un numero")
                        ///Validar si es un numero postal angular.isNumber(value)


                        $http.post($rootScope.urlBase + "/formation/searchbyzipcode", {
                                zipcode:  $scope.search.name,
                                page : pageData,
                                len : $scope.app.itemPerPage})
                            .success(function (data_result) {
                                if (data_result.err ){
                                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                    ///regresar a la pagina inicial
                                    $scope.errorValid = true ;
                                    alert(data_result.err );
                                   // $location.path("/");
                                    return;
                                }
                                $scope.formationcenterlist = data_result;
                                $scope.formations = [];
                                //console.log("Resultados", data_result[0].formation.formationCenter)
                                data_result.forEach(function (iFormationcenter, ivalue) {


                                    iFormationcenter.formation.name = iFormationcenter.formation.formationCenter.name;
                                    iFormationcenter.formation.city = iFormationcenter.formation.formationCenter.city;
                                    iFormationcenter.formation.address = iFormationcenter.formation.formationCenter.address;
                                    //console.log("Valor ",iFormation)
                                    $scope.formations.push(iFormationcenter.formation)
                                })

                               // console.log("RESULTADOS", data_result)
                            })
                            .error(function (error) {
                                //@action mostrar error
                                $scope.errorMessage = error
                                console.log(error);
                            })
                        ;

                    }
                    else {
                        ///Validar si es un numero postal angular.isNumber(value)
                        $http.post($rootScope.urlBase + "/formation/searchbycity", {
                                "city": $scope.search.name,
                                page : pageData,
                                len : $scope.app.itemPerPage})
                            .success(function (data_result) {
                                if (data_result.err ){
                                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                    ///regresar a la pagina inicial
                                    $scope.errorValid = true ;
                                    alert(data_result.err );
                                    $location.path("/");
                                    return;
                                }

                                $scope.formationcenterlist = data_result;
                                $scope.formations = [];
                               // console.log("Resultados", data_result[0].formation.formationCenter)
                                data_result.forEach(function (iFormationcenter, ivalue) {


                                    iFormationcenter.formation.name = iFormationcenter.formation.formationCenter.name;
                                    iFormationcenter.formation.city = iFormationcenter.formation.formationCenter.city;
                                    iFormationcenter.formation.address = iFormationcenter.formation.formationCenter.address;
                                    //console.log("Valor ",iFormation)
                                    $scope.formations.push(iFormationcenter.formation)
                                })
                               // console.log("RESULTADOS", data_result)
                            })
                            .error(function (error) {
                                //@action mostrar error
                                console.log('RESULTADOS', error);
                                $scope.errorMessage = error
                                console.log(error);
                            })
                        ;
                    }

                }
                else {

                    //if ($scope.app.currentPage == 1)
                    //    $scope.app.currentPage = 0
                    //console.log("Sin nombre ======================= " , $scope.app.currentPage)
                         $http.post($rootScope.urlBase + "/formation/searchbycity", {
                            city: "",
                            page : pageData,
                            len : $scope.app.itemPerPage})
                        .success(function (data_result) {
                            if (data_result.err ){
                                ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                ///regresar a la pagina inicial
                                $scope.errorValid = true ;
                                alert(data_result.err );
                                $location.path("/");
                                return;
                            }

                            $scope.formationcenterlist = data_result;
                            $scope.formations = [];
                            //console.log("Resultados", data_result[0].formation.formationCenter)
                            data_result.forEach(function (iFormationcenter, ivalue) {


                                        iFormationcenter.formation.name = iFormationcenter.formation.formationCenter.name;
                                        iFormationcenter.formation.city = iFormationcenter.formation.formationCenter.city;
                                        iFormationcenter.formation.address = iFormationcenter.formation.formationCenter.address;
                                        //console.log("Valor ",iFormation)
                                        $scope.formations.push(iFormationcenter.formation)
                                    })



                            //console.log("RESULTADOS", data_result)


                        })
                        .error(function (error) {
                            //@action mostrar error
                            $scope.errorMessage = error
                            console.log(error);
                        })
                    ;
                    ///if criteria is a number
                    // console.log("Buscando resultados " + $rootScope.urlBase + "/formationcenter/searchbyName");
                    //  console.log("Buscando resultados ", $routeParams.criteria)

                }
            };

            $scope.countRecords();
            $scope.getPagableRecords();
//-------------------------------------------------------------------------------------------------------------------
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

            $scope.setDateValue = function () {

                if ($scope.datesearch== "") {
                    // @action mensaje de  error
                    $scope.datesearch = null;
                    return;
                }

                $scope.criteria = $scope.datesearch
            }
            $scope.searchFunc = function () {

                console.log("Fecha seleccionada ",$('.datesearch').getDate());
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
            $scope.seatDate = function () {

            };

            $scope.formationBook = function (formationToReserve) {

                console.log("Formacion " , formationToReserve)

               /* if (formationToReserve == "") {
                    // @action mensaje de  error
                    $scope.searchResullt = null;
                    return;
                }*/

                //$location.path("/formation/book/" + formationToReserve);

                $location.path("/formation/book/" + formationToReserve);
            };


            //init
            /*if ($scope.criterio != "") {
                $scope.searchFunc();
            }*/

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
    .controller('CustomControlCtrl',["NgMap","$scope","$rootScope", "$http", "$location", function(NgMap, $scope,$rootScope, $http, $location) {

        /*$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhbZEULLv5kcXwrA_xrlYS8JU2QjyrjO8";
         var vm = this;
         //lat: 48.864716, lng: 2.349014
         var chicago = new google.maps.LatLng(48.864716, 2.349014);

         NgMap.getMap().then(function(map) {
         vm.map = map;
         });

         vm.click = function( event) {
         console.log(event)
         //vm.map.setCenter(chicago);
         };*/
         console.log("Buscando")
        $scope.map = {
            center: [48.864716, 2.349014],
            options: function() {
                return {
                    streetViewControl: false,
                    scrollwheel: false
                }
            },
            events: {
                click: function(e, map) {


                    alert(e.latLng.lat() + " " + e.latLng.lng());
                }
            }
        };

        var marker;
        var vm = this;
        NgMap.getMap().then(function(map) {
            vm.map = map;
            marker = map.markers[0];
            console.log("Asignando datos")
        });
        vm.centerChanged = function(event) {
            /* $timeout(function() {
             vm.map.panTo(marker.getPosition());
             }, 3000);*/
        }


        ///Find formationcenter by position


        $http.post($rootScope.urlBase + "/formationcenter/searchallformationcenters")
            .success(function (data_result) {
                if (data_result.err ){
                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                    ///regresar a la pagina inicial
                    $scope.errorMessage = data_result.err ;
                    alert(data_result.err );
                    // $location.path("/");
                    return;
                }

                $scope.formationcenters = data_result;
                console.log("formationcenters ", $scope.formationcenters)
                console.log("Se obtienen resultados")
                //$location.path("/search/" + $scope.criteria);
            })
            .error(function (error) {
                //@action mostrar error
                $scope.errorMessage = error
                console.log(error);
            })
        ;

        console.log("Buscando")
        vm.click = function(event ) {
            console.log("Buscando")
            vm.map.setZoom(8);
            vm.map.setCenter(marker.getPosition());
            console.log("En esta posicion ");
            $scope.data = vm.map;
            possArray = String(event.latLng).split(",")
            latitud = possArray[0]
            longitud = possArray[1]


            ///
///Find formationcenter by position
            $http.post($rootScope.urlBase + "/formationcenter/searchformationbyPos", {
                    "latitude":  latitud,
                    "longitude":  longitud, })
                .success(function (data_result) {
                    if (data_result.err ){
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorMessage = data_result.err ;
                        // alert($scope.errorMessage);
                        // $location.path("/");
                        return;
                    }

                    $scope.formationcenters = data_result;
                    $location.path("/search/" + $scope.criteria);
                })
                .error(function (error) {
                    //@action mostrar error
                    $scope.errorMessage = error
                    console.log(error);
                })
            ;
            ///Find if position is inner France if not show alert o modal windows

            ///else find Formation-Place near position

            ///if not there show alert o windows
            alert('this is at '+ latitud + " :" + longitud);
            // alert(arg1+arg2);
        }
    }])
    .controller("FormationBookController", ["$scope", "$rootScope", "$http", "$routeParams", function ($scope,$rootScope ,$http, $routeParams) {

        $scope.customerData = {};

        console.log("BuscFormationBook by sails ", $routeParams.id)

        $scope.book = function () {
            $http.post($rootScope.urlBase + "/formation/bookFormation", {
                    "id": $routeParams.id,
                    "customerData": $scope.customerData
                })
                .success(function (data) {
                    console.log("===========================================================================================");

                    if (data.err ){
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorValid = true ;
                        alert(data.err );
                        //$location.path("/");
                        return;
                    }
                    alert("!!!! Congratulation you are reserved in !!!" );


                    $http.post($rootScope.urlBase + "/Email/send", {
                            "to": $scope.customerData.email,
                            "subject":"Reserved by formationfinder",
                            "text":"!!!! Congratulation you are reserved in !!!"
                        })
                        .success(function (data) {
                            console.log(data);
                        })
                        .error(function (err){});
                })
                .error(function (err){
                    alert(err );

                    console.log(err);
                });
        }
    }])

    .controller("TestimonySearchController", ["$scope", "$resource", function ($scope, $resource) {
        $scope.data = {};

        Post = $resource($rootScope.urlBase + "/testimony/searchAllTestimonies",$scope.data);

        $scope.search = function () {
            $scope.testimonies = Post.query();

            console.log($scope.testimonies);
        };
    }])
    .controller("FaqController",['$scope','$http','$timeout','$rootScope', function($scope,$http,$timeout,$rootScope){

        app = this;
        $scope.app = {}
        $scope.app.currentPage = 1;
        $scope.app.maxSize = 5;
        $scope.app.itemPerPage = 5;
        $scope.app.totalItems = 0;

        $scope.countRecords = function() {
            $http.get($rootScope.urlBase + "/Faq/count")
                .success(function(data,status,headers,config){

                    if (data.res != "OK") {
                        $scope.app.totalItems = 0;
                        return;
                    }
                    $scope.app.totalItems = data.size
                })
                .error(function(data,status,header,config){
                    console.log(data);
                });
        };

        $scope.getPagableRecords = function() {
            var param = {
                page : $scope.app.currentPage,
                len : $scope.app.itemPerPage
            };
            $http.get($rootScope.urlBase + "/Faq/findFaq",{params : param})
                .success(function(data,status,headers,config){
                    $scope.FaqList = data;
                    //console.log("Resultados ",  $scope.FaqList)
                })
                .error(function(data,status,header,config){
                    console.log(data);
                });
        };

        $scope.countRecords();
        $scope.getPagableRecords();

    }])
    .controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
})
    .controller('DatepickerPopupDemoCtrl', function ($scope) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    })
.controller('TypeaheadCtrl', function($scope, $http) {

    var _selected;

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
})
.controller('AlertDemoCtrl', function ($scope) {
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}).controller('ModalDemoCtrl', ["$scope","$uibModal","$log" ,"$rootScope", "$http", "$location", "$routeParams",function ($scope, $uibModal,$log,$rootScope, $http, $location, $routeParams ) {

    $scope.items = {}; //['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;
    $scope.formationCenterName = ""
    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });



        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openFormationCenterInfo = function (formationCenterName) {

        console.log("Formation center name" , formationCenterName )
        $scope.formationCenterName = formationCenterName
        ///Find formation center iformation
        $http.post($rootScope.urlBase + "/formationcenter/searchbyname", {
              name:formationCenterName })
            .success(function (data_result) {
                if (data_result.err ){
                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                    ///regresar a la pagina inicial
                    $scope.errorMessage = data_result.err ;
                    console.log("Error " + data_result)
                    // alert($scope.errorMessage);
                    // $location.path("/");
                    return;
                }

                console.log("Result " , data_result)
                $scope.items = data_result;

                //size = "" | "lg" | "sm"
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            })
            .error(function (error) {
                //@action mostrar error
                $scope.errorMessage = error
                console.log(error);
            })


    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.formationCenterName = ""
    };
}).controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
}).controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://lorempixel.com/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }
    }).controller('CollapseDemoCtrl', function ($scope) {
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = true;
}).controller('DropdownCtrl', function ($scope, $log) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}).controller('PaginationDemoCtrl', function ($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}).controller('PopoverDemoCtrl', function ($scope, $sce) {
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };

    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };

    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
}).controller('ProgressDemoCtrl', function ($scope) {
    $scope.max = 200;

    $scope.random = function() {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = type === 'danger' || type === 'warning';

        $scope.dynamic = value;
        $scope.type = type;
    };

    $scope.random();

    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            $scope.stacked.push({
                value: Math.floor(Math.random() * 30 + 1),
                type: types[index]
            });
        }
    };

    $scope.randomStacked();
}).controller('RatingDemoCtrl', function ($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];
}).controller('TimepickerDemoCtrl', function ($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
}).controller('TooltipDemoCtrl', function ($scope, $sce) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };
}).controller('TypeaheadCtrl', function($scope, $http) {

    var _selected;

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
}).controller("WizardController", function(){


    var vm = this;

    //Model
    vm.currentStep = 1;
    vm.steps = [
        {
            step: 1,
            name: "Customer information",
            template: "templates/formation/customer.html"
        },
        {
            step: 2,
            name: "Licence information",
            template: "templates/formation/licence.html"
        },
        {
            step: 3,
            name: "Payment configuration",
            template: "templates/formation/payment.html"
        },
        {
            step: 4,
            name: "Recap reservation",
            template: "templates/formation/recap.html"
        },
    ];
    vm.customerData = {};
    vm.customerData.driverLicence = {}
    //Functions
    vm.gotoStep = function(newStep) {
        vm.currentStep = newStep;
    }

    vm.getStepTemplate = function(){
        for (var i = 0; i < vm.steps.length; i++) {
            if (vm.currentStep == vm.steps[i].step) {
                return vm.steps[i].template;
            }
        }
    }

    vm.book = function() {
        console.log("Data",vm.customerData)
        alert(
           /* "Saving form... \n\n" +
            "Name: " + vm.user.name + "\n" +
            "Email: " + vm.user.email + "\n" +
            "Age: " + vm.user.age);*/

            JSON.stringify( vm.customerData))
    }


});
;
