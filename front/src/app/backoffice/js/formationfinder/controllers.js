/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("indexController", ["$scope", "$rootScope", "$location", "$http", "NgMap", "$log","$translate",
        function ($scope, $rootScope, $location, $http, NgMap, $log, $translate) {
            $scope.formationcenterData = $rootScope.formationcenterData

            $scope.logout = function () {

                console.log("entre a logout.");
                $rootScope.userToken = null;
                $rootScope.userAuthenticated = false;
                $rootScope.formationCenter = null;

                $location.path('/');

                console.log("El path ahora es: " + $location.url());
            };

            $scope.changeLanguage = function (langKey) {
                console.log("Change language to ", langKey)
                $translate.use(langKey);
            };


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

            $scope.toggleDropdownTrue = function ($event, newFormationCenters) {
                $scope.status.isopen = false
                console.log("Evento ", $event)
                $event.preventDefault();
                $event.stopPropagation();

                // $scope.status.isopen = !$scope.status.isopen;
                if (newFormationCenters && newFormationCenters.length > 0) {
                    console.log("Update data map from ", $scope.formationcenters.length + " to " + newFormationCenters.length)
                    $scope.formationcenters = newFormationCenters
                }
                $scope.status.isopen = true
                console.log("Evento ", $scope.status.isopen)
            };
            $scope.showmap = false;
            /// console.log("Buscando")
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
                $scope.map = map;
                marker = map.markers[0];
                console.log("Asignando datos")
            });
            $scope.centerChanged = function (event) {
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

            //console.log("Buscando")



            ///Find formationcenter by position


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

            console.log("Buscando")
//            $scope.click = function (event) {
//                console.log("Buscando")
//                $scope.map.setZoom(8);
//                $scope.map.setCenter(marker.getPosition());
//                console.log("En esta posicion ");
//                $scope.data = $scope.map;
//                possArray = String(event.latLng).split(",")
//                latitud = possArray[0]
//                longitud = possArray[1]
//
//
//                ///
/////Find formationcenter by position
//                $http.post($rootScope.urlBase + "/formationcenter/searchformationbyPos", {
//                        "latitude": latitud,
//                        "longitude": longitud,
//                    })
//                    .success(function (data_result) {
//                        if (data_result.err) {
//                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
//                            ///regresar a la pagina inicial
//                            $scope.errorMessage = data_result.err;
//                            // alert($scope.errorMessage);
//                            // $location.path("/");
//                            return;
//                        }
//
//                        $scope.formationcenters = data_result;
//                        $location.path("/search/" + $scope.criteria);
//                    })
//                    .error(function (error) {
//                        //@action mostrar error
//                        $scope.errorMessage = error
//                        console.log(error);
//                    })
//                ;
//                ///Find if position is inner France if not show alert o modal windows
//
//                ///else find Formation-Place near position
//
//                ///if not there show alert o windows
//                alert('this is at ' + latitud + " :" + longitud);
//                // alert(arg1+arg2);
//            }

            $scope.click = function (event) {
                // console.log("Buscando")
                vm.map.setZoom(8);
                vm.map.setCenter(marker.getPosition());
                /// console.log("En esta posicion ");
                $scope.data = vm.map;
                possArray = String(event.latLng).split(",")
                latitud = possArray[0]
                longitud = possArray[1]


                ///
///Find formationcenter by position
//                $http.post($rootScope.urlBase + "/formationcenter/searchformationbyPos", {
//                        "latitude":  latitud,
//                        "longitude":  longitud, })
//                    .success(function (data_result) {
//                        if (data_result.err ){
//                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
//                            ///regresar a la pagina inicial
//                            $scope.errorMessage = data_result.err ;
//                            // alert($scope.errorMessage);
//                            // $location.path("/");
//                            return;
//                        }
//
//                        $scope.formationcenters = data_result;
//                        $location.path("/search/" + $scope.criteria);
//                    })
//                    .error(function (error) {
//                        //@action mostrar error
//                        $scope.errorMessage = error
//                        console.log(error);
//                    })
//                ;

                ////IMPORTANTE  SEEEEEEEEEEEESSSSSS
                ///Find if position is inner France if not show alert o modal windows

                ///else find Formation-Place near position

                ///if not there show alert o windows

                place.latitude = latitud;
                place.longitude = longitud;
                alert('this is at ' + latitud + " :" + longitud);
                // alert(arg1+arg2);
            }

        }])
    .controller("LoginController", ["$scope", "$rootScope", "$location", "$http", "NgMap", "$log", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, NgMap, $log, $uibModal, $translate) {

            $scope.credentials = {};
            $scope.formationCentersNames = [];
            $scope.loginButtonText = "Login";

            $scope.usernameExpReg = /^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;

            $scope.searchFormationCentersNames = function () {
                $http.get($rootScope.urlBase + "/formationcenter/searchAllFormationCentersNames")
                    .success(function (data) {
                        if (data.status === 'ok') {
                            $scope.formationCentersNames = data.result;
                        } else {
                            console.log(data.info);
                        }
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };

            $scope.searchFormationCentersNames();

            $scope.login = function () {

                $scope.loginButtonText = "Login in ...";

                $http.post($rootScope.urlBase + "/login/check", {
                        username: $scope.credentials.username,
                        password: $scope.credentials.password
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $rootScope.userToken = result.data.token;
                            $rootScope.userAuthenticated = true;
                            $rootScope.formationCenter = result.data.formationCenter;
                            $rootScope.username = $scope.credentials.username;
                            console.log($rootScope.userToken);

                            ////Calculate formation size and costumer size and update
                            $scope.searchAllFormation();

                            ////find formationcenterDataOnlyData
                            config = {name: $rootScope.formationCenter}
                            $http.post($rootScope.urlBase + "/Formationcenter/searchSimpleByName", config)
                                .success(function (data) {
                                    if (typeof data != "undefined") {
                                        $rootScope.formationcenterData
                                            = data

                                        console.log("Call DASHBOARD")
                                        $location.path('/dashboard');
                                    }
                                    else {
                                        //alert("Error using auth services.");
                                        $scope.loginButtonText = "Login";
                                        objeData = {type: "Error"}
                                        $scope.showModalMessage("Error using auth services.", objeData)
                                    }

                                }).error(function (err) {
                                // alert("Error using auth services.");
                                $scope.loginButtonText = "Login";

                                objeData = {type: "Error"}
                                $scope.showModalMessage("Error using auth services." + err, objeData)
                            })


                        } else {
                            $rootScope.userToken = null;
                            $rootScope.userAuthenticated = false;
                            $rootScope.formationCenter = null;
                            $scope.loginButtonText = "Login";

                            ////Show modal

                            //alert("Invalid intent. Please verify your credentials and try again.");
                            objeData = {type: "Error"}
                            $scope.showModalMessage("Invalid intent. Please verify your credentials and try again.", objeData)
                        }
                    })
                    .error(function (err) {
                        $scope.showModalMessage("Error using auth services.", objeData)
                        $scope.loginButtonText = "Login";
                    });
            };

            $scope.searchAllFormation = function () {
                config = {name: $scope.formationCenter}
                $http.post($rootScope.urlBase + "/Formationcenter/searchByNameEx", config)
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
                        if (typeof data_result != "undefined") {

                            $scope.formationcenterData = data_result
                            $rootScope.formationcenterData = data_result

                            // console.log("Assig values ",  $scope.formationcenterData.formations.length)
                            $rootScope.formationsize = $scope.formationcenterData.formations.length
                            $rootScope.customersize = $scope.formationcenterData.customers.length
                            //$scope.formationcenterData.customers.length ,

                            //for (iFormationCenter in data_result) {
                            //    nameArray.push(data_result[iFormationCenter].city)
                            //    console.log(iFormationCenter, data_result[iFormationCenter].city)
                            //}


                        }

                        //console.log("Se obtienen resultados ff", data_result)

                        return true

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

            $scope.showModalMessage = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"
                $scope.items = objectData;
                $scope.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalMessage.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;

                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }

        }])
    .controller("CreateLogincontroller", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.initCredentials = function () {
                $scope.credentials = {};
                $scope.credentials.formationCenter = $rootScope.formationCenter;
                //   $scope.formationCenterName = [];
                $scope.loginButtonText = "Create Login";
                $scope.credentials.isMainLogin = false;
                $scope.credentials.isActivated = false;
            };
            $scope.initCredentials();

            $scope.usernameExpReg = /^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;

            $scope.createLogin = function () {

                $scope.loginButtonText = "Creating Login ...";

                $http.post($rootScope.urlBase + "/login/create", {
                        username: $scope.credentials.username,
                        password: $scope.credentials.password,
                        formationCenter: $scope.credentials.formationCenter,
                        isMainLogin: $scope.credentials.isMainLogin,
                        isActivated: $scope.credentials.isActivated
                    })
                    .success(function (data) {
                        if (data.status === "ok") {
                            alert('Login created.');
                        } else {
                            alert(data.info);
                        }
                    })
                    .error(function (err) {
                        alert("Error using auth services.");
                    })
                    .finally(function () {
                        $scope.initCredentials();
                    });
            };

            $scope.gotoManage = function () {
                $location.path('/login/admin');
            };


        }])
    .controller("AdminLoginController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.logins = [];

            $scope.searchLogins = function () {
                $http.post($rootScope.urlBase + "/login/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.logins = result.data;

                            console.log($scope.logins);
                        } else {
                            console.log("An error has ocurred searching Logins.");
                        }
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };
            $scope.searchLogins();

            $scope.deleteLogin = function (index) {

                $http.post($rootScope.urlBase + "/login/delete", {
                        username: $scope.logins[index].username,
                        formationCenter: $scope.formationCenter,
                    })
                    .success(function (data) {
                        if (data.status === "ok") {
                            alert('Login deleted.');
                            //$scope.initCredentials();
                        } else {
                            alert("Error deleting Login: " + data.info);
                            //$scope.initCredentials();
                        }
                    })
                    .error(function (err) {
                        alert("Error deleting Login: " + err);
                    })
                    .finally(function () {
                        $scope.searchLogins();
                    });
            };

            $scope.gotoCreate = function () {
                $location.path('/login/create');
            };

            $scope.editLogin = function (index) {
                $location.path('/login/update/' + $scope.logins[index].id);
            };

        }])
    .controller("UpdateLogincontroller", ["$scope", "$rootScope", "$routeParams", "$location", "$http",
        function ($scope, $rootScope, $routeParams, $location, $http) {

            //$scope.formationCenter = $rootScope.formationCenter;
            $scope.usernameExpReg = /^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;

            $scope.Login = {};
            $scope.searchLogin = function () {

                $http.post($rootScope.urlBase + "/login/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.Login = result.data;
                        } else {
                            alert("Error: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Login: ", err);
                    });
            };
            $scope.searchLogin();

            $scope.updateLogin = function () {

                $http.post($rootScope.urlBase + "/login/update", {
                        id: $routeParams.id,
                        //formationCenter: $scope.formationCenter,
                        newCredentials: $scope.Login
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            alert("User updated.");
                            $location.path('/login/admin');
                        } else {
                            console.log(result.info);
                            alert("Login not updated: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log(err);
                    })
                    .finally(function () {
                        //$scope.UpdateButtonText = "Update";
                        //$scope.searchLogins();
                        //$scope.initCredentials();

                    });
            };

            $scope.gotoManage = function () {
                $location.path('/login/admin');
            };
        }])
    .controller("DeleteLogincontroller", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.initCredentials = function () {
                $scope.username = null;
                $scope.formationCenter = $rootScope.formationCenter;
                $scope.loginButtonText = "Delete Login";
            };
            $scope.initCredentials();

            $scope.index = null;
            $scope.usernameExpReg = /^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;

            $scope.usersnames = [];
            $scope.searchLoginNames = function () {
                $http.post($rootScope.urlBase + "/login/searchUserNamesByFormationCenter", {
                        formationCenter: $scope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.usersnames = result.data;
                        }
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };
            $scope.searchLoginNames();

            $scope.deleteLogin = function () {

                $scope.loginButtonText = "Deleting Login ...";

                $http.post($rootScope.urlBase + "/login/delete", {
                        username: $scope.username,
                        formationCenter: $scope.formationCenter,
                    })
                    .success(function (data) {
                        if (data.status === "ok") {
                            alert('Login deleted.');
                            //$scope.initCredentials();
                        } else {
                            alert("Error deleting Login: " + data.info);
                            //$scope.initCredentials();
                        }
                    })
                    .error(function (err) {
                        alert("Error using auth services.");
                    })
                    .finally(function () {
                        $scope.searchLoginNames();
                        $scope.initCredentials();
                    });
            };
        }])
    .controller("AdminFormationController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.formations = [];

            $scope.criteria = '';

            $scope.searchFormations = function () {
                $http.post($rootScope.urlBase + "/formation/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formations = result.data;
                        } else {
                            console.log("An error has ocurred searching Formations.");
                        }

                    })
                    .error(function (error) {
                        console.log("An error has ocurred searching Formations.");
                        console.log(error);
                    });
            };

            $scope.searchFormations();

            $scope.deleteFormation = function (index) {

                var formation = $scope.formations[index];

                $http.post($rootScope.urlBase + "/formation/deleteByID", {
                        id: formation.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formations.splice(index, 1);

                            alert("Formation deleted.");
                        } else {
                            alert("An error has ocurred deleting the Formation.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred deleting the Formation.");
                        console.log(err);
                        alert("An error has ocurred deleting the Formation.");
                    });

            };

            $scope.gotoCreate = function () {
                $location.path('/formation/create');
            };

            $scope.editFormation = function (index) {
                $location.path("/formation/update/" + $scope.formations[index].id);
            };


        }])
    .controller("UpdateFormationController", ["$scope", "$routeParams", "$rootScope", "$location", "$http",
        function ($scope, $routeParams, $rootScope, $location, $http) {

            $scope.formation = null;
            $scope.newFormationValues = null;

            $scope.searchFormation = function () {

                $http.post($rootScope.urlBase + "/formation/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formation = result.data;
                        } else {
                            console.log("Error searching Formation: ", result.info);
                            alert("Error searching Formation: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation: ", err);
                        alert("Error searching Formation: " + err);
                    });
            };
            $scope.searchFormation();

            $scope.places = [];
            $scope.searchPlaces = function () {

                $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.places = result.data;
                        } else {
                            alert("An error has ocurred searching Places.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Places.");
                        console.log(err);
                        alert("An error has ocurred searching Places.");
                    });

            };
            $scope.searchPlaces();

            $scope.animatorsPSY = [];
            $scope.searchPSY = function () {
                $http.post($rootScope.urlBase + "/animator/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter,
                        type: "PSY"
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animatorsPSY = result.data;
                        } else {
                            alert("An error has ocurred searching Animators PSY.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators PSY.");
                        console.log(err);
                        alert("An error has ocurred searching Animators PSY.");
                    });
            };
            $scope.searchPSY();
            $scope.selectedPSY = null;

            $scope.animatorsBAFM = [];
            $scope.searchBAFM = function () {
                $http.post($rootScope.urlBase + "/animator/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter,
                        type: "BAFM"
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animatorsBAFM = result.data;
                        } else {
                            alert("An error has ocurred searching Animators BAFM.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators BAFM.");
                        console.log(err);
                        alert("An error has ocurred searching Animators BAFM.");
                    });
            };
            $scope.searchBAFM();
            $scope.selectedBAFM = null;

            $scope.updateFormation = function () {

            };


        }])
    .controller("CreateFormationController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.CreateButtonText = "Create Formation";

            $scope.numExpReg = /^[\d]+$/;
            $scope.dateRegExp = /^\d{4}\/\d{2}\/\d{2}$/;
            $scope.maxDate = new Date(2040, 00, 01);

            $scope.Hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            $scope.MorningStartH;

            $scope.Minutes = [];
            for (var i = 0; i < 60; i++) {
                if (i < 10) {
                    $scope.Minutes.push("0" + i.toString());
                } else {
                    $scope.Minutes.push(i.toString());
                }
            }

            $scope.initParameters = function () {
                $scope.places = [];
                $scope.animatorsPSY = [];
                $scope.animatorsBAFM = [];
                $scope.fDate = {};

                $scope.MorningStartH = null;
                $scope.MorningStartM = null;
                $scope.MorningEndH = null;
                $scope.MorningEndM = null;
                $scope.AfternoonStartH = null;
                $scope.AfternoonStartM = null;
                $scope.AfternoonEndH = null;
                $scope.AfternoonEndM = null;
                $scope.InvalidDateParameters = true;

                $scope.selectedPlace = null;
                $scope.selectedPSY = null;
                $scope.selectedBAFM = null;

                $scope.formation = {};
                $scope.formation.isConfirmed = false;
                $scope.formation.animators = [];
                $scope.formation.dates = [];

                $scope.searchPlaces = function () {

                    $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                            formationCenter: $rootScope.formationCenter
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                $scope.places = result.data;
                            } else {
                                alert("An error has ocurred searching Places.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Places.");
                            console.log(err);
                            alert("An error has ocurred searching Places.");
                        });

                };
                $scope.searchPlaces();

                $scope.searchPSY = function () {
                    $http.post($rootScope.urlBase + "/animator/searchByFormationCenter", {
                            formationCenter: $rootScope.formationCenter,
                            type: "PSY"
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                $scope.animatorsPSY = result.data;
                            } else {
                                alert("An error has ocurred searching Animators PSY.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Animators PSY.");
                            console.log(err);
                            alert("An error has ocurred searching Animators PSY.");
                        });
                };
                $scope.searchPSY();

                $scope.searchBAFM = function () {
                    $http.post($rootScope.urlBase + "/animator/searchByFormationCenter", {
                            formationCenter: $rootScope.formationCenter,
                            type: "BAFM"
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                $scope.animatorsBAFM = result.data;
                            } else {
                                alert("An error has ocurred searching Animators BAFM.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Animators BAFM.");
                            console.log(err);
                            alert("An error has ocurred searching Animators BAFM.");
                        });
                };
                $scope.searchBAFM();
            };

            $scope.initParameters();

            $scope.validDate = function (vDate) {
                var tempDate = new Date();

                return (tempDate < vDate && vDate < $scope.maxDate);
            };

            $scope.validateDateParameters = function () {
                if ($scope.MorningStartH
                    && $scope.MorningStartM
                    && $scope.MorningEndH
                    && $scope.MorningEndM
                    && $scope.AfternoonStartH
                    && $scope.AfternoonStartM
                    && $scope.AfternoonEndH
                    && $scope.AfternoonEndM
                    && $scope.fDate.date
                    && $scope.validDate($scope.fDate.date)
                ) {
                    $scope.InvalidDateParameters = false;
                } else {
                    $scope.InvalidDateParameters = true;
                }
            }

            $scope.insertDate = function () {

                console.log("**************Entre a insert Date:*********************");

                console.log("El valor de Fdate: ", $scope.fDate);

                $scope.fDate.morning = {
                    hourStart: $scope.MorningStartH + ":" + $scope.MorningStartM,
                    hourEnd: $scope.MorningEndH + ":" + $scope.MorningEndM
                };

                $scope.fDate.afternoon = {
                    hourStart: $scope.AfternoonStartH + ":" + $scope.AfternoonStartM,
                    hourEnd: $scope.AfternoonEndH + ":" + $scope.AfternoonEndM
                };

                //Search the Dates array, if there is a same date, then update the "{morning, afternoon} attributes"
                var lgth = $scope.formation.dates.length;
                for (var i = 0; i < lgth; i++) {
                    console.log("$scope.formation.dates[i].date: ", $scope.formation.dates[i].date);
                    console.log("$scope.fDate.date: ", $scope.fDate.date);

                    console.log("El tipo de $scope.formation.dates[i].date es: ", typeof $scope.formation.dates[i].date);
                    console.log("El tipo de $scope.fDate.date: ", typeof $scope.fDate.date);

                    console.log("La comparacion da: ", ($scope.formation.dates[i].date == $scope.fDate.date))

                    if ($scope.formation.dates[i].date == $scope.fDate.date) {
                        console.log("Entre al if ");
                        $scope.formation.dates.splice(i, 1, {
                            date: $scope.fDate.date,
                            morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                            afternoon: {
                                hourStart: $scope.fDate.afternoon.hourStart,
                                hourEnd: $scope.fDate.afternoon.hourEnd
                            }
                        });

                        $scope.fDate.date = null;
                        $scope.InvalidDateParameters = true;

                        return;
                    }
                }

                $scope.formation.dates.push({
                    date: $scope.fDate.date,
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd}
                });

                $scope.fDate.date = null;
                $scope.InvalidDateParameters = true;
            };

            $scope.deleteDate = function (index) {
                if ($scope.formation.dates[index]) {
                    $scope.formation.dates.splice(index, 1);
                }
            };

            $scope.createFormation = function () {

                //Configure a formation object for create one.
                //we have injected the price, maxPeople and 'is Confirmed' from the view.
                $scope.formation.place = $scope.selectedPlace.id;
                $scope.formation.animators.push($scope.selectedPSY.id);
                $scope.formation.animators.push($scope.selectedBAFM.id);

                //Now use the create services for Formation.

                $http.post($rootScope.urlBase + "/formation/create", {
                        formationCenter: $rootScope.formationCenter,
                        formation: $scope.formation
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            alert("Formation Created.");
                            console.log("Formation Created.");
                            console.log(result.data);
                        } else {
                            alert("Error creating the Formation.");
                        }
                    })
                    .error(function (err) {
                        console.log("Error creating the Formation.");
                        console.log(err);
                        alert("Error creating the Formation.");
                    })
                    .finally(function () {
                        $scope.initParameters();
                    });
            };

            $scope.gotoManage = function () {
                $location.path('/formation/admin');
            }


            //========================================================================================//
            //==                            Date pickers configurations.                            ==//
            //========================================================================================//
            $scope.today = function () {
                $scope.dt = new Date();
            };

            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(2012, 5, 20),
                startingDay: 1
            };

            //For date pickers options configuration.
            actDate = new Date();

            // Date Input options
            $scope.DateInputOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: $scope.maxDate,
                minDate: actDate,
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.openDateInput = function () {
                $scope.popupDateInput.opened = true;
            };

            $scope.popupDateInput = {
                opened: false
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[1];
            $scope.altInputFormats = ['M!/d!/yyyy'];


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
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return vm.events[i].status;
                        }
                    }
                }

                return '';
            }

        }])
    .controller("ManageAnimatorController", ["$scope", "$rootScope", "$location", "$http", "$uibModal",
        function ($scope, $rootScope, $location, $http, $uibModal) {

            $scope.animators = [];
            $scope.showCreateForm = false;
            $scope.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
            $scope.zipcodeRegExp = /^\d{5}$/;

            $scope.initParameters = function () {
                $scope.animator = {};
                $scope.animator.type = 'PSY';

            };

            $scope.initParameters();

            $scope.validParameters = function () {
                return ($scope.animator.name && $scope.animator.firstName
                && $scope.animator.city
                && $scope.animator.zipCode);
            };

            $scope.createAnimator = function () {
                if ($scope.validParameters()) {

                    $http.post($rootScope.urlBase + "/animator/create", {
                            formationCenter: $rootScope.formationCenter,
                            animator: $scope.animator
                        })
                        .success(function (result) {
                            if (result.status === "ok") {

                                $scope.initParameters();
                                alert("Animator created.");
                                console.log("Animator created.", result.data);

                                $scope.searchAnimators();

                            } else {
                                alert("Error creating Animator: " + result.info);
                                console.log("Error creating Animator: ", result.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error creating Animator: ", err);
                        });
                }
            };

            $scope.ToggleShowCreateAnimator = function () {
                $scope.showCreateForm = !$scope.showCreateForm;
            };

            $scope.searchAnimators = function () {

                $http.post($rootScope.urlBase + "/animator/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animators = result.data;
                            console.log("Animators ok: ", result.data);
                        } else {
                            alert();
                            console.log("Error searching Animators: ", result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Animators: ", err);
                    });

            };

            $scope.searchAnimators();

            $scope.deleteAnimator = function (index) {
                var Aminator = $scope.animators[index];

                $http.post($rootScope.urlBase + "/animator/deleteByID", {
                        id: Aminator.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animators.splice(index, 1);
                            alert("Animator deleted");
                            console.log("Animator deleted");
                        } else {
                            console.log("Error deleting Animator: ", result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error deleting Animator: ", err);
                    });
            };

            $scope.editAnimator = function (index) {
                $location.path("/animator/edit/" + $scope.animators[index].id);
            };

        }])
    .controller("EditAnimatorController", ["$scope", "$rootScope", "$routeParams", "$location", "$http", "$uibModal",
        function ($scope, $rootScope, $routeParams, $location, $http, $uibModal) {

            $scope.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
            $scope.zipcodeRegExp = /^\d{5}$/;

            $scope.invalidParameters = false;

            $scope.animator = {};

            $scope.searchAnimator = function () {
                $http.post($rootScope.urlBase + "/animator/searchFormationCenterAndID", {
                        id: $routeParams.id,
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animator = result.data;
                        } else {
                            console.log("Error searching the Animator.", result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching the Animator.", err);
                    });
            };

            $scope.searchAnimator();

            $scope.validParameters = function () {
                return ($scope.animator.name && $scope.animator.firstName
                && $scope.animator.city
                && $scope.animator.zipCode);
            };

            $scope.checkParameters = function () {
                if ($scope.validParameters()) {
                    $scope.invalidParameters = false;
                } else {
                    $scope.invalidParameters = true;
                }
            };

            $scope.editAnimator = function () {

                var attributes = {
                    name: $scope.animator.name,
                    firstName: $scope.animator.firstName,
                    type: $scope.animator.type,
                    city: $scope.animator.city,
                    zipCode: $scope.animator.zipCode,
                    formationCenter: $scope.animator.formationCenter
                };

                $http.post($rootScope.urlBase + "/animator/update", {
                        id: $scope.animator.id,
                        attributes: attributes
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            alert("Animator updated.");
                            $location.path("/animator/manage");
                        } else {
                            console.log("Error updating Animator.", result.info);
                            alert(result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error updating Animator.", err);
                        alert("Error updating Animator." + result.info);
                    });
            };

            $scope.cancelEdit = function () {
                $location.path("/animator/manage");
            };

            $scope.clearAnimator = function () {
                $scope.animator.name = null;
                $scope.animator.firstName = null;
                $scope.animator.type = "PSY";
                $scope.animator.city = null;
                $scope.animator.zipCode = null;

                $scope.invalidParameters = true;
            };
        }])
    .controller("FormationCenterManagementController", ["$scope", "$rootScope", "$location", "$http", "NgMap", "$log",
        function ($scope, $rootScope, $location, $http, NgMap, $log) {

        }])
    .controller("DashboardController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap) {
            $scope.username = $rootScope.username
            $scope.formationCenter = $rootScope.formationCenter;


        }])
    .controller("SearchController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap) {

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

            $scope.statesWithFlags = [{
                'name': 'Alabama',
                'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
            }, {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'}, {
                'name': 'Arizona',
                'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
            }, {
                'name': 'Arkansas',
                'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
            }, {
                'name': 'California',
                'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
            }, {
                'name': 'Colorado',
                'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
            }, {
                'name': 'Connecticut',
                'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
            }, {
                'name': 'Delaware',
                'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'
            }, {'name': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'}, {
                'name': 'Georgia',
                'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
            }, {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'}, {
                'name': 'Idaho',
                'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
            }, {
                'name': 'Illinois',
                'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'
            }, {'name': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'}, {
                'name': 'Iowa',
                'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'
            }, {'name': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'}, {
                'name': 'Kentucky',
                'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
            }, {
                'name': 'Louisiana',
                'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
            }, {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'}, {
                'name': 'Maryland',
                'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
            }, {
                'name': 'Massachusetts',
                'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
            }, {
                'name': 'Michigan',
                'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
            }, {
                'name': 'Minnesota',
                'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
            }, {
                'name': 'Mississippi',
                'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
            }, {
                'name': 'Missouri',
                'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'
            }, {
                'name': 'Montana',
                'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
            }, {
                'name': 'Nebraska',
                'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'
            }, {
                'name': 'Nevada',
                'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
            }, {
                'name': 'New Hampshire',
                'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
            }, {
                'name': 'New Jersey',
                'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
            }, {
                'name': 'New Mexico',
                'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
            }, {
                'name': 'New York',
                'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
            }, {
                'name': 'North Carolina',
                'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
            }, {
                'name': 'North Dakota',
                'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
            }, {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'}, {
                'name': 'Oklahoma',
                'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
            }, {
                'name': 'Oregon',
                'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'
            }, {
                'name': 'Pennsylvania',
                'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
            }, {
                'name': 'Rhode Island',
                'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
            }, {
                'name': 'South Carolina',
                'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
            }, {
                'name': 'South Dakota',
                'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
            }, {
                'name': 'Tennessee',
                'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'
            }, {'name': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'}, {
                'name': 'Utah',
                'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'
            }, {
                'name': 'Vermont',
                'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
            }, {
                'name': 'Virginia',
                'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
            }, {
                'name': 'Washington',
                'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
            }, {
                'name': 'West Virginia',
                'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
            }, {
                'name': 'Wisconsin',
                'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
            }, {'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];

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

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
            $scope.format = $scope.formats[0];
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
            $scope.search.name = $routeParams.criteria;
            $scope.app = {}
            $scope.app.currentPage = 0;
            $scope.app.maxSize = 5;
            $scope.app.itemPerPage = 5;
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

                if ($scope.search.initialDate != "" || typeof $scope.search.endDate != "" || $scope.initialPrice != "") {
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
                if (typeof $scope.search.initialDate != "undefined") {
                    /*  if ( !Date.isDate($scope.search.initialDate)) {
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
                    config.initialDate = $scope.search.initialDate

                }

                if (typeof $scope.search.endDate != "undefined") {
                    /* if ( !_.isDate($scope.search.endDate)) {
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
                    config.finalDate = $scope.search.endDate

                }


                ///Date validate and if initialDate is more than that end date not search

                ///Price validate an if not a number or number < 0 not search
                if (typeof $scope.initialPrice != "undefined")
                    config.price = $scope.initialPrice

                if ($scope.search.name != 'undefined') {
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if (!isNaN(parseInt($scope.search.name))) {
                        //countbyzipcode
                        config.zipcode = $scope.search.name
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


                if ($scope.search.name == "undefined")
                    $scope.search.name = ""

                config.city = $scope.search.name
                //countbycity
                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Formation/countByCityMongoEx', config)
                    .success(function (data_result) {
                        if (data_result.res != "OK") {
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

                if (typeof $scope.search.initialDate != "undefined" || $scope.search.initialDate == "") {
                    /*                    if ( !_.isDate($scope.search.initialDate)) {
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
                    config.initialDate = $scope.search.initialDate

                }

                if (typeof $scope.search.endDate != "undefined" || $scope.search.endDate == "") {
                    /*if ( !Date.isDate($scope.search.endDate)) {
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
                    config.finalDate = $scope.search.endDate

                }


                ///Date validate and if initialDate is more than that end date not search

                ///Price validate an if not a number or number < 0 not search
                if (typeof $scope.initialPrice != "undefined")
                    config.price = $scope.initialPrice

                //console.log("Pagination " ,pageData )

                if ($scope.search.name != undefined) {
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if (!isNaN(parseInt($scope.search.name))) {
                        console.log("Es un numero")
                        ///Validar si es un numero postal angular.isNumber(value)

                        config.zipcode = $scope.search.name

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

                                $scope.formations = [];
                                //console.log("Resultados", data_result[0].formation.formationCenter)
                                data_result.forEach(function (iFormationcenter, ivalue) {


                                    iFormationcenter.name = iFormationcenter.formationCenter.name;
                                    iFormationcenter.city = iFormationcenter.place.city;
                                    iFormationcenter.address = iFormationcenter.place.address;
                                    iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                    console.log("Valor ", iFormationcenter.datetime)
                                    $scope.formations.push(iFormationcenter)
                                })

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

                        config.city = $scope.search.name
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
                                data_result.forEach(function (iFormationcenter, ivalue) {


                                    iFormationcenter.name = iFormationcenter.formationCenter.name;
                                    iFormationcenter.city = iFormationcenter.place.city;
                                    iFormationcenter.address = iFormationcenter.place.address;
                                    iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                    console.log("Valor ", iFormationcenter.datetime)
                                    $scope.formations.push(iFormationcenter)
                                    //console.log("Valor ",iFormation)

                                })
                                // console.log("RESULTADOS", data_result)
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
                            console.log("dfdd")

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
                            data_result.forEach(function (iFormationcenter, ivalue) {


                                iFormationcenter.name = iFormationcenter.formationCenter.name;
                                iFormationcenter.city = iFormationcenter.place.city;
                                iFormationcenter.address = iFormationcenter.place.address;
                                iFormationcenter.datetime = new Date(iFormationcenter.dates[0].date).getTime()
                                console.log("Valor ", iFormationcenter.datetime)
                                $scope.formations.push(iFormationcenter)
                            })


                            //console.log("RESULTADOS", data_result)


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

            $scope.formationBook = function (formationToReserve) {

                console.log("Formacion ", formationToReserve)

                /* if (formationToReserve == "") {
                 // @action mensaje de  error
                 $scope.searchResullt = null;
                 return;
                 }*/

                //$location.path("/formation/book/" + formationToReserve);

                $location.path("/formation/book/" + formationToReserve);
            };
//-------------------------------------------------------------------------------------------------------------------
            //Checkbox controler use with button
            $scope.checkAll = function () {
                $scope.search.formation = $scope.formations.map(function (item) {
                    return item.name;
                });
            };
            $scope.uncheckAll = function () {
                $scope.search.formation = [];
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


            $scope.search = {formation: []}
            // functions
            $scope.showMap = function ($event) {


                console.log(domElement + $scope.showmap);
                var domElement = document.getElementById('menu-item');
                console.log(domElement + $scope.showmap, $scope.search.formation.length);
                console.log("ddd", $scope.search.formation.length);
                unicdata = []
                for (iName in $scope.search.formation) {
                    console.log("Selecionado la formacion ", $scope.search.formation[iName].city)
                    cityName = $scope.search.formation[iName].city
                    unicdata.push($scope.search.formation[iName].city)
                    /*    unicdata = $scope.search.formation.filter( function ( item) {
                     return item != cityName
                     })*/

                }
                console.log("Places to search", unicdata)

                if (unicdata.length == 0) {

                    console.log("INSERTANDO ALERTA")
                    var message = "You must select some formation."
                    $scope.showMessage('danger', message);
                    return
                }
                config = {
                    places: unicdata
                }


                ///Search al city with name in array an return places
                ///if no place return empty and not  show anything
                $http.post($rootScope.urlBase + "/Place/searchByCities", config)
                    .success(function (data_result) {
                        if (data_result.length == 0) {
                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                            ///regresar a la pagina inicial
                            $scope.errorValid = true;
                            /// alert(data_result.err );
                            // $location.path("/");
                            console.log("INSERTANDO ALERTA")
                            message = "Sorry, can´t get places results"
                            $scope.showMessage('danger', message);
                            return;
                        }


                        formationcenters = [{places: []}]

                        formationcenters[0].places = data_result;

                        console.log("Places to search", formationcenters)
                        ///Show new positions
                        $scope.toggleDropdownTrue($event, formationcenters);
                        ///Clear chexk box
                        $scope.search.formation = []
                        //console.log("RESULTADOS", data_result)


                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log(error);

                        console.log("INSERTANDO ALERTA")
                        message = "Sorry, can´t get places results"
                        $scope.showMessage('danger', message);
                        return
                    })

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
    .controller('CustomControlCtrl', ["NgMap", "$scope", "$rootScope", "$http", "$location", function (NgMap, $scope, $rootScope, $http, $location) {

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

            $http.post($rootScope.urlBase + "/Place/searchallplaces")
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
            $event.preventDefault();
            $event.stopPropagation();

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

        console.log("Buscando")
        vm.click = function (event) {
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
            alert('this is at ' + latitud + " :" + longitud);
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
    .controller("PlaceSearchController", ["$scope", "$resource", function ($scope, $resource) {
        $scope.data = {};

        Post = $resource($rootScope.urlBase + "/testimony/searchAllTestimonies", $scope.data);

        $scope.search = function () {
            $scope.testimonies = Post.query();

            console.log($scope.testimonies);
        };
    }])
    .controller("FaqController", ['$scope', '$http', '$timeout', '$rootScope', function ($scope, $http, $timeout, $rootScope) {

        app = this;
        $scope.app = {}
        $scope.app.currentPage = 1;
        $scope.app.maxSize = 5;
        $scope.app.itemPerPage = 5;
        $scope.app.totalItems = 0;

        $scope.countRecords = function () {
            $http.get($rootScope.urlBase + "/Faq/count")
                .success(function (data, status, headers, config) {

                    if (data.res != "OK") {
                        $scope.app.totalItems = 0;
                        return;
                    }
                    $scope.app.totalItems = data.size
                })
                .error(function (data, status, header, config) {
                    console.log(data);
                });
        };

        $scope.getPagableRecords = function () {
            var param = {
                page: $scope.app.currentPage,
                len: $scope.app.itemPerPage
            };
            $http.get($rootScope.urlBase + "/Faq/findFaq", {params: param})
                .success(function (data, status, headers, config) {
                    $scope.FaqList = data;
                    //console.log("Resultados ",  $scope.FaqList)
                })
                .error(function (data, status, header, config) {
                    console.log(data);
                });
        };

        $scope.countRecords();
        $scope.getPagableRecords();

    }])
    .controller('DatepickerDemoCtrl', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
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

        $scope.toggleMin = function () {
            $scope.options.minDate = $scope.options.minDate ? null : new Date();
        };

        $scope.toggleMin();

        $scope.setDate = function (year, month, day) {
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
    })
    .controller('DatepickerPopupDemoCtrl', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
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

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
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
    })
    .controller('TypeaheadCtrl', function ($scope, $http) {

        var _selected;

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Any function returning a promise object can be used to load values asynchronously
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

        $scope.statesWithFlags = [{
            'name': 'Alabama',
            'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
        }, {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'}, {
            'name': 'Arizona',
            'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
        }, {
            'name': 'Arkansas',
            'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
        }, {
            'name': 'California',
            'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
        }, {
            'name': 'Colorado',
            'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
        }, {
            'name': 'Connecticut',
            'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
        }, {'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'}, {
            'name': 'Florida',
            'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
        }, {
            'name': 'Georgia',
            'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
        }, {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'}, {
            'name': 'Idaho',
            'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
        }, {'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'}, {
            'name': 'Indiana',
            'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
        }, {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'}, {
            'name': 'Kansas',
            'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
        }, {
            'name': 'Kentucky',
            'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
        }, {'name': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'}, {
            'name': 'Maine',
            'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'
        }, {
            'name': 'Maryland',
            'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
        }, {
            'name': 'Massachusetts',
            'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
        }, {
            'name': 'Michigan',
            'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
        }, {
            'name': 'Minnesota',
            'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
        }, {
            'name': 'Mississippi',
            'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
        }, {'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'}, {
            'name': 'Montana',
            'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
        }, {'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'}, {
            'name': 'Nevada',
            'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
        }, {
            'name': 'New Hampshire',
            'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
        }, {
            'name': 'New Jersey',
            'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
        }, {
            'name': 'New Mexico',
            'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
        }, {
            'name': 'New York',
            'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
        }, {
            'name': 'North Carolina',
            'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
        }, {
            'name': 'North Dakota',
            'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
        }, {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'}, {
            'name': 'Oklahoma',
            'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
        }, {'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'}, {
            'name': 'Pennsylvania',
            'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
        }, {
            'name': 'Rhode Island',
            'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
        }, {
            'name': 'South Carolina',
            'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
        }, {
            'name': 'South Dakota',
            'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
        }, {'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'}, {
            'name': 'Texas',
            'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
        }, {'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'}, {
            'name': 'Vermont',
            'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
        }, {
            'name': 'Virginia',
            'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
        }, {
            'name': 'Washington',
            'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
        }, {
            'name': 'West Virginia',
            'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
        }, {
            'name': 'Wisconsin',
            'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
        }, {'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
    })
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

            console.log("Formation center name", formationCenterName)
            $scope.formationCenterName = formationCenterName
            ///Find formation center iformation
            $http.post($rootScope.urlBase + "/formationcenter/searchbyname", {
                    name: formationCenterName
                })
                .success(function (data_result) {
                    if (data_result.err) {
                        ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                        ///regresar a la pagina inicial
                        $scope.errorMessage = data_result.err;
                        console.log("Error " + data_result)
                        // alert($scope.errorMessage);
                        // $location.path("/");
                        return;
                    }

                    console.log("Result ", data_result)
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
                        console.log("Modal text" + $scope.selected)
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

        $scope.items = items;
        $scope.selected = {
            item: $scope.items
        };

        $scope.ok = function () {
            $scope.selected.item.action = "OK"
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.formationCenterName = ""
        };
    })
    .controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://lorempixel.com/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        $scope.randomize = function () {
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
    })
    .controller('CollapseDemoCtrl', function ($scope) {
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = true;
    })
    .controller('DropdownCtrl', function ($scope, $log) {
        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
            $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function ($event) {
            console.log("Evento ", $event)
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
    })
    .controller('PaginationDemoCtrl', function ($scope, $log) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    })
    .controller('PopoverDemoCtrl', function ($scope, $sce) {
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
    })
    .controller('ProgressDemoCtrl', function ($scope) {
        $scope.max = 200;

        $scope.random = function () {
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

        $scope.randomStacked = function () {
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
    })
    .controller('RatingDemoCtrl', function ($scope) {
        $scope.rate = 7;
        $scope.max = 10;
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
    })
    .controller('TimepickerDemoCtrl', function ($scope, $log) {
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function () {
            $scope.mytime = null;
        };
    })
    .controller('TooltipDemoCtrl', function ($scope, $sce) {
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
    })
    .controller('TypeaheadCtrl', function ($scope, $http) {

        var _selected;

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Any function returning a promise object can be used to load values asynchronously
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

        $scope.statesWithFlags = [{
            'name': 'Alabama',
            'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
        }, {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'}, {
            'name': 'Arizona',
            'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
        }, {'name': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'}, {
            'name': 'California',
            'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
        }, {'name': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'}, {
            'name': 'Connecticut',
            'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
        }, {'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'}, {
            'name': 'Florida',
            'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
        }, {
            'name': 'Georgia',
            'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
        }, {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'}, {
            'name': 'Idaho',
            'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
        }, {'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'}, {
            'name': 'Indiana',
            'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
        }, {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'}, {
            'name': 'Kansas',
            'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
        }, {'name': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'}, {
            'name': 'Louisiana',
            'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
        }, {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'}, {
            'name': 'Maryland',
            'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
        }, {
            'name': 'Massachusetts',
            'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
        }, {'name': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'}, {
            'name': 'Minnesota',
            'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
        }, {
            'name': 'Mississippi',
            'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
        }, {'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'}, {
            'name': 'Montana',
            'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
        }, {'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'}, {
            'name': 'Nevada',
            'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
        }, {
            'name': 'New Hampshire',
            'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
        }, {
            'name': 'New Jersey',
            'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
        }, {
            'name': 'New Mexico',
            'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
        }, {
            'name': 'New York',
            'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
        }, {
            'name': 'North Carolina',
            'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
        }, {
            'name': 'North Dakota',
            'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
        }, {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'}, {
            'name': 'Oklahoma',
            'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
        }, {'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'}, {
            'name': 'Pennsylvania',
            'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
        }, {
            'name': 'Rhode Island',
            'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
        }, {
            'name': 'South Carolina',
            'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
        }, {
            'name': 'South Dakota',
            'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
        }, {'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'}, {
            'name': 'Texas',
            'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
        }, {'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'}, {
            'name': 'Vermont',
            'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
        }, {'name': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'}, {
            'name': 'Washington',
            'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
        }, {
            'name': 'West Virginia',
            'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
        }, {'name': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'}, {
            'name': 'Wyoming',
            'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'
        }];
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
        vm.dateRegExp = /^\d{4}\/\d{2}\/\d{2}$/;
        vm.numberRegExp = /^\d{12}$/;

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

                if (newStep === 4)
                    return;

                vm.currentStep = newStep;
                return;
            }

            if (vm.currentStep === 4) {
                if (newStep !== 4) {
                    vm.initCustomerData();
                    vm.currentStep = 1;
                }

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
                    if (selectedItem.status == "OK")
                        vm.sucessfulPay = true;
                    vm.showPaymentMessages({type: "success", info: "Book process complit."});

                    vm.currentStep = 4;
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

        // BirthDate options
        vm.BirthDateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(actDate.getFullYear() - 16, actDate.getMonth(), actDate.getDate()),
            minDate: new Date(actDate.getFullYear() - 80, 0, 1),
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
        vm.format = vm.formats[1];
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

    })
    .controller('ModalInstanceCtrlWizard', function ($scope, $uibModalInstance, $rootScope, $routeParams, $http, customerData) {
// Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
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
        $scope.format = $scope.formats[1];
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
        $scope.dateRegExp = /^\d{4}\/\d{2}\/\d{2}$/;

        $scope.creditCardData = {};
        $scope.popupCardCreditDate = {
            opened: false
        };

        $scope.openCardCreditDate = function () {
            $scope.popupCardCreditDate.opened = true;
        };

        $scope.customerData = customerData;
        //$scope.selected = {
        //    item: $scope.items[0]
        //};

        $scope.ok = function () {


            ///With formation center identifier and constumer data make payment
            if (!$scope.paymentdata.$valid) {

                if ($scope.paymentMessages.length > 0) {
                    $scope.paymentMessages.splice(0, 1);
                }
                $scope.paymentMessages.push({type: "danger", info: "Sorry, Some fields are invalid"});
                return;
            }


            ////Make payment if all data if of
            config = {
                userdata: $scope.customerData,
                formationidentifier: $routeParams.id,
                creditCardData: $scope.creditCardData
            }

            console.log("DATA to send to services", config)
            $http.get($rootScope.urlBase + "/Payment/makepayment/", config)
                .success(function (data, status, headers, config) {
                    if (data.response === "ok") {

                        if (vm.paymentMessages.length > 0) {
                            vm.paymentMessages.splice(0, 1);
                        }
                        vm.paymentMessages.push({type: "success", info: "Payment ok."});

                        // The payment have been made. Now make the book process.
                        $http.post($rootScope.urlBase + "/formation/bookFormation", {
                                id: $routeParams.id,
                                customerData: vm.customerData
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

                        vm.gotoStep(4);
                    }
                })

            selectedItem = {status: "OK"}
            $uibModalInstance.close(selectedItem);
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.formationCenterName = ""
        };
    })
    .controller("PlaceEditcontroller", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$uibModal", "$log", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $uibModal, $log, $translate) {

            $scope.usernameExpReg = /^([µ|ç|ùàè|áéíóú|a-z|A-Z]*)([\w|\d])*([_|\s]*[\.|\-|\'|ç|ùàè|áéíóú|A-Z|a-z|\d])*$/;
            ///^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;
            $scope.numExpReg = /^[\d]+$/;
            ///Data Structure for insert
            //$scope.place = {
            //    address: "",
            //    zipcode: "",
            //    name: "",
            //    agrementname: "",
            //    agrementnumber: "",
            //    city: "",
            //    isConfirmed: false
            //}
            $scope.alerts = [];
            $scope.place = $rootScope.place
            $scope.variable = $rootScope.variable

            $scope.$on('EVENT_EDIT_DATA', function (event, data) {
                $scope.place = {}
                $scope.variable = {name: "La prueba"}
                console.log('received broadcasted event');
                $scope.placetoEditI = data;

                if (typeof  $scope.placetoEditID != "undefined") {
                    $scope.place.name = $scope.placetoEditID.name
                    $scope.place.city = $scope.placetoEditID.city

                    $scope.variable.name = $scope.placetoEditID.city
                    $scope.place.address = $scope.placetoEditID.address
                    $scope.place.zipcode = $scope.placetoEditID.zipcode
                    $scope.place.agrementname = $scope.placetoEditID.agreementName
                    $scope.place.agrementnumber = $scope.placetoEditID.agreementNumber
                    $scope.place.isConfirmed = $scope.placetoEditID.isActivated
                    console.log("Update editing value ", $scope.place)

                }
                console.log('received broadcasted event ' + 'EVENT_EDIT_DATA');
                $scope.searchAllPlacesEdit();

            });


            $scope.$on('EVENT_ADD_DATA', function (event, data) {
                console.log('received broadcasted event ' + 'EVENT_ADD_DATA');
                $scope.searchAllPlacesEdit();
            });
            ///Verified if edit value

            $scope.resetPlaceData = function () {
                $scope.place.name = null
                $scope.place.city = null
                $scope.place.address = null
                $scope.place.zipcode = null
                $scope.place.agreementName = null
                $scope.place.agreementNumber = null
                $scope.place.isActivated = false
                $scope.place.latitude = null
                $scope.place.longitude = null
            }
            $scope.showMessagePlace = function (type, message) {

                if ($scope.alerts.length > 0) {
                    $scope.alerts.splice(0, 1);
                }
                //console.log("MENSAJE DE ALERTA " , message)
                $scope.alerts.push({type: type, msg: message});
            }

            /*
             Create place function
             Get in object place all necesari data
             */
            $scope.createPlace = function () {

                $scope.place.latitude = 44.090066452554424
                $scope.place.longitude = 4.9543940842151642
                if ((typeof $scope.place.latitude == "undefined" || $scope.place.latitude == "" ) || (typeof $scope.place.longitude == "undefined" || $scope.place.longitude == "" )) {

                    objectData = {type:"Error"}
                    $scope.showModalMessage("Not location's place defined"  , objectData);
                    //( 'NOT_LOCATION_PLACE' | translate )
                }
                else {

                ///if editing
                console.log("Position to create ", $scope.place.latitude , $scope.place.longitude )
                if (typeof  $scope.place.type != "undefined") {
                    $scope.place.isValidated = $scope.place.isConfirmed



                    if (String($scope.place.type).toLowerCase() == "editing") {

                        ////Temporal
                        //$scope.place.latitude = 44.090066452554424
                        //$scope.place.longitude = 4.9543940842151642

                        $http.post($rootScope.urlBase + "/Place/updatePlace", $scope.place)
                            .success(function (data) {
                                if (typeof data != 'undefined' && data.response != "ERROR") {
                                    objectMessage = {type: "Information"}
                                    $scope.showModalMessage("Updated place", objectMessage);
                                    $scope.searchAllPlacesEdit();
                                   // delete $scope.place;
                                    $scope.resetPlaceData()
                                    $location.path("/place/listdata");

                                    return
                                }
                                else {
                                    objectMessage = {type: "Error"}
                                    console.log("Ocurrio un error ", data)
                                    $scope.showModalMessage(data.message, objectMessage);
                                    return

                                }
                                //console.log($scope.places);

                            })
                            .error(function (err) {
                                console.log(err);
                                var message = "You must select some formation."
                                objectMessage = {type: "Error"}
                                $scope.showModalMessage(err.message, objectMessage);
                                return
                            });

                    } else if (String($scope.place.type).toLowerCase() == "creating") {
                        objectMessage = {type: "Information"}

                        ////Temporal
                        //$scope.place.latitude = 44.090066452554424
                        //$scope.place.longitude = 4.9543940842151642

                        console.log("DATA ", $scope.place)
                        $http.post($rootScope.urlBase + "/Place/createPlace", $scope.place)
                            .success(function (data) {
                                if (typeof data != 'undefined' && data.response != "ERROR") {

                                    $scope.showModalMessage("Created place", objectMessage);
                                    $scope.searchAllPlacesEdit();
                                     $scope.place = {}
                                  $scope.resetPlaceData()
                                    //delete $scope.place;
                                    $scope.place.type = "EDITING"
                                    return
                                }
                                else {
                                    objectMessage = {type: "Error"}
                                    console.log("Ocurrio un error ", data)
                                    $scope.showModalMessage(data.message, objectMessage);
                                    //return

                                }

                            })
                            .error(function (err) {
                                console.log(err);
                            });

                    }
                }
                ///if createplace


                }


            }

            $scope.showAllPlace = function () {
                $location.path("/place/listdata");
            }


            ///-------------------------------------------------- Map controll ---------------------------------------------------------
            $scope.showmap = false;
            /// console.log("Buscando")
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
                $scope.map = map;
                marker = map.markers[0];
                console.log("Asignando datos")
            });
            $scope.centerChanged = function (event) {
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

            //console.log("Buscando")
            $scope.click = function (event) {
                // console.log("Buscando")
                $scope.map.setZoom(8);
                //$scope.map.setCenter(marker.getPosition());
                /// console.log("En esta posicion ");
                $scope.data = $scope.map;
                possArray = String(event.latLng).split(",")
                latitud = String(possArray[0]).replace("(","")
                longitud = possArray[1].replace(")","")


                ///
///Find formationcenter by position
//                $http.post($rootScope.urlBase + "/formationcenter/searchformationbyPos", {
//                        "latitude":  latitud,
//                        "longitude":  longitud, })
//                    .success(function (data_result) {
//                        if (data_result.err ){
//                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
//                            ///regresar a la pagina inicial
//                            $scope.errorMessage = data_result.err ;
//                            // alert($scope.errorMessage);
//                            // $location.path("/");
//                            return;
//                        }
//
//                        $scope.formationcenters = data_result;
//                        $location.path("/search/" + $scope.criteria);
//                    })
//                    .error(function (error) {
//                        //@action mostrar error
//                        $scope.errorMessage = error
//                        console.log(error);
//                    })
//                ;

                ////IMPORTANTE  SEEEEEEEEEEEESSSSSS
                ///Find if position is inner France if not show alert o modal windows

                ///else find Formation-Place near position

                ///if not there show alert o windows

                $scope.place.latitude = latitud;
                $scope.place.longitude = longitud;
                alert('this is at ' + latitud + " :" + longitud);
                // alert(arg1+arg2);
            }


////--------------------------------------------------- Show Map ---------------------------------------------
            $scope.searchAllPlacesEdit = function () {

                ///Search  by formationCenter asociated
                ///by formationcentername
                //formationCenterId = req.param("formationcenter");
                //cityname = req.param('city')
                //searchByCityMongoFormationCenterEx
                //len
                //page

                config = {
                    page: 0,
                    len: 5,
                    formationCenterId: $scope.formationcenterName,
                    city: ""
                }
                ///Services to call
                //searchByCityMongoFormationCenterEx
                $http.get($rootScope.urlBase + "/Place/searchallplaces", config)
                    .success(function (data) {
                        if (typeof data != 'undefined') {
                            $scope.places = data
                        }

                        //console.log($scope.places);

                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };


///---------------------------------------------------------------------------------------------------------------------
            $scope.showModalMessage = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"
                $scope.items = objectData;
                $scope.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalMessageEditing.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;

                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }

            $scope.searchAllPlacesEdit();
        }])
    .controller("PlaceListcontroller", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$uibModal", "$log", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $uibModal, $log, $translate) {
            $scope.advanceSearch = true
            ///^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;
            $scope.usernameExpReg = /^([µ|ç|ùàè|áéíóú|a-z|A-Z]*)([\w|\d])*([_|\s]*[\.|\-|\'|ç|ùàè|áéíóú|A-Z|a-z|\d])*$/;

            $scope.numExpReg = /^[\d]+$/;
            $scope.placetoEditID = 0
            $scope.titleformplace = $scope.EDIT_PLACE;
            console.log("Traduccion")
            $scope.checkboxUnable = true
            $scope.seachPlace = {}
            $scope.formationcenterName = $rootScope.formationCenter

            // local configurations
            app = this;
            $scope.map = false;
            $scope.searchResullt = null;
            $scope.search = {};
            $scope.search.namePlace = "";
            $scope.appPlace = {}
            $scope.appPlace.currentPagePlace = 0;
            $scope.appPlace.maxSizePlace = 5;
            $scope.appPlace.itemPerPagePlace = 5;
            $scope.appPlace.totalItemsPlace = 0;
            $scope.appPlace.smallnumPages = 5

            $scope.alerts = [];

            $scope.showMessagePlace = function (type, message) {

                if ($scope.alerts.length > 0) {
                    $scope.alerts.splice(0, 1);
                }
                //console.log("MENSAJE DE ALERTA " , message)
                $scope.alerts.push({type: type, msg: message});
            }
            $scope.searchAllPlaces = function () {

                ///Search  by formationCenter asociated
                ///by formationcentername
                //formationCenterId = req.param("formationcenter");
                //cityname = req.param('city')
                //searchByCityMongoFormationCenterEx
                //len
                //page

                config = {
                    page: 0,
                    len: $scope.appPlace.maxSizePlace,
                    formationCenterId: $scope.formationcenterName,
                    city: ""
                }
                ///Services to call
                //searchByCityMongoFormationCenterEx
                $http.get($rootScope.urlBase + "/Place/searchallplaces", config)
                    .success(function (data) {
                        if (typeof data != 'undefined') {
                            $scope.placesData = data
                        }

                        //console.log($scope.places);

                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };

            $scope.showModalData = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"
                $scope.items = objectData;
                $scope.items.message = messageshow

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

                    console.log("Seleccionado OK para eliminar ", $scope.selected)
                    if (typeof $scope.selected != "undefined" && $scope.selected.action == "OK") {
                        if (typeof  $scope.selected != "undefined" && typeof $scope.selected.id != "undefined") {
                            ///Delete object if place if active
                            ////Call delete services
                            messageObject = {}
                            messageObject.type = "MESSAGE"
                            console.log("Delete object")
                            $http.post($rootScope.urlBase + "/Place/deleteplace", $scope.selected)
                                .success(function (data) {
                                    if (typeof data != 'undefined') {


                                    }
                                    $scope.showModalMessage("Place delete sucessful", messageObject);
                                    //console.log($scope.places);

                                })
                                .error(function (err) {
                                    console.log(err);
                                    ///Show message because error happens

                                    messageObject.type = "ERROR"
                                    //  $scope.showMessagePlace( "danger", err.message)
                                    $scope.showModalMessage(err.message, messageObject);

                                });

                            ////Load places news remeber pagination and search criteria

                            console.log("Refress DATA")
                            $scope.countRecordsPlace();
                            $scope.getPlaceRecords();
                        }
                    }
                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }


            $scope.showModalMessage = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"
                $scope.items = objectData;
                $scope.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalMessage.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;

                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }


            $scope.searchFuncList = function () {


                if (typeof $scope.criteriaList == "undefined" || $scope.criteriaList == "")
                    $scope.criteriaList = ""

                $scope.search.name = $scope.criteriaList;
                $scope.appPlace.currentPagePlace = 0;

                $scope.countRecordsPlace()
                $scope.getPlaceRecords();


            }

            $scope.countRecordsPlace = function () {

                $scope.search.name = $scope.criteriaList

                config = {
                    page: 0,
                    len: $scope.appPlace.maxSizePlace,
                    formationCenterId: $scope.formationcenterName,
                    city: ""
                }


                if (typeof $scope.seachPlace.name != "undefined") {
                    config.name = $scope.seachPlace.name
                }

                if (typeof $scope.seachPlace.address != "undefined") {
                    config.address = $scope.seachPlace.address
                }

                if (typeof $scope.seachPlace.agrementname != "undefined")
                    config.agrementname = $scope.seachPlace.agrementname

                if (typeof $scope.seachPlace.agrementname != "undefined")
                    config.agrementname = $scope.seachPlace.agrementname

                if (typeof $scope.seachPlace.agrementnumber != "undefined")
                    config.agrementnumber = $scope.seachPlace.agrementnumber

                if ($scope.search.name != 'undefined') {
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if (!isNaN(parseInt($scope.search.name))) {
                        //countbyzipcode
                        config.zipcode = $scope.search.name
                        console.log("Call services ", config)
                        $http.post($rootScope.urlBase + "/Place/countByZipcodeMongoEx", config)
                            .success(function (data_result) {
                                if (data_result.res != "OK") {
                                    $scope.appPlace.totalItemsPlace = 0;
                                    return;
                                }
                                console.log("Cantidad de objetos ", data_result.size)
                                $scope.appPlace.totalItemsPlace = data_result.size
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


                if (typeof  $scope.search.name == "undefined")
                    $scope.search.name = ""

                config.city = $scope.search.name
                //countbycity
                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Place/countByCityMongoEx', config)
                    .success(function (data_result) {
                        if (data_result.res != "OK") {
                            $scope.appPlace.totalItemsPlace = 0;
                            return;
                        }
                        console.log("Cantidad de objetos ---", data_result.size)
                        $scope.appPlace.totalItemsPlace = data_result.size
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


            $scope.getPlaceRecords = function () {

                $scope.search.name = $scope.criteriaList

                var pageData = 0;


                if ($scope.appPlace.currentPagePlace > 0) {
                    pageData = $scope.appPlace.currentPagePlace - 1;
                    pageData = String(pageData)
                }


                config = {
                    page: pageData,
                    len: $scope.appPlace.maxSizePlace,
                    formationCenterId: $scope.formationcenterName,
                }


                if (typeof $scope.seachPlace.name != "undefined") {
                    config.name = $scope.seachPlace.name
                }

                if (typeof $scope.seachPlace.address != "undefined") {
                    config.address = $scope.seachPlace.address
                }

                if (typeof $scope.seachPlace.agreementName != "undefined")
                    config.agreementName = $scope.seachPlace.agreementName

                if (typeof $scope.seachPlace.agreementNumber != "undefined")
                    config.agreementNumber = $scope.seachPlace.agreementNumber

                console.log("Search execution")
                if ($scope.search.name != 'undefined') {
                    console.log("Search execution s")
                    //console.log("ddddddnnnn"+ !isNaN(parseInt ($scope.search.name )))
                    if (!isNaN(parseInt($scope.search.name))) {
                        //countbyzipcode
                        config.zipcode = $scope.search.name
                        console.log("Call services ", config)
                        $http.post($rootScope.urlBase + "/Place/searchByZipcodeMongoEx", config)
                            .success(function (data_result) {
                                if (data_result.res != "OK") {
                                    $scope.appPlace.currentPagePlace = 0;
                                    return;
                                }
                                console.log("Cantidad de objetos ", data_result.length)
                                // $scope.appPlace.currentPagePlace = 0;
                                $scope.places = data_result
                                ///Review if clean al parameter
                                $scope.activatedPlace = []
                                $scope.seachPlace = {}
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

                console.log("Search execution s")
                if (typeof  $scope.search.name == "undefined")
                    $scope.search.name = ""

                config.city = $scope.search.name
                //countbycity
                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Place/searchByCityMongoEx', config)
                    .success(function (data_result) {
                        if (data_result.length == 0 || typeof data_result.length == "undefined") {
                            $scope.appPlace.currentPagePlace = 0;
                            ///Error message
                            message = "Sorry, search don´t have results";
                            //$scope.alerts.push({
                            //    type: 'danger',
                            //    msg: message
                            //});

                            objectType = {type: "Error"};
                            console.log("Error show form")
                            $scope.showModalMessage(message, objectType);
                            return;
                        }
                        console.log("Cantidad de objetos --- obtenidos", data_result.length)
                        // $scope.appPlace.currentPagePlace = 0;
                        $scope.places = data_result
                        $scope.activatedPlace = []
                        ///Review if clean al parameter
                        return;
                        // console.log("RESULTADOS", data_result)
                    })
                    .error(function (error) {
                        //@action mostrar error

                        $scope.errorMessage = error

                        message = error;
                        //$scope.alerts.push({
                        //    type: 'danger',
                        //    msg: message
                        //});

                        objectType = {type: "Error"};

                        $scope.showModalMessage(message, objectType);
                        console.log(error);
                        return
                    })

            }
            ///-----------------------------------------------------

            $scope.addPlace = function () {
                $scope.titleformplace = "ADD_PLACE"
                $scope.placetoEditID = 0;
                $rootScope.place = {}
                $rootScope.place.type = "CREATING";
                console.log("EDICION ", $scope.SAVE_BUTTON);
                $location.path('/place/edit');
            }


            $scope.editPlace = function (placeId) {

                if (typeof placeId == "undefined") {
                } else {
                    ///Show edit place
                    $scope.placetoEditID = placeId;
                    console.log("Update editing value ListController")
                    $scope.titleformplace = "EDIT_PLACE";

                    $rootScope.place = {}
                    $rootScope.variable = {name: "La prueba"}
                    console.log('received broadcasted event');


                    if (typeof  $scope.placetoEditID != "undefined") {
                        $rootScope.place = $scope.placetoEditID
                        //$rootScope.place.city = $scope.placetoEditID.city
                        //$rootScope.place.address = $scope.placetoEditID.address
                        //$rootScope.place.zipcode = $scope.placetoEditID.zipcode
                        //$rootScope.place.agrementname = $scope.placetoEditID.agreementName
                        //$rootScope.place.agrementnumber = $scope.placetoEditID.agreementNumber
                        //$rootScope.place.isConfirmed = $scope.placetoEditID.isActivated
                        $rootScope.place.type = "EDITING";
                        console.log("EDICION ", $scope.SAVE_BUTTON);
                        console.log("Update editing value ", $scope.place)

                    }
                    $location.path('/place/edit', function (result) {

                    });


                    $rootScope.$broadcast("EVENT_EDIT_DATA", $scope.placetoEditID)

                }


            }

            $scope.deletePlace = function (placeObject) {

                if (typeof placeObject != "undefined" && typeof placeObject.id != "undefined") {

                    ///Show modal with validation message confirmation
                    $scope.showModalData("Are you sure delete these place", placeObject);

                }

            }

            ////--------------------------------- Modal control -------------------

            $scope.items = {}; //['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;
            $scope.formationCenterName = ""
            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };


            $scope.search = {formation: []}
            // functions
            $scope.showMap = function ($event) {


                console.log(domElement + $scope.showmap);
                var domElement = document.getElementById('menu-item');
                console.log(domElement + $scope.showmap, $scope.search.formation.length);
                console.log("ddd", $scope.search.formation.length);
                unicdata = []
                for (iName in $scope.search.formation) {
                    console.log("Selecionado la formacion ", $scope.search.formation[iName].city)
                    cityName = $scope.search.formation[iName].city
                    unicdata.push($scope.search.formation[iName].city)
                    /*    unicdata = $scope.search.formation.filter( function ( item) {
                     return item != cityName
                     })*/

                }
                console.log("Places to search", unicdata)

                if (unicdata.length == 0) {

                    console.log("INSERTANDO ALERTA")
                    var message = "You must select some formation."
                    objectMessage = {type: "Error"}
                    $scope.showModalMessage(message, objectMessage);
                    return
                }
                config = {
                    places: unicdata
                }


                ///Search al city with name in array an return places
                ///if no place return empty and not  show anything
                $http.post($rootScope.urlBase + "/Place/searchByCities", config)
                    .success(function (data_result) {
                        if (data_result.length == 0) {
                            ///Mostrar mensaje en ventana modal de que no existe centros de formacion
                            ///regresar a la pagina inicial
                            $scope.errorValid = true;
                            /// alert(data_result.err );
                            // $location.path("/");
                            console.log("INSERTANDO ALERTA")
                            message = "Sorry, can´t get places results"
                            objectMessage = {type: "Error"}
                            $scope.showModalMessage(message, objectMessage);
                            //$scope.showMessage('danger', message);
                            return;
                        }


                        formationcenters = [{places: []}]
                        formationcenters[0].places = data_result;

                        console.log("Places to search", formationcenters)
                        ///Show new positions
                        $scope.toggleDropdownTrue($event, formationcenters);
                        ///Clear chexk box
                        $scope.search.formation = []
                        //console.log("RESULTADOS", data_result)


                    })
                    .error(function (error) {
                        //@action mostrar error
                        $scope.errorMessage = error
                        console.log(error);

                        console.log("INSERTANDO ALERTA")
                        message = "Sorry, can´t get places results"
                        objectMessage = {type: "Error"}
                        $scope.showModalMessage(message, objectMessage);
                        return
                    })

                console.log(domElement);
                console.log("SHOW MAP")
            };

            $scope.countRecordsPlace();
            $scope.getPlaceRecords();
            $scope.searchAllPlaces();

        }])
    .controller("ManagementBanckAccountController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap) {
            $scope.advanceSearch = true


        }])
    .controller("BillListController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$uibModal", "$log", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $uibModal, $log, $translate) {
            $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Fryday", "Saturday"]

            $scope.advanceSearch = true
            $scope.checkboxUnable = true
            $scope.appBill = {}
            $scope.appBill.currentPageBill = 0;
            $scope.appBill.maxSizeBill = 5;
            $scope.appBill.itemPerPageBill = 5;
            $scope.appBill.totalItemsBill = 0;
            $scope.appBill.smallnumPages = 5

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
            //    minDate: new Date(),
                showWeeks: true
            };
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
            //    minDate: new Date(),
                startingDay: 1
            };

            $scope.dateOptionsSearch = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date(2020, 5, 22),
              //  minDate: new Date(),
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

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
            $scope.format = $scope.formats[0];
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

            $scope.formationcenterName = $rootScope.formationCenter;

            $scope.searchAllBills = function () {
                $http.get($rootScope.urlBase + "/Bill/searchallbills")
                    .success(function (data) {
                        if (typeof data != 'undefined') {
                            $scope.places = data
                        }

                        console.log($scope.places);

                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };

            $scope.searchAllBills();

            $scope.countRecordsBill = function () {

                //$scope.search.name = $scope.criteriaList

                config = {
                    page: 0,
                    len: $scope.appBill.maxSizeBill,
                    nameformation: $scope.formationcenterName,
                    city: ""
                }


                //if (typeof $scope.seachBill.name != "undefined") {
                //    config.name = $scope.seachBill.name
                //}
                //
                //if (typeof $scope.seachBill.address != "undefined") {
                //    config.address = $scope.seachBill.address
                //}
                //
                //if (typeof $scope.seachBill.agrementname != "undefined")
                //    config.agrementname = $scope.seachBill.agrementname
                //
                //if (typeof $scope.seachBill.agrementname != "undefined")
                //    config.agrementname = $scope.seachBill.agrementname
                //
                //if (typeof $scope.seachBill.agrementnumber != "undefined")
                //    config.agrementnumber = $scope.seachBill.agrementnumber


                //if (typeof  $scope.search.name == "undefined")
                //    $scope.search.name = ""
                //
                //config.city = $scope.search.name
                //countbycity
                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Bill/countBillByFormationCenter', config)
                    .success(function (data_result) {
                        if (data_result.res != "OK") {
                            $scope.appBill.totalItemsBill = 0;
                            return;
                        }
                        console.log("Cantidad de objetos ---", data_result.size)
                        $scope.appBill.totalItemsBill = data_result.size
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


            $scope.getBillRecords = function () {

                //$scope.search.name = $scope.criteriaList

                var pageData = 0;


                if ($scope.appBill.currentPageBill > 0) {
                    pageData = $scope.appBill.currentPageBill - 1;
                    pageData = String(pageData)
                }


                config = {
                    page: pageData,
                    len: $scope.appBill.maxSizeBill,
                    nameformation: $scope.formationcenterName,
                }

                ///Search by amount else
                if (!isNaN(parseInt($scope.search.name))) {
                    config.amount = $scope.search.name
                }

                if (typeof $scope.search.initialDate != "undefined" || $scope.search.initialDate == "") {
                    /*                    if ( !_.isDate($scope.search.initialDate)) {
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
                    config.initialDate = $scope.search.initialDate

                }

                if (typeof $scope.search.endDate != "undefined" || $scope.search.endDate == "") {
                    /*if ( !Date.isDate($scope.search.endDate)) {
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
                    config.finalDate = $scope.search.endDate

                }



                console.log("Search execution")

                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Bill/searchBillByFormationCenter', config)
                    .success(function (data_result) {
                        if (data_result.length == 0 || typeof data_result.length == "undefined") {
                            //$scope.appBill.currentPageBill = 0;
                            message = "Sorry, search don´t have results";
                            //$scope.alerts.push({
                            //    type: 'danger',
                            //    msg: message
                            //});

                            objectType = {type: "Error"};
                            console.log("Error show form")
                            $scope.showModalMessage(message, objectType);
                            return;

                        }
                        console.log("Cantidad de objetos --- obtenidos", data_result.length)
                        // $scope.appBill.currentPageBill = 0;
                        $scope.Bills = data_result
                        $scope.activatedBill = []
                        ///Review if clean al parameter
                        return;
                        // console.log("RESULTADOS", data_result)
                    })
                    .error(function (error) {
                        //@action mostrar error

                        $scope.errorMessage = error
                        message = error
                        objectType = {type: "Error"};
                        console.log("Error show form")
                        $scope.showModalMessage(message, objectType);
                        return;
                        return
                    })

            }

            $scope.makePayment = function (billObject) {
                objectToPay = $rootScope.formationcenterData;
                if (typeof billObject != "undefined" && typeof objectToPay != "undefined") {
                    objectToPay.amount = billObject.amount
                    $scope.showModalData("", $rootScope.formationcenterData)
                }
            }

            $scope.deleteBill = function (billObject) {
                if ( typeof billObject != "undefined" ) {

                    ////Modal form delte confirmation

                    ///if ok
                    billObject.idparam = billObject.id
                    $http.post($rootScope.urlBase + '/Bill/deleteBill', config)
                        .success(function (data_result) {
                            if (data_result.response == "ERROR") {
                                message =  data_result.message;
                                //$scope.alerts.push({
                                //    type: 'danger',
                                //    msg: message
                                //});

                                objectType = {type: "Error"};

                                $scope.showModalMessage(message, objectType);
                                return;
                            }
                            console.log("Cantidad de objetos --- obtenidos", data_result.length)
                            // $scope.appBill.currentPageBill = 0;
                            message =  "Bill was delete sucessful";
                            //$scope.alerts.push({
                            //    type: 'danger',
                            //    msg: message
                            //});

                            objectType = {type: "Information"};
                            $scope.showModalMessage(message, objectType);
                            ///Review if clean al parameter
                            return;
                            // console.log("RESULTADOS", data_result)
                        })
                        .error(function (error) {
                            //@action mostrar error

                            $scope.errorMessage = error
                            console.log(error);
                            message =  error.message;
                            objectType = {type: "Error"};
                            $scope.showModalMessage(message, objectType);
                            return
                        })
                }
            }

            $scope.getReadableDate = function (dateParmt) {
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();

                return resultDate

            };

            $scope.showModalData = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"

                ////Set formationCenterObjectData
                $scope.items = objectData;
                $scope.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContentPayment.html',
                    controller: 'ModalInstancePaymentController',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;

                    console.log("Seleccionado OK para eliminar ", $scope.selected)
                    if (typeof $scope.selected != "undefined" && $scope.selected.status == "OK") {
                        if (typeof  $scope.selected != "undefined" && typeof $scope.selected.status != "undefined") {
                            ///Se ha hecho el pago exitosamente
                            $scope.getBillRecords();

                        }
                    }
                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }


            $scope.showModalMessage = function (messageshow, objectData) {

                //size = "" | "lg" | "sm"
                $scope.items = objectData;
                $scope.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalMessage.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;

                }, function () {
                    $log.info('Close modal: ' + new Date());
                });

            }

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

            $scope.searchFuncList = function () {


                // $scope.errorMessage = "Probando "
                if (typeof $scope.criteriaList == "undefined" || $scope.criteriaList == "")
                    $scope.criteriaList = ""
                $scope.search.name = $scope.criteriaList;
                $scope.appBill.currentPageBill = 0


                // console.log("El valor de la forama ", $scope.myform)

                if ($scope.search.initialDate != "" || typeof $scope.search.endDate != "" || $scope.initialPrice != "") {
                    if (!$scope.advancedSearchPlace.$valid) {

                        $scope.errorValid = true
                        // console.log("INSERTANDO ALERTA")
                        message = "Sorry, Some Advanced Search fields are invalid";
                        //$scope.alerts.push({
                        //    type: 'danger',
                        //    msg: message
                        //});

                        objectType = {type: "Error"};

                        $scope.showModalMessage(message, objectType);
                        return;
                    }

                    if ($scope.search.initialDate != "" || $scope.search.endDate != "") {

                        timestampInit = new Date($scope.search.initialDate).getTime()
                        timestampEnd = new Date($scope.search.endDate).getTime()
                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA")
                            message = "Sorry, End date isn´t correct";
                            //$scope.alerts.push({
                            //    type: 'danger',
                            //    msg: message
                            //});

                            objectType = {type: "Error"};

                            $scope.showModalMessage(message, objectType);
                            return;
                        }
                    }



                }

                $scope.countRecordsBill();
                $scope.getBillRecords();
            }


            ///-----------------------------------------------------
            $scope.countRecordsBill();
            $scope.getBillRecords();
        }])
    .controller('ModalInstancePaymentController', function ($scope, $uibModalInstance, $rootScope, $routeParams, $http, items) {
// Disable weekend selection

        $scope.Cards = [
            {
                image: "cb-visa-mastercard.png",
                type: "Card",
                name: "CB/Visa/Mastercard"

            },
             {
                img: "103_0_574_Maestro21.png",
                type: "Card",
                name:"Maestro"
            },
            {
                img: "diners.png",
                type: "Card",
                name:"Diners"
            },  {
                img: "",
                type: "Card",
                name:"MasterPass"
            },
            {
                img: "p24-small.png",
                type: "Card",
                name:"Przelewy24"
            },
            {
                img: "IDEAL_Logo.png",
                type: "Card",
                name:"iDeal"
            },
             {
                img: "bancontact.png",
                type: "Card",
                name:"Bancontact/Mister Cash"
            },
            {
                img: "paylib.jpg",
                type: "Card",
                name:"PayLib"
            },
            {
                img: "Sofort.png",
                type: "Card",
                name:"Sofort"
            },
           {
                img: "elv.png",
                type: "Direct_Debit",
                name:"ELV"
            },
             {
                img: "giropay.jpg",
                type: "Direct_Debit",
                name:"Giropay"
            },
            {
                img: "bank.png",
                type: "Bankwire",
                name:"Bankwire"
            }
        ]

        ////Type card selected in form
        $scope.selectedCard
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
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
        $scope.format = $scope.formats[1];
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
        $scope.dateRegExp = /^\d{4}\/\d{2}\/\d{2}$/;

        $scope.creditCardData = {};
        $scope.popupCardCreditDate = {
            opened: false
        };

        $scope.openCardCreditDate = function () {
            $scope.popupCardCreditDate.opened = true;
        };

        $scope.customerData = items;
        //$scope.selected = {
        //    item: $scope.items[0]
        //};

        $scope.ok = function () {


            ///With formation center identifier and constumer data make payment
            if (!$scope.paymentdata.$valid) {

                if ($scope.paymentMessages.length > 0) {
                    $scope.paymentMessages.splice(0, 1);
                }
                $scope.paymentMessages.push({type: "danger", info: "Sorry, Some fields are invalid"});
                return;
            }


            ////Make payment if all data if of
            config = {
                userdata: $scope.customerData,
                formationidentifier: $routeParams.id,
                creditCardData: $scope.creditCardData,
                amount: $scope.customerData.amount
            }

            console.log("DATA to send to services", config)
            $http.get($rootScope.urlBase + "/Payment/makepayment/", config)
                .success(function (data, status, headers, config) {
                    if (data.response === "ok") {

                        //if (vm.paymentMessages.length > 0) {
                        //    vm.paymentMessages.splice(0, 1);
                        //}
                        //vm.paymentMessages.push({type: "success", info: "Payment ok."});
                        // The payment have been made. Now make the book process.

                        selectedItem = {status: "OK"}

                    }
                    else
                        selectedItem = {status: "ERROR"}
                })


            $uibModalInstance.close(selectedItem);
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.formationCenterName = ""
        };
    });
;
