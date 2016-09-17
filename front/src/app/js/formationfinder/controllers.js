/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("IndexController", ["$scope", "$rootScope", "$location", "$http", "NgMap", "$log", "$translate",
        function ($scope, $rootScope, $location, $http, NgMap, $log, $translate) {

            $scope.findFaq = function () {
                console.log("Buscando data FAQ")
                $location.path("/faq/search");
            }


///---------------------------------------------------------------------------------------------------
            $scope.searchAllFormation = function () {
                $http.post($rootScope.urlBase + "/place/searchallplaces")
                    .success(function (data_result) {
                        if (data_result.err) {
                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                            ///regresar a la pagina inicial
                            $scope.errorMessage = data_result.err;
                            alert(data_result.err);
                            // $location.path("/");
                            return;
                        }

                        nameArray = []
                        if (data_result.length > 0) {
                            for (iFormationCenter in data_result) {
                                nameArray.push(data_result[iFormationCenter].city)
                                console.log(iFormationCenter, data_result[iFormationCenter].city)
                            }
                        }

                        console.log("Se obtienen resultados", data_result.length)
                        $scope.states = nameArray;
                        return nameArray

                        //$location.path("/search/" + $scope.criteria);
                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log("ERROR", error);
                        $scope.states = []
                        return ([])
                    })
                ;
            }

            $rootScope.transparent = $rootScope.relative = $rootScope.fullwidth = false;
            $rootScope.align = "center";
            $scope.criterio = "";
            $scope.searchFunc = function ($event) {

                if ($scope.criteria == "") {
                    // @action mensaje de  error
                    $scope.searchResullt = null;
                    return;
                }


                console.log("Buscando data")
                $location.path("/search/" + $scope.criteria);
            };

            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            // Any function returning a promise object can be used to load values asynchronously
            ///Modify to search by GPS location
            $scope.getLocation = function (val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        sensor: false
                    }
                }).then(function (response) {
                    return response.data.results.map(function (item) {
                        return item.formatted_address;
                    });
                });
            };

            $scope.ngModelOptionsSelected = function (value) {
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


            $scope.searchAllFormation();


            $scope.sendMail = function () {

                var config = {
                    to: "",
                    cc: "",
                    text: "",
                    subject: "",
                    html: "<b></b>"
                };

                /*                if ( typeof $scope.mailsend.to == "undefined") {
                 return;
                 }
                 else*/
                config.to = $scope.mailsender
                console.log("Enviando mensaje")
                if (typeof $scope.subject == "undefined") {
                    return
                }
                else
                    config.subject = $scope.subject
                console.log("Enviando mensaje")
                if (typeof $scope.messagebody == "undefined") {
                    return
                }
                else {
                    config.html = "<b>" + "Client :" + $scope.mailuser + "[ " + $scope.mailsender + " ]" + "Wrote: " + $scope.messagebody + "</b>"
                    config.text = "" + "Client: " + $scope.mailuser + "[ " + $scope.mailsender + " ]" + " Wrote: " + $scope.messagebody + ""

                }
                console.log("Enviando mensaje")
                $http.post($rootScope.urlBase + "/Email/send", config)
                    .success(function (data_result) {


                        console.log("Se obtienen resultados", data_result)

                        $scope.mailuser = ""
                        $scope.mailsender = ""
                        $scope.messagebody = ""

                        //$location.path("/search/" + $scope.criteria);
                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log("ERROR", error);
                        return ([])
                    })
            }

        }])
    .controller("SearchController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $translate) {
            $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]
            $scope.advanceSearch = true
            $scope.rate = 0;
            $scope.max = 3;
            $scope.isReadonly = false;

            $scope.hoveringOver = function (value) {
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
            $scope.searchAllFormation = function () {
                $http.post($rootScope.urlBase + "/place/searchallplaces")
                    .success(function (data_result) {
                        if (data_result.err) {
                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                            ///regresar a la pagina inicial
                            $scope.errorMessage = data_result.err;
                            alert(data_result.err);
                            // $location.path("/");
                            return;
                        }

                        nameArray = []
                        if (data_result.length > 0) {
                            for (iFormationCenter in data_result) {
                                nameArray.push(data_result[iFormationCenter].city)
                                console.log(iFormationCenter, data_result[iFormationCenter].city)
                            }
                        }

                        console.log("Se obtienen resultados ff", data_result.length)
                        $scope.states = nameArray;
                        return nameArray

                        //$location.path("/search/" + $scope.criteria);
                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log("ERROR", error);
                        $scope.states = []
                        return ([])
                    })
                ;
            }

            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            // Any function returning a promise object can be used to load values asynchronously
            ///Modify to search by GPS location
            $scope.getLocation = function (val) {

                ///Obtener la posicion del usuario


                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        sensor: false
                    }
                }).then(function (response) {
                    return response.data.results.map(function (item) {
                        return item.formatted_address;
                    });
                });
            };

            $scope.ngModelOptionsSelected = function (value) {
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

            $scope.searchAllFormation();

            console.log("Estates", $scope.states)


            $scope.radioModel = 'Middle';
            $scope.checkModel = {
                left: false,
                middle: true,
                right: false
            };

            $scope.checkResults = [];

            $scope.$watchCollection('checkModel', function () {
                $scope.checkResults = [];
                angular.forEach($scope.checkModel, function (value, key) {
                    if (value) {
                        $scope.checkResults.push(key);
                    }
                });
            });


            $scope.sortType = 'price'; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            $scope.searchFish = '';     // set the default search/filter term
            //gloal configurations
            $scope.search = {};
            $scope.open1 = function () {
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

            $scope.dateOptionsSearch = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
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

            $scope.today = function () {
                $scope.search.initialDate = new Date();
            };
            $scope.today();
            //gloal configurations
            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function () {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
            $scope.format = $scope.formats[0];
            $scope.ngDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.tomorrow = function () {
                $scope.search.endDate = tomorrow;
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
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

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
            $scope.searchServices = {};
            $scope.search.name = $routeParams.criteria;
            $scope.app = {}
            $scope.app.currentPage = 0;
            $scope.app.maxSize = 5;
            $scope.app.itemPerPage = 3;
            $scope.app.totalItems = 0;
            $scope.searchText = "";

            /*$scope.$watch(function() {
             return $scope.searchText;
             }, function(newValue, oldValue) {
             console.log("change detected: " + newValue)
             $scope.searchText = newValue;
             });*/
            //data = 5;
            $routeParams.criteria = String($routeParams.criteria).trim()
            $scope.formationcenterlist = []
            // console.log("dddddd", $routeParams.criteria != 'undefined')
            // console.log("dddddd", String($routeParams.criteria).trim())
            // console.log("dddddd " + $routeParams.criteria)
            ////if criteria is empty

            $scope.alerts = [];

//---------------------------------------------------------------------------------------------------------------
            ///Show modal with formation´s Formation Center information
            $scope.searchFuncList = function () {


                $scope.errorMessage = "Probando "
                if (typeof $scope.criteriaList == "undefined" || $scope.criteriaList == "")
                    $scope.criteriaList = ""
                $scope.search.name = $scope.criteriaList;
                $scope.app.currentPage = 0;


                console.log("El valor de la forama ", $scope.myform)

                if ($scope.search.initialDate != "" || typeof $scope.search.endDate != "" || $scope.search.initialPrice != "") {
                    if (!$scope.myform.$valid) {

                        $scope.errorValid = true
                        console.log("INSERTANDO ALERTA")
                        message = "Sorry, Some Advanced Search fields are invalid";
                        $scope.alerts.push({
                            type: 'danger',
                            msg: message
                        });
                        return;
                    }

                    if ($scope.search.initialDate != "" || $scope.search.endDate != "") {

                        timestampInit = new Date($scope.search.initialDate).getTime()
                        timestampEnd = new Date($scope.search.endDate).getTime()
                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA")
                            message = "Sorry, End date isn´t correct";
                            $scope.alerts.push({
                                type: 'danger',
                                msg: message
                            });
                            return;
                        }
                    }

                }

                $scope.copyValues();

                $scope.countRecords();
                $scope.getPagableRecords();
                /*if ($scope.formations.length == 0 ) {
                 $scope.errorValid = true
                 console.log("INSERTANDO ALERTA")
                 message = "Sorry, not exist result for your search criteria"
                 $scope.alerts.push({
                 type: 'danger',
                 msg: message
                 });
                 }*/

            }

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            }

            $scope.searchPlusInformation = function (formationId) {

            }

            $scope.countRecords = function () {
                config = {}

                console.log("Count Data ----")
                if (typeof  $scope.searchServices.initialDate != "undefined") {
                    /*  if ( !Date.isDate( $scope.searchServices.initialDate)) {
                     $scope.errorValid = true ;
                     /// alert(data_result.err );
                     // $location.path("/");
                     console.log("INSERTANDO ALERTA")
                     message = "Sorry, Invalid date format for initialDate"
                     $scope.alerts.push({
                     type: 'danger',
                     msg: data_result.err
                     });
                     return;
                     }*/
                    config.initialDate =  $scope.searchServices.initialDate

                }

                if (typeof  $scope.searchServices.endDate != "undefined") {
                    /* if ( !_.isDate( $scope.searchServices.endDate)) {
                     $scope.errorValid = true ;
                     /// alert(data_result.err );
                     // $location.path("/");
                     console.log("INSERTANDO ALERTA")
                     message = "Sorry, Invalid date format for endDate"
                     $scope.alerts.push({
                     type: 'danger',
                     msg: data_result.err
                     });
                     return;
                     }*/
                    config.finalDate =  $scope.searchServices.endDate

                }

                console.log("Count Data")

                ///Date validate and if initialDate is more than that end date not search

                ///Price validate an if not a number or number < 0 not search
                if (typeof $scope.searchServices.initialPrice != "undefined")
                    config.price = $scope.searchServices.initialPrice

                if ( $scope.searchServices.name != 'undefined') {
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ( $scope.searchServices.name )))
                    if (!isNaN(parseInt( $scope.searchServices.name))) {
                        //countbyzipcode
                        config.zipcode =  $scope.searchServices.name
                        console.log("Call services ", config)
                        $http.post($rootScope.urlBase + "/Formation/countByZipcodeMongoEx", config)
                            .success(function (data_result) {
                                if (data_result.res != "OK") {
                                    $scope.app.totalItems = 0;
                                    return;
                                }
                                console.log("Cantidad de objetos ", data_result.size)
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


                if ( typeof $scope.searchServices.name == "undefined")
                     $scope.searchServices.name = ""

                config.city =  $scope.searchServices.name
                //countbycity
                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Formation/countByCityMongoEx', config)
                    .success(function (data_result) {
                        if (data_result.res != "OK") {
                            console.log("ERROR",data_result );
                            $scope.app.totalItems = 0;
                            return;
                        }
                        console.log("Cantidad de objetos ---", data_result.size)
                        $scope.app.totalItems = data_result.size
                        return;
                        // console.log("RESULTADOS", data_result)
                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log("BAD",error);
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

///-------------------------------------------------------------------------------------------

            $scope.getReadableDate = function (dateParmt) {
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + (value.getMonth()+1) + "/" + value.getFullYear();

                return resultDate

            };

            $scope.getCustomerFormation = function (customersArray) {
                if (typeof customersArray == "undefined") {
                    console.log("It´s undefined")
                }
                return customersArray.length

            }

///-------------------------------------------------------------------------------------------
            $scope.updateupdateSort = function () {
                $scope.getPagableRecords();
                $scope.apply();
            };

            $scope.getPagableRecords = function () {

                var pageData = 0;


                if ($scope.app.currentPage > 0) {
                    pageData = $scope.app.currentPage - 1;
                    pageData = String(pageData)
                }
                config = {
                    page: pageData,
                    len: $scope.app.itemPerPage
                }

                if (typeof  $scope.searchServices.initialDate != "undefined" ||  $scope.searchServices.initialDate == "") {
                    /*                    if ( !_.isDate( $scope.searchServices.initialDate)) {
                     $scope.errorValid = true ;
                     /// alert(data_result.err );
                     // $location.path("/");
                     console.log("INSERTANDO ALERTA")
                     message = "Sorry, Invalid date format for initialDate"
                     $scope.alerts.push({
                     type: 'danger',
                     msg: data_result.err
                     });
                     return;
                     }*/
                    config.initialDate =  $scope.searchServices.initialDate

                }

                if (typeof  $scope.searchServices.endDate != "undefined" ||  $scope.searchServices.endDate == "") {

                    /*if ( !Date.isDate( $scope.searchServices.endDate)) {
                     $scope.errorValid = true ;
                     /// alert(data_result.err );
                     // $location.path("/");
                     console.log("INSERTANDO ALERTA")
                     message = "Sorry, Invalid date format for endDate"
                     $scope.alerts.push({
                     type: 'danger',
                     msg: data_result.err
                     });
                     return;
                     }*/
                    config.finalDate =  $scope.searchServices.endDate

                }


                ///Date validate and if initialDate is more than that end date not search

                ///Price validate an if not a number or number < 0 not search
                if (typeof $scope.searchServices.initialPrice != "undefined")
                    config.price = $scope.searchServices.initialPrice

                console.log("Pagination " , $scope.search )
                console.log("Pagination " , $scope.searchServices )
                if ( $scope.searchServices.name != undefined) {
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ( $scope.searchServices.name )))
                    if (!isNaN(parseInt( $scope.searchServices.name))) {
                        console.log("Es un numero")
                        ///Validar si es un numero postal angular.isNumber(value)

                        config.zipcode =  $scope.searchServices.name

                        //searchbyzipcode


                        $http.post($rootScope.urlBase + "/formation/searchByZipcodeMongoEx", config)
                            .success(function (data_result) {
                                if (data_result.err) {
                                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                    ///regresar a la pagina inicial
                                    $scope.errorValid = true;
                                    /// alert(data_result.err );
                                    // $location.path("/");
                                    console.log("INSERTANDO ALERTA")
                                    message = "Sorry, not exist result for your search criteria"
                                    $scope.alerts.push({
                                        type: 'danger',
                                        msg: data_result.err
                                    });
                                    return;
                                }
                                $scope.formationcenterlist = data_result;

                                if (data_result) {
                                    if (data_result.length == 0) {
                                        $scope.errorValid = true
                                        console.log("INSERTANDO ALERTA")
                                        message = "Sorry, not exist result for your search criteria"
                                        $scope.alerts.push({
                                            type: 'danger',
                                            msg: message
                                        });
                                        return
                                    }
                                }
                                $scope.formations.shift()
                                $scope.formations = [];
                                //console.log("Resultados", data_result[0].formation.formationCenter)
                                data_result.forEach(function (iFormationcenter, ivalue) {

                                    iFormationcenter.name = iFormationcenter.formationCenter.name;
                                    iFormationcenter.city = iFormationcenter.place.city;
                                    iFormationcenter.address = iFormationcenter.place.address;
                                    iFormationcenter.place.price = iFormationcenter.price;
                                    iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                    console.log("Valor ", iFormationcenter.datetime)
                                    $scope.formations.push(iFormationcenter)
                                })

                                $scope.clearSearchField ();

                                // console.log("RESULTADOS", data_result)
                            })
                            .error(function (error) {
                                //@action mostrar error
                                $scope.errorMessage = error
                                console.log(error);

                                console.log("INSERTANDO ALERTA")
                                message = "Sorry, Invalid date format for initialDate"
                                $scope.alerts.push({
                                    type: 'danger',
                                    msg: error
                                });
                                return;
                            })
                        ;

                    }
                    else {
                        ///Validar si es un numero postal angular.isNumber(value)

                        config.city =  $scope.searchServices.name
                        // searchbycity

                        console.log("Call services", config)
                        $http.post($rootScope.urlBase + "/formation/searchByCityMongoEx", config)
                            .success(function (data_result) {
                                if (data_result.err) {
                                    ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                    ///regresar a la pagina inicial
                                    $scope.errorValid = true;
                                    /// alert(data_result.err );
                                    // $location.path("/");
                                    console.log("INSERTANDO ALERTA")
                                    message = "Sorry, can´t get results"
                                    $scope.alerts.push({
                                        type: 'danger',
                                        msg: message
                                    });
                                    return;
                                }

                                $scope.formationcenterlist = data_result;
                                $scope.formations = [];
                                $scope.formations.shift()


                                if (data_result) {
                                    if (data_result.length == 0) {
                                        $scope.errorValid = true
                                        console.log("INSERTANDO ALERTA")
                                        message = "Sorry, not exist result for your search criteria"
                                        $scope.alerts.push({
                                            type: 'danger',
                                            msg: message
                                        });
                                        return;
                                    }


                                }
                                // console.log("Resultados", data_result[0].formation.formationCenter)
                                console.log("RESULTADOS nn", data_result)

                                data_result.forEach(function (iFormationcenter, ivalue) {


                                    iFormationcenter.name = iFormationcenter.formationCenter.name;
                                    iFormationcenter.city = iFormationcenter.place.city;
                                    iFormationcenter.address = iFormationcenter.place.address;
                                    iFormationcenter.place.price = iFormationcenter.price;
                                    iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                    console.log("Valor ", iFormationcenter.datetime)
                                    $scope.formations.push(iFormationcenter)

                                    ///For each dates informacion change all date
                                    ///$scope.getReadableDate()
                                    //console.log("Valor ",iFormation)

                                })
                               // console.log("RESULTADOS formations", $scope.formations)
                                $scope.clearSearchField();
                                $scope.showmap = true
                               $scope.showMap(null)
                                //console.log("RESULTADOS formations", $scope.formations)


                            })
                            .error(function (error) {
                                //@action mostrar error
                                console.log('RESULTADOS', error);
                                $scope.errorMessage = error
                                console.log(error);

                                console.log("INSERTANDO ALERTA")
                                message = "Sorry, can´t get results"
                                $scope.alerts.push({
                                    type: 'danger',
                                    msg: message
                                });
                            })
                        ;
                    }

                }
                else {

                    //if ($scope.app.currentPage == 1)
                    //    $scope.app.currentPage = 0
                    //console.log("Sin nombre ======================= " , $scope.app.currentPage)
                    config.city = ""

                    //searchbycity
                    $http.post($rootScope.urlBase + "/formation/searchByCityMongoEx", config)
                        .success(function (data_result) {
                            if (data_result.length == 0) {
                                ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                ///regresar a la pagina inicial
                                $scope.errorValid = true;
                                /// alert(data_result.err );
                                // $location.path("/");
                                console.log("INSERTANDO ALERTA")
                                message = "Sorry, not exist result for your search criteria"
                                $scope.alerts.push({
                                    type: 'danger',
                                    msg: data_result.err
                                });
                                return;
                            }
                            // console.log("dfdd")

                            $scope.formationcenterlist = data_result;
                            $scope.formations = [];
                            // console.log("Resultados", data_result[0].formation.formationCenter)
                            if (data_result) {
                                if (data_result.length == 0) {
                                    $scope.errorValid = true
                                    console.log("INSERTANDO ALERTA")
                                    message = "Sorry, not exist result for your search criteria"
                                    $scope.alerts.push({
                                        type: 'danger',
                                        msg: message
                                    });
                                    return;
                                }
                            }

                            console.log("RESULTADOS nn", data_result)
                            data_result.forEach(function (iFormationcenter, ivalue) {


                                iFormationcenter.name = iFormationcenter.formationCenter.name;
                                iFormationcenter.city = iFormationcenter.place.city;
                                iFormationcenter.address = iFormationcenter.place.address;
                                iFormationcenter.place.price = iFormationcenter.price;
                                iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                console.log("Valor ", iFormationcenter.datetime)
                                $scope.formations.push(iFormationcenter)
                            })
                            $scope.showmap = true
                           // console.log("INSERTED DATA", $scope.formations)
                            $scope.showMap(null)



                        })
                        .error(function (error) {
                            //@action mostrar error
                            $scope.errorMessage = error
                            console.log(error);

                            console.log("INSERTANDO ALERTA")
                            message = "Sorry, can´t get results"
                            $scope.alerts.push({
                                type: 'danger',
                                msg: message
                            });
                            return
                        })
                    ;
                    ///if criteria is a number
                    // console.log("Buscando resultados " + $rootScope.urlBase + "/formationcenter/searchbyName");
                    //  console.log("Buscando resultados ", $routeParams.criteria)

                }
            };

            $scope.countRecords();
            $scope.getPagableRecords();

            $scope.formationBook = function (formationToReserve, priceToBuy) {

                console.log("Formacion ", formationToReserve)

                /* if (formationToReserve == "") {
                 // @action mensaje de  error
                  $scope.searchServicesResullt = null;
                 return;
                 }*/

                //$location.path("/formation/book/" + formationToReserve);

                $location.path("/formation/book/" + formationToReserve);
            };
//-------------------------------------------------------------------------------------------------------------------
            //Checkbox controler use with button
            $scope.checkAll = function () {
                $scope.searchServices.formation = $scope.formations.map(function (item) {
                    return item.name;
                });
            };
            $scope.uncheckAll = function () {
                 $scope.searchServices.formation = [];
            };
            /*

             Show message in page
             */
            $scope.showMessage = function (type, message) {

                if ($scope.alerts.length > 0) {
                    $scope.alerts.splice(0, 1);
                }
                $scope.alerts.push({type: type, msg: message});
            }

            $scope.copyValues = function(){
                $scope.searchServices.name =  $scope.search.name;
                $scope.searchServices.initialDate  =  $scope.search.initialDate;
                $scope.searchServices.endDate  =  $scope.search.endDate;
                $scope.searchServices.initialPrice  = $scope.search.initialPrice;

            }


            $scope.clearSearchField = function () {
                $scope.search.name = null;
                $scope.search.initialDate = null
                $scope.search.endDate = null;
                $scope.search.initialPrice = null;
                $scope.criteriaList = "";
            }
             $scope.searchServices = {formation: []}
            //$scope.searchServices = {formation: []}
            // functions
            $scope.showMap = function ($event) {


                console.log(domElement + $scope.showmap);
                var domElement = document.getElementById('menu-item');
                console.log(domElement + $scope.showmap, $scope.formations.length );
                console.log("ddd", $scope.formations.length);
                unicdata = []
                places = []
                if ( $scope.formations.length > 0) {
                    console.log("Values")
                    $scope.formations.forEach( function (iFormation, ivalue){
                        console.log("Selecionado la formacion 1",  iFormation.place)
                        cityName =  iFormation.city
                        unicdata.push(  iFormation.city)
                        places.push(iFormation.place)
                        /*    unicdata =  $scope.searchServices.formation.filter( function ( item) {
                         return item != cityName
                         })*/

                    })
                }
                else {
                    ////Search by all object Formation in Window
                    for (iName in  $scope.formations) {
                        console.log("Selecionado la formacion 2", $scope.formations[iName].place.price)
                        cityName = $scope.formations[iName].city
                        unicdata.push($scope.formations[iName].city)
                        places.push($scope.formations[iName].place)
                        /*    unicdata =  $scope.searchServices.formation.filter( function ( item) {
                         return item != cityName
                         })*/

                    }
                }
                console.log("Places to search", unicdata)
                console.log("Places to search", places)
                if (unicdata.length == 0) {
                    ///Show inicial points
                    console.log("INSERTANDO ALERTA")
                    var message = "You must select some formation."
                    $scope.showMessage('danger', message);
                    return
                }
                config = {
                    places: unicdata
                }

                $scope.formationcenters = [{places: []}]
                $scope.formationcenters[0].places = places
                ///Search al city with name in array an return places
                ///if no place return empty and not  show anything
                //$http.post($rootScope.urlBase + "/Place/searchByCities", config)
                //    .success(function (data_result) {
                //        if (data_result.length == 0) {
                //            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                //            ///regresar a la pagina inicial
                //            $scope.errorValid = true;
                //            /// alert(data_result.err );
                //            // $location.path("/");
                //            console.log("INSERTANDO ALERTA")
                //            message = "Sorry, can´t get places results"
                //            $scope.showMessage('danger', message);
                //            return;
                //        }
                //
                //
                //        formationcenters = [{places: []}]
                //
                //        formationcenters[0].places = data_result;
                //
                //        console.log("Places to search", formationcenters)
                //        ///Show new positions
                //        $scope.toggleDropdownTrue($event, formationcenters);
                //        ///Clear chexk box
                //         $scope.searchServices.formation = []
                //        //console.log("RESULTADOS", data_result)
                //
                //
                //    })
                //    .error(function (error) {
                //        //@action mostrar error
                //        $scope.errorMessage = error
                //        console.log(error);
                //
                //        console.log("INSERTANDO ALERTA")
                //        message = "Sorry, can´t get places results"
                //        $scope.showMessage('danger', message);
                //        return
                //    })

                /// Only unic name

                //alert('before timeout');   // <-- This gets triggered

                console.log(domElement);


                ///Show GPS position
                /* NavigatorGeolocation.getCurrentPosition()
                 .then(function(position) {
                 var lat = position.coords.latitude, lng = position.coords.longitude;

                 console.log("Latitud ", lat)
                 console.log("Longitud ", lng)
                 });*/


                console.log("SHOW MAP")


            };


            ////----------------------------------Acordion Controller

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

            $scope.addItem = function () {
                var newItemNo = $scope.items.length + 1;
                $scope.items.push('Item ' + newItemNo);
            };

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };
            //init
            /*if ($scope.criterio != "") {
             $scope.searchFunc();
             }*/

            $(".search-result-map").affix({
                offset: {top: 100}
            });

            $scope.rate = 1;
            $scope.max = 5;
            $scope.isReadonly = false;

            $scope.hoveringOver = function (value) {
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

    //////Map control ---------------------------------------------

            $scope.searchInMap = false;

            $scope.items = [
                'The first choice!',
                'And another choice for you.',
                'but wait! A third!'
            ];

            $scope.status = {
                isopen: true
            };

            $scope.toggled = function (open) {
                $log.log('Dropdown is now: ', open);
            };

            $scope.toggleDropdown = function ($event) {
                console.log("Evento ", $event)
                $event.preventDefault();
                $event.stopPropagation();

                $scope.status.isopen = !$scope.status.isopen;
                console.log("Evento ", $scope.status.isopen)
            };

            $scope.searchAllPlaces = function ($event) {
                $scope.status.isopen = false
                console.log("Evento ", $event)
                $event.preventDefault();
                $event.stopPropagation();

                $http.post($rootScope.urlBase + "/formationcenter/searchallformationcenters")
                    .success(function (data_result) {
                        if (data_result.err) {
                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                            ///regresar a la pagina inicial
                            $scope.errorMessage = data_result.err;
                            alert(data_result.err);
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

                $scope.status.isopen = true
                console.log("Evento ", $scope.status.isopen)

            };

            $scope.toggleDropdownTrue = function ($event, newFormationCenters) {
                $scope.status.isopen = false
                console.log("Evento ", $event)
                if ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }

                // $scope.status.isopen = !$scope.status.isopen;
                if (newFormationCenters && newFormationCenters.length > 0) {
                    console.log("Update data map from ", $scope.formationcenters.length + " to " + newFormationCenters.length)
                    $scope.formationcenters = newFormationCenters
                }
                $scope.status.isopen = true
                console.log("Evento ", $scope.status.isopen)
            };

            $scope.showmap = false;
            console.log("Buscando")
            $scope.map = {
                center: [48.864716, 2.349014],
                options: function () {
                    return {
                        streetViewControl: false,
                        scrollwheel: false
                    }
                },
                events: {
                    click: function (e, map) {
                        ///call find place services

                        /// alert(e.latLng.lat() + " " + e.latLng.lng());
                    }
                }
            };

            var marker;
            var vm = this;
            NgMap.getMap().then(function (map) {
                vm.map = map;
                marker = map.markers[0];
                console.log("Asignando datos")
            });
            vm.centerChanged = function (event) {
                /* $timeout(function() {
                 vm.map.panTo(marker.getPosition());
                 }, 3000);*/
            }


            ///Find formationcenter by position


            //$http.post($rootScope.urlBase + "/formationcenter/searchallformationcenters")
            //    .success(function (data_result) {
            //        if (data_result.err) {
            //            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
            //            ///regresar a la pagina inicial
            //            $scope.errorMessage = data_result.err;
            //            alert(data_result.err);
            //            // $location.path("/");
            //            return;
            //        }
            //
            //        $scope.formationcenters = data_result;
            //        console.log("formationcenters ", $scope.formationcenters)
            //        console.log("Se obtienen resultados")
            //        //$location.path("/search/" + $scope.criteria);
            //    })
            //    .error(function (error) {
            //        //@action mostrar error
            //        $scope.errorMessage = error
            //        console.log(error);
            //    })
            //;

            console.log("Buscando")
            vm.click = function (event) {
                console.log("Buscando")
                vm.map.setZoom(9);

                ///With all point compute ceontroide and show map
                // vm.map.setCenter(marker.getPosition());
                console.log("En esta posicion ");
                $scope.data = vm.map;
                possArray = String(event.latLng).split(",")
                latitud = possArray[0]
                longitud = possArray[1]


                ///
///Find formationcenter by position
                if ($scope.searchInMap == true) {
                    $http.post($rootScope.urlBase + "/Place/searchformationbyPos", {
                            "latitude": latitud,
                            "longitude": longitud,
                        })
                        .success(function (data_result) {
                            if (data_result.err) {
                                ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                                ///regresar a la pagina inicial
                                $scope.errorMessage = data_result.err;
                                // alert($scope.errorMessage);
                                // $location.path("/");
                                return;
                            }

                            $scope.formationcenters = data_result;
                            ///I think its search
                            $location.path("/search/" + $scope.criteria);
                        })
                        .error(function (error) {
                            //@action mostrar error
                            $scope.errorMessage = error
                            console.log(error);
                        })
                    ;
                }
                ///Find if position is inner France if not show alert o modal windows

                ///else find Formation-Place near position

                ///if not there show alert o windows
                // alert('this is at ' + latitud + " :" + longitud);
                // alert(arg1+arg2);
            }

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
    .controller('CustomControlCtrl', ["NgMap", "$scope", "$rootScope", "$http", "$location", "$translate", function (NgMap, $scope, $rootScope, $http, $location, $translate) {

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

        //$scope.changeLanguage = function (langKey) {
        //    console.log("Change language to ", langKey)
        //    $translate.use(langKey);
        //};


        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: true
        };

        $scope.toggled = function (open) {
            $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function ($event) {
            console.log("Evento ", $event)
            $event.preventDefault();
            $event.stopPropagation();

            $scope.status.isopen = !$scope.status.isopen;
            console.log("Evento ", $scope.status.isopen)
        };

        $scope.searchAllPlaces = function ($event) {
            $scope.status.isopen = false
            console.log("Evento ", $event)
            $event.preventDefault();
            $event.stopPropagation();

            $http.post($rootScope.urlBase + "/formationcenter/searchallformationcenters")
                .success(function (data_result) {
                    if (data_result.err) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorMessage = data_result.err;
                        alert(data_result.err);
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

            $scope.status.isopen = true
            console.log("Evento ", $scope.status.isopen)

        };

        $scope.toggleDropdownTrue = function ($event, newFormationCenters) {
            $scope.status.isopen = false
            console.log("Evento ", $event)
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            // $scope.status.isopen = !$scope.status.isopen;
            if (newFormationCenters && newFormationCenters.length > 0) {
                console.log("Update data map from ", $scope.formationcenters.length + " to " + newFormationCenters.length)
                $scope.formationcenters = newFormationCenters
            }
            $scope.status.isopen = true
            console.log("Evento ", $scope.status.isopen)
        };

        $scope.showmap = false;
        console.log("Buscando")
        $scope.map = {
            center: [48.864716, 2.349014],
            options: function () {
                return {
                    streetViewControl: false,
                    scrollwheel: false
                }
            },
            events: {
                click: function (e, map) {
                    ///call find place services

                    /// alert(e.latLng.lat() + " " + e.latLng.lng());
                }
            }
        };

        var marker;
        var vm = this;
        NgMap.getMap().then(function (map) {
            vm.map = map;
            marker = map.markers[0];
            console.log("Asignando datos")
        });
        vm.centerChanged = function (event) {
            /* $timeout(function() {
             vm.map.panTo(marker.getPosition());
             }, 3000);*/
        }


        ///Find formationcenter by position


        //$http.post($rootScope.urlBase + "/formationcenter/searchallformationcenters")
        //    .success(function (data_result) {
        //        if (data_result.err) {
        //            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
        //            ///regresar a la pagina inicial
        //            $scope.errorMessage = data_result.err;
        //            alert(data_result.err);
        //            // $location.path("/");
        //            return;
        //        }
        //
        //        $scope.formationcenters = data_result;
        //        console.log("formationcenters ", $scope.formationcenters)
        //        console.log("Se obtienen resultados")
        //        //$location.path("/search/" + $scope.criteria);
        //    })
        //    .error(function (error) {
        //        //@action mostrar error
        //        $scope.errorMessage = error
        //        console.log(error);
        //    })
        //;

        console.log("Buscando")
        vm.click = function (event) {
            console.log("Buscando")
            vm.map.setZoom(9);

            ///With all point compute ceontroide and show map
            // vm.map.setCenter(marker.getPosition());
            console.log("En esta posicion ");
            $scope.data = vm.map;
            possArray = String(event.latLng).split(",")
            latitud = possArray[0]
            longitud = possArray[1]


            ///
///Find formationcenter by position
            $http.post($rootScope.urlBase + "/formationcenter/searchformationbyPos", {
                    "latitude": latitud,
                    "longitude": longitud,
                })
                .success(function (data_result) {
                    if (data_result.err) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorMessage = data_result.err;
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
            // alert('this is at ' + latitud + " :" + longitud);
            // alert(arg1+arg2);
        }
    }])
    .controller("FormationBookController", ["$scope", "$rootScope", "$http", "$routeParams", function ($scope, $rootScope, $http, $routeParams) {

        $scope.customerData = {};

        console.log("BuscFormationBook by sails ", $routeParams.id)

        $scope.book = function () {
            $http.post($rootScope.urlBase + "/formation/bookFormation", {
                    "id": $routeParams.id,
                    "customerData": $scope.customerData
                })
                .success(function (data) {
                    console.log("===========================================================================================");

                    if (data.err) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorValid = true;
                        alert(data.err);
                        //$location.path("/");
                        return;
                    }
                    alert("!!!! Congratulation you are reserved in !!!");


                    $http.post($rootScope.urlBase + "/Email/send", {
                            "to": $scope.customerData.email,
                            "subject": "Reserved by formationfinder",
                            "text": "!!!! Congratulation you are reserved in !!!"
                        })
                        .success(function (data) {
                            console.log(data);
                        })
                        .error(function (err) {
                        });
                })
                .error(function (err) {
                    alert(err);

                    console.log(err);
                });
        }
    }])

    .controller("TestimonySearchController", ['$scope', '$http', '$timeout', '$rootScope', function ($scope, $http, $timeout, $rootScope) {
        // console.log("Instancia del controlador de la FAQ")

        $scope.$watchCollection('checkModel', function () {
            $scope.checkResults = [];
            angular.forEach($scope.checkModel, function (value, key) {
                if (value) {
                    $scope.checkResults.push(key);
                }
            });
        });


        $scope.sortType = 'price'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchFish = '';     // set the default search/filter term
        //gloal configurations


        // local configurations
        app = this;
        $scope.map = false;
        $scope.searchResullt = null;
        $scope.search = {};
        $scope.search.nameTestimony = "";
        $scope.appTestimony = {}
        $scope.appTestimony.currentPageTestimony = 0;
        $scope.appTestimony.maxSizeTestimony = 5;
        $scope.appTestimony.itemPerPageTestimony = 10;
        $scope.appTestimony.totalItemsTestimony = 0;
        $scope.appTestimony.smallnumPages = 5
        $scope.searchText = "";

        /*$scope.$watch(function() {
         return $scope.searchText;
         }, function(newValue, oldValue) {
         console.log("change detected: " + newValue)
         $scope.searchText = newValue;
         });*/
        //data = 5;
        //$routeParams.criteria = String($routeParams.criteria).trim()
        $scope.faqs = []
        // console.log("dddddd", $routeParams.criteria != 'undefined')
        // console.log("dddddd", String($routeParams.criteria).trim())
        // console.log("dddddd " + $routeParams.criteria)
        ////if criteria is empty

        $scope.alerts = [];

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

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

//---------------------------------------------------------------------------------------------------------------
        ///Show modal with formation´s Formation Center information
        $scope.searchTestimonyList = function () {

            $scope.errorMessage = "Probando "
            if (typeof $scope.TestimonyList == "undefined" || $scope.TestimonyList == "")
                $scope.TestimonyList = ""
            $scope.search.nameTestimony = $scope.TestimonyList;
            ///$scope.appTestimony.currentPageTestimony = 0;
            $scope.countRecordsTestimony();
            $scope.getPagableRecordsTestimony();
            $scope.appTestimony.currentPageTestimony = 0;

        }

        $scope.showMessageTestimony = function (type, message) {

            if ($scope.alerts.length > 0) {
                $scope.alerts.splice(0, 1);
            }
            console.log("MENSAJE DE ALERTA ", message)
            $scope.alerts.push({type: type, msg: message});
        }


        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        }

        $scope.searchPlusInformation = function (formationId) {

        }

        $scope.countRecordsTestimony = function () {
            config = {}


            if ($scope.search.nameTestimony == "undefined")
                $scope.search.nameTestimony = ""

            config.question = $scope.search.nameTestimony
            //countbycity
            console.log("Call services ", config)
            $http.post($rootScope.urlBase + '/Testimony/countAllTestimonies', config)
                .success(function (data_result) {
                    if (data_result.response != "OK") {
                        // $scope.appTestimony.totalItemsTestimony = 0;
                        return;
                    }
                    tmpSize = $scope.appTestimony.totalItemsTestimony
                    console.log("Cantidad de objetos ---", data_result.size)
                    if (data_result.size > 0)
                        $scope.appTestimony.totalItemsTestimony = data_result.size

                    return;
                    // console.log("RESULTADOS", data_result)
                })
                .error(function (error) {
                    //@action mostrar error
                    $scope.errorMessage = error
                    console.log(error);
                    return
                })


        };


        $scope.showTestimonyCustomer = function (iTestimony) {

            if (iTestimony.customer) {
                return iTestimony.customer.name + " " + iTestimony.customer.name.firstName
            }

            return iTestimony.text

        };

        $scope.updateupdateSort = function () {
            $scope.getPagableRecordsTestimony();
            $scope.apply();
        };

        $scope.getPagableRecordsTestimony = function () {

            var pageData = 0;


            if ($scope.appTestimony.currentPageTestimony > 0) {
                pageData = $scope.appTestimony.currentPageTestimony - 1;
                pageData = String(pageData)
            }
            config = {
                page: pageData,
                len: $scope.appTestimony.itemPerPageTestimony
            }

            config.question = ""
            if (typeof $scope.TestimonyList == "undefined" || $scope.TestimonyList == "")
                $scope.TestimonyList = ""
            $scope.search.nameTestimony = $scope.TestimonyList;

            config.question = $scope.search.nameTestimony

            //if ($scope.app.currentPage == 1)
            //    $scope.app.currentPage = 0
            //console.log("Sin nombre ======================= " , $scope.app.currentPage)


            //searchbycity
            $http.post($rootScope.urlBase + "/Testimony/findTestimonies", config)
                .success(function (data_result) {

                    // console.log("Result testimonies",  data_result )
                    if (data_result.length == 0) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorValid = true;
                        /// alert(data_result.err );
                        // $location.path("/");
                        console.log("INSERTANDO ALERTA")
                        message = "Sorry, not exist result for your search criteria"

                        $scope.showMessageTestimony('danger', message)
                        return;
                    }
                    console.log("dfdd")

                    $scope.faqs = data_result;
                    $scope.formations = [];
                    // console.log("Resultados", data_result[0].formation.formationCenter)
                    if (data_result) {
                        if (data_result.length == 0) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA")
                            var message = "Sorry, not exist result for your search criteria"
                            $scope.showMessageTestimony('danger', message)
                            return;
                        }
                    }

                    $scope.Testimonys = data_result;


                    //console.log("RESULTADOS", data_result)


                })
                .error(function (error) {
                    //@action mostrar error
                    $scope.errorMessage = error
                    console.log(error);

                    console.log("INSERTANDO ALERTA")
                    message = "Sorry, can´t get results"
                    $scope.showMessageTestimony('danger', message)
                    return
                });
        };

        console.log("Controlador del Testimony")
        $scope.countRecordsTestimony();
        $scope.getPagableRecordsTestimony();
    }])
    .controller("FaqController", ['$scope', '$http', '$timeout', '$rootScope', function ($scope, $http, $timeout, $rootScope) {


        // console.log("Instancia del controlador de la FAQ")

        $scope.$watchCollection('checkModel', function () {
            $scope.checkResults = [];
            angular.forEach($scope.checkModel, function (value, key) {
                if (value) {
                    $scope.checkResults.push(key);
                }
            });
        });


        $scope.sortType = 'price'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchFish = '';     // set the default search/filter term
        //gloal configurations


        // local configurations
        app = this;
        $scope.map = false;
        $scope.searchResullt = null;
        $scope.search = {};
        $scope.search.nameFaq = "";
        $scope.appFaq = {}
        $scope.appFaq.currentPageFaq = 0;
        $scope.appFaq.maxSizeFaq = 5;
        $scope.appFaq.itemPerPageFaq = 10;
        $scope.appFaq.totalItemsFaq = 0;
        $scope.appFaq.smallnumPages = 5
        $scope.searchText = "";

        /*$scope.$watch(function() {
         return $scope.searchText;
         }, function(newValue, oldValue) {
         console.log("change detected: " + newValue)
         $scope.searchText = newValue;
         });*/
        //data = 5;
        //$routeParams.criteria = String($routeParams.criteria).trim()
        $scope.faqs = []
        // console.log("dddddd", $routeParams.criteria != 'undefined')
        // console.log("dddddd", String($routeParams.criteria).trim())
        // console.log("dddddd " + $routeParams.criteria)
        ////if criteria is empty

        $scope.alerts = [];

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

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

//---------------------------------------------------------------------------------------------------------------
        ///Show modal with formation´s Formation Center information
        $scope.searchFaqList = function () {

            $scope.errorMessage = "Probando "
            if (typeof $scope.faqList == "undefined" || $scope.faqList == "")
                $scope.faqList = ""
            $scope.search.nameFaq = $scope.faqList;
            ///$scope.appFaq.currentPageFaq = 0;
            $scope.countRecordsFaq();
            $scope.getPagableRecordsFaq();

            $scope.appFaq.currentPageFaq = 0;
        }

        $scope.showMessageFaq = function (type, message) {

            if ($scope.alerts.length > 0) {
                $scope.alerts.splice(0, 1);
            }
            console.log("MENSAJE DE ALERTA ", message)
            $scope.alerts.push({type: type, msg: message});
        }


        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        }

        $scope.searchPlusInformation = function (formationId) {

        }

        $scope.countRecordsFaq = function () {
            config = {}


            if ($scope.search.nameFaq == "undefined")
                $scope.search.nameFaq = ""

            config.question = $scope.search.nameFaq
            //countbycity
            console.log("Call services ", config)
            $http.post($rootScope.urlBase + '/Faq/countFaq', config)
                .success(function (data_result) {
                    if (data_result.response != "OK") {
                        // $scope.appFaq.totalItemsFaq = 0;
                        return;
                    }
                    tmpSize = $scope.appFaq.totalItemsFaq
                    console.log("Cantidad de objetos ---", data_result.size)
                    if (data_result.size > 0)
                        $scope.appFaq.totalItemsFaq = data_result.size

                    return;
                    // console.log("RESULTADOS", data_result)
                })
                .error(function (error) {
                    //@action mostrar error
                    $scope.errorMessage = error
                    console.log(error);
                    return
                })


        };


        $scope.updateupdateSort = function () {
            $scope.getPagableRecordsFaq();
            $scope.apply();
        };

        $scope.getPagableRecordsFaq = function () {

            var pageData = 0;


            if ($scope.appFaq.currentPageFaq > 0) {
                pageData = $scope.appFaq.currentPageFaq - 1;
                pageData = String(pageData)
            }
            config = {
                page: pageData,
                len: $scope.appFaq.itemPerPageFaq
            }

            config.question = ""
            if (typeof $scope.faqList == "undefined" || $scope.faqList == "")
                $scope.faqList = ""
            $scope.search.nameFaq = $scope.faqList;

            config.question = $scope.search.nameFaq

            //if ($scope.app.currentPage == 1)
            //    $scope.app.currentPage = 0
            //console.log("Sin nombre ======================= " , $scope.app.currentPage)


            //searchbycity
            $http.post($rootScope.urlBase + "/Faq/findFaq", config)
                .success(function (data_result) {
                    if (data_result.length == 0) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorValid = true;
                        /// alert(data_result.err );
                        // $location.path("/");
                        console.log("INSERTANDO ALERTA")
                        message = "Sorry, not exist result for your search criteria"

                        $scope.showMessageFaq('danger', message)
                        return;
                    }
                    console.log("dfdd")

                    $scope.faqs = data_result;
                    $scope.formations = [];
                    // console.log("Resultados", data_result[0].formation.formationCenter)
                    if (data_result) {
                        if (data_result.length == 0) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA")
                            var message = "Sorry, not exist result for your search criteria"
                            $scope.showMessageFaq('danger', message)
                            return;
                        }
                    }


                    //console.log("RESULTADOS", data_result)


                })
                .error(function (error) {
                    //@action mostrar error
                    $scope.errorMessage = error
                    console.log(error);

                    console.log("INSERTANDO ALERTA")
                    message = "Sorry, can´t get results"
                    $scope.showMessageFaq('danger', message)
                    return
                });
        };

        console.log("Controlador del FAQ")
        $scope.countRecordsFaq();
        $scope.getPagableRecordsFaq();

    }])
    .controller('AlertDemoCtrl', function ($scope) {
        $scope.alerts = [
            {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
            {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
        ];

        $scope.addAlert = function () {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    })
    .controller('ModalDemoCtrl', ["$scope", "$uibModal", "$log", "$rootScope", "$http", "$location", "$routeParams", function ($scope, $uibModal, $log, $rootScope, $http, $location, $routeParams) {

        $scope.items = {}; //['item1', 'item2', 'item3'];
        $scope.oneAtATime = true;
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

            console.log("Formation center name", formationCenterName.name)
            $scope.formationCenterName = formationCenterName.name
            ///Find formation center iformation
            $http.post($rootScope.urlBase + "/formationcenter/searchbyname", {
                    name: formationCenterName.name
                })
                .success(function (data_result) {
                    if (data_result.err) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorMessage = data_result.err;
                        console.log("Error " , data_result)
                        // alert($scope.errorMessage);
                        // $location.path("/");
                        return;
                    }


                    data_result.formation = formationCenterName
                    $scope.items = data_result;
                    console.log("Result ", $scope.items)

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

    }])
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

        $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

        $scope.getReadableDate = function (dateParmt) {
            //console.log("DATE PARAMETER ", dateParmt)
            value = new Date(dateParmt);
            resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

            return resultDate

        };

        $scope.oneAtATime = true;
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
    })
    .controller("WizardController", function ($rootScope, $http, $routeParams, $scope, $uibModal, $log, $location) {

        var vm = this;

        //Model
        vm.currentStep = 1;

        vm.validPayment = false;

        //Messages arrays.
        vm.validationMessages = [];
        vm.paymentMessages = [];
        vm.customerFoundMessages = [];

        //Initializating customer Object.
        vm.initCustomerData = function () {
            vm.customerData = {};
            vm.customerData.driverLicence = {};
            vm.customerData.civility = "M";
        };

        vm.initCustomerData();

        //Regulars expressions for validate fields.
        //vm.emailRedExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        //vm.nameRegExp = /^[A-Za-z\s]{2,40}$/;
        vm.phoneRegExp = /^(0)\d{9}$/;
        vm.zipcodeRegExp = /^\d{5}$/;
        vm.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
        vm.emailRedExp = /^[a-z][_a-z0-9-]*(\.[_a-z0-9-]+)*@[a-z][a-z0-9-]*(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        vm.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
        vm.numberRegExp = /^\d{12}$/;
        vm.numberRegExpCard = /^\d{3}$/;

        vm.paymentServicesError = false;
        vm.paymentButtonDisabled = true;
        vm.customerLicenceNumberUsed = false;
        vm.showBDerror = false; //Show Birth Date Error.
        vm.showDDerror = false; //Show Date of Deliverance error.
        vm.showPDerror = false; //Show Date of Procuration error.
        vm.showPDerrorLessDD = false; //Show error if procuration date less than Deliverance Date.

        //Wizard navigation steps.
        vm.steps = [
            {
                step: 1,
                name: "Customer Information",
                template: "templates/formation/customer.html",
            },
            {
                step: 2,
                name: "Licence",
                template: "templates/formation/licence.html",
            },
            {
                step: 3,
                name: "Payment",
                template: "templates/formation/payment.html",
            },
            {
                step: 4,
                name: "Recap",
                template: "templates/formation/recap.html",
            }
        ];

        vm.showValidationMessage = function (message) {
            if (vm.validationMessages.length > 0)
                vm.validationMessages.splice(0, 1);

            vm.validationMessages.push({type: message.type, info: message.info});
        };

        vm.showPaymentMessages = function (message) {

            if (vm.paymentMessages.length > 0) {
                vm.paymentMessages.splice(0, 1);
            }

            vm.paymentMessages.push({type: message.type, info: message.info});
        };

        //wizard Functions
        vm.gotoStep = function (newStep) {

            if (vm.currentStep === 1) {
                if (newStep === 4) {
                    vm.showValidationMessage({
                        type: "danger",
                        info: "After provide customer and licence information, you should choose a form of payment."
                    });
                    return;
                }


                if (newStep === 2) {
                    if (vm.validateStep1()) {
                        vm.currentStep = newStep;
                    }
                    else {
                        vm.showValidationMessage({
                            type: "danger",
                            info: "There are some mising or invalid information, please check again."
                        });
                    }
                    return;
                }
                if (newStep === 3) {
                    if (vm.validateStep1()) {
                        if (vm.validateStep2()) {
                            vm.currentStep = newStep;
                        }
                        else {
                            vm.currentStep = 2;
                            vm.showValidationMessage({
                                type: "danger",
                                info: "There are some mising or invalid information, please check again."
                            });
                        }
                    }
                    else {
                        vm.showValidationMessage({
                            type: "danger",
                            info: "There are some mising or invalid information, please check again."
                        });
                    }
                    return;
                }

                return;
            }

            if (vm.currentStep === 2) {

                if (newStep === 4) {
                    vm.showValidationMessage({
                        type: "danger",
                        info: "After provide customer and licence information, you should choose a form of payment."
                    });
                    return;
                }

                if (newStep === 1 || newStep === 3) {
                    if (vm.validateStep2()) {
                        vm.currentStep = newStep;
                    }
                    else {
                        vm.showValidationMessage({
                            type: "danger",
                            info: "There are some mising or invalid information, please check again."
                        });
                    }

                    return;
                }

                return;
            }

            if (vm.currentStep === 3) {

                console.log("What happen")
                if (newStep === 4) {
                    console.log("Not show directly form")
                    return;
                }
                vm.currentStep = newStep;
                return;
            }

            if (vm.currentStep === 4) {
                if (newStep !== 4) {
                    vm.initCustomerData();
                    vm.currentStep = 1;
                }
                else ///Register new costumer
                     ///remenber registe if paid or not
                    console.log("Make recap to form")
                ///vm.bookFormation();

                return;
            }
        };

        vm.getStepTemplate = function () {
            for (var i = 0; i < vm.steps.length; i++) {
                if (vm.currentStep === vm.steps[i].step) {
                    return vm.steps[i].template;
                }
            }
        };

        vm.validateStep1 = function () {
            if (!vm.customerData.name
                || !vm.customerData.firstName
                || !vm.customerData.phoneNumber
                || !vm.customerData.email
                || !vm.customerData.zipCode
                || !vm.customerData.birthDate
                || !vm.validBirthDate()
                || !vm.validCity()
                || !vm.validBirthCity()) {

                return false;
            }

            return true;
        };

        vm.validateStep2 = function () {
            if (!vm.customerData.driverLicence.number
                || !vm.customerData.driverLicence.placeOfDeliverance
                || !vm.customerData.driverLicence.dateOfDeliverance
                || !vm.customerData.driverLicence.dateOfProcuration
                || !vm.validDeliDate()
                || !vm.validProcDate()
                || vm.customerLicenceNumberUsed) {

                return false;
            }

            return true;
        };

        vm.validBirthDate = function () {
            if (vm.customerData.birthDate) {
                birthDate = new Date(vm.customerData.birthDate);
                maxBirthDate = new Date(actDate.getFullYear() - 16, actDate.getMonth(), actDate.getDate());
                minBirthDate = new Date(actDate.getFullYear() - 80, actDate.getMonth(), actDate.getDate());

                if (birthDate < maxBirthDate && birthDate > minBirthDate) {
                    return true;
                }
            }
            return false;
        };

        vm.validDeliDate = function () {
            if (vm.customerData.driverLicence.dateOfDeliverance) {
                deliDate = new Date(vm.customerData.driverLicence.dateOfDeliverance);
                maxDeliDate = new Date().setDate(actDate.getDate() - 1);
                minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

                if (deliDate < maxDeliDate && deliDate > minDeliDate) {
                    return true;
                }
            }
            return false;
        };


        //Return true if procuration date grait than deliverance date.
        vm.procDgtdeliD = function () {
            if (!vm.customerData.driverLicence.dateOfProcuration
                || !vm.customerData.driverLicence.dateOfDeliverance) {
                return true;
            }

            if (new Date(vm.customerData.driverLicence.dateOfProcuration) >= new Date(vm.customerData.driverLicence.dateOfDeliverance)) {
                return true;
            }

            return false;
        };

        vm.validProcDate = function () {
            if (vm.customerData.driverLicence.dateOfProcuration) {
                procDate = new Date(vm.customerData.driverLicence.dateOfProcuration);
                maxDeliDate = new Date().setDate(actDate.getDate() - 1);
                minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

                if (procDate < maxDeliDate && procDate > minDeliDate && vm.procDgtdeliD()) {
                    return true;
                }
            }
            return false;
        };

        vm.verifyDeliDate = function () {
            if (vm.customerData.driverLicence.dateOfDeliverance && !vm.validDeliDate()) {
                vm.showDDerror = true;
                return;
            }
            vm.showDDerror = false;

            vm.verifyProcDate();
        };

        vm.verifyProcDate = function () {

            if (vm.customerData.driverLicence.dateOfProcuration) {
                if (!vm.validProcDate()) {
                    vm.showPDerror = true;
                    vm.showPDerrorLessDD = false;
                }
                else {
                    vm.showPDerror = false;

                    if (vm.customerData.driverLicence.dateOfDeliverance
                        && (new Date(vm.customerData.driverLicence.dateOfProcuration) < new Date(vm.customerData.driverLicence.dateOfDeliverance))) {
                        vm.showPDerrorLessDD = true;
                    }
                    else {
                        vm.showPDerrorLessDD = false;
                    }

                }
            }
            else {
                vm.showPDerror = false;
                vm.showPDerrorLessDD = false;
            }
        };

        vm.validCity = function () {
            if (vm.customerData.city) {
                return vm.nameRegExp.test(vm.customerData.city);
            }
            return true;
        };

        vm.validBirthCity = function () {
            if (vm.customerData.birthCity) {
                return vm.nameRegExp.test(vm.customerData.birthCity);
            }
            return true;
        };

        vm.verifyBirthDate = function () {
            if (vm.customerData.birthDate && !vm.validBirthDate()) {
                vm.showBDerror = true;
                return;
            }
            vm.showBDerror = false;
        };

        vm.checkCustomerLicenceNumber = function () {
            if (vm.customerData.driverLicence.number) {
                $http.post($rootScope.urlBase + "/customer/searchByLicenceInYear", {
                        licence: vm.customerData.driverLicence.number,
                        year: actDate.getFullYear()
                    })
                    .success(function (data) {
                        if (data.status === "error") {
                            //Customer not foud in the present year.

                            vm.paymentButtonDisabled = false;
                            vm.customerLicenceNumberUsed = false;
                        }
                        else {
                            //Customer with that licence found, therefor show error.
                            vm.paymentButtonDisabled = true;
                            vm.customerLicenceNumberUsed = true;
                        }
                    })
                    .error(function (err) {
                        console.log("error en el chequeo de la licencia de usuario.")
                        console.log(err);
                    });
            }
            else {
                vm.customerLicenceNumberUsed = false;
            }
        }

        vm.bookFormation = function (cardPayment) {
            // The payment have been made. Now make the book process.

            ///Update if paid or not
            $http.post($rootScope.urlBase + "/formation/bookFormation", {
                    id: $routeParams.id,
                    customerData: vm.customerData,
                    paid: cardPayment
                })
                .success(function (data) {
                    if (data.ok !== undefined) {
                        if (vm.paymentMessages.length > 0) {
                            vm.paymentMessages.splice(0, 1);
                        }
                        vm.paymentMessages.push({type: "success", info: "Book process complit."});
                    }
                    else {
                        if (vm.paymentMessages.length > 0) {
                            vm.paymentMessages.splice(0, 1);
                        }
                        vm.paymentMessages.push({type: "danger", info: data.err});
                    }

                    console.log(data);
                })
                .error(function (err) {

                    if (vm.paymentMessages.length > 0) {
                        vm.paymentMessages.splice(0, 1);
                    }

                    vm.paymentMessages.push({type: "danger", info: err});
                    console.log(err);
                });

        }
        //vm.validateData = function() {
        //
        //    //If there is some mising or invalid data, show an error and return false.
        //    if (!vm.customerData.name
        //        || !vm.customerData.firstName
        //        || !vm.customerData.phoneNumber
        //        || !vm.customerData.email
        //        || !vm.customerData.zipCode
        //        || !vm.customerData.birthDate
        //        || !vm.customerData.driverLicence.number
        //        || !vm.customerData.driverLicence.placeOfDeliverance
        //        || !vm.customerData.driverLicence.dateOfDeliverance
        //        || !vm.customerData.driverLicence.dateOfProcuration) {
        //
        //        if (vm.validationMessages.length === 0) {
        //            vm.validationMessages.push({type: "danger", info: "There are some mising or invalid information, please check again."});
        //        }
        //
        //        return false;
        //    }
        //
        //    //Before enable the payment button, check if there is an customer with this data in the system in this year.
        //    yearAct = new Date();
        //    yearAct = yearAct.getFullYear();
        //
        //    $http.post($rootScope.urlBase + "/customer/searchByLicenceInYear", {
        //            licence: vm.customerData.driverLicence.number,
        //            year: yearAct})
        //        .success(function(data) {
        //            console.log("entre a success, el servicio devolvio");
        //            if (data.status === "error") {
        //                console.log("no encontre el usuario. Validar el botton.");
        //                vm.paymentButtonDisabled = false;
        //
        //                if (vm.customerFoundMessages.length > 0) {
        //                    vm.customerFoundMessages.splice(0, 1);
        //                }
        //            }
        //            else {
        //                vm.paymentButtonDisabled = true;
        //
        //                if (vm.customerFoundMessages.length === 0) {
        //                    vm.customerFoundMessages.push({type: "danger", info: "There is a customer registered in the system with that licence number in this year."});
        //                }
        //            }
        //        })
        //        .error(function(err) {
        //            console.log("Entre a error algun problema con el log.");
        //            console.log(err);
        //        });
        //
        //    return true;
        //};

        ////--------------------------------------------------------------------------------------
        vm.makePayment = function () {

            console.log("Show modal  ddd")

            ///Find formation center iformation

            //$scope.items = [];

            //size = "" | "lg" | "sm"
            vm.customerData.idformation =  $routeParams.id ;

            console.log("FORMATION ID",vm.customerData.idformation  )
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrlWizard',
                size: "",
                resolve: {
                    customerData: function () {
                        return vm.customerData;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {


                console.log("Payment result ", selectedItem)

                if (typeof selectedItem != undefined) {
                    cardPayment = false
                    vm.customerData.paid = false
                    if (selectedItem.status == "OK") {

                        ///Update pyment data result to Customer
                        vm.customerData.paid = true
                        vm.customerData.walleid = selectedItem.result.walleid
                        vm.customerData.userid = selectedItem.result.userid
                        vm.customerData.carid = selectedItem.result.carid

                        vm.sucessfulPay = true;
                        vm.showPaymentMessages({type: "success", info: "Book process complit."});
                        cardPayment = true
                    }
                    else {
                        vm.showPaymentMessages({type: "error", info: selectedItem.message});
                        cardPayment = true
                    }
                    vm.currentStep = 4;
                    ///Call with payment
                    vm.bookFormation(cardPayment);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        ///--------------------------------------------------------------------------------
        vm.makePaymentv = function () {

            $http.get($rootScope.urlBase + "/Payment/makepayment/")
                .success(function (data, status, headers, config) {
                    if (data.value === "ok") {
                        vm.showPaymentMessages({type: "success", info: "Payment ok."});

                        //The payment have been made. Now make the book process.
                        $http.post($rootScope.urlBase + "/formation/bookFormation", {
                                id: $routeParams.id,
                                customerData: vm.customerData
                            })
                            .success(function (data) {
                                if (data.ok !== undefined) {
                                    vm.showPaymentMessages({type: "success", info: "Book process complit."});
                                }
                                else {
                                    vm.showPaymentMessages({type: "danger", info: data.err});
                                }
                                console.log(data);
                            })
                            .error(function (err) {
                                console.log(err);
                            });
                        vm.currentStep = 4;
                    }
                })
                .error(function (error, status, headers, config) {
                    vm.showPaymentMessages({
                        type: "danger",
                        info: "Sorry, something is wrong with the payment service."
                    });
                });

        };

        vm.closeMessage = function (MessageIndex) {
            vm.validationMessages.splice(MessageIndex, 1);
        };

        vm.paymentMessagesClose = function (MessageIndex) {
            vm.paymentMessages.splice(MessageIndex, 1);
        };

//========================================================================================//
//==                            Date pickers configurations.                            ==//
//========================================================================================//
        vm.today = function () {
            vm.dt = new Date();
        };

        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        vm.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2012, 5, 20),
            startingDay: 1
        };


        //For date pickers options configuration.
        actDate = new Date();
        $scope.initialBirthDateYear = 16


        // BirthDate options
        vm.BirthDateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(actDate.getFullYear() - $scope.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
            minDate: new Date(actDate.getFullYear() - 80, 0, 1),
            initDate: new Date(actDate.getFullYear() - $scope.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
            startingDay: 1
        };

        // Date of Deliverance and Date of Procuration options
        vm.DeliDateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date().setDate(actDate.getDate() - 1),
            minDate: new Date(actDate.getFullYear() - 20, 0, 1),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        vm.toggleMin = function () {
            vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
            vm.dateOptions.minDate = vm.inlineOptions.minDate;
        };

        vm.toggleMin();

        vm.openBirthDate = function () {
            vm.popupBirthDate.opened = true;
        };

        vm.openDeliDate = function () {
            vm.popupDeliDate.opened = true;
        };

        vm.openProcDate = function () {
            vm.popupProcDate.opened = true;
        };

        vm.setDate = function (year, month, day) {
            vm.dt = new Date(year, month, day);
        };

        vm.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.altInputFormats = ['M!/d!/yyyy'];

        vm.popupBirthDate = {
            opened: false
        };

        vm.popupDeliDate = {
            opened: false
        };

        vm.popupProcDate = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        vm.events = [
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
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        }

        vm.gotoSearch = function () {
            $location.path('/search/undefined');
        };

    })
    .controller('ModalInstanceCtrlWizard', function ($scope, $uibModalInstance, $rootScope, $routeParams, $http, customerData, $translate) {
// Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

        $scope.getReadableDate = function (dateParmt) {
           // console.log("DATE PARAMETER ", dateParmt)
            value = new Date(dateParmt);
            resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

            return resultDate

        };

        $scope.getCustomerFormation = function (customersArray) {
            if (typeof customersArray == "undefined") {
                console.log("It´s undefined")
            }
            return customersArray.length

        }
        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        }


        $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];
        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.paymentMessages = [];

        $scope.paymentMessagesClose = function (MessageIndex) {
            vm.paymentMessages.splice(MessageIndex, 1);
        };
        $scope.numberRegExp = /^\d{16}$/;
        $scope.numberRegExpCard = /^\d{3}$/;
        $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;

        $scope.creditCardData = {};
        $scope.popupCardCreditDate = {
            opened: false
        };

        $scope.openCardCreditDate = function () {
            $scope.popupCardCreditDate.opened = true;
        };

        $scope.customerData = customerData;
        $scope.price = customerData.amount;
        $scope.showError = false
        //$scope.selected = {
        //    item: $scope.items[0]
        //};

        $scope.ok = function () {


            ///With formation center identifier and constumer data make payment
            if ($scope.paymentdata.$invalid) {

                console.log("Some problems")
                if ($scope.paymentMessages.length > 0) {
                    $scope.paymentMessages.splice(0, 1);
                }
                $scope.paymentMessages.push({type: "danger", info: "Sorry, Some fields are invalid"});
                return;
            }


            ////Make payment if all data if of

            dateExpiration = new Date($scope.creditCardData.CardExpirationDate);
           // moment = require('moment')

           // $scope.creditCardData.CardExpirationDate = moment($scope.creditCardData.CardExpirationDate).format("MMYY")

           console.log("Date ", dateExpiration)
           console.log("Formation id", $scope.customerData.idformation )
           // $scope.creditCardData.CardExpirationDate = dateExpiration
            console.log("Credit Card Data ", $scope.creditCardData)
            config = {
                userdata: $scope.customerData,
                formationidentifier:$scope.customerData.idformation,
                creditCardData: $scope.creditCardData,
                price: $scope.price,
                currency: "EUR"
            }


            config.userdata.nacionality = "FR"
            config.userdata.country = "FR"


            selectedItem = {status: "OK"}
            console.log("DATA to send to services", config)
///Modify for paymet services
            $http.post($rootScope.urlBase + "/Payment/mangopaymentex/", config)
                .success(function (data) {
                    console.log("Payment response", data)

                    message = "Payment ok."
                    mtype = "success"
                    if (data.response != "OK") {
                        ///Error BIG PROBLEMS
                        $scope.showError = true
                        if (data.response == "ERROR") {
                            selectedItem.status = "ERROR"
                            message = selectedItem.message = data.message
                            mtype = "error"
                        }
                    }
                    else {
                        selectedItem.result = data.result
                    }



                    if ($scope.paymentMessages.length > 0) {
                        $scope.paymentMessages.splice(0, 1);
                    }
                    $scope.paymentMessages.push({type:mtype , info:message });

                    console.log("Go to recap")
                    //$scope.gotoStep(4);
                    $uibModalInstance.close(selectedItem);
                    $uibModalInstance.dismiss('cancel');
                })


        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.formationCenterName = ""
        };

        $scope.getCardNumTooltipError = function () {
            if ($scope.paymentdata.number.$error.required) {

                return $translate.instant('CARDNUMBER_REQUIRED');
            }
            else if ($scope.paymentdata.number.$error.pattern) {
                return  $translate.instant('CARDNUMBER_ERROR');
            }

        }

        $scope.isCardNumTooltipError = function () {
            return ($scope.paymentdata.number.$dirty && $scope.paymentdata.number.$invalid)
        }


    })
    .controller('SitemapController', ["NgMap", "$scope", "$rootScope", "$http", "$location", "$translate", function (NgMap, $scope, $rootScope, $http, $location, $translate) {
    }])
    .controller("LegalMentionsController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $translate) {
        }]);
