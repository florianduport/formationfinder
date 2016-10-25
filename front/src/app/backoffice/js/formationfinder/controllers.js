/**
 * Created by JKindelan on 5/20/2016.
 */
app.controller("indexController", ["$scope", "$rootScope", "$location", "$http", "NgMap", "$log", "$translate",
        function ($scope, $rootScope, $location, $http, NgMap, $log, $translate) {
            $scope.formationcenterData = $rootScope.formationcenterData

            $scope.logout = function () {

                console.log("entre a logout.");
                $rootScope.userToken = null;
                $rootScope.userAuthenticated = false;
                $rootScope.formationCenter = null;
                localStorage.removeItem('id_token');
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

            if ($rootScope.userAuthenticated === true) {
                $location.path('/dashboard');
            }

            $scope.credentials = {};
            $scope.formationCentersNames = [];

            $scope.usernameExpReg = /^[µçùàèáéíóúA-Za-z]([µçùàèáéíóúA-Za-z\d]*[_.\s]*[µçùàèáéíóúA-Za-z\d]*)+$/;

            $scope.login = function () {

                console.log("Lo que llega al login es: ", $scope.credentials);

                $http.post($rootScope.urlBase + "/login/check", {
                        username: $scope.credentials.username,
                        password: $scope.credentials.password
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $rootScope.userToken = result.data.token;
                            $rootScope.userAuthenticated = true;
                            $rootScope.formationCenter = result.data.formationCenter;
                            //$rootScope.username = $scope.credentials.username;

                            $rootScope.username = result.data.username;
                            $rootScope.userIsMain = result.data.isMainLogin;

                            console.log("$rootScope.userIsMain: ", $rootScope.userIsMain);

                            console.log("En el login lo que devuelve SAILS es: ", result);

                            //************** Set the token for authentication ************************
                            localStorage.setItem('id_token', result.data.token);

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
                                        $location.path('/dashboard').replace();
                                    }
                                    else {
                                        //alert("Error using auth services.");
                                        //$scope.loginButtonText = "Login";
                                        objeData = {type: $translate.instant('ERROR')}
                                        $scope.showModalMessage($translate.instant('ERROR_USING_AUTH_SERVICE'), objeData);
                                    }

                                }).error(function (err) {
                                // alert("Error using auth services.");
                                //$scope.loginButtonText = "Login";

                                objeData = {type: $translate.instant('ERROR')}
                                $scope.showModalMessage($translate.instant('ERROR_USING_AUTH_SERVICE'), objeData)
                            })


                        } else {
                            $rootScope.userToken = null;
                            $rootScope.userAuthenticated = false;
                            $rootScope.formationCenter = null;
                            //$scope.loginButtonText = "Login";

                            //Show modal

                            //alert("Invalid intent. Please verify your credentials and try again.");
                            objeData = {type: $translate.instant('ERROR')}
                            $scope.showModalMessage($translate.instant('INVALID_USERNAME_PASSWORD'), objeData)
                        }
                    })
                    .error(function (err) {
                        objeData = {type: $translate.instant('ERROR')}
                        $scope.showModalMessage($translate.instant('ERROR_USING_AUTH_SERVICE'), objeData)
                        //$scope.loginButtonText = "Login";
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
                    //$log.info('Close modal: ' + new Date());
                });

            }

        }])
    .controller("CreateLogincontroller", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.initCredentials = function () {
                $scope.credentials = {};
                $scope.credentials.formationCenter = $rootScope.formationCenter;
                $scope.loginButtonText = "Create";
                $scope.credentials.isMainLogin = false;
                $scope.credentials.isActivated = true;
            };
            $scope.initCredentials();

            $scope.usernameExpReg = /^[µçùàèáéíóúA-Za-z]([µçùàèáéíóúA-Za-z\d]*[_.\s]*[µçùàèáéíóúA-Za-z\d]*)+$/;

            $scope.createLogin = function () {

                //$scope.loginButtonText = "Creating ...";

                $http.post($rootScope.urlBase + "/login/create", {
                        username: $scope.credentials.username,
                        password: $scope.credentials.password,
                        formationCenter: $scope.credentials.formationCenter,
                        isMainLogin: $scope.credentials.isMainLogin,
                        isActivated: $scope.credentials.isActivated
                    })
                    .success(function (data) {
                        if (data.status === "ok") {
                            objeData = {type: $translate.instant('INFO')};
                            $scope.showModalMessage($translate.instant('CREDENTIAL_CREATED'), objeData);

                            $scope.gotoManage();
                        } else {
                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(data.info, objeData);
                        }
                    })
                    .error(function (err) {
                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_USING_SERVICE'), objeData);
                        //alert("Error using auth services.");
                    })
                    .finally(function () {
                        $scope.initCredentials();
                    });
            };

            $scope.gotoManage = function () {
                $location.path('/login/admin');
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };
        }])
    .controller("AdminLoginController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.logins = [];
            $scope.len = 5;
            $scope.maxSize = null;
            $scope.currentPage = 1;
            $scope.userIsMain = $rootScope.userIsMain;

            $scope.lens = [5, 10, 15, 20];

            $scope.itemsPerPageChance = function () {
                $scope.currentPage = 1;
                $scope.searchLogins();
            };

            $scope.searchLogins = function () {
                $http.post($rootScope.urlBase + "/login/searchByFormationCenterWithPagination", {
                        formationCenter: $rootScope.formationCenter,
                        page: $scope.currentPage - 1,
                        len: $scope.len
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.logins = result.data;
                            $scope.maxSize = result.maxSize;

                            console.log($scope.logins);
                        } else {
                            console.log("An error has ocurred searching Credentials.");
                        }
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            };
            $scope.searchLogins();

            $scope.deleteLogin = function (iLogin) {

                //if ($rootScope.username === $scope.logins[index].username) {
                if ($rootScope.username === iLogin.username) {

                    var objeData = {type: "Error"};
                    $scope.showModalMessage($translate.instant('ERROR_DELETE_ACTUAL_CREDENTIAL'), objeData);
                    return;
                }

                var config = {
                    messageType: "Confirmation",
                    message: $translate.instant('DELETE_CREDENTIAL_CONFIRMATION'),
                    objectData: iLogin
                };

                $scope.showModalConfirmDelete(config)

            };

            $scope.gotoCreate = function () {
                $location.path('/login/create');
            };

            $scope.editLogin = function (iLogin) {

                if ($rootScope.username === iLogin.username) {

                    var objeData = {type: "Error"};
                    $scope.showModalMessage($translate.instant('ERROR_UPDATE_ACTUAL_CREDENTIAL'), objeData);
                    return;
                }

                $location.path('/login/update/' + iLogin.id);
            };

            $scope.clearCriteria = function () {
                $scope.criteria = "";
            };

            $scope.showModalConfirmDelete = function (config) {

                $scope.items.messageType = config.messageType;
                $scope.items.message = config.message;
                $scope.items.objectData = config.objectData;

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        //como voy a eliminar, si estoy en la ultima pagina y elimino el ultimo
                        //elemento de esa pagina, reinicio la paginacion, para que no se quede vacia.
                        $scope.currentPage = 1;

                        $http.post($rootScope.urlBase + "/login/delete", {
                                username: $scope.selected.objectData.username,
                                formationCenter: $scope.formationCenter,
                            })
                            .success(function (data) {
                                if (data.status === "ok") {

                                    var objeData = {type: "Info"};
                                    $scope.showModalMessage($translate.instant('CREDENTIAL_DELETED'), objeData);
                                    //alert('Credential deleted.');
                                    //$scope.initCredentials();
                                } else {

                                    objeData = {type: "Error"};
                                    $scope.showModalMessage($translate.instant('ERROR_DELETING_CREDENTIAL') + data.info, objeData);

                                    //alert("Error deleting credential: " + data.info);
                                    //$scope.initCredentials();
                                }
                            })
                            .error(function (err) {

                                var objeData = {type: "Error"};
                                $scope.showModalMessage($translate.instant('ERROR_DELETING_CREDENTIAL') + err, objeData);

                                //alert("Error deleting credential: " + err);
                            })
                            .finally(function () {
                                $scope.searchLogins();
                            });

                        //return true;
                    } else {
                        return false;
                    }

                }, function () {

                });
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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
                    //Empty promise success
                }, function () {
                    //Empty promise fault
                });
            };
        }])
    .controller('ModalConfirmCtrl', ["$scope", "$uibModalInstance", "items", "$translate",
        function ($scope, $uibModalInstance, items, $translate) {

            $scope.items = items;
            $scope.selected = {
                objectData: $scope.items.objectData
            };

            $scope.ok = function () {
                $scope.selected.action = "OK"
                $uibModalInstance.close($scope.selected);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss($translate.instant('CANCEL'));
                //$scope.formationCenterName = ""
            };
        }])
    .controller("UpdateLogincontroller", ["$scope", "$rootScope", "$routeParams", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $routeParams, $location, $http, $uibModal, $translate) {

            //$scope.formationCenter = $rootScope.formationCenter;
            $scope.usernameExpReg = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|\d])*$/;

            $scope.Login = {};
            $scope.oldLogin = {};
            var copyToOldLogin = function () {
                $scope.oldLogin.username = $scope.Login.username;
                $scope.oldLogin.password = $scope.Login.password;
                $scope.oldLogin.isMainLogin = $scope.Login.isMainLogin;
                $scope.oldLogin.isActivated = $scope.Login.isActivated;
            };

            $scope.searchLogin = function () {

                $http.post($rootScope.urlBase + "/login/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.Login = result.data;
                            copyToOldLogin();
                        } else {
                            var objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(result.info, objeData);
                            //alert("Error: " + result.info);
                        }
                    })
                    .error(function (err) {
                        //console.log("Error searching Credential: ", err);
                        var objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_CREDENTIAL'), objeData);
                    });
            };
            $scope.searchLogin();

            var prepareUpdate = function () {
                if ($scope.Login.username !== undefined && ($scope.Login.username === $scope.oldLogin.username)) {
                    delete $scope.Login.username;
                }

                if ($scope.Login.password !== undefined && ($scope.Login.password === $scope.oldLogin.password)) {
                    delete $scope.Login.password;
                }

                if ($scope.Login.isMainLogin !== undefined && ($scope.Login.isMainLogin === $scope.oldLogin.isMainLogin)) {
                    delete $scope.Login.isMainLogin;
                }

                if ($scope.Login.isActivated !== undefined && ($scope.Login.isActivated === $scope.oldLogin.isActivated)) {
                    delete $scope.Login.isActivated;
                }

                console.log("El valor de $scope.Login es: ", $scope.Login);

                if ($scope.Login.username || $scope.Login.password
                    || $scope.Login.isMainLogin !== undefined
                    || $scope.Login.isActivated !== undefined) {
                    return true;
                } else {
                    return false;
                }
            };

            var config = {
                messageType: $translate.instant('CONFIRMATION'),
                message: $translate.instant('UPDATE_CREDENTIAL_CONFIRMATION'),
                objectData: $scope.Login
            };

            $scope.updateLogin = function () {

                if (prepareUpdate()) {
                    $scope.showUpdateConfirmModal();
                } else {
                    objeData = {type: $translate.instant('ERROR')};
                    $scope.showModalMessage($translate.instant('ENTER_VALID_PARAMETER_OR_MAKE_CHANGES'), objeData);
                    $scope.searchLogin();
                }

            };

            $scope.gotoManage = function () {
                $location.path('/login/admin');
            };

            $scope.showUpdateConfirmModal = function () {

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('UPDATE_CREDENTIAL_CONFIRMATION');
                $scope.items.objectData = $scope.Login;

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        $http.post($rootScope.urlBase + "/login/update", {
                                id: $routeParams.id,
                                newCredentials: $scope.selected.objectData
                            })
                            .success(function (result) {
                                if (result.status === "ok") {

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('CREDENTIAL_UPDATED'), objeData);

                                    //alert("Credential updated.");
                                    $location.path('/login/admin');
                                } else {
                                    console.log(result.info);
                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage($translate.instant('CREDENTIAL_NOT_UPDATED') + ": " + result.info, objeData);
                                    //alert("Credential not updated: " + result.info);
                                }
                            })
                            .error(function (err) {
                                console.log(err);
                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage(err, objeData);
                            })
                            .finally(function () {
                                $scope.searchLogin();
                            });
                    }

                }, function () {
                    $scope.searchLogin();
                });

            };

            $scope.showModalMessage = function (messageshow, objectData) {

                $scope.items = objectData;
                $scope.items.message = messageshow;

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

                }, function () {

                });

            };
        }])
    .controller("AdminFormationController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.formations = [];

            $scope.showFormations = true;

            $scope.len = 5;
            $scope.maxSize = null;
            $scope.currentPage = 1;

            $scope.lens = [5, 10, 15, 20];

            $scope.itemsPerPageChance = function () {
                $scope.currentPage = 1;
                $scope.searchFormations();
            };

            //$scope.criteria = '';

            $scope.searchFormations = function () {
                $http.post($rootScope.urlBase + "/formation/searchByFormationCenterWithPagination", {
                        formationCenter: $rootScope.formationCenter,
                        page: $scope.currentPage - 1,
                        len: $scope.len
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formations = result.data;
                            $scope.maxSize = result.maxSize;

                            if ($scope.formations.length > 0) {
                                $scope.showFormations = true;
                            } else {
                                $scope.showFormations = false;
                            }

                        } else {

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATIONS'), objeData);

                            console.log("An error has ocurred searching Formations.");
                            $scope.showFormations = false;
                        }

                    })
                    .error(function (error) {

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATIONS'), objeData);

                        console.log("Error searching Formations.");
                        console.log(error);
                        $scope.showFormations = false;
                    });
            };
            $scope.searchFormations();

            $scope.deleteFormation = function (iFormation) {

                $scope.showModalConfirmDelete(iFormation);
            };

            $scope.gotoCreate = function () {
                $location.path('/formation/create');
            };

            $scope.editFormation = function (iFormation) {
                $location.path("/formation/update/" + iFormation.id);
            };

            $scope.detailsFormation = function (iFormation) {
                $location.path("/formation/details/" + iFormation.id);
            };

            $scope.clearCriteria = function () {
                $scope.criteria = "";
            };

            $scope.addCustomerFromWaitingRoom = function (iFormation) {
                $location.path("/waitingroom/customeradd/" + iFormation.id);
            };

            $scope.showModalConfirmDelete = function (iFormation) {

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('DELETE_FORMATION_CONFIRMATION');
                $scope.items.objectData = iFormation;

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        //como voy a eliminar, si estoy en la ultima pagina y elimino el ultimo
                        //elemento de esa pagina, reinicio la paginacion, para que no se quede vacia.
                        $scope.currentPage = 1;

                        //var formation = $scope.formations[index];

                        $http.post($rootScope.urlBase + "/formation/deleteByID", {
                                id: $scope.selected.objectData.id
                            })
                            .success(function (result) {
                                if (result.status === "ok") {

                                    $scope.searchFormations();

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('FORMATION_DELETED'), objeData);

                                    //alert("Formation deleted.");
                                } else {

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage($translate.instant('ERROR_DELETING_FORMATION'), objeData);

                                    //alert("An error has ocurred deleting the Formation.");
                                }
                            })
                            .error(function (err) {
                                console.log("An error has ocurred deleting the Formation.");
                                console.log(err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_DELETING_FORMATION'), objeData);

                                //alert("An error has ocurred deleting the Formation.");
                            });
                    }

                }, function () {

                });
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });

            }

            $scope.showUserButton = function (customer) {
                if (typeof customer != "undefined") {
                    if (customer.length > 0) {
                        //console.log("Show value")
                        return true;
                    }
                }

                return false;
            }
            $scope.okViewUsers = function (formation) {

                $scope.formation;

                $location.path("/formation/listclient/" + formation.id);
            }

        }])
    .controller("UpdateFormationController", ["$scope", "$routeParams", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $routeParams, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.numExpReg = /^[\d]+$/;
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.maxDate = new Date(2080, 0, 1);

            $scope.Hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

            $scope.Minutes = [];
            for (var i = 0; i < 60; i++) {
                if (i < 10) {
                    $scope.Minutes.push("0" + i.toString());
                } else {
                    $scope.Minutes.push(i.toString());
                }
            }

            var initParameters = function () {
                $scope.formation = null;
                $scope.oldFormationValues = null;

                $scope.fDate = {};
                $scope.fDate.date = null;

                $scope.MorningStartH = null;
                $scope.MorningStartM = null;
                $scope.MorningEndH = null;
                $scope.MorningEndM = null;
                $scope.AfternoonStartH = null;
                $scope.AfternoonStartM = null;
                $scope.AfternoonEndH = null;
                $scope.AfternoonEndM = null;

                $scope.InvalidDateParameters = false;

                $scope.InvalidMorningTimeRange = false;
                $scope.InvalidAfternoonTimeRange = false;

                $scope.dateOutOfRange = false;

                $scope.showUpdateDate = false;

                $scope.indexDate = null;

                $scope.selectedPlace = {};
                $scope.selectedPSY = {};
                $scope.selectedBAFM = {};

            };
            initParameters();

            $scope.searchFormation = function () {

                $http.post($rootScope.urlBase + "/formation/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formation = result.data;

                            $scope.selectedPlace = $scope.formation.place;

                            //Populate the select inputs with the animators.
                            var len = $scope.formation.animators.length;
                            for (var i = 0; i < len; i++) {
                                if ($scope.formation.animators[i].type === "PSY") {
                                    $scope.selectedPSY = $scope.formation.animators[i];
                                }

                                if ($scope.formation.animators[i].type === "BAFM") {
                                    $scope.selectedBAFM = $scope.formation.animators[i];
                                }
                            }

                            console.log("La formation para updatear tiene: ", $scope.formation);
                        } else {
                            console.log("Error searching Formation: ", result.info);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                            //alert("Error searching Formation: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation: ", err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);

                        //alert("Error searching Formation: " + err);
                    });
            };
            $scope.searchFormation();

            var copyToOldFormation = function () {
                $scope.oldFormationValues = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.formation.place,
                };
            };

            $scope.selectDateForUpdate = function (index) {

                $scope.indexDate = index;

                $scope.fDate.date = $scope.formation.dates[index].date;

                $scope.MorningStartH = $scope.formation.dates[index].morning.hourStart.substr(0, 2);
                $scope.MorningStartM = $scope.formation.dates[index].morning.hourStart.substr(3, 2);
                $scope.MorningEndH = $scope.formation.dates[index].morning.hourEnd.substr(0, 2);
                $scope.MorningEndM = $scope.formation.dates[index].morning.hourEnd.substr(3, 2);

                $scope.AfternoonStartH = $scope.formation.dates[index].afternoon.hourStart.substr(0, 2);
                $scope.AfternoonStartM = $scope.formation.dates[index].afternoon.hourStart.substr(3, 2);
                $scope.AfternoonEndH = $scope.formation.dates[index].afternoon.hourEnd.substr(0, 2);
                $scope.AfternoonEndM = $scope.formation.dates[index].afternoon.hourEnd.substr(3, 2);

                $scope.showUpdateDate = true;
            };

            var prepareForInsert = function () {
                $scope.fDate = {};
                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);

                $scope.MorningStartH = "09";
                $scope.MorningStartM = "00";
                $scope.MorningEndH = "11";
                $scope.MorningEndM = "00";
                $scope.AfternoonStartH = "02";
                $scope.AfternoonStartM = "00";
                $scope.AfternoonEndH = "04";
                $scope.AfternoonEndM = "00";
            };

            $scope.insertDate = function () {

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

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        $scope.formation.dates.splice(i, 1, {
                            date: $scope.fDate.date,
                            morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                            afternoon: {
                                hourStart: $scope.fDate.afternoon.hourStart,
                                hourEnd: $scope.fDate.afternoon.hourEnd
                            }
                        });

                        $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                        $scope.InvalidDateParameters = false;

                        return;
                    }
                }

                $scope.formation.dates.push({
                    date: $scope.fDate.date,
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd}
                });

                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                $scope.InvalidDateParameters = false;

                $scope.formation.dates.sort(compareFormationDates);
            };

            $scope.insert_or_update = function () {
                if ($scope.indexDate !== null) {
                    $scope.updateDate();
                } else {
                    $scope.insertDate();
                }
            };

            $scope.updateDate = function () {

                //Create the Formation Date Object.
                $scope.fDate.morning = {
                    hourStart: $scope.MorningStartH + ":" + $scope.MorningStartM,
                    hourEnd: $scope.MorningEndH + ":" + $scope.MorningEndM
                };

                $scope.fDate.afternoon = {
                    hourStart: $scope.AfternoonStartH + ":" + $scope.AfternoonStartM,
                    hourEnd: $scope.AfternoonEndH + ":" + $scope.AfternoonEndM
                };

                //Replace in the array the element in the index position.
                $scope.formation.dates.splice($scope.indexDate, 1, {
                    date: new Date($scope.fDate.date).setHours(0, 0, 0, 0),
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {
                        hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd
                    }
                });

                //Now check if the new date is the same that other Formation date object
                //If true, then eliminate that element.
                var lgth = $scope.formation.dates.length;
                for (var i = 0; i < lgth; i++) {

                    //Do not compare with my self.
                    if (i == $scope.indexDate) {
                        console.log("entre al if the i == $scope.indexDate: ", i);
                        continue;
                    }

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        console.log("Entre al if de la comparacion de fechas: ", i);
                        $scope.formation.dates.splice(i, 1);
                        break;
                    }

                }


                $scope.InvalidDateParameters = false;

                $scope.showUpdateDate = false;
                $scope.indexDate = null;

                $scope.formation.dates.sort(compareFormationDates);

            };

            $scope.validDate = function (vDate) {
                var tempDate = new Date().setHours(0, 0, 0, 0);

                if (tempDate <= vDate && vDate <= $scope.maxDate) {
                    $scope.dateOutOfRange = false;
                    return true;
                }

                $scope.dateOutOfRange = true;
                return false;
            };

            $scope.validateDateParameters = function () {

                if (!$scope.fDate.date) {
                    $scope.InvalidDateParameters = true;
                    return;
                }

                //convert to timestamp and set the 00:00 Hour.
                $scope.fDate.date = new Date($scope.fDate.date).setHours(0, 0, 0, 0);

                if ($scope.validDate($scope.fDate.date)
                ) {
                    $scope.InvalidDateParameters = false;
                } else {
                    $scope.InvalidDateParameters = true;
                }
            };

            $scope.validateTimeRangeParameters = function () {
                if (checkMorningTimeRange()) {
                    $scope.InvalidMorningTimeRange = false;
                } else {
                    $scope.InvalidMorningTimeRange = true;
                }

                if (checkAfternoonTimeRange()) {
                    $scope.InvalidAfternoonTimeRange = false;
                } else {
                    $scope.InvalidAfternoonTimeRange = true;
                }
            };

            var checkMorningTimeRange = function () {

                var tempHour = parseInt($scope.MorningStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningStart = new Date().setHours(tempHour, parseInt($scope.MorningStartM));

                tempHour = parseInt($scope.MorningEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningEnd = new Date().setHours(tempHour, parseInt($scope.MorningEndM));


                return (morningStart < morningEnd);
            };
            var checkAfternoonTimeRange = function () {

                var tempHour = parseInt($scope.AfternoonStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonStart = new Date().setHours(tempHour, parseInt($scope.AfternoonStartM));

                tempHour = parseInt($scope.AfternoonEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonEnd = new Date().setHours(tempHour, parseInt($scope.AfternoonEndM));

                return (afternoonStart < afternoonEnd);
            };

            $scope.toggle = function () {
                $scope.showUpdateDate = !$scope.showUpdateDate;

                if ($scope.showUpdateDate) {
                    prepareForInsert();
                } else {
                    $scope.index = null;
                }
            };

            $scope.places = [];
            $scope.searchPlaces = function () {

                $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.places = result.data;
                        } else {

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);
                            //alert("An error has ocurred searching Places.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Places.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);

                        //alert("An error has ocurred searching Places.");
                    });

            };
            $scope.searchPlaces();

            $scope.mostrar = function () {
                console.log("El valor del selected place es: ", $scope.selectedPlace);
            };

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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                            //alert("An error has ocurred searching Animators PSY.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators PSY.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                        //alert("An error has ocurred searching Animators PSY.");
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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                            // alert("An error has ocurred searching Animators BAFM.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators BAFM.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                        //alert("An error has ocurred searching Animators BAFM.");
                    });
            };
            $scope.searchBAFM();
            $scope.selectedBAFM = null;

            var newAttributes = null;

            $scope.prepareForUpdate = function () {

                //Prepare the new Formation attributes for update.
                newAttributes = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.selectedPlace.id
                };

                newAttributes.animators = [];
                newAttributes.animators.push($scope.selectedBAFM.id);
                newAttributes.animators.push($scope.selectedPSY.id);

                newAttributes.dates = [];

                var len = $scope.formation.dates.length;

                for (var i = 0; i < len; i++) {
                    newAttributes.dates.push($scope.formation.dates[i]);
                }
            };

            var compareFormationDates = function (date1, date2) {
                if (date1.date < date2.date)
                    return -1;

                if (date1.date == date2.date)
                    return 0;

                if (date1.date > date2.date)
                    return 1;
            };

            $scope.updateFormation = function () {
                $scope.showUpdateConfirmModal();
            };

            $scope.gotoManage = function () {
                $location.path('/formation/admin');
            };

            $scope.deleteDate = function (index) {
                if ($scope.formation.dates[index]) {
                    $scope.formation.dates.splice(index, 1);
                }
            };

            $scope.showUpdateConfirmModal = function () {

                $scope.prepareForUpdate();

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('UPDATE_FORMATION_CONFIRMATION');
                $scope.items.objectData = {
                    formationID: $routeParams.id,
                    newAttributes: newAttributes
                };

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        $http.post($rootScope.urlBase + "/formation/updateByID", {
                                id: $scope.selected.objectData.formationID,
                                formationCenter: $rootScope.formationCenter,
                                formationValues: $scope.selected.objectData.newAttributes
                            })
                            .success(function (result) {
                                if (result.status === "ok") {

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('FORMATION_UPDATED'), objeData);
                                    //alert("Formation updated.");
                                } else {
                                    console.log("******* ERROR ********");
                                    console.log(result.info);

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage(result.info, objeData);
                                }

                            })
                            .error(function (err) {
                                console.log("******* ERROR ********");
                                console.log(err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_UPDATING_FORMATION'), objeData);
                            })
                            .finally(function () {
                                $scope.gotoManage();
                            });
                    }

                }, function () {
                    $scope.searchFormation();
                });

            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });

            };

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
            $scope.format = $scope.formats[0];
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
    .controller("CreateFormationController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.numExpReg = /^[\d]+$/;
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.maxDate = new Date(2080, 0, 1);

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
                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);

                $scope.MorningStartH = "09";
                $scope.MorningStartM = "00";
                $scope.MorningEndH = "11";
                $scope.MorningEndM = "00";
                $scope.AfternoonStartH = "02";
                $scope.AfternoonStartM = "00";
                $scope.AfternoonEndH = "04";
                $scope.AfternoonEndM = "00";

                $scope.InvalidDateParameters = false;

                $scope.InvalidMorningTimeRange = false;
                $scope.InvalidAfternoonTimeRange = false;

                $scope.dateOutOfRange = false;

                $scope.selectedPlace = {};
                $scope.selectedPSY = {};
                $scope.selectedBAFM = {};

                $scope.formation = {};
                $scope.formation.isConfirmed = false;
                $scope.formation.animators = [];
                $scope.formation.dates = [];
                $scope.formation.maxPeople = 20;

                $scope.searchPlaces = function () {

                    $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                            formationCenter: $rootScope.formationCenter
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                $scope.places = result.data;

                                $scope.selectedPlace = $scope.places[0];
                            } else {
                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);
                                //alert("An error has ocurred searching Places.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Places.");
                            console.log(err);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);
                            //alert("An error has ocurred searching Places.");
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

                                $scope.selectedPSY = $scope.animatorsPSY[0];

                            } else {

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);

                                //alert("An error has ocurred searching Animators PSY.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Animators PSY.");
                            console.log(err);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                            //alert("An error has ocurred searching Animators PSY.");
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

                                $scope.selectedBAFM = $scope.animatorsBAFM[0];

                            } else {

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                                //alert("An error has ocurred searching Animators BAFM.");
                            }
                        })
                        .error(function (err) {
                            console.log("An error has ocurred searching Animators BAFM.");
                            console.log(err);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                            //alert("An error has ocurred searching Animators BAFM.");
                        });
                };
                $scope.searchBAFM();
            };
            $scope.initParameters();

            $scope.validDate = function (vDate) {
                var tempDate = new Date().setHours(0, 0, 0, 0);
                //tempDate.setHours(0, 0, 0, 0);

                //console.log("TempDate es : ", tempDate);
                //console.log("vDate es : ", vDate);

                if (tempDate <= vDate && vDate <= $scope.maxDate) {
                    $scope.dateOutOfRange = false;
                    return true;
                }

                $scope.dateOutOfRange = true;
                return false;
            };

            $scope.validateDateParameters = function () {

                if (!$scope.fDate.date) {
                    $scope.InvalidDateParameters = true;
                    return;
                }

                //convert to timestamp and set the 00:00 Hour.
                $scope.fDate.date = new Date($scope.fDate.date).setHours(0, 0, 0, 0);

                if ($scope.validDate($scope.fDate.date)
                ) {
                    $scope.InvalidDateParameters = false;
                } else {
                    $scope.InvalidDateParameters = true;
                }
            };

            $scope.validateTimeRangeParameters = function () {
                if (checkMorningTimeRange()) {
                    $scope.InvalidMorningTimeRange = false;
                } else {
                    $scope.InvalidMorningTimeRange = true;
                    //$scope.InvalidDateParameters = true;
                }

                if (checkAfternoonTimeRange()) {
                    $scope.InvalidAfternoonTimeRange = false;
                } else {
                    $scope.InvalidAfternoonTimeRange = true;
                    //$scope.InvalidDateParameters = true;
                }
            };

            var checkMorningTimeRange = function () {

                var tempHour = parseInt($scope.MorningStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningStart = new Date().setHours(tempHour, parseInt($scope.MorningStartM));

                tempHour = parseInt($scope.MorningEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningEnd = new Date().setHours(tempHour, parseInt($scope.MorningEndM));


                return (morningStart < morningEnd);
            };

            var checkAfternoonTimeRange = function () {

                var tempHour = parseInt($scope.AfternoonStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonStart = new Date().setHours(tempHour, parseInt($scope.AfternoonStartM));

                tempHour = parseInt($scope.AfternoonEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonEnd = new Date().setHours(tempHour, parseInt($scope.AfternoonEndM));

                return (afternoonStart < afternoonEnd);
            };

            $scope.insertDate = function () {

                $scope.fDate.morning = {
                    hourStart: $scope.MorningStartH + ":" + $scope.MorningStartM,
                    hourEnd: $scope.MorningEndH + ":" + $scope.MorningEndM
                };

                $scope.fDate.afternoon = {
                    hourStart: $scope.AfternoonStartH + ":" + $scope.AfternoonStartM,
                    hourEnd: $scope.AfternoonEndH + ":" + $scope.AfternoonEndM
                };

                var lgth = $scope.formation.dates.length;
                for (var i = 0; i < lgth; i++) {

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        console.log("Entre al if ");
                        $scope.formation.dates.splice(i, 1, {
                            date: $scope.fDate.date,
                            morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                            afternoon: {
                                hourStart: $scope.fDate.afternoon.hourStart,
                                hourEnd: $scope.fDate.afternoon.hourEnd
                            }
                        });

                        $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                        $scope.InvalidDateParameters = false;

                        return;
                    }
                }

                $scope.formation.dates.push({
                    date: $scope.fDate.date,
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd}
                });

                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                $scope.InvalidDateParameters = false;

                $scope.formation.dates.sort(compareFormationDates);
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

                            objeData = {type: $translate.instant('INFO')};
                            $scope.showModalMessage($translate.instant('FORMATION_CREATED'), objeData);
                            //alert("Formation Created.");

                            console.log("Formation Created.");
                            console.log(result.data);
                            $scope.gotoManage();
                        } else {

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_CREATING_FORMATION') + ": " + result.info, objeData);

                            //alert("Error creating the Formation.");
                        }
                    })
                    .error(function (err) {
                        console.log("Error creating the Formation.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_CREATING_FORMATION') + ": " + err, objeData);
                        //alert("Error creating the Formation.");
                    })
                    .finally(function () {
                        $scope.initParameters();
                    });
            };

            $scope.gotoManage = function () {
                $location.path('/formation/admin');
            };

            var compareFormationDates = function (date1, date2) {
                if (date1.date < date2.date)
                    return -1;

                if (date1.date == date2.date)
                    return 0;

                if (date1.date > date2.date)
                    return 1;
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };


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
            $scope.format = $scope.formats[0];
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
    .controller("ManageAnimatorController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.animators = [];
            $scope.len = 5;
            $scope.maxSize = null;
            $scope.currentPage = 1;

            $scope.showAnimators = true;

            $scope.lens = [5, 10, 15, 20];

            $scope.itemsPerPageChance = function () {
                $scope.currentPage = 1;
                $scope.searchAnimators();
            };

            $scope.searchAnimators = function () {

                $http.post($rootScope.urlBase + "/animator/searchByFormationCenterWithPagination", {
                        formationCenter: $rootScope.formationCenter,
                        page: $scope.currentPage - 1,
                        len: $scope.len
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.animators = result.data;
                            $scope.maxSize = result.maxSize;

                            if ($scope.animators.length > 0) {
                                $scope.showAnimators = true;
                            } else {
                                $scope.showAnimators = false;
                            }

                            console.log("Animators ok: ", result.data);
                            console.log("Animators maxSize: ", result.maxSize);
                        } else {
                            $scope.showAnimators = false;

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS'), objeData);

                            //alert("Error searching Animators.");
                            console.log("Error searching Animators: ", result.info);
                        }
                    })
                    .error(function (err) {
                        $scope.showAnimators = false;
                        console.log("Error searching Animators: ", err);
                    });

            };
            $scope.searchAnimators();

            $scope.deleteAnimator = function (Aminator) {

                $scope.showModalConfirmDelete(Aminator);

            };

            $scope.editAnimator = function (Aminator) {
                $location.path("/animator/edit/" + Aminator.id);
            };

            $scope.gotoCreateAnimator = function () {
                $location.path("/animator/create/");
            };

            $scope.clearCriteria = function () {
                $scope.criteria = "";
            };

            $scope.showModalConfirmDelete = function (Aminator) {

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('DELETE_ANIMATOR_CONFIRMATION');
                $scope.items.objectData = Aminator;

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        //como voy a eliminar, si estoy en la ultima pagina y elimino el ultimo
                        //elemento de esa pagina, reinicio la paginacion, para que no se quede vacia.
                        $scope.currentPage = 1;

                        $http.post($rootScope.urlBase + "/animator/deleteByID", {
                                id: $scope.selected.objectData.id
                            })
                            .success(function (result) {
                                if (result.status === "ok") {
                                    //$scope.animators.splice(index, 1);

                                    $scope.searchAnimators();

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('ANIMATOR_DELETED'), objeData);

                                    //alert("Animator deleted");
                                    console.log("Animator deleted");
                                } else {
                                    console.log("Error deleting Animator: ", result.info);

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage(result.info, objeData);
                                }
                            })
                            .error(function (err) {
                                console.log("Error deleting Animator: ", err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_DELETING_ANIMATOR'), objeData);
                            });
                    }

                }, function () {

                });
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };

        }])
    .controller("EditAnimatorController", ["$scope", "$rootScope", "$routeParams", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $routeParams, $location, $http, $uibModal, $translate) {

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
                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATOR'), objeData);

                            console.log("Error searching the Animator.", result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching the Animator.", err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATOR'), objeData);
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
                $scope.showModalConfirm();
            };

            $scope.gotoManageAminator = function () {
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

            $scope.showModalConfirm = function () {

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('UPDATE_ANIMATOR_CONFIRMATION');
                $scope.items.objectData = "";

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

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

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('ANIMATOR_UPDATED'), objeData);

                                    //alert("Animator updated.");
                                    $location.path("/animator/manage");
                                } else {

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage($translate.instant('ERROR_UPDATING_ANIMATOR'), objeData);

                                    console.log("Error updating Animator.", result.info);
                                    //alert(result.info);
                                }
                            })
                            .error(function (err) {
                                console.log("Error updating Animator.", err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_UPDATING_ANIMATOR'), objeData);

                                //alert("Error updating Animator." + result.info);
                            });
                    }

                }, function () {

                });
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };
        }])
    .controller("CreateAnimatorController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.nameRegExp = /^[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z\s]+$/;
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

                                objeData = {type: $translate.instant('INFO')};
                                $scope.showModalMessage($translate.instant('ANIMATOR_CREATED'), objeData);

                                //alert("Animator created.");
                                //console.log("Animator created.", result.data);
                                $scope.gotoManageAminator();

                            } else {

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_CREATING_ANIMATOR') + ": " + result.info, objeData);

                                //alert("Error creating Animator: " + result.info);
                                //console.log("Error creating Animator: ", result.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error creating Animator: ", err);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_CREATING_ANIMATOR') + ": " + err, objeData);
                        });
                }
            };

            $scope.gotoManageAminator = function () {
                $location.path("/animator/manage/");
            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };
        }])
    .controller("WaitingRoomManageController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.WaitingRoomCustomersList = [];

            $scope.showWaitingRoomListPDF = function () {

                var pdfDocument = {};

                pdfDocument.styles = {
                    PrincipalHeader: {
                        fontSize: 20,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    }
                };

                pdfDocument.pageMargins = [40, 60, 40, 60];

                pdfDocument.footer = function (currentPage, pageCount) {
                    return {
                        text: [
                            {
                                text: 'Backoffice services.  Page: ' + currentPage + ' of ' + pageCount,
                                alignment: 'right', italics: true, fontSize: 10, margin: [0, 0, 20, 20]
                            }
                        ]
                    }
                };

                pdfDocument.content = [];

                pdfDocument.content.push({
                    text: 'Waiting Room List',
                    style: 'PrincipalHeader'
                });

                pdfDocument.content.push({
                    text: [
                        {text: 'Formation Center: ', bold: true, fontSize: 16},
                        {text: $rootScope.formationCenter + '\n', fontSize: 16, margin: [0, 0, 0, 20]},
                        {text: 'Generated at: ', bold: true, italics: true, margin: [0, 15, 0, 20]},
                        {text: new Date().toDateString(), italics: true, margin: [0, 0, 0, 20]}
                    ]
                });

                pdfDocument.content.push({
                    text: 'Customers',
                    alignment: 'center',
                    fontSize: 18,
                    margin: [0, 30, 0, 15]
                });


                //Prepare the table content with the customers information.
                var CustomerList = {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto', '*', '*'],
                        body: [
                            [
                                {text: 'No.', bold: true},
                                {text: 'Civ.', bold: true},
                                {text: 'Name', bold: true},
                                {text: 'FistName', bold: true},
                                {text: 'Phone Number', bold: true},
                                {text: 'Email', bold: true}
                            ]
                        ]
                    },
                    layout: 'lightHorizontalLines'
                };

                var lgth = $scope.WaitingRoomCustomersList.length;

                for (var i = 0; i < lgth; i++) {
                    CustomerList.table.body.push([
                        (i + 1).toString(),
                        $scope.WaitingRoomCustomersList[i].civility,
                        $scope.WaitingRoomCustomersList[i].name,
                        $scope.WaitingRoomCustomersList[i].firstName,
                        $scope.WaitingRoomCustomersList[i].phoneNumber,
                        $scope.WaitingRoomCustomersList[i].email
                    ]);
                }

                pdfDocument.content.push(CustomerList);

                pdfMake.createPdf(pdfDocument).open();
            };

            $scope.printWaitingRoomCustomersList = function () {

                $http.post($rootScope.urlBase + "/FormationCenter/getWaitingRoomCustomerListByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.WaitingRoomCustomersList = result.data;
                            $scope.showWaitingRoomListPDF();

                        } else {
                            var objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(result.info, objeData);
                        }
                    })
                    .error(function (err) {
                        var objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_PRINTING_WAITING_ROOM'), objeData);
                    })
            };

            $scope.showCourrierTypeMinistere = function () {

                var pdfDocument = {};

                pdfDocument.styles = {
                    PrincipalHeader: {
                        fontSize: 16,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    }
                };

                pdfDocument.content = [];

                pdfDocument.content.push({
                    text: 'Réclamation au fichier National du Permis de Conduire',
                    style: 'PrincipalHeader',
                });

                pdfDocument.content.push({
                    text: 'Suite à votre stage dans le cadre de la récupération de points (cas 1), la Préfecture rejette la réattribution des 4 points en opposant que vos points perdus ne sont pas encore décomptés.\n',
                    alignment: 'justified'
                });

                pdfDocument.content.push({
                    text: 'Nous vous conseillons alors de transmettre un courrier accompagné d’un dossier le plus complet possible.',
                    alignment: 'justified'
                });

                pdfDocument.content.push({
                    text: '\n\n\n\n'
                });

                pdfDocument.content.push({
                    text: 'Ce courrier est a adresser en lettre recommandée à :\n\n',
                    alignment: 'left'
                });

                pdfDocument.content.push({
                    text: 'Ministère de l’Intérieur \n27 cours des Petites Ecuries - 77185 Lognes\nou',
                    alignment: 'left'
                });

                pdfDocument.content.push({
                    text: 'Ministère de l’Intérieur - Fichier National du Permis de Conduire \nplace Beauvau -75008 Paris\n\n\n\n',
                    alignment: 'left'
                });

                pdfDocument.content.push([
                    'A joindre au courrier :',
                    {
                        ul: [
                            'la photocopie de l\'attestation de suivi de stage',
                            'la photocopie d\'avis de contravention(s)',
                            'la preuve du paiement de l\'amende forfaitaire si celle-ci vous a été proposée.',
                            'la photocopie de décisions judiciaires notamment une ordonnance pénale (s’il y a lieu)',
                            'les divers courriers du Ministère vous informant de la perte de points'
                        ]
                    }
                ]);


                pdfMake.createPdf(pdfDocument).open();

            };

            $scope.showDemandeInterruption = function () {

                var pdfDocument = {};

                pdfDocument.content = [];

                pdfDocument.content.push({
                    text: 'DEMANDE D\'INTERRUPTION DE L\'ACTION EN RECOUVREMENT\n',
                    alignment: 'center',
                    fontSize: 15
                });

                pdfDocument.content.push({
                    text: 'de l\'amende\n\n',
                    alignment: 'center',
                    margin: [0, 6, 0, 0]
                });

                pdfDocument.content.push({
                    text: 'à adresser au comptable du trésor du lieu de la commission de l\'infraction\n\n\n\n',
                    alignment: 'center',
                    italics: true
                });

                pdfDocument.content.push({
                    columns: [
                        'Je soussigné(e) NOM:',
                        'PRENOM :'
                    ]
                });

                pdfDocument.content.push({
                    text: '(Nom et prénom(s) du titulaire du permis de conduire entrant dans le cadre de la période probatoire et auteur d\'une infraction ayant donné lieu à une perte d\'au moins 3 points.)',
                    alignment: 'justified',
                    italics: true,
                    margin: [0, 10, 0, 5],
                    fontSize: 10
                });

                pdfDocument.content.push({
                    text: 'ayant suivi un stage de sensibilisation à la sécurité routière, en application des articles R. 223-4 et suivants du code de la route, demande :',
                    alignment: 'justified',
                    italics: true,
                    margin: [0, 10, 0, 5],
                    fontSize: 10
                });


                pdfDocument.content.push({
                    text: 'L\'INTERRUPTION DE L\'ACTION EN RECOUVREMENT DE L\'AMENDE.',
                    alignment: 'left',
                    margin: [0, 15, 0, 5],
                    fontSize: 16
                });

                pdfDocument.content.push({
                    text: 'Je transmets :',
                    alignment: 'left',
                    margin: [0, 6, 0, 5],
                });

                pdfDocument.content.push([
                    {
                        text: 'a) Les principales caractéristiques de la décision judiciaire :',
                        fontSize: 12,
                        margin: [0, 6, 0, 8]
                    },
                    {
                        ul: [
                            {text: 'la nature de la décision (1) :', margin: [0, 0, 0, 8]},
                            {text: 'la date et les références de la décision :', margin: [0, 0, 0, 8]},
                            {text: 'la juridiction ayant prononcé la décision :', margin: [0, 0, 0, 8]},
                            {text: 'le montant de l\'amende encourue :'}
                        ],
                        fontSize: 10
                    },
                    {
                        text: 'b) Une copie de la lettre 48 N adressée par le ministère de l\'intérieur.',
                        fontSize: 12,
                        margin: [0, 6, 0, 8]
                    },
                    {
                        text: 'c) Une copie de l\'attestation de suivi de stage remise par la personne responsable de la formation spécifique, titulaire de l\'agrément.',
                        fontSize: 12, margin: [0, 6, 0, 24]
                    }
                ]);

                pdfDocument.content.push({
                    columns: [
                        'Fait à :',
                        'le:',
                        'Signature :'
                    ]
                });


                pdfDocument.content.push({
                    text: '(1) Décision de justice : amende forfaitaire majorée ou composition pénale ou jugement ou arrêt ou joursamende, ou ordonnance pénale...',
                    alignment: 'left',
                    margin: [0, 150, 0, 20],
                    fontSize: 10
                });


                pdfMake.createPdf(pdfDocument).open();
            };

            $scope.showDemandeRemboursement = function () {

                var pdfDocument = {};

                pdfDocument.content = [];

                pdfDocument.pageSize = 'LEGAL',

                    pdfDocument.content.push({
                        text: 'DEMANDE DE REMBOURSEMENT D’AMENDE SUITE AU SUIVI\nDU STAGE DE SENSIBILISATION A LA SECURITE ROUTIERE',
                        alignment: 'center',
                        fontSize: 14
                    });

                var tempText = '\n\nJe soussigné(e) (1) ………………………………………………………………………………………………………………………………………';
                tempText += '\nRenseignements sur le demandeur :';
                tempText += '\nAdresse : …………………………………………………………………………………………………………………………………………………………';
                tempText += '\nCode postal : …………………………………………………… Ville : …………………………………………………………………………………';
                tempText += '\nTéléphone fixe : ………………………………………………/téléphone portable : …………………………………………………………';
                tempText += '\nCourriel : ………………………………………………………………@………………………………………………………………………………………\n\n';

                pdfDocument.content.push({
                    text: tempText,
                    alignment: 'justified',
                    fontSize: 12
                });

                pdfDocument.content.push({
                    text: 'ayant suivi un stage de sensibilisation à la sécurité routière, en application des articles R. 223-4 et suivants du code de la route, demande :',
                    alignment: 'justified',
                    fontSize: 12
                });

                //Aqui de ir la imagen del cuadrito

                pdfDocument.content.push({
                    text: '\nLe remboursement de l’amende (2).',
                    alignment: 'left',
                    fontSize: 12,
                    bold: true
                });

                pdfDocument.content.push({
                    text: 'Montant de l’amende à rembourser : ………………………………………………………………………………………………………………………',
                    alignment: 'justified',
                    fontSize: 12,
                    italics: true
                });

                pdfDocument.content.push({
                    text: 'Je transmets dans tous les cas :',
                    alignment: 'left',
                    fontSize: 12,
                    italics: true
                });


                pdfDocument.content.push({
                    ul: [
                        {text: 'une copie de la lettre 48 N adressée par le ministère de l’intérieur ;'},
                        {text: 'un relevé d’identité bancaire libellé au nom et adresse du demandeur (3) ;'},
                        {text: 'une copie de l’attestation de suivi de stage de sensibilisation à la sécurité routière ;'},
                        {text: 'la date et le mode de paiement de l’amende (4) ;'},
                        {text: 'la preuve du paiement de l’amende : original de la « partie à conserver » du timbre-amende, copie du relevé de compte bancaire …'},
                    ]
                });


                pdfDocument.content.push({
                    text: '\nDe plus, selon la nature de l’amende si:',
                    alignment: 'left',
                    fontSize: 12,
                    margin: [0, 0, 0, 10]
                });

                pdfDocument.content.push([
                    {text: 'Il s’agit d’une décision judiciaire', fontSize: 12, italics: true},
                    {text: '(2) (amende forfaitaire majorée, jugement ou arrêt, ordonnance pénale …) :', fontSize: 12},
                    {
                        text: 'Je transmets l’original de l’avis d’amende (avis d’amende forfaitaire majorée, relevé de condamnation pénale, etc.).',
                        fontSize: 12
                    },
                    {
                        text: 'J’adresse le dossier de demande de remboursement complet au centre des finances publiques mentionné sur l’avis réclamant le paiement de l’amende (5).',
                        fontSize: 12
                    },
                    {
                        text: 'Nota. – Les amendes de composition pénale (suite à une décision judiciaire) ne peuvent faire l’objet d’un remboursement.',
                        fontSize: 11,
                        margin: [0, 5, 0, 5],
                        alignment: 'justified'
                    },

                    {
                        text: 'Il s’agit d’une amende forfaitaire (2) :',
                        alignment: 'left',
                        fontSize: 12,
                        italics: true
                    },

                    {
                        text: 'Je transmets l’original de l’avis de contravention.',
                        alignment: 'left',
                        fontSize: 12
                    }
                ]);

                pdfDocument.content.push({
                    text: [
                        {
                            text: 'Lorsqu’il s’agit d’une infraction relevée par contrôle automatisé (radars vitesse et dispositifs feux rouges),',
                            fontSize: 12,
                            italics: true,
                            alignment: 'justified'
                        },
                        'j’adresse le dossier complet de demande de remboursement à la trésorerie du contrôle automatisé à Rennes : TCA, service des remboursements, CS 81239, 35012 Rennes Cedex.\n\n',
                        {
                            text: 'Pour tous les autres cas,',
                            fontSize: 12,
                            italics: true,
                            alignment: 'justified'
                        },
                        'j’adresse le dossier complet de demande de remboursement à la direction départementale des finances publiques du département du lieu de commission de l’infraction (5).'
                    ]
                });

                pdfDocument.content.push({
                    text: 'L’interruption de l’action en recouvrement de l’amende (2).',
                    bold: true,
                    fontSize: 12,
                    alignment: 'left',
                    margin: [0, 8, 0, 8]
                });

                pdfDocument.content.push({
                    text: 'Je transmets :'
                });

                pdfDocument.content.push({
                    ul: [
                        'l’original de l’avis d’amende (amende forfaitaire majorée, relevé de condamnation pénale, etc.) :',
                        'une copie de la lettre 48 N adressée par le ministère de l’intérieur ;',
                        'une copie de l’attestation de suivi de stage remise par la personne responsable de la formation spécifique, titulaire de l’agrément.'
                    ],
                    alignment: 'justify'
                });

                pdfDocument.content.push([
                    {
                        text: 'J’adresse le dossier de demande au centre des finances publiques (5) mentionné sur l’avis réclamant le paiement de l’amende.'
                    },
                    {
                        text: 'Fait à ………………………………………………………………………………………………………………………………………………………………,'
                    },
                    {
                        text: 'le ………………………………………………………………………………………………………………………………………………………………………'
                    }
                ]);

                pdfDocument.content.push({
                    text: '(Signature du demandeur)',
                    alignment: 'right',
                    italics: true,
                    margin: [0, 20, 0, 30]
                });

                pdfDocument.content.push({
                    text: '______________',
                    alignment: 'left'
                });

                pdfDocument.content.push({
                    ol: [
                        'Nom et prénom(s) du titulaire du permis de conduire entrant dans le cadre de la période probatoire et auteur d’une infraction ayant donné lieu à une perte d’au moins 3 points.',
                        'Case à cocher.',
                        'Si le titulaire du compte n’est pas le demandeur, transmettre les documents suffisants pour justifier de la discordance (copie du livret de famille, par exemple).',
                        'Timbre-amende, chèque, virement, télépaiement.',
                        'Dans le cadre de l’instruction du dossier, le comptable des finances publiques peut demander toute autre pièce complémentaire qui s’avérerait nécessaire.'
                    ],
                    fontSize: 8,
                    alignment: 'left'
                });


                pdfMake.createPdf(pdfDocument).open();

            };

            $scope.gotoAddCustomers = function () {

                //here we use "no_id" to say that no search for especific formation.
                $location.path("/waitingroom/customeradd/no_id");
            };

            $scope.gotoAddCustomerToWaitingRoom = function () {

                $location.path("/waitingroom/directCustomerAdd");

            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };
        }])
    .controller("WaitingRoomCustomerAddController", ["$scope", "$rootScope", "$location", "$http", "$uibModal", "$translate", "$routeParams",
        function ($scope, $rootScope, $location, $http, $uibModal, $translate, $routeParams) {

            var formationID = $routeParams.formation_id;

            $scope.formations = [];

            $scope.customers = [];

            $scope.selectedFormation = {};

            $scope.selectedCustomer = {};

            var selectFormation = function () {

                if (!formationID) {
                    return;
                }

                for (var i = 0; i < $scope.formations.length; i++) {
                    if (formationID === $scope.formations[i].id) {
                        $scope.selectedFormation = $scope.formations[i];
                        return;
                    }
                }
            };

            var searchCustomers = function () {

                $http.post($rootScope.urlBase + "/Customer/searchByFormationCenterInWaitingRoom", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.customers = result.data;

                            $scope.selectedCustomer = $scope.customers[0];

                        } else {
                            var objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(result.info, objeData);
                        }
                    })
                    .error(function (err) {
                        var objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_CUSTOMERS'), objeData);
                    });
            };
            searchCustomers();

            var searchFormations = function () {

                $http.post($rootScope.urlBase + "/Formation/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formations = result.data;

                            if (formationID !== "no_id") {
                                selectFormation();
                            } else {
                                $scope.selectedFormation = $scope.formations[0];
                            }

                        } else {
                            var objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(result.info, objeData);
                        }
                    })
                    .error(function (err) {
                        var objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATIONS'), objeData);
                    });
            };
            searchFormations();

            $scope.addCustomerToFormation = function () {

                $http.post($rootScope.urlBase + "/formation/addCustomerFromWaitingRoom", {
                        formationCenter: $rootScope.formationCenter,
                        id: $scope.selectedFormation.id,
                        customer: $scope.selectedCustomer.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {

                            var objeData = {type: $translate.instant('INFO')};
                            $scope.showModalMessage(result.info, objeData);

                        } else {
                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage(result.info, objeData);
                        }
                    })
                    .error(function (err) {
                        var objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_USING_SERVICE'), objeData);
                    })
                    .finally(function () {
                        searchCustomers();
                    });

            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });
            };

            $scope.goBack = function () {

                var urlPath = $location.path();

                if (urlPath.indexOf("/no_id") < 0) {
                    $location.path("/formation/admin");
                } else {
                    $location.path("/waitingroom/manage");
                }
            };
        }])
    .controller("WaitingRoomAddCustomerWizardController", ["$rootScope", "$http", "$routeParams", "$scope", "$uibModal", "$location", "$translate",
        function ($rootScope, $http, $routeParams, $scope, $uibModal, $location, $translate) {

            var vm = this;

            var actDate = new Date();
            var maxBirthDateYear = actDate.getFullYear() - 16;

            //The month is in range 0..11, because of that we added 1.
            vm.birthDatePlaceHolder = actDate.getDate() + "/" + (actDate.getMonth() + 1) + "/" + maxBirthDateYear;


            //Model
            vm.currentStep = 1;

            vm.validPayment = false;

            //Messages arrays.
            vm.validationMessages = [];
            vm.paymentMessages = [];
            vm.customerFoundMessages = [];

            //Initializating customer Object.
            vm.initData = function () {
                vm.customerData = {};
                vm.customerData.civility = "M";
                vm.customerData.nationality = "FR";
                vm.customerData.residenceCountry = "FR";

                vm.customerData.driverLicence = {};

                vm.paymentData = {};
                vm.paymentData.cardType = "CB_VISA_MASTERCARD";
                vm.paymentData.currency = "EUR";
            };
            vm.initData();

            //Regulars expressions for validate fields.
            //vm.emailRedExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
            //vm.nameRegExp = /^[A-Za-z\s]{2,40}$/;
            vm.phoneRegExp = /^(0)\d{9}$/;
            vm.zipcodeRegExp = /^\d{5}$/;
            vm.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
            vm.emailRedExp = /^[a-z][_a-z0-9-]*(\.[_a-z0-9-]+)*@[a-z][a-z0-9-]*(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
            vm.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            vm.numberRegExp = /^\d{12}$/;
            vm.cardNumberRegExp = /^\d{16}$/;
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
                    template: "templates/waitingroom/AddCustomerWizard/customer.html",
                },
                {
                    step: 2,
                    name: "Licence",
                    template: "templates/waitingroom/AddCustomerWizard/licence.html",
                },
                {
                    step: 3,
                    name: "Payment",
                    template: "templates/waitingroom/AddCustomerWizard/payment.html",
                },
                {
                    step: 4,
                    name: "Recap",
                    template: "templates/waitingroom/AddCustomerWizard/recap.html",
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

                //Esto para navegar sin las validaciones
                //vm.currentStep = newStep;
                //return;

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
                        vm.initData();
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


            //Return true if procuration date grait or equal than deliverance date.
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

            vm.validProcDateRange = function () {
                if (vm.customerData.driverLicence.dateOfProcuration) {
                    procDate = new Date(vm.customerData.driverLicence.dateOfProcuration);
                    maxDeliDate = new Date().setDate(actDate.getDate() - 1);
                    minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

                    if (procDate <= maxDeliDate && procDate > minDeliDate) {
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
                    //if (!vm.validProcDate()) {
                    //
                    //    if(vm.procDgtdeliD()){
                    //        vm.showPDerror = true;
                    //        vm.showPDerrorLessDD = false;
                    //    }
                    //    else{
                    //        vm.showPDerror = false;
                    //        vm.showPDerrorLessDD = true;
                    //    }
                    //
                    //}
                    //else {
                    //    vm.showPDerror = false;
                    //    vm.showPDerrorLessDD = false;
                    //
                    //    if (vm.customerData.driverLicence.dateOfDeliverance
                    //        && (new Date(vm.customerData.driverLicence.dateOfProcuration) < new Date(vm.customerData.driverLicence.dateOfDeliverance))) {
                    //        vm.showPDerrorLessDD = true;
                    //    }
                    //    else {
                    //        vm.showPDerrorLessDD = false;
                    //    }
                    //
                    //}

                    if (vm.validProcDateRange()) {

                        vm.showPDerror = false;

                        if (vm.procDgtdeliD()) {
                            vm.showPDerrorLessDD = false;
                        } else {
                            vm.showPDerrorLessDD = true;
                        }

                    } else {
                        vm.showPDerror = true;
                        vm.showPDerrorLessDD = false;
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
                console.log("*********** checkCustomerLicenceNumber *****************")

                if (vm.customerData.driverLicence.number) {
                    $http.post($rootScope.urlBase + "/customer/searchIfNotExistByLicence", {
                            licence: vm.customerData.driverLicence.number
                        })
                        .success(function (data) {
                            if (data.status === "ok") {
                                //Customer not found in the system.
                                vm.customerLicenceNumberUsed = false;
                            }
                            else {
                                //Customer with that licence found, therefor show error.
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
            };

            vm.closeMessage = function (MessageIndex) {
                vm.validationMessages.splice(MessageIndex, 1);
            };

            vm.paymentMessagesClose = function (MessageIndex) {
                vm.paymentMessages.splice(MessageIndex, 1);
            };

            vm.AddCustomerToWaitingRoom = function () {

                console.log("***************************************");
                console.log("Estoy en AddCustomerToWaitingRoom");
                console.log("***************************************");

                $http.post($rootScope.urlBase + "/WaitingRoom/addCustomer", {
                        formationCenter: $rootScope.formationCenter,
                        customerData: vm.customerData,
                        paymentData: vm.paymentData
                    })
                    .success(function (result) {
                        if (result.status === "ok") {

                            console.log("Add customer to waiting room ok: ", result.data);

                            //Go to the 4 step.
                            vm.currentStep = 4;

                            var objeData = {type: $translate.instant('INFO')};
                            vm.showModalMessage($translate.instant('CUSTOMER_ADDED_TO_WAITING_ROOM'), objeData);

                        }
                        else {
                            console.log("Error adding customer to the waiting room1: ", result.info);

                            objeData = {type: $translate.instant('ERROR')};
                            vm.showModalMessage($translate.instant('ERROR_ADDING_CUSTOMER_TO_WAITING_ROOM'), objeData);
                        }

                    })
                    .error(function (err) {

                        console.log("Error adding customer to the waiting room2: ", err);

                        var objeData = {type: $translate.instant('ERROR')};
                        vm.showModalMessage($translate.instant('ERROR_ADDING_CUSTOMER_TO_WAITING_ROOM'), objeData);

                    });
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
            vm.initialBirthDateYear = 16;


            // BirthDate options
            vm.BirthDateOptions = {
                dateDisabled: disabledBirthDateOptions,
                formatYear: 'yyyy',
                maxDate: new Date(actDate.getFullYear() - vm.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
                minDate: new Date(actDate.getFullYear() - 80, 0, 1),
                initDate: new Date(actDate.getFullYear() - vm.initialBirthDateYear, actDate.getMonth(), actDate.getDate()),
                startingDay: 1
            };

            // Date of Deliverance options
            vm.DeliDateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date().setDate(actDate.getDate() - 1),
                minDate: new Date(actDate.getFullYear() - 20, 0, 1),
                startingDay: 1
            };

            //Date of Procuration options
            vm.ProcuDateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date().setDate(actDate.getDate() - 1),
                minDate: new Date(actDate.getFullYear() - 20, 0, 1),
                startingDay: 1
            };

            //Expiration date options
            vm.ExpirationDateOptions = {
                dateDisabled: notDisabled,
                formatYear: 'yyyy',
                maxDate: new Date(actDate.getFullYear() + 20, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            //For showing expirationdate errors.
            vm.ExpirationDateError = false;

            vm.checkExpirationDate = function () {

                if (vm.paymentData.CardExpirationDate) {

                    if (vm.paymentData.CardExpirationDate < actDate
                        || vm.paymentData.CardExpirationDate > new Date(actDate.getFullYear() + 20, actDate.getMonth(), actDate.getDate())) {
                        vm.ExpirationDateError = true;
                    } else {
                        vm.ExpirationDateError = false;
                    }

                } else {
                    vm.ExpirationDateError = false;
                }

            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            function notDisabled(data){
                return false;
            }

            function disabledBirthDateOptions(data) {
                return false;
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

            vm.openCardExpirationDate = function () {
                vm.popupCardExpirationDate.opened = true;
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

            vm.popupCardExpirationDate = {
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

            vm.showModalMessage = function (messageshow, objectData) {

                vm.items = objectData;
                vm.items.message = messageshow

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalMessage.html',
                    controller: 'ModalInstanceCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return vm.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                }, function () {

                });
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
        $scope.click = function (event) {
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
    .controller("PlaceEditcontroller", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$uibModal", "$log", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $uibModal, $log, $translate) {

            $scope.usernameExpReg = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;
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

            if ($scope.place.type != "EDITING") {
                $scope.place.isActivated = true
                $scope.titleformplace = $translate.instant('ADD_PLACE_MESSAGE');
            }
            else {
                $scope.titleformplace = $translate.instant('EDIT_PLACE_MESSAGE');
            }
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

                //$scope.place.latitude = 44.090066452554424
                //$scope.place.longitude = 4.9543940842151642
                if ((typeof $scope.place.latitude == "undefined" || $scope.place.latitude == "" ) || (typeof $scope.place.longitude == "undefined" || $scope.place.longitude == "" )) {

                    objectData = {type: "Error"}
                    $scope.showModalMessage("Not location's place defined", objectData);
                    //( 'NOT_LOCATION_PLACE' | translate )
                }
                else {

                    ///if editing
                    console.log("Position to create ", $scope.place.latitude, $scope.place.longitude)
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
                                        //  $scope.place = {}
                                        $scope.resetPlaceData()
                                        //delete $scope.place;
                                        $scope.place.type = "EDITING"
                                        $location.path("/place/listdata");
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
            console.log("Buscando Map")
            NgMap.getMap().then(function (map) {
                $scope.map = map;

                console.log("Asignando datos 1", map.markers[0])
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

            console.log("Buscando")
            $scope.click = function (event) {
                // console.log("Buscando")
                // $scope.map.setZoom(8);
                //$scope.map.setCenter(marker.getPosition());
                /// console.log("En esta posicion ");
                $scope.data = $scope.map;
                possArray = String(event.latLng).split(",")
                latitud = String(possArray[0]).replace("(", "")
                longitud = possArray[1].replace(")", "")


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
                // alert('this is at ' + latitud + " :" + longitud);
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
            $scope.usernameExpReg = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;

            $scope.numExpReg = /^[\d]+$/;
            $scope.placetoEditID = 0
            $scope.titleformplace = $scope.EDIT_PLACE;
            console.log("Traduccion")
            $scope.checkboxUnable = true
            $scope.seachPlace = {}
            $scope.seachPlaceAux = {}
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

            $scope.clearSearchField = function () {
                $scope.seachPlaceAux.name = null
                $scope.seachPlaceAux.agreementName = null
                $scope.seachPlaceAux.agreementName = null
                $scope.seachPlaceAux.address = null
                $scope.criteriaList = ""


            }

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
                    //console.log("Seleccionado OK para eliminar ", $scope.selected)
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
                                        console.log("Refress DATA")
                                        $scope.places = null
                                        $scope.countRecordsPlace();
                                        $scope.getPlaceRecords();
                                        $scope.place.address = null
                                        message = $translate.instant("DELETE_PLACE_SUCESSFUL")
                                        $scope.showModalMessage(message, messageObject);

                                    }

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

                //$scope.seachPlace = $scope.seachPlaceAux

                $scope.search.name = $scope.criteriaList;
                $scope.appPlace.currentPagePlace = 0;

                $scope.seachPlace.name = $scope.seachPlaceAux.name
                $scope.seachPlace.agreementName = $scope.seachPlaceAux.agreementName
                $scope.seachPlace.agreementNumber = $scope.seachPlaceAux.agreementNumber
                $scope.seachPlace.address = $scope.seachPlaceAux.address

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

                if (typeof $scope.seachPlace.agreementName != "undefined")
                    config.agrementname = $scope.seachPlace.agreementName

                if (typeof $scope.seachPlace.agreementNumber != "undefined")
                    config.agrementnumber = $scope.seachPlace.agreementNumber

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
                            message = $translate.instant("ERROR_ALERT_SEARCH");
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
                        $scope.clearSearchField()
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
                $rootScope.place.latitude = 48.864716
                $rootScope.place.longitude = 2.349014
                $rootScope.place.type = "CREATING";
                $scope.titleformplace = $translate.instant('ADD_PLACE');
                console.log('Form title ', $scope.titleformplace)
                console.log("EDICION ", $scope.SAVE_BUTTON);
                $location.path('/place/edit');
            }


            $scope.editPlace = function (placeId) {

                if (typeof placeId == "undefined") {
                } else {
                    ///Show edit place
                    $scope.placetoEditID = placeId;
                    console.log("Update editing value ListController")


                    console.log('Form title ', $scope.titleformplace)
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

            $scope.printListPlace = function () {

                var items = $scope.places.map(function (iplace) {
                    return [iplace.name, iplace.address, iplace.city];
                });

                //{ text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader' },
                //{ text:  $translate.instant('TABLE_PLACE_ADDRESS'), style: 'itemsTableHeader' },
                //{ text: $translate.instant('TABLE_PLACE_POSTAL_CODE'), style: 'itemsTableHeader' },
                //{ text:  $translate.instant('TABLE_PLACE_CITY'), style: 'itemsTableHeader' },
                //{ text: $translate.instant('TABLE_PLACE_AGREMENT'), style: 'itemsTableHeader' },
                //{ text: $translate.instant('TABLE_PLACE_ACTIVATED'), style: 'itemsTableHeader' },
                //{ text: $translate.instant('TABLE_PLACE_ACTIONS'), style: 'itemsTableHeader' },

                //.concat(items)
                var docDefinition = {
                    content: [
                        {text: $translate.instant('ADMIN_PAGE_HEAD'), style: 'header'},
                        {text: $translate.instant('ADMIN_PAGE_HEAD_DESCRIPTION'), alignment: 'left'},


                        {text: 'Data', style: 'subheader'},
                        {
                            style: 'itemsTable',
                            table: {
                                widths: ['*', 75, 75],
                                body: [
                                    [
                                        {text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader'},
                                        {text: $translate.instant('TABLE_PLACE_ADDRESS'), style: 'itemsTableHeader'},
                                        {text: $translate.instant('TABLE_PLACE_CITY'), style: 'itemsTableHeader'}


                                    ]
                                ].concat(items)
                            }
                        }

                    ],
                    styles: {
                        header: {
                            fontSize: 20,
                            bold: true,
                            margin: [0, 0, 0, 10],
                            alignment: 'center'
                        },
                        subheader: {
                            fontSize: 16,
                            bold: true,
                            margin: [0, 20, 0, 5]
                        },
                        itemsTable: {
                            margin: [0, 5, 0, 15]
                        },
                        itemsTableHeader: {
                            bold: true,
                            fontSize: 13,
                            color: 'black'
                        },
                        totalsTable: {
                            bold: true,
                            margin: [0, 30, 0, 0]
                        }
                    },
                    defaultStyle: {}
                };

                pdfMake.createPdf(docDefinition).open()


            }

            $scope.printPlace = function (placeId) {

                if (typeof placeId == "undefined") {
                } else {
                    ///Show edit place
                    $scope.placetoEditID = placeId;
                    console.log("Update editing value ListController")


                    console.log('Form title ', $scope.titleformplace)
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

                    var docDefinition = {
                        content: [
                            'Bulleted list example:',
                            {
                                // to treat a paragraph as a bulleted list, set an array of items under the ul key
                                ul: [
                                    'Item 1',
                                    'Item 2',
                                    'Item 3',
                                    {text: 'Item 4', bold: true},
                                ]
                            },

                            'Numbered list example:',
                            {
                                // for numbered lists set the ol key
                                ol: [
                                    'Item 1',
                                    'Item 2',
                                    'Item 3'
                                ]
                            }
                        ]
                    };

                    // open the PDF in a new window
                    pdf = pdfMake.createPdf(docDefinition)

                    pdf.open()
                    var blob = new Blob([pdf], {type: 'application/pdf'});
                    $scope.pdfUrl = URL.createObjectURL(blob);
                    $scope.items = {}
                    $scope.items.pdfUrl = URL.createObjectURL(blob);
                    // Display the modal view
                    var modalInstance = $uibModal.open({
                        scope: $scope,
                        animation: $scope.animationsEnabled,
                        templateUrl: 'pdf-viewer.html',
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

                    //$location.path('/place/edit', function (result) {
                    //
                    //});
                    //
                    //
                    //$rootScope.$broadcast("EVENT_EDIT_DATA", $scope.placetoEditID)

                }


            }

            $scope.deletePlace = function (placeObject) {

                console.log("Object Place", placeObject)
                if (typeof placeObject != "undefined" && typeof placeObject.id != "undefined") {

                    ///Show modal with validation message confirmation
                    messageWindow = $translate.instant("MESSAGE_DELETE_PLACE");
                    if (typeof placeObject.formations != "undefined" && placeObject.formations.length > 0) {
                        messageWindow += "\n Formations asociated will be modified too."
                    }

                    $scope.showModalData(messageWindow, placeObject);

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
            $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

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

            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
            $scope.format = $scope.formats[0];
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);


            $scope.clearSearchField = function () {
                $scope.searchAux.name = null
                console.log("Clear FIELD")
                $scope.searchAux.initialDate = null
                $scope.searchAux.initialDate = ""
                $scope.searchAux.endDate = null
                $scope.criteriaList = ""
                $scope.timeInit = new Date();
                $scope.timeEnd = new Date();
            }

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

            $scope.timeInit = new Date();
            $scope.timeEnd = new Date();
            $scope.hstep = 1;
            $scope.mstep = 1;
            $scope.sstep = 1;


            $scope.ismeridian = true;
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };

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

            $scope.search = {};
            $scope.searchAux = {};
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


                ///Search by amount else
                if (!isNaN(parseInt($scope.search.name))) {
                    config.amount = $scope.search.name
                }

                if (typeof $scope.search.initialDate != "undefined" && $scope.search.initialDate != "" && $scope.search.initialDate != null) {
                    /// Update Hour
                    initDateAndTime = $scope.search.initialDate //new Date( $scope.search.initialDate)
                    //initTime =
                    //console.log("Simple Hour", $scope.timeInit.getHours())
                    //console.log("Simple Hour", $scope.timeInit.getUTCHours())
                    initDateAndTime.setUTCHours($scope.timeInit.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())
                    //console.log("Show data"+ $scope.timeInit)
                    config.initialDate = initDateAndTime.getTime();
                    console.log("Init date to search ", config.initialDate, initDateAndTime)
                }

                if (typeof $scope.search.endDate != "undefined" && $scope.search.endDate != "" && $scope.search.endDate != null) {
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
                    endDateAndTime = $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " + config.finalDate)
                }


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

                if (typeof $scope.search.initialDate != "undefined" && $scope.search.initialDate != "" && $scope.search.initialDate != null) {
                    /// Update Hour
                    initDateAndTime = $scope.search.initialDate //new Date( $scope.search.initialDate)
                    //initTime =
                    //console.log("Simple Hour", $scope.timeInit.getHours())
                    //console.log("Simple Hour", $scope.timeInit.getUTCHours())
                    initDateAndTime.setUTCHours($scope.timeInit.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())
                    //console.log("Show data"+ $scope.timeInit)
                    config.initialDate = initDateAndTime.getTime();
                    console.log("Init date to search ", config.initialDate, initDateAndTime)
                }

                if (typeof $scope.search.endDate != "undefined" && $scope.search.endDate != "" && $scope.search.endDate != null) {
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
                    endDateAndTime = $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " + config.finalDate)
                }


                console.log("Search execution")

                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Bill/searchBillByFormationCenter', config)
                    .success(function (data_result) {


                        if (data_result.length == 0 || typeof data_result.length == "undefined") {
                            //$scope.appBill.currentPageBill = 0;
                            message = $translate.instant("ERROR_ALERT_SEARCH")

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
                        $scope.clearSearchField()
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
                if (typeof billObject != "undefined") {

                    ////Modal form delte confirmation

                    ///if ok\
                    billObject.idparam = billObject.id
                    $http.post($rootScope.urlBase + '/Bill/deleteBill', config)
                        .success(function (data_result) {
                            if (data_result.response == "ERROR") {
                                message = data_result.message;
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
                            message = "Bill was delete sucessful";
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
                            message = error.message;
                            objectType = {type: "Error"};
                            $scope.showModalMessage(message, objectType);
                            return
                        })
                }
            }

            $scope.getReadableDate = function (dateParmt) {
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear() + " " + value.getUTCHours() + ":" + value.getMinutes() + ":" + value.getSeconds();

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
                $scope.searchAux.name = $scope.criteriaList;
                $scope.appBill.currentPageBill = 0


                // console.log("El valor de la forama ", $scope.myform)

                if ($scope.searchAux.initialDate != "" || typeof $scope.searchAux.endDate != "") {
                    //if ($scope.advancedSearchPlace.$invalid) {
                    //
                    //    $scope.errorValid = true
                    //    // console.log("INSERTANDO ALERTA")
                    //    message = "Sorry, Some Advanced Search fields are invalid";
                    //    //$scope.alerts.push({
                    //    //    type: 'danger',
                    //    //    msg: message
                    //    //});
                    //
                    //    objectType = {type: "Error"};
                    //
                    //    $scope.showModalMessage(message, objectType);
                    //    return;
                    //}

                    if (($scope.searchAux.initialDate != "" && $scope.searchAux.initialDate != null) && ( $scope.searchAux.endDate != "" && $scope.searchAux.endDate != null)) {


                        initDateAndTime = $scope.searchAux.initialDate //new Date( $scope.searchAux.initialDate)
                        //initTime =
                        console.log("Simple Hour", $scope.timeInit.getHours())
                        console.log("Simple Hour", $scope.timeInit.getUTCHours())
                        initDateAndTime.setUTCHours($scope.timeInit.getHours())
                        initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                        initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())

                        timestampInit = initDateAndTime.getTime()

                        endDateAndTime = $scope.searchAux.endDate
                        endDateAndTime.setUTCHours($scope.timeEnd.getHours())
                        endDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                        endDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                        timestampEnd = endDateAndTime.getTime()

                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA", $scope.searchAux.endDate)
                            message = $translate.instant("ERROR_END_DATE");
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
                $scope.advancedSearchPlace.$setPristine()


                $scope.search.name = $scope.searchAux.name
                $scope.search.initialDate = $scope.searchAux.initialDate
                $scope.search.endDate = $scope.searchAux.endDate


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
                name: "Maestro"
            },
            {
                img: "diners.png",
                type: "Card",
                name: "Diners"
            }, {
                img: "",
                type: "Card",
                name: "MasterPass"
            },
            {
                img: "p24-small.png",
                type: "Card",
                name: "Przelewy24"
            },
            {
                img: "IDEAL_Logo.png",
                type: "Card",
                name: "iDeal"
            },
            {
                img: "bancontact.png",
                type: "Card",
                name: "Bancontact/Mister Cash"
            },
            {
                img: "paylib.jpg",
                type: "Card",
                name: "PayLib"
            },
            {
                img: "Sofort.png",
                type: "Card",
                name: "Sofort"
            },
            {
                img: "elv.png",
                type: "Direct_Debit",
                name: "ELV"
            },
            {
                img: "giropay.jpg",
                type: "Direct_Debit",
                name: "Giropay"
            },
            {
                img: "bank.png",
                type: "Bankwire",
                name: "Bankwire"
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
        $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;

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
    })
    .controller("AlertListController", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$timeout", "NavigatorGeolocation", "NgMap", "$uibModal", "$log", "$translate",
        function ($scope, $rootScope, $http, $location, $routeParams, $timeout, NavigatorGeolocation, NgMap, $uibModal, $log, $translate) {
            $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]
            $scope.usernameExpReg = /^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;


            $scope.advanceSearch = true
            $scope.checkboxUnable = true
            $scope.appAlert = {}
            $scope.appAlert.currentPageAlert = 0;
            $scope.appAlert.maxSizeAlert = 5;
            $scope.appAlert.itemPerPageAlert = 5;
            $scope.appAlert.totalItemsAlert = 0;
            $scope.appAlert.smallnumPages = 5
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;

            $scope.search = {};
            $scope.searchAux = {};
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
                //  dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                //    minDate: new Date(),
                startingDay: 1
            };

            $scope.clearSearchField = function () {
                $scope.searchAux.name = null
                $scope.searchAux.initialDate = null
                $scope.searchAux.endDate = null
                $scope.criteriaList = ""
            }

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
                //
                //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 7);
                return false
            }

            $scope.today = function () {
                $scope.search.initialDate = new Date();
            };
            $scope.today();
            //gloal configurations
            $scope.open2 = function () {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
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

            $scope.timeInit = new Date();
            $scope.timeEnd = new Date();
            $scope.hstep = 1;
            $scope.mstep = 1;
            $scope.sstep = 1;


            $scope.ismeridian = true;
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };

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

            $scope.search = {};
            $scope.formationcenterName = $rootScope.formationCenter;

            $scope.searchAllAlerts = function () {
                $http.get($rootScope.urlBase + "/Alert/searchallAlerts")
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

            //$scope.searchAllAlerts();

            $scope.countRecordsAlert = function () {

                //$scope.search.name = $scope.criteriaList

                config = {
                    page: 0,
                    len: $scope.appAlert.maxSizeAlert,
                    nameformation: $scope.formationcenterName,

                }


                if (typeof   $scope.search.name != "undefined" || $scope.search.name == "") {
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
                    config.text = $scope.search.name

                }

                if (typeof $scope.search.initialDate != "undefined" && $scope.search.initialDate != "" && $scope.search.initialDate != null) {
                    /// Update Hour
                    initDateAndTime = $scope.search.initialDate //new Date( $scope.search.initialDate)
                    //initTime =
                    //console.log("Simple Hour", $scope.timeInit.getHours())
                    //console.log("Simple Hour", $scope.timeInit.getUTCHours())
                    initDateAndTime.setUTCHours($scope.timeInit.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())
                    //console.log("Show data"+ $scope.timeInit)
                    config.initialDate = initDateAndTime.getTime();
                    console.log("Init date to search ", config.initialDate, initDateAndTime)
                }

                if (typeof $scope.search.endDate != "undefined" && $scope.search.endDate != "" && $scope.search.endDate != null) {
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
                    endDateAndTime = $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " + config.finalDate)
                }


                //if (typeof  $scope.search.name == "undefined")
                //    $scope.search.name = ""
                //
                //config.city = $scope.search.name
                //countbycity
                console.log("Call services ===>", config)
                $http.post($rootScope.urlBase + '/Alert/countAlertByFormationCenter', config)
                    .success(function (data_result) {
                        // console.log("RESULT ", data_result)
                        if (data_result.response != "OK") {
                            $scope.appAlert.totalItemsAlert = 0;
                            return;
                        }
                        console.log("Cantidad ---", data_result.size)
                        $scope.appAlert.totalItemsAlert = data_result.size
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


            $scope.getAlertRecords = function () {

                //$scope.search.name = $scope.criteriaList

                var pageData = 0;


                if ($scope.appAlert.currentPageAlert > 0) {
                    pageData = $scope.appAlert.currentPageAlert - 1;
                    pageData = String(pageData)
                }


                config = {
                    page: pageData,
                    len: $scope.appAlert.maxSizeAlert,
                    nameformation: $scope.formationcenterName,
                }

                ///Search by amount else


                if (typeof $scope.search.initialDate != "undefined" && $scope.search.initialDate != "" && $scope.search.initialDate != null) {
                    /// Update Hour
                    initDateAndTime = $scope.search.initialDate //new Date( $scope.search.initialDate)
                    //initTime =
                    console.log("Simple Hour", $scope.timeInit.getHours())
                    console.log("Simple Hour", $scope.timeInit.getUTCHours())
                    initDateAndTime.setUTCHours($scope.timeInit.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())
                    //console.log("Show data"+ $scope.timeInit)
                    config.initialDate = initDateAndTime.getTime();
                    console.log("Init date to search ", config.initialDate, initDateAndTime)
                }

                if (typeof $scope.search.endDate != "undefined" && $scope.search.endDate != "" && $scope.search.endDate != null) {
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
                    endDateAndTime = $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " + config.finalDate)
                }


                if (typeof   $scope.search.name != "undefined" || $scope.search.name == "") {
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
                    config.text = $scope.search.name

                }

                console.log("Search execution")

                console.log("Call services ", config)
                $http.post($rootScope.urlBase + '/Alert/searchAlertByFormationCenter', config)
                    .success(function (data_result) {
                        if (data_result.response == "ERROR" || data_result.result.length == 0 || typeof data_result.result.length == "undefined") {
                            //$scope.appAlert.currentPageAlert = 0;
                            message = $translate.instant("ERROR_ALERT_SEARCH");
                            //$scope.alerts.push({
                            //    type: 'danger',
                            //    msg: message
                            //});

                            objectType = {type: "Error"};
                            console.log("Error show form", data_result)
                            $scope.showModalMessage(message, objectType);
                            return;

                        }
                        console.log("Cantidad de objetos --- obtenidos", data_result.result.length)
                        // $scope.appAlert.currentPageAlert = 0;
                        $scope.Alerts = data_result.result
                        console.log("Rsults", $scope.Alerts)
                        $scope.activatedAlert = []
                        console.log("Beafore Data ", $scope.search)
                        $scope.clearSearchField()
                        console.log("Data ", $scope.search)
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

                        return
                    })

            }

            $scope.makePayment = function (AlertObject) {
                objectToPay = $rootScope.formationcenterData;
                if (typeof AlertObject != "undefined" && typeof objectToPay != "undefined") {
                    objectToPay.amount = AlertObject.amount
                    $scope.showModalData("", $rootScope.formationcenterData)
                }
            }

            $scope.deleteAlert = function (AlertObject) {
                if (typeof AlertObject != "undefined") {

                    ////Modal form delte confirmation

                    ///if ok
                    AlertObject.idparam = AlertObject.id
                    $http.post($rootScope.urlBase + '/Alert/deleteAlert', config)
                        .success(function (data_result) {
                            if (data_result.response == "ERROR") {
                                message = data_result.message;
                                //$scope.alerts.push({
                                //    type: 'danger',
                                //    msg: message
                                //});

                                objectType = {type: "Error"};

                                $scope.showModalMessage(message, objectType);
                                return;
                            }
                            console.log("Cantidad de objetos --- obtenidos", data_result.length)
                            // $scope.appAlert.currentPageAlert = 0;
                            message = "Alert was delete sucessful";
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
                            message = error.message;
                            objectType = {type: "Error"};
                            $scope.showModalMessage(message, objectType);
                            return
                        })
                }
            }

            $scope.getReadableDate = function (dateParmt) {
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear() + " " + value.getUTCHours() + ":" + value.getMinutes() + ":" + value.getSeconds();

                return resultDate

            };

            $scope.getReadableType = function (type) {

                if (typeof type != "undefined") {
                    config = {}
                    config.language = "en" //$translate.determinePreferredLanguage()
                    config.type = type
                    traslateValue = $translate.instant(type) || type;
                    //   console.log("RESULT", traslateValue)
                    return (traslateValue)

                    //$http.get($rootScope.urlBase + '/Alert/getAlertType', config)
                    //    .success(function (data_result) {
                    //        if (data_result.response == "ERROR" ) {
                    //
                    //            return "";
                    //
                    //        }
                    //
                    //        ///Review if clean al parameter
                    //        return type;
                    //        // console.log("RESULTADOS", data_result)
                    //    })
                    //    .error(function (error) {
                    //        //@action mostrar error
                    //
                    //        //$scope.errorMessage = error
                    //        message = error
                    //        objectType = {type: "Error"};
                    //        //console.log("Error show form")
                    //        //$scope.showModalMessage(message, objectType);
                    //        return "";
                    //
                    //    })


                }
                return type
            }

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
                            $scope.getAlertRecords();

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

                $scope.searchAux.name = $scope.criteriaList;
                $scope.appAlert.currentPageAlert = 0


                // console.log("El valor de la forama ", $scope.myform)

                if ($scope.searchAux.initialDate != "" || typeof $scope.searchAux.endDate != "") {
                    //if ($scope.advancedSearchPlace.$invalid) {
                    //
                    //    $scope.errorValid = true
                    //    // console.log("INSERTANDO ALERTA")
                    //    message = "Sorry, Some Advanced Search fields are invalid";
                    //    //$scope.alerts.push({
                    //    //    type: 'danger',
                    //    //    msg: message
                    //    //});
                    //
                    //    objectType = {type: "Error"};
                    //
                    //    $scope.showModalMessage(message, objectType);
                    //    return;
                    //}

                    console.log("Hour Init vv ", $scope.timeInit, $scope.timeEnd)
                    if (($scope.searchAux.initialDate != "" && $scope.searchAux.initialDate != null) && ( $scope.searchAux.endDate != "" && $scope.searchAux.endDate != null)) {


                        initDateAndTime = $scope.searchAux.initialDate //new Date( $scope.search.initialDate)
                        //initTime =
                        console.log("Simple Hour", $scope.timeInit.getHours())
                        console.log("Simple Hour", $scope.timeInit.getUTCHours())
                        initDateAndTime.setUTCHours($scope.timeInit.getHours())
                        initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                        initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())

                        timestampInit = initDateAndTime.getTime()

                        endDateAndTime = $scope.searchAux.endDate
                        endDateAndTime.setUTCHours($scope.timeEnd.getHours())
                        endDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                        endDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                        timestampEnd = endDateAndTime.getTime()

                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA", $scope.search.endDate)
                            message = $translate.instant("ERROR_END_DATE");
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

                $scope.search.name = $scope.searchAux.name
                $scope.search.initialDate = $scope.searchAux.initialDate
                $scope.search.endDate = $scope.searchAux.endDate


                console.log("Search elements")
                $scope.countRecordsAlert();
                $scope.getAlertRecords();
                console.log("Search elements")

            }


            ///-----------------------------------------------------
            $scope.countRecordsAlert();
            $scope.getAlertRecords();
        }])
    .controller("DetailsFormationController", ["$scope", "$routeParams", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $routeParams, $rootScope, $location, $http, $uibModal, $translate) {

            $scope.numExpReg = /^[\d]+$/;
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.maxDate = new Date(2080, 0, 1);

            $scope.Hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

            $scope.Minutes = [];
            for (var i = 0; i < 60; i++) {
                if (i < 10) {
                    $scope.Minutes.push("0" + i.toString());
                } else {
                    $scope.Minutes.push(i.toString());
                }
            }

            var initParameters = function () {
                $scope.formation = null;
                $scope.oldFormationValues = null;

                $scope.fDate = {};
                $scope.fDate.date = null;

                $scope.MorningStartH = null;
                $scope.MorningStartM = null;
                $scope.MorningEndH = null;
                $scope.MorningEndM = null;
                $scope.AfternoonStartH = null;
                $scope.AfternoonStartM = null;
                $scope.AfternoonEndH = null;
                $scope.AfternoonEndM = null;

                $scope.InvalidDateParameters = false;

                $scope.InvalidMorningTimeRange = false;
                $scope.InvalidAfternoonTimeRange = false;

                $scope.dateOutOfRange = false;

                $scope.showUpdateDate = false;

                $scope.indexDate = null;

                $scope.selectedPlace = {};
                $scope.selectedPSY = {};
                $scope.selectedBAFM = {};

            };
            initParameters();

            $scope.searchFormation = function () {

                $http.post($rootScope.urlBase + "/formation/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formation = result.data;
                            console.log("Formation data", $scope.formation)
                            $scope.selectedPlace = $scope.formation.place;

                            //Populate the select inputs with the animators.
                            var len = $scope.formation.animators.length;
                            for (var i = 0; i < len; i++) {
                                if ($scope.formation.animators[i].type === "PSY") {
                                    $scope.selectedPSY = $scope.formation.animators[i];
                                }

                                if ($scope.formation.animators[i].type === "BAFM") {
                                    $scope.selectedBAFM = $scope.formation.animators[i];
                                }
                            }

                            console.log("La formation para updatear tiene: ", $scope.formation);
                        } else {
                            console.log("Error searching Formation: ", result.info);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                            //alert("Error searching Formation: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation: ", err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);

                        //alert("Error searching Formation: " + err);
                    });
            };
            $scope.searchFormation();

            var copyToOldFormation = function () {
                $scope.oldFormationValues = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.formation.place,
                };
            };

            $scope.selectDateForUpdate = function (index) {

                $scope.indexDate = index;

                $scope.fDate.date = $scope.formation.dates[index].date;

                $scope.MorningStartH = $scope.formation.dates[index].morning.hourStart.substr(0, 2);
                $scope.MorningStartM = $scope.formation.dates[index].morning.hourStart.substr(3, 2);
                $scope.MorningEndH = $scope.formation.dates[index].morning.hourEnd.substr(0, 2);
                $scope.MorningEndM = $scope.formation.dates[index].morning.hourEnd.substr(3, 2);

                $scope.AfternoonStartH = $scope.formation.dates[index].afternoon.hourStart.substr(0, 2);
                $scope.AfternoonStartM = $scope.formation.dates[index].afternoon.hourStart.substr(3, 2);
                $scope.AfternoonEndH = $scope.formation.dates[index].afternoon.hourEnd.substr(0, 2);
                $scope.AfternoonEndM = $scope.formation.dates[index].afternoon.hourEnd.substr(3, 2);

                $scope.showUpdateDate = true;
            };

            var prepareForInsert = function () {
                $scope.fDate = {};
                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);

                $scope.MorningStartH = "09";
                $scope.MorningStartM = "00";
                $scope.MorningEndH = "11";
                $scope.MorningEndM = "00";
                $scope.AfternoonStartH = "02";
                $scope.AfternoonStartM = "00";
                $scope.AfternoonEndH = "04";
                $scope.AfternoonEndM = "00";
            };

            $scope.insertDate = function () {

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

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        $scope.formation.dates.splice(i, 1, {
                            date: $scope.fDate.date,
                            morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                            afternoon: {
                                hourStart: $scope.fDate.afternoon.hourStart,
                                hourEnd: $scope.fDate.afternoon.hourEnd
                            }
                        });

                        $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                        $scope.InvalidDateParameters = false;

                        return;
                    }
                }

                $scope.formation.dates.push({
                    date: $scope.fDate.date,
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd}
                });

                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                $scope.InvalidDateParameters = false;

                $scope.formation.dates.sort(compareFormationDates);
            };

            $scope.insert_or_update = function () {
                if ($scope.indexDate !== null) {
                    $scope.updateDate();
                } else {
                    $scope.insertDate();
                }
            };

            $scope.updateDate = function () {

                //Create the Formation Date Object.
                $scope.fDate.morning = {
                    hourStart: $scope.MorningStartH + ":" + $scope.MorningStartM,
                    hourEnd: $scope.MorningEndH + ":" + $scope.MorningEndM
                };

                $scope.fDate.afternoon = {
                    hourStart: $scope.AfternoonStartH + ":" + $scope.AfternoonStartM,
                    hourEnd: $scope.AfternoonEndH + ":" + $scope.AfternoonEndM
                };

                //Replace in the array the element in the index position.
                $scope.formation.dates.splice($scope.indexDate, 1, {
                    date: new Date($scope.fDate.date).setHours(0, 0, 0, 0),
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {
                        hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd
                    }
                });

                //Now check if the new date is the same that other Formation date object
                //If true, then eliminate that element.
                var lgth = $scope.formation.dates.length;
                for (var i = 0; i < lgth; i++) {

                    //Do not compare with my self.
                    if (i == $scope.indexDate) {
                        console.log("entre al if the i == $scope.indexDate: ", i);
                        continue;
                    }

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        console.log("Entre al if de la comparacion de fechas: ", i);
                        $scope.formation.dates.splice(i, 1);
                        break;
                    }

                }


                $scope.InvalidDateParameters = false;

                $scope.showUpdateDate = false;
                $scope.indexDate = null;

                $scope.formation.dates.sort(compareFormationDates);

            };

            $scope.validDate = function (vDate) {
                var tempDate = new Date().setHours(0, 0, 0, 0);

                if (tempDate <= vDate && vDate <= $scope.maxDate) {
                    $scope.dateOutOfRange = false;
                    return true;
                }

                $scope.dateOutOfRange = true;
                return false;
            };

            $scope.validateDateParameters = function () {

                if (!$scope.fDate.date) {
                    $scope.InvalidDateParameters = true;
                    return;
                }

                //convert to timestamp and set the 00:00 Hour.
                $scope.fDate.date = new Date($scope.fDate.date).setHours(0, 0, 0, 0);

                if ($scope.validDate($scope.fDate.date)
                ) {
                    $scope.InvalidDateParameters = false;
                } else {
                    $scope.InvalidDateParameters = true;
                }
            };

            $scope.validateTimeRangeParameters = function () {
                if (checkMorningTimeRange()) {
                    $scope.InvalidMorningTimeRange = false;
                } else {
                    $scope.InvalidMorningTimeRange = true;
                }

                if (checkAfternoonTimeRange()) {
                    $scope.InvalidAfternoonTimeRange = false;
                } else {
                    $scope.InvalidAfternoonTimeRange = true;
                }
            };

            var checkMorningTimeRange = function () {

                var tempHour = parseInt($scope.MorningStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningStart = new Date().setHours(tempHour, parseInt($scope.MorningStartM));

                tempHour = parseInt($scope.MorningEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningEnd = new Date().setHours(tempHour, parseInt($scope.MorningEndM));


                return (morningStart < morningEnd);
            };
            var checkAfternoonTimeRange = function () {

                var tempHour = parseInt($scope.AfternoonStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonStart = new Date().setHours(tempHour, parseInt($scope.AfternoonStartM));

                tempHour = parseInt($scope.AfternoonEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonEnd = new Date().setHours(tempHour, parseInt($scope.AfternoonEndM));

                return (afternoonStart < afternoonEnd);
            };

            $scope.toggle = function () {
                $scope.showUpdateDate = !$scope.showUpdateDate;

                if ($scope.showUpdateDate) {
                    prepareForInsert();
                } else {
                    $scope.index = null;
                }
            };

            $scope.places = [];
            $scope.searchPlaces = function () {

                $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.places = result.data;
                        } else {

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);
                            //alert("An error has ocurred searching Places.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Places.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);

                        //alert("An error has ocurred searching Places.");
                    });

            };
            $scope.searchPlaces();

            $scope.mostrar = function () {
                console.log("El valor del selected place es: ", $scope.selectedPlace);
            };

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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                            //alert("An error has ocurred searching Animators PSY.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators PSY.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                        //alert("An error has ocurred searching Animators PSY.");
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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                            // alert("An error has ocurred searching Animators BAFM.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators BAFM.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                        //alert("An error has ocurred searching Animators BAFM.");
                    });
            };
            $scope.searchBAFM();
            $scope.selectedBAFM = null;

            var newAttributes = null;

            $scope.prepareForUpdate = function () {

                //Prepare the new Formation attributes for update.
                newAttributes = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.selectedPlace.id
                };

                newAttributes.animators = [];
                newAttributes.animators.push($scope.selectedBAFM.id);
                newAttributes.animators.push($scope.selectedPSY.id);

                newAttributes.dates = [];

                var len = $scope.formation.dates.length;

                for (var i = 0; i < len; i++) {
                    newAttributes.dates.push($scope.formation.dates[i]);
                }
            };

            var compareFormationDates = function (date1, date2) {
                if (date1.date < date2.date)
                    return -1;

                if (date1.date == date2.date)
                    return 0;

                if (date1.date > date2.date)
                    return 1;
            };

            $scope.updateFormation = function () {
                $scope.showUpdateConfirmModal();
            };

            $scope.gotoManage = function () {
                $location.path('/formation/admin');
            };

            $scope.deleteDate = function (index) {
                if ($scope.formation.dates[index]) {
                    $scope.formation.dates.splice(index, 1);
                }
            };

            $scope.showUpdateConfirmModal = function () {

                $scope.prepareForUpdate();

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('UPDATE_FORMATION_CONFIRMATION');
                $scope.items.objectData = {
                    formationID: $routeParams.id,
                    newAttributes: newAttributes
                };

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        $http.post($rootScope.urlBase + "/formation/updateByID", {
                                id: $scope.selected.objectData.formationID,
                                formationCenter: $rootScope.formationCenter,
                                formationValues: $scope.selected.objectData.newAttributes
                            })
                            .success(function (result) {
                                if (result.status === "ok") {

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('FORMATION_UPDATED'), objeData);
                                    //alert("Formation updated.");
                                } else {
                                    console.log("******* ERROR ********");
                                    console.log(result.info);

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage(result.info, objeData);
                                }

                            })
                            .error(function (err) {
                                console.log("******* ERROR ********");
                                console.log(err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_UPDATING_FORMATION'), objeData);
                            })
                            .finally(function () {
                                $scope.gotoManage();
                            });
                    }

                }, function () {
                    $scope.searchFormation();
                });

            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });

            };

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
            $scope.format = $scope.formats[0];
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

            $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

            $scope.getReadableDate = function (dateParmt) {
                // console.log("DATE PARAMETER ", dateParmt)
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

                return resultDate

            };

            $scope.getReadableDateEx = function (dateParmt) {
                // console.log("DATE PARAMETER ", dateParmt)
                value = new Date(dateParmt);
                resultDate = $scope.weekDay[value.getDay()] + " " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

                return resultDate

            };

            $scope.okAttestation = function () {
                $scope.formation;
                if ($scope.formation.customers.length <= 0) {
                    $scope.items = {};
                    $scope.items.message = $translate.instant('NOT_CUSTOMER')
                    $scope.showModalMessage($scope.items.message, $scope.items)
                }
                else {
                    var docDefinition = {
                        content: [],
                        styles: {
                            firstheader: {
                                fontSize: 20,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            header: {
                                fontSize: 20,
                                bold: true,
                                margin: [0, 0, 0, 10],
                                alignment: 'center'
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 20, 0, 5]
                            },
                            subheaderText: {
                                fontSize: 11,
                                bold: true,
                                margin: [0, 20, 0, 5]
                            },
                            normalText: {
                                fontSize: 14,
                                italic: true,
                                margin: [0, 20, 0, 5]
                            },
                            minText: {
                                fontSize: 12,
                                italic: true,
                                margin: [0, 20, 0, 5]
                            },
                            normalTextOther: {
                                fontSize: 12,
                                italic: true,
                                margin: [0, 20, 0, 5]
                            },
                            itemsTable: {
                                margin: [0, 0, 0, 15]
                            },
                            itemsTableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            },
                            totalsTable: {
                                bold: true,
                                margin: [0, 30, 0, 0]
                            }
                        },
                        defaultStyle: {}
                    }

                    ////Build pdf for  customer

                    var items = $scope.formation.customers.map(function (iplace) {
                        return [iplace.name, iplace.address, iplace.email];
                    });

                    //{ text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader' },
                    //{ text:  $translate.instant('TABLE_PLACE_ADDRESS'), style: 'itemsTableHeader' },
                    //{ text: $translate.instant('TABLE_PLACE_POSTAL_CODE'), style: 'itemsTableHeader' },
                    //{ text:  $translate.instant('TABLE_PLACE_CITY'), style: 'itemsTableHeader' },
                    //{ text: $translate.instant('TABLE_PLACE_AGREMENT'), style: 'itemsTableHeader' },
                    //{ text: $translate.instant('TABLE_PLACE_ACTIVATED'), style: 'itemsTableHeader' },
                    //{ text: $translate.instant('TABLE_PLACE_ACTIONS'), style: 'itemsTableHeader' },
                    //console.log("ITEMS",items )

                    //console.log("Consulta fin " , query);
                    arraySize = $scope.formation.customers.length

                    currentDate = $scope.getReadableDate(new Date())
                    $scope.formation.customers.forEach(function (iCustomer, index) {

                        //  console.log("Initial date",  formation.initialDate()," +++++ ", formation.finalDate() )
                        docDefinition.header = {
                            //columns: [
                            //{ text: $scope.formation.place.address, alignment: 'left',style:'firstheader'},
                            //
                            //]
                        }
// {image:"../../img/logo-bin.png", alignment: 'rigth'}
                        docDefinition.content.push({
                            columns: [
                                {text: $scope.formation.place.address, alignment: 'left', style: 'firstheader'},

                            ]
                        })
                        docDefinition.content.push({
                            text: $translate.instant('TITLE_ATTESTATION_PAGE'),
                            style: 'header'
                        })
                        docDefinition.content.push({
                            text: $translate.instant('ATTESTATION_CAS1_PAGE'),
                            alignment: 'left',
                            style: 'subheaderText'
                        })
                        docDefinition.content.push({
                            text: $translate.instant('ATTESTATION_CAS2_PAGE'),
                            alignment: 'left',
                            style: 'subheaderText'
                        })
                        docDefinition.content.push({
                            text: $translate.instant('ATTESTATION_CAS3_PAGE'),
                            alignment: 'left',
                            style: 'subheaderText'
                        })
                        docDefinition.content.push({
                            text: $translate.instant('ATTESTATION_CAS4_PAGE'),
                            alignment: 'left',
                            style: 'subheaderText'
                        })
                        sigText = $translate.instant('FOOT_SING_ATTESTATION_PAGE') + " "
                        sigTextEnd = ", " + $translate.instant('TEXT_SING_ATTESTATION_PAGE') + " "
                        sigText2 = $translate.instant('N_0') + " " + $scope.formation.place.agreementNumber + ", " + $translate.instant('END_SING_ATTESTATION_PAGE') + " :"
                        docDefinition.content.push({
                            text: [{text: sigText}, {
                                text: $scope.formation.place.agreementName,
                                bold: true
                            }, {text: sigTextEnd}, {text: sigText2}], alignment: 'left', style: 'minText'
                        })

                        //docDefinition.content.push({text: sigText2 ,alignment: 'left', style: 'normalText'})
                        //docDefinition.content.push({text: $translate.instant('ADMIN_PAGE_HEAD'), style: 'header'})
                        //docDefinition.content.push({text: $translate.instant('ADMIN_PAGE_HEAD_DESCRIPTION'), alignment: 'left'})
                        //docDefinition.content.push({ text: '\n\nLists inside columns', style: 'header' })

                        licenceNumber = (iCustomer.driverLicence !== undefined) ? iCustomer.driverLicence.number : ""
                        licenceNumberDate = (iCustomer.driverLicence !== undefined) ? iCustomer.driverLicence.dateOfDeliverance : ""
                        licenceNumberPlace = (iCustomer.driverLicence !== undefined) ? iCustomer.driverLicence.placeOfDeliverance : ""
                        dateValue = $scope.getReadableDate(iCustomer.birthDate);

                        console.log("Show data ", docDefinition.content)
                        position = 7 * (index + 1)

                        columns = [
                            {
                                ul: [
                                    {
                                        text: [{text: $translate.instant('NAME_ATTESTATION_PAGE') + ": "}, {
                                            text: iCustomer.name,
                                            bold: true
                                        }]
                                    },
                                    {
                                        text: [{text: $translate.instant('BIRTHDATE_ATTESTATION_PAGE') + ": "}, {
                                            text: dateValue,
                                            bold: true
                                        }]
                                    },
                                    {
                                        text: [{text: $translate.instant('ADDRESS_ATTESTATION_PAGE') + ": "}, {
                                            text: iCustomer.address,
                                            bold: true
                                        }]
                                    },
                                    {
                                        text: [{text: $translate.instant('ZIPCODE_ATTESTATION_PAGE') + ": "}, {
                                            text: String(iCustomer.zipCode),
                                            bold: true
                                        }]
                                    },

                                ]
                            },
                            {
                                ul: [
                                    {
                                        text: [{text: $translate.instant('FIRSTNAME_ATTESTATION_PAGE') + ": "}, {
                                            text: iCustomer.firstName,
                                            bold: true
                                        }]
                                    },
                                    {
                                        text: [{text: $translate.instant('BIRTHCITY_ATTESTATION_PAGE') + ": "}, {
                                            text: iCustomer.birthCity,
                                            bold: true
                                        }]
                                    },
                                    {
                                        text: [{text: $translate.instant('LIVEADDRESS_ATTESTATION_PAGE') + ": "}, {
                                            text: iCustomer.city,
                                            bold: true
                                        }]
                                    },


                                ]
                            }
                        ]

                        if (licenceNumber !== undefined) {
                            columns[0].ul.push($translate.instant('NOLICENCE_ATTESTATION_PAGE') + ": " + String(licenceNumber))
                        }

                        if (licenceNumberDate !== undefined) {
                            columns[0].ul.push($translate.instant('NOLICENCEDATE_ATTESTATION_PAGE') + ": " + $scope.getReadableDate(new Date(licenceNumberDate)))
                        }

                        if (licenceNumberPlace !== undefined) {
                            columns[1].ul.push($translate.instant('NOLICENCEPLACE_ATTESTATION_PAGE') + ": " + licenceNumberPlace)

                        }
                        value = {}
                        value.columns = columns
                        docDefinition.content.push(value)


                        docDefinition.content.push({
                            text: $translate.instant('DATE_CONFIRMATION_ATTESTATION_PAGE') + " :",
                            style: 'normalTextOther'
                        })


                        ////Set formatio dates

                        //data = [iCustomer.name, iCustomer.address, iCustomer.email]
                        //tableObject = {
                        //    style: 'itemsTable',
                        //    table: {
                        //        widths: ['*', 'auto', 'auto'],
                        //        body: [
                        //            [
                        //                {text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader'},
                        //                {text: $translate.instant('TABLE_PLACE_ADDRESS'), style: 'itemsTableHeader'},
                        //                {text: $translate.instant('TABLE_PLACE_CITY'), style: 'itemsTableHeader'}
                        //
                        //
                        //            ]
                        //        ].concat([data])
                        //    },
                        //
                        //    layout: 'noBorders'
                        //}
                        ////
                        //////Validate page break
                        //if ((arraySize - 1) > index)
                        //    tableObject.pageBreak='after'

                        //docDefinition.content.push({text: " ", style: 'subheader'})

                        dateList = ""
                        counter = 0
                        $scope.formation.dates.forEach(function (iDate, index) {
                            if (index > 0)
                                dateList += " " + $translate.instant('CONJUNCTION') + " "
                            dateList += $scope.getReadableDateEx(iDate.date)
                        })

                        docDefinition.content.push({
                            text: dateList,
                            style: 'normalTextOther'
                        })


                        docDefinition.content.push({
                            text: $translate.instant('DATE_ARTICLE') + " :" + currentDate,
                            style: 'normalTextOther'
                        })

                        ///Get Animators
                        //BAFM/BAFCRI:
                        //Psychologue
                        animatorOne = ["", "", ""]
                        animatorTouw = ["", "", ""]
                        console.log("Animators ", $scope.formation.animators)

                        if ($scope.formation.animators.length > 0) {
                            $scope.formation.animators.forEach(function (iAnimator, index) {
                                nType = ""
                                if (iAnimator.type == "BAFM") {
                                    nType = "BAFM/BAFCRI"
                                }
                                else if (iAnimator.type == "PSY") {
                                    nType = "Psychologue"
                                }


                                if (index == 0) {

                                    animatorOne[1] = {
                                        text: nType + " " + iAnimator.name + " " + iAnimator.firstName,
                                        alignment: 'rigth'
                                    }
                                }

                                if (index == 1) {

                                    animatorTouw[1] = {
                                        text: nType + " " + iAnimator.name + " " + iAnimator.firstName,
                                        alignment: 'rigth'
                                    }
                                }


                            })
                        }

                        data = [$translate.instant('SING_CACHET'), $translate.instant('SINGS'), $translate.instant('SING')]
                        tableObject = {
                            style: 'itemsTable',
                            table: {
                                widths: [200, 200, 200],
                                body: [
                                    [
                                        {
                                            text: $translate.instant('CENTER_DIRECTOR_ATTESTATION_PAGE'),
                                            style: 'itemsTableHeader'
                                        },
                                        {
                                            text: $translate.instant('WORKERS_ATTESTATION_PAGE'),
                                            style: 'itemsTableHeader'
                                        },
                                        {
                                            text: $translate.instant('CUSTOMERS_ATTESTATION_PAGE'),
                                            style: 'itemsTableHeader'
                                        }


                                    ]
                                ].concat([data]).concat([animatorOne]).concat([animatorTouw])
                            },

                            layout: 'noBorders'
                        }
                        //
                        ////Validate page break
                        if ((arraySize - 1) > index)
                            tableObject.pageBreak = 'after'

                        docDefinition.content.push(tableObject)

                        //console.log("Create estructure")
                    });
                    // console.log("Continue function", docDefinition.content)
                    //var docDefinition = {
                    //    content: [
                    //        {text: $translate.instant('ADMIN_PAGE_HEAD'), style: 'header'},
                    //        {text: $translate.instant('ADMIN_PAGE_HEAD_DESCRIPTION'), alignment: 'left'},
                    //        { text: '\n\nLists inside columns', style: 'header' },
                    //        {
                    //            columns: [
                    //                {
                    //                    ul: [
                    //                        'item 1',
                    //                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    //                    ]
                    //                },
                    //                {
                    //                    ul: [
                    //                        'item 1',
                    //                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    //                    ]
                    //                }
                    //            ]
                    //        },
                    //
                    //        {text: 'Data', style: 'subheader'},
                    //        {
                    //            style: 'itemsTable',
                    //            table: {
                    //                widths: ['*', 'auto', 'auto'],
                    //                body: [
                    //                    [
                    //                        {text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader'},
                    //                        {text: $translate.instant('TABLE_PLACE_ADDRESS'), style: 'itemsTableHeader'},
                    //                        {text: $translate.instant('TABLE_PLACE_CITY'), style: 'itemsTableHeader'}
                    //
                    //
                    //                    ]
                    //                ].concat(items)
                    //            },
                    //            pageBreak: 'after',
                    //            layout: 'noBorders'
                    //        }
                    //
                    //    ],
                    //    styles: {
                    //        header: {
                    //            fontSize: 20,
                    //            bold: true,
                    //            margin: [0, 0, 0, 10],
                    //            alignment: 'center'
                    //        },
                    //        subheader: {
                    //            fontSize: 16,
                    //            bold: true,
                    //            margin: [0, 20, 0, 5]
                    //        },
                    //        itemsTable: {
                    //            margin: [0, 0, 0, 8]
                    //        },
                    //        itemsTableHeader: {
                    //            bold: true,
                    //            fontSize: 13,
                    //            color: 'black'
                    //        },
                    //        totalsTable: {
                    //            bold: true,
                    //            margin: [0, 30, 0, 0]
                    //        }
                    //    },
                    //    defaultStyle: {}
                    //};

                    pdfMake.createPdf(docDefinition).open()
                }
            }
            $scope.printWaitingRoomCustomersList = function (callback) {

                $http.post($rootScope.urlBase + "/FormationCenter/getWaitingRoomCustomerListByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.WaitingRoomCustomersList = result.data;
                            callback(null, null)


                        } else {
                            var objeData = {type: $translate.instant('ERROR')};
                            //$scope.showModalMessage(result.info, objeData);
                            callback(null, null)
                        }
                    })
                    .error(function (err) {
                        var objeData = {type: $translate.instant('ERROR')};
                        //$scope.showModalMessage($translate.instant('ERROR_PRINTING_WAITING_ROOM'), objeData);
                        callback(null, null)
                    })


            };


            $scope.okPrintList = function () {
                $scope.formation;
                if ($scope.formation.customers.length <= 0) {
                    $scope.items = {};
                    $scope.items.message = $translate.instant('NOT_CUSTOMER')
                    $scope.showModalMessage($scope.items.message, $scope.items)
                }
                else {
                    var docDefinition = {
                        content: [],
                        styles: {
                            firstheader: {
                                fontSize: 20,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            header: {
                                fontSize: 20,
                                bold: true,
                                margin: [0, 0, 0, 10],
                                alignment: 'center'
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 20, 0, 5]
                            },
                            subheaderText: {
                                fontSize: 11,
                                bold: true,
                                margin: [0, 20, 0, 5]
                            },
                            normalText: {
                                fontSize: 14,
                                italic: true,
                                margin: [0, 20, 0, 5]
                            },
                            normalTextOther: {
                                fontSize: 12,
                                italic: true,
                                margin: [0, 20, 0, 5]
                            },
                            itemsTable: {
                                margin: [0, 0, 0, 15]
                            },
                            itemsTableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            },
                            totalsTable: {
                                bold: true,
                                margin: [0, 30, 0, 0]
                            }
                        },
                        defaultStyle: {}
                    }

                    dateList = ""
                    counter = 0
                    $scope.formation.dates.forEach(function (iDate, index) {
                        if (index > 0)
                            dateList += " " + $translate.instant('CONJUNCTION') + " "
                        dateList += $scope.getReadableDateEx(iDate.date)
                    })


                    docDefinition.content.push(
                        {text: [{text: "Dates :", style: 'normalText'}, {text: dateList}]}
                    )
                    docDefinition.content.push(
                        {
                            text: [{text: $translate.instant('ADDRESS_ATTESTATION_PAGE') + ": "}, {
                                text: $scope.formation.place.address,
                                bold: true
                            }]
                        })
                    valueItems = $translate.instant('PREINSCRIT')
                    var items = $scope.formation.customers.map(function (iplace) {
                        return [iplace.name, iplace.firstName, iplace.phoneNumber, "FORMATIONFINDER", String($scope.formation.price), valueItems];
                    });

                    ////Search waiting room users
                    $scope.printWaitingRoomCustomersList(function (err, resultData) {

                        var itemsWaiting = $scope.WaitingRoomCustomersList.map(function (iplace) {
                            return [iplace.name, iplace.firstName, iplace.phoneNumber, "WAITING ROOM", "-", $translate.instant('PREINSCRIT')];
                        });
                        docDefinition.content.push({
                            text: " Liste des stagiaires inscrits et pré­inscrits :",
                            style: 'normalTextOther'
                        })

                        tableObject = {
                            style: 'itemsTable',
                            table: {
                                widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [
                                    [
                                        {text: $translate.instant('TABLE_PLACE_NAME'), style: 'itemsTableHeader'},
                                        {
                                            text: $translate.instant('FIRSTNAME_ATTESTATION_PAGE'),
                                            style: 'itemsTableHeader'
                                        },
                                        {text: $translate.instant('TABLE_PLACE_PHONE'), style: 'itemsTableHeader'},
                                        {text: $translate.instant('TABLE_PLACE_INSCRIT'), style: 'itemsTableHeader'},
                                        {text: $translate.instant('TABLE_PLACE_PRINCE'), style: 'itemsTableHeader'},
                                        {text: $translate.instant('TABLE_PLACE_STATUS'), style: 'itemsTableHeader'},


                                    ]
                                ].concat(items)
                            },


                        }


                        if (itemsWaiting.length > 0) {
                            tableObject.table.body.concat(itemsWaiting)
                        }
                        //
                        ////Validate page break


                        docDefinition.content.push(tableObject)
                        pdfMake.createPdf(docDefinition).open()

                    })
                }
            }

            $scope.okShieldAtestation = function () {
                if ($scope.formation.customers.length <= 0) {
                    $scope.items = {};
                    $scope.items.message = $translate.instant('NOT_CUSTOMER')
                    $scope.showModalMessage($scope.items.message, $scope.items)
                }
                else {

                    //var docDefinition = {
                    //    content: [
                    //        { text: 'Tables', style: 'header' },
                    //        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
                    //        { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
                    //        'The following table has nothing more than a body array',
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                body: [
                    //                    ['Column 1', 'Column 2', 'Column 3'],
                    //                    ['One value goes here', 'Another one here', 'OK?']
                    //                ]
                    //            }
                    //        },
                    //        { text: 'A simple table with nested elements', style: 'subheader' },
                    //        'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                body: [
                    //                    ['Column 1', 'Column 2', 'Column 3'],
                    //                    [
                    //                        {
                    //                            stack: [
                    //                                'Let\'s try an unordered list',
                    //                                {
                    //                                    ul: [
                    //                                        'item 1',
                    //                                        'item 2'
                    //                                    ]
                    //                                }
                    //                            ]
                    //                        },
                    //                        /* a nested table will appear here as soon as I fix a bug */
                    //                        [
                    //                            'or a nested table',
                    //                            {
                    //                                table: {
                    //                                    body: [
                    //                                        [ 'Col1', 'Col2', 'Col3'],
                    //                                        [ '1', '2', '3'],
                    //                                        [ '1', '2', '3']
                    //                                    ]
                    //                                },
                    //                            }
                    //                        ],
                    //                        { text: [
                    //                            'Inlines can be ',
                    //                            { text: 'styled\n', italics: true },
                    //                            { text: 'easily as everywhere else', fontSize: 10 } ]
                    //                        }
                    //                    ]
                    //                ]
                    //            }
                    //        },
                    //        { text: 'Defining column widths', style: 'subheader' },
                    //        'Tables support the same width definitions as standard columns:',
                    //        {
                    //            bold: true,
                    //            ul: [
                    //                'auto',
                    //                'star',
                    //                'fixed value'
                    //            ]
                    //        },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                widths: [100, '*', 200, '*'],
                    //                body: [
                    //                    [ 'width=100', 'star-sized', 'width=200', 'star-sized'],
                    //                    [ 'fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
                    //                ]
                    //            }
                    //        },
                    //        { text: 'Headers', style: 'subheader' },
                    //        'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
                    //        { text: [ 'It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here' ], color: 'gray', italics: true },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                headerRows: 1,
                    //                // dontBreakRows: true,
                    //                // keepWithHeaderRows: 1,
                    //                body: [
                    //                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
                    //                    [
                    //                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    //                    ]
                    //                ]
                    //            }
                    //        },
                    //        { text: 'Column/row spans', style: 'subheader' },
                    //        'Each cell-element can set a rowSpan or colSpan',
                    //        {
                    //            style: 'tableExample',
                    //            color: '#444',
                    //            table: {
                    //                widths: [ 200, 'auto', 'auto' ],
                    //                headerRows: 2,
                    //                // keepWithHeaderRows: 1,
                    //                body: [
                    //                    [{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
                    //                    [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ { rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3' ],
                    //                    [ '', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, '' ],
                    //                    [ 'Sample value 1', '', '' ],
                    //                ]
                    //            }
                    //        },
                    //        { text: 'Styling tables', style: 'subheader' },
                    //        'You can provide a custom styler for the table. Currently it supports:',
                    //        {
                    //            ul: [
                    //                'line widths',
                    //                'line colors',
                    //                'cell paddings',
                    //            ]
                    //        },
                    //        'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
                    //        { text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                headerRows: 1,
                    //                body: [
                    //                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                ]
                    //            },
                    //            layout: 'noBorders'
                    //        },
                    //        { text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                headerRows: 1,
                    //                body: [
                    //                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                ]
                    //            },
                    //            layout: 'headerLineOnly'
                    //        },
                    //        { text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                headerRows: 1,
                    //                body: [
                    //                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                ]
                    //            },
                    //            layout: 'lightHorizontalLines'
                    //        },
                    //        { text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
                    //        {
                    //            style: 'tableExample',
                    //            table: {
                    //                headerRows: 1,
                    //                body: [
                    //                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                    [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                    //                ]
                    //            },
                    //            layout: {
                    //                hLineWidth: function(i, node) {
                    //                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    //                },
                    //                vLineWidth: function(i, node) {
                    //                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    //                },
                    //                hLineColor: function(i, node) {
                    //                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    //                },
                    //                vLineColor: function(i, node) {
                    //                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    //                },
                    //                // paddingLeft: function(i, node) { return 4; },
                    //                // paddingRight: function(i, node) { return 4; },
                    //                // paddingTop: function(i, node) { return 2; },
                    //                // paddingBottom: function(i, node) { return 2; }
                    //            }
                    //        }
                    //    ],
                    //    styles: {
                    //        header: {
                    //            fontSize: 18,
                    //            bold: true,
                    //            margin: [0, 0, 0, 10]
                    //        },
                    //        subheader: {
                    //            fontSize: 16,
                    //            bold: true,
                    //            margin: [0, 10, 0, 5]
                    //        },
                    //        tableExample: {
                    //            margin: [0, 5, 0, 15]
                    //        },
                    //        tableHeader: {
                    //            bold: true,
                    //            fontSize: 13,
                    //            color: 'black'
                    //        }
                    //    },
                    //    defaultStyle: {
                    //        // alignment: 'justify'
                    //    }
                    //};


                    //dates: [{
                    //    date: faker.date.past([], new Date("12/12/2015")),
                    //    morning: {
                    //        hourStart: "07:00",
                    //        hourEnd: "12:00"
                    //    },
                    //    afternoon: {
                    //        hourStart: "04:00",
                    //        hourEnd: "06:00"
                    //    }
                    //}, {
                    //    date: faker.date.future(),
                    //    morning: {
                    //        hourStart: "08:00",
                    //        hourEnd: "12:00"
                    //    },
                    //    afternoon: {
                    //        hourStart: "03:00",
                    //        hourEnd: "06:00"
                    //    }
                    //}],

                    dateList = ""
                    counter = 0
                    $scope.formation.dates.forEach(function (iDate, index) {
                        if (index > 0)
                            dateList += " " + $translate.instant('CONJUNCTION') + " "
                        dateList += $scope.getReadableDateEx(iDate.date)
                    })


                    currentDate = $scope.getReadableDate(new Date())

                    sigText2 = ", " + $translate.instant('TITULAIRE') + " " + $scope.formation.place.agreementNumber
                    //docDefinition.content.push({
                    //    text: [{text: ""}, {
                    //        text: $scope.formation.place.agreementName,
                    //        bold: true
                    //    },  {text: sigText2}], alignment: 'left', style: 'normalText'
                    //})
                    var items = $scope.formation.customers.map(function (iplace) {
                        return [iplace.name + " " + iplace.firstName, "", "", "", "", ""];
                    });

                    var docDefinition = {
                        content: [
                            {
                                style: 'tableExample',
                                color: '#445',
                                table: {
                                    widths: [200, 200, 100],
                                    body: [
                                        [
                                            {text: ''}
                                            ,
                                            {text: $translate.instant('EMARGEMENT_TITLE'), bold: true},
                                            {text: $scope.formation.place.address, fontSize: 10, bold: true}
                                        ]
                                    ].concat([[{text: ''}
                                            ,
                                            {text: ''}
                                            ,
                                            {text: $translate.instant('DATE_ARTICLE') + "", fontSize: 10, bold: true}
                                        ]])
                                        .concat([[{text: ''}
                                            ,
                                            {text: ''}
                                            ,
                                            {text: currentDate, fontSize: 10, bold: true}
                                        ]])
                                },
                                layout: "noBorders"
                            },
                            {
                                columns: [
                                    {
                                        text: dateList, fontSize: 10, bold: true
                                    },
                                    {
                                        text: [{text: ""}, {
                                            text: $scope.formation.place.agreementName,
                                            bold: true
                                        }, {text: sigText2}]
                                    }
                                ]
                            },

                            {
                                style: 'tableExample',
                                color: '#222',
                                widths: [100, 'auto', 200, 200, 200, 200],
                                table: {
                                    headerRows: 2,
                                    body: [
                                        [{
                                            rowSpan: 2,
                                            text: $translate.instant('NAMEDATA'),
                                            alignment: 'center',
                                            bold: true
                                        }, {rowSpan: 2, text: 'Cas'}, {
                                            text: $translate.instant('DAY1'),
                                            style: 'tableHeader',
                                            colSpan: 2,
                                            alignment: 'center'
                                        }, {}, {
                                            text: $translate.instant('DAY2'),
                                            style: 'tableHeader',
                                            colSpan: 2,
                                            alignment: 'center'
                                        }, {}],
                                        ['Column 1', 'Column 2', $translate.instant('MORNING'), $translate.instant('AFTERNOON'), $translate.instant('MORNING'), $translate.instant('AFTERNOON')],

                                    ].concat(items)
                                },
                            },
                            //{ text: 'A simple table with nested elements', style: 'subheader' },
                            //'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        body: [
                            //            ['Column 1', 'Column 2', 'Column 3'],
                            //            [
                            //                {
                            //                    stack: [
                            //                        'Let\'s try an unordered list',
                            //                        {
                            //                            ul: [
                            //                                'item 1',
                            //                                'item 2'
                            //                            ]
                            //                        }
                            //                    ]
                            //                },
                            //                /* a nested table will appear here as soon as I fix a bug */
                            //                [
                            //                    'or a nested table',
                            //                    {
                            //                        table: {
                            //                            body: [
                            //                                [ 'Col1', 'Col2', 'Col3'],
                            //                                [ '1', '2', '3'],
                            //                                [ '1', '2', '3']
                            //                            ]
                            //                        },
                            //                    }
                            //                ],
                            //                { text: [
                            //                    'Inlines can be ',
                            //                    { text: 'styled\n', italics: true },
                            //                    { text: 'easily as everywhere else', fontSize: 10 } ]
                            //                }
                            //            ]
                            //        ]
                            //    }
                            //},
                            //{ text: 'Defining column widths', style: 'subheader' },
                            //'Tables support the same width definitions as standard columns:',
                            //{
                            //    bold: true,
                            //    ul: [
                            //        'auto',
                            //        'star',
                            //        'fixed value'
                            //    ]
                            //},
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        widths: [100, '*', 200, '*'],
                            //        body: [
                            //            [ 'width=100', 'star-sized', 'width=200', 'star-sized'],
                            //            [ 'fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
                            //        ]
                            //    }
                            //},
                            //{ text: 'Headers', style: 'subheader' },
                            //'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
                            //{ text: [ 'It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here' ], color: 'gray', italics: true },
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        headerRows: 1,
                            //        // dontBreakRows: true,
                            //        // keepWithHeaderRows: 1,
                            //        body: [
                            //            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
                            //            [
                            //                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            //            ]
                            //        ]
                            //    }
                            //},
                            //{ text: 'Column/row spans', style: 'subheader' },
                            //'Each cell-element can set a rowSpan or colSpan',
                            //{
                            //    style: 'tableExample',
                            //    color: '#444',
                            //    table: {
                            //        widths: [ 200, 'auto', 'auto' ],
                            //        headerRows: 2,
                            //        // keepWithHeaderRows: 1,
                            //        body: [
                            //            [{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
                            //            [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ { rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3' ],
                            //            [ '', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, '' ],
                            //            [ 'Sample value 1', '', '' ],
                            //        ]
                            //    }
                            //},
                            //{ text: 'Styling tables', style: 'subheader' },
                            //'You can provide a custom styler for the table. Currently it supports:',
                            //{
                            //    ul: [
                            //        'line widths',
                            //        'line colors',
                            //        'cell paddings',
                            //    ]
                            //},
                            //'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
                            //{ text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        headerRows: 1,
                            //        body: [
                            //            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //        ]
                            //    },
                            //    layout: 'noBorders'
                            //},
                            //{ text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        headerRows: 1,
                            //        body: [
                            //            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //        ]
                            //    },
                            //    layout: 'headerLineOnly'
                            //},
                            //{ text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        headerRows: 1,
                            //        body: [
                            //            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //        ]
                            //    },
                            //    layout: 'lightHorizontalLines'
                            //},
                            //{ text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
                            //{
                            //    style: 'tableExample',
                            //    table: {
                            //        headerRows: 1,
                            //        body: [
                            //            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //            [ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
                            //        ]
                            //    },
                            //    layout: {
                            //        hLineWidth: function(i, node) {
                            //            return (i === 0 || i === node.table.body.length) ? 2 : 1;
                            //        },
                            //        vLineWidth: function(i, node) {
                            //            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                            //        },
                            //        hLineColor: function(i, node) {
                            //            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                            //        },
                            //        vLineColor: function(i, node) {
                            //            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                            //        },
                            //        // paddingLeft: function(i, node) { return 4; },
                            //        // paddingRight: function(i, node) { return 4; },
                            //        // paddingTop: function(i, node) { return 2; },
                            //        // paddingBottom: function(i, node) { return 2; }
                            //    }
                            //}
                            //['Pepe de Jose', '-', '-', '-', '-', '-'],
                            // ['Marcos Antonio de Jose', '2', '', '', '', '']
                        ],
                        styles: {
                            header: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 10, 0, 5]
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15]
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            }
                        },
                        defaultStyle: {
                            // alignment: 'justify'
                        }
                    };

                    pdfMake.createPdf(docDefinition).open()
                }
            }

            $scope.okContacterUser = function () {
                $scope.formation;
                if ($scope.formation.customers.length <= 0) {
                    $scope.items = {};
                    $scope.items.message = $translate.instant('NOT_CUSTOMER')
                    $scope.showModalMessage($scope.items.message, $scope.items)
                }
                else {
                    $scope.items = {};
                    $scope.items.message = $translate.instant('SEND_MAIL_CONTACT')

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'ModalSendEmailMessage.html',
                        controller: 'ModalInstanceCtrl',
                        //controller: 'ModalInstanceCtrlMail',
                        size: "",
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {

                        console.log("Object for send messajes", selectedItem)

                        config = {}
                        config.id = $routeParams.id
                        config.mailuser = $routeParams.mailuser
                        config.from = $routeParams.mailsender
                        config.subject = $routeParams.mailsubject
                        config.text = $routeParams.messagebody

                        $http.post($rootScope.urlBase + "/formation/sendMailToCustomer", config)
                            .success(function (result) {
                                if (result.status === "ok") {
                                    $scope.formation = result.message;
                                    console.log("Formation data", result.message)

                                } else {
                                    console.log("Error searching Formation: ", result.message);

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage($translate.instant('ERROR_SEND_MAIL') + ": " + result.message, objeData);
                                    //alert("Error searching Formation: " + result.info);
                                }
                            })
                            .error(function (err) {
                                console.log("Error searching Formation: ", err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_SEND_MAIL') + ": " + err, objeData);

                                //alert("Error searching Formation: " + err);
                            });

                    }, function () {
                        //console.log("Object for send messajes", selectedItem)
                    });
                }
            }

            $scope.okViewUsers = function () {

                $scope.formation;

                $location.path("/formation/listclient/" + $scope.formation.id);
            }

        }])
    .controller("UsersFormationController", ["$scope", "$routeParams", "$rootScope", "$location", "$http", "$uibModal", "$translate",
        function ($scope, $routeParams, $rootScope, $location, $http, $uibModal, $translate) {
            $scope.advanceSearch = true
            $scope.numExpReg = /^[\d]+$/;
            $scope.dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
            $scope.maxDate = new Date(2080, 0, 1);

            $scope.Hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

            $scope.Minutes = [];
            for (var i = 0; i < 60; i++) {
                if (i < 10) {
                    $scope.Minutes.push("0" + i.toString());
                } else {
                    $scope.Minutes.push(i.toString());
                }
            }

            var initParameters = function () {
                $scope.formation = null;
                $scope.oldFormationValues = null;

                $scope.fDate = {};
                $scope.fDate.date = null;

                $scope.MorningStartH = null;
                $scope.MorningStartM = null;
                $scope.MorningEndH = null;
                $scope.MorningEndM = null;
                $scope.AfternoonStartH = null;
                $scope.AfternoonStartM = null;
                $scope.AfternoonEndH = null;
                $scope.AfternoonEndM = null;

                $scope.InvalidDateParameters = false;

                $scope.InvalidMorningTimeRange = false;
                $scope.InvalidAfternoonTimeRange = false;

                $scope.dateOutOfRange = false;

                $scope.showUpdateDate = false;

                $scope.indexDate = null;

                $scope.selectedPlace = {};
                $scope.selectedPSY = {};
                $scope.selectedBAFM = {};

            };
            initParameters();


            $scope.searchFormationUser = function () {

                console.log("Search information data")
                $http.post($rootScope.urlBase + "/formation/searchUsersByFormation", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.userlist = result.data;
                            console.log("Result information view ", $scope.userlist)
                            $scope.formationid = $routeParams.id
                            // $scope.selectedPlace = $scope.formation.place;


                        } else {
                            console.log("Error searching Formation: ", result.info);

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                            //alert("Error searching Formation: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation: ", err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);

                    });
            };
            $scope.searchFormationUser();

            var copyToOldFormation = function () {
                $scope.oldFormationValues = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.formation.place,
                };
            };

            $scope.selectDateForUpdate = function (index) {

                $scope.indexDate = index;

                $scope.fDate.date = $scope.formation.dates[index].date;

                $scope.MorningStartH = $scope.formation.dates[index].morning.hourStart.substr(0, 2);
                $scope.MorningStartM = $scope.formation.dates[index].morning.hourStart.substr(3, 2);
                $scope.MorningEndH = $scope.formation.dates[index].morning.hourEnd.substr(0, 2);
                $scope.MorningEndM = $scope.formation.dates[index].morning.hourEnd.substr(3, 2);

                $scope.AfternoonStartH = $scope.formation.dates[index].afternoon.hourStart.substr(0, 2);
                $scope.AfternoonStartM = $scope.formation.dates[index].afternoon.hourStart.substr(3, 2);
                $scope.AfternoonEndH = $scope.formation.dates[index].afternoon.hourEnd.substr(0, 2);
                $scope.AfternoonEndM = $scope.formation.dates[index].afternoon.hourEnd.substr(3, 2);

                $scope.showUpdateDate = true;
            };

            var prepareForInsert = function () {
                $scope.fDate = {};
                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);

                $scope.MorningStartH = "09";
                $scope.MorningStartM = "00";
                $scope.MorningEndH = "11";
                $scope.MorningEndM = "00";
                $scope.AfternoonStartH = "02";
                $scope.AfternoonStartM = "00";
                $scope.AfternoonEndH = "04";
                $scope.AfternoonEndM = "00";
            };

            $scope.insertDate = function () {

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

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        $scope.formation.dates.splice(i, 1, {
                            date: $scope.fDate.date,
                            morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                            afternoon: {
                                hourStart: $scope.fDate.afternoon.hourStart,
                                hourEnd: $scope.fDate.afternoon.hourEnd
                            }
                        });

                        $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                        $scope.InvalidDateParameters = false;

                        return;
                    }
                }

                $scope.formation.dates.push({
                    date: $scope.fDate.date,
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd}
                });

                $scope.fDate.date = new Date().setHours(0, 0, 0, 0);
                $scope.InvalidDateParameters = false;

                $scope.formation.dates.sort(compareFormationDates);
            };

            $scope.insert_or_update = function () {
                if ($scope.indexDate !== null) {
                    $scope.updateDate();
                } else {
                    $scope.insertDate();
                }
            };

            $scope.updateDate = function () {

                //Create the Formation Date Object.
                $scope.fDate.morning = {
                    hourStart: $scope.MorningStartH + ":" + $scope.MorningStartM,
                    hourEnd: $scope.MorningEndH + ":" + $scope.MorningEndM
                };

                $scope.fDate.afternoon = {
                    hourStart: $scope.AfternoonStartH + ":" + $scope.AfternoonStartM,
                    hourEnd: $scope.AfternoonEndH + ":" + $scope.AfternoonEndM
                };

                //Replace in the array the element in the index position.
                $scope.formation.dates.splice($scope.indexDate, 1, {
                    date: new Date($scope.fDate.date).setHours(0, 0, 0, 0),
                    morning: {hourStart: $scope.fDate.morning.hourStart, hourEnd: $scope.fDate.morning.hourEnd},
                    afternoon: {
                        hourStart: $scope.fDate.afternoon.hourStart, hourEnd: $scope.fDate.afternoon.hourEnd
                    }
                });

                //Now check if the new date is the same that other Formation date object
                //If true, then eliminate that element.
                var lgth = $scope.formation.dates.length;
                for (var i = 0; i < lgth; i++) {

                    //Do not compare with my self.
                    if (i == $scope.indexDate) {
                        console.log("entre al if the i == $scope.indexDate: ", i);
                        continue;
                    }

                    if ($scope.formation.dates[i].date === $scope.fDate.date) {
                        console.log("Entre al if de la comparacion de fechas: ", i);
                        $scope.formation.dates.splice(i, 1);
                        break;
                    }

                }


                $scope.InvalidDateParameters = false;

                $scope.showUpdateDate = false;
                $scope.indexDate = null;

                $scope.formation.dates.sort(compareFormationDates);

            };

            $scope.validDate = function (vDate) {
                var tempDate = new Date().setHours(0, 0, 0, 0);

                if (tempDate <= vDate && vDate <= $scope.maxDate) {
                    $scope.dateOutOfRange = false;
                    return true;
                }

                $scope.dateOutOfRange = true;
                return false;
            };

            $scope.validateDateParameters = function () {

                if (!$scope.fDate.date) {
                    $scope.InvalidDateParameters = true;
                    return;
                }

                //convert to timestamp and set the 00:00 Hour.
                $scope.fDate.date = new Date($scope.fDate.date).setHours(0, 0, 0, 0);

                if ($scope.validDate($scope.fDate.date)
                ) {
                    $scope.InvalidDateParameters = false;
                } else {
                    $scope.InvalidDateParameters = true;
                }
            };

            $scope.validateTimeRangeParameters = function () {
                if (checkMorningTimeRange()) {
                    $scope.InvalidMorningTimeRange = false;
                } else {
                    $scope.InvalidMorningTimeRange = true;
                }

                if (checkAfternoonTimeRange()) {
                    $scope.InvalidAfternoonTimeRange = false;
                } else {
                    $scope.InvalidAfternoonTimeRange = true;
                }
            };

            var checkMorningTimeRange = function () {

                var tempHour = parseInt($scope.MorningStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningStart = new Date().setHours(tempHour, parseInt($scope.MorningStartM));

                tempHour = parseInt($scope.MorningEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var morningEnd = new Date().setHours(tempHour, parseInt($scope.MorningEndM));


                return (morningStart < morningEnd);
            };
            var checkAfternoonTimeRange = function () {

                var tempHour = parseInt($scope.AfternoonStartH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonStart = new Date().setHours(tempHour, parseInt($scope.AfternoonStartM));

                tempHour = parseInt($scope.AfternoonEndH);
                if (tempHour === 12) {
                    tempHour = 0;
                }

                var afternoonEnd = new Date().setHours(tempHour, parseInt($scope.AfternoonEndM));

                return (afternoonStart < afternoonEnd);
            };

            $scope.toggle = function () {
                $scope.showUpdateDate = !$scope.showUpdateDate;

                if ($scope.showUpdateDate) {
                    prepareForInsert();
                } else {
                    $scope.index = null;
                }
            };

            $scope.places = [];
            $scope.searchPlaces = function () {

                $http.post($rootScope.urlBase + "/place/searchByFormationCenter", {
                        formationCenter: $rootScope.formationCenter
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.places = result.data;
                        } else {

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);
                            //alert("An error has ocurred searching Places.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Places.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_PLACES'), objeData);

                        //alert("An error has ocurred searching Places.");
                    });

            };
            $scope.searchPlaces();

            $scope.mostrar = function () {
                console.log("El valor del selected place es: ", $scope.selectedPlace);
            };

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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                            //alert("An error has ocurred searching Animators PSY.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators PSY.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_PSY'), objeData);
                        //alert("An error has ocurred searching Animators PSY.");
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

                            objeData = {type: $translate.instant('ERROR')};
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                            // alert("An error has ocurred searching Animators BAFM.");
                        }
                    })
                    .error(function (err) {
                        console.log("An error has ocurred searching Animators BAFM.");
                        console.log(err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_ANIMATORS_BAFM'), objeData);
                        //alert("An error has ocurred searching Animators BAFM.");
                    });
            };
            $scope.searchBAFM();
            $scope.selectedBAFM = null;

            var newAttributes = null;

            $scope.prepareForUpdate = function () {

                //Prepare the new Formation attributes for update.
                newAttributes = {
                    maxPeople: $scope.formation.maxPeople,
                    price: $scope.formation.price,
                    isConfirmed: $scope.formation.isConfirmed,
                    place: $scope.selectedPlace.id
                };

                newAttributes.animators = [];
                newAttributes.animators.push($scope.selectedBAFM.id);
                newAttributes.animators.push($scope.selectedPSY.id);

                newAttributes.dates = [];

                var len = $scope.formation.dates.length;

                for (var i = 0; i < len; i++) {
                    newAttributes.dates.push($scope.formation.dates[i]);
                }
            };

            var compareFormationDates = function (date1, date2) {
                if (date1.date < date2.date)
                    return -1;

                if (date1.date == date2.date)
                    return 0;

                if (date1.date > date2.date)
                    return 1;
            };

            $scope.updateFormation = function () {
                $scope.showUpdateConfirmModal();
            };

            $scope.gotoManage = function () {
                $location.path('/formation/admin');
            };

            $scope.deleteDate = function (index) {
                if ($scope.formation.dates[index]) {
                    $scope.formation.dates.splice(index, 1);
                }
            };

            $scope.showUpdateConfirmModal = function () {

                $scope.prepareForUpdate();

                $scope.items.messageType = $translate.instant('CONFIRMATION');
                $scope.items.message = $translate.instant('UPDATE_FORMATION_CONFIRMATION');
                $scope.items.objectData = {
                    formationID: $routeParams.id,
                    newAttributes: newAttributes
                };

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ModalConfirmMessage.html',
                    controller: 'ModalConfirmCtrl',
                    size: "",
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.selected = selectedItem;

                    if (typeof $scope.selected !== undefined && $scope.selected.action == "OK") {

                        $http.post($rootScope.urlBase + "/formation/updateByID", {
                                id: $scope.selected.objectData.formationID,
                                formationCenter: $rootScope.formationCenter,
                                formationValues: $scope.selected.objectData.newAttributes
                            })
                            .success(function (result) {
                                if (result.status === "ok") {

                                    objeData = {type: $translate.instant('INFO')};
                                    $scope.showModalMessage($translate.instant('FORMATION_UPDATED'), objeData);
                                    //alert("Formation updated.");
                                } else {
                                    console.log("******* ERROR ********");
                                    console.log(result.info);

                                    objeData = {type: $translate.instant('ERROR')};
                                    $scope.showModalMessage(result.info, objeData);
                                }

                            })
                            .error(function (err) {
                                console.log("******* ERROR ********");
                                console.log(err);

                                objeData = {type: $translate.instant('ERROR')};
                                $scope.showModalMessage($translate.instant('ERROR_UPDATING_FORMATION'), objeData);
                            })
                            .finally(function () {
                                $scope.gotoManage();
                            });
                    }

                }, function () {
                    $scope.searchFormation();
                });

            };

            $scope.showModalMessage = function (messageshow, objectData) {

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

                }, function () {

                });

            };

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
            $scope.format = $scope.formats[0];
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

            $scope.editUser = function (_user) {

                $location.path("/formation/client/" + _user.id);
            }


            $scope.deleteUser = function (_user) {

                //////Show modal for delete information
                //$http.post($rootScope.urlBase + "/formation/searchUsersByFormation", {
                //        id: $routeParams.id
                //    })
                //    .success(function (result) {
                //        if (result.status === "ok") {
                //            $scope.userlist = result.data;
                //            console.log("Result information view ", $scope.userlist )
                //            $scope.formationid =  $routeParams.id
                //            // $scope.selectedPlace = $scope.formation.place;
                //
                //
                //
                //
                //        } else {
                //            console.log("Error searching Formation: ", result.info);
                //
                //            objeData = {type: $translate.instant('ERROR')};
                //            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                //            //alert("Error searching Formation: " + result.info);
                //        }
                //    })
                //    .error(function (err) {
                //        console.log("Error searching Formation: ", err);
                //
                //        objeData = {type: $translate.instant('ERROR')};
                //        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);
                //
                //    });
            }

        }])
    .controller("WizardController", function ($rootScope, $http, $routeParams, $scope, $uibModal, $log, $location, $translate) {

        var vm = this;

        vm.currentCustomer = {}
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
        vm.dateRegExp = /^\d{2}\/\d{1,2}\/\d{4}$/;
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
                template: "templates/formationwizard/customer.html",
            },
            {
                step: 2,
                name: "Licence",
                template: "templates/formationwizard/licence.html",
            },
            {
                step: 3,
                name: "Payment",
                template: "templates/formationwizard/payment.html",
            },
            {
                step: 4,
                name: "Recap",
                template: "templates/formationwizard/recap.html",
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

            //Esto para navegar sin las validaciones
            //vm.currentStep = newStep;
            //return;

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


        //Return true if procuration date grait or equal than deliverance date.
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

        vm.validProcDateRange = function () {
            if (vm.customerData.driverLicence.dateOfProcuration) {
                procDate = new Date(vm.customerData.driverLicence.dateOfProcuration);
                maxDeliDate = new Date().setDate(actDate.getDate() - 1);
                minDeliDate = new Date(actDate.getFullYear() - 20, actDate.getMonth(), actDate.getDate());

                if (procDate <= maxDeliDate && procDate > minDeliDate) {
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
                //if (!vm.validProcDate()) {
                //
                //    if(vm.procDgtdeliD()){
                //        vm.showPDerror = true;
                //        vm.showPDerrorLessDD = false;
                //    }
                //    else{
                //        vm.showPDerror = false;
                //        vm.showPDerrorLessDD = true;
                //    }
                //
                //}
                //else {
                //    vm.showPDerror = false;
                //    vm.showPDerrorLessDD = false;
                //
                //    if (vm.customerData.driverLicence.dateOfDeliverance
                //        && (new Date(vm.customerData.driverLicence.dateOfProcuration) < new Date(vm.customerData.driverLicence.dateOfDeliverance))) {
                //        vm.showPDerrorLessDD = true;
                //    }
                //    else {
                //        vm.showPDerrorLessDD = false;
                //    }
                //
                //}

                if (vm.validProcDateRange()) {

                    vm.showPDerror = false;

                    if (vm.procDgtdeliD()) {
                        vm.showPDerrorLessDD = false;
                    } else {
                        vm.showPDerrorLessDD = true;
                    }

                } else {
                    vm.showPDerror = true;
                    vm.showPDerrorLessDD = false;
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
            vm.customerData.idformation = $routeParams.id;

            console.log("FORMATION ID", vm.customerData.idformation)
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
            dateDisabled: disabledBirthDateOptions,
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

        function disabledBirthDateOptions(data) {
            return false;
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

            ////Set paramater in $routeParams
            $location.path('/search/undefined');
        };

        ///Search customer

        $scope.searchCustomer = function () {

            $http.post($rootScope.urlBase + "/customer/searchByID", {
                    id: $routeParams.id
                })
                .success(function (result) {
                    if (result.status === "ok") {
                        vm.customerData = result.data;
                        $scope.formationId = vm.customerData.formation
                        console.log("Customer data", vm.customerData)
                        vm.customerData.birthDate = $scope.getReadableDate(vm.customerData.birthDate)
                        $scope.birthDate = vm.customerData.birthDate
                        vm.customerData.driverLicence.dateOfDeliverance = $scope.getReadableDate(vm.customerData.driverLicence.dateOfDeliverance)
                        vm.customerData.driverLicence.dateOfProcuration = $scope.getReadableDate(vm.customerData.driverLicence.dateOfProcuration)
                        ///---------------------------------------------////
                        $scope.searchFormation();


                    } else {
                        console.log("Error searching Formation: ", result.info);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                        //alert("Error searching Formation: " + result.info);
                    }
                })
                .error(function (err) {
                    console.log("Error searching Formation: ", err);

                    objeData = {type: $translate.instant('ERROR')};
                    $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);

                    //alert("Error searching Formation: " + err);
                });
        };

        $scope.searchCustomer()

        $scope.searchFormation = function () {

            $http.post($rootScope.urlBase + "/formation/searchByID", {
                    id: $scope.formationId
                })
                .success(function (result) {
                    if (result.status === "ok") {
                        $scope.formation = result.data;
                        console.log("Formation data", $scope.formation)
                        $scope.selectedPlace = $scope.formation.place;

                        //Populate the select inputs with the animators.
                        //var len = $scope.formation.animators.length;
                        //for (var i = 0; i < len; i++) {
                        //    if ($scope.formation.animators[i].type === "PSY") {
                        //        $scope.selectedPSY = $scope.formation.animators[i];
                        //    }
                        //
                        //    if ($scope.formation.animators[i].type === "BAFM") {
                        //        $scope.selectedBAFM = $scope.formation.animators[i];
                        //    }
                        //}

                        console.log("La formation para updatear tiene: ", $scope.formation);
                    } else {
                        console.log("Error searching Formation: ", result.info);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + result.info, objeData);
                        //alert("Error searching Formation: " + result.info);
                    }
                })
                .error(function (err) {
                    console.log("Error searching Formation: ", err);

                    objeData = {type: $translate.instant('ERROR')};
                    $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') + ": " + err, objeData);

                    //alert("Error searching Formation: " + err);
                });
        };

        $scope.showModalMessage = function (messageshow, objectData) {

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

            }, function () {

            });

        };

        $scope.weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]

        $scope.getReadableDate = function (dateParmt) {
            // console.log("DATE PARAMETER ", dateParmt)
            value = new Date(dateParmt);
            resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

            return resultDate

        };

        $scope.creationAttestation = function () {
            currentDate = new Date()
            var docDefinition = {
                content: [
                    {
                        columns: [
                            {
                                text: [
                                    {text: $translate.instant('ATTESTATION_PAYMENT'), style: 'subheader'},
                                    {text: $translate.instant('INCRIPTION_VALIDE'), style: 'subheader'},
                                    {text: "", style: 'subheader'},
                                    {text: $translate.instant('COMUNICATION_DEMANDE'), style: 'subheader'},
                                    {text: "", style: 'subheaderText'},
                                    {text: $translate.instant('MODE_PAYMENT'), style: 'subheader'},


                                ]
                            },
                            {
                                text: [
                                    {
                                        text: $translate.instant('ADDRESS') + ": " + $scope.formation.place.address,
                                        style: 'subheader'
                                    },
                                    {text: " ", style: 'subheader'},
                                    {text: $scope.getReadableDate(currentDate), style: 'subheader'},
                                ]
                            }
                        ]
                    },

                    {
                        style: 'tableExample',
                        color: '#222',
                        widths: ['auto'],
                        table: {
                            headerRows: 1,
                            body: [
                                [{
                                    text: [
                                        {text: $translate.instant('ADRESS_FORMATION') + ": " + $scope.formation.place.address}

                                    ]
                                },

                                ],
                                [{text: $translate.instant('MODELE_REGLEMENTAIRE') + ": "}],
                                [{text: $translate.instant('PRECENSES')}],
                            ],

                        },
                        layout: 'noBorders'
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    subheaderText: {
                        fontSize: 11,
                        bold: true,
                        margin: [0, 20, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'read'
                    }
                },
                defaultStyle: {
                    // alignment: 'justify'
                }
            };

            pdfMake.createPdf(docDefinition).open()

        }

        $scope.getReadableDate = function (dateParmt) {
            // console.log("DATE PARAMETER ", dateParmt)
            value = new Date(dateParmt);
            resultDate = value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

            return resultDate

        };

        $scope.getReadableDateEx = function (dateParmt) {
            // console.log("DATE PARAMETER ", dateParmt)
            value = new Date(dateParmt);
            resultDate = $scope.weekDay[value.getDay()] + " " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

            return resultDate

        };
        $scope.createConvocation = function () {

            dateList = ""
            counter = 0
            $scope.formation.dates.forEach(function (iDate, index) {
                if (index > 0)
                    dateList += " " + $translate.instant('CONJUNCTION') + " "
                dateList += $scope.getReadableDateEx(iDate.date)
            })


            currentDate = $scope.getReadableDate(new Date())
            var docDefinition = {
                content: [
                    {
                        text: $translate.instant('CONVOCATION_TITLE'), style: 'header', alignment: "center"
                    },
                    {
                        text: "", style: 'header', alignment: "center"
                    },
                    {
                        columns: [
                            {
                                text: [
                                    {text: $translate.instant('INSCRIPCION_CONFIRME'), style: 'subheader'},


                                ]
                            },
                            {
                                text: [
                                    {
                                        text: vm.customerData.name + " " + vm.customerData.firstName,
                                        style: 'textData', alignment: "rigth"
                                    },


                                ]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: [

                                    {text: $translate.instant('COMUNICATION_INFO'), style: 'textDataSimple'},


                                ]
                            },
                            {
                                text: [
                                    {text: vm.customerData.address, style: 'textDataSimple', alignment: "rigth"}

                                ]
                            }
                        ]
                    },
                    {
                        text: vm.customerData.name + " " + vm.customerData.firstName + " " + $translate.instant('THANKS_ABOUT'),
                        style: 'subheader',
                        alignment: "left"
                    },
                    {
                        text: $translate.instant('THANKS_ABOUT_LINE'), style: 'subheader', alignment: "left"
                    },

                    {
                        text: "", style: 'subheader', alignment: "left"
                    },

                    {
                        text: $translate.instant('PLACE_HORAIRE'), style: 'textData', alignment: "left"
                    },

                    {
                        style: 'tableExample',
                        color: '#222',
                        widths: ['1000'],
                        headerRows: 1,
                        table: {

                            body: [
                                [{
                                    text: [
                                        {text: $translate.instant('ADRESS_FORMATION') + ": " + $scope.formation.place.address},

                                    ]
                                },

                                ],
                                [{
                                    text: [{text: dateList}, {text: ""}, {
                                        text: $translate.instant('PRECENSES'),
                                        alignment: "center",
                                        bold: true
                                    }]
                                }],
                            ],

                        },

                    },
                    {
                        text: $translate.instant('RULER1'), style: 'textData', alignment: "left"
                    },

                    {
                        style: 'tableExample',
                        color: '#222',
                        widths: ['2000'],
                        headerRows: 1,
                        table: {

                            body: [
                                [{ul: [{text: $translate.instant('RULER11')}, {text: $translate.instant('RULER12')}]}
                                ],

                            ],

                        },

                    },
                    {
                        text: $translate.instant('INFORMATION_IMPORTANT'), style: 'subheader', alignment: "left"
                    },
                    {
                        ul: [
                            {text: [{text: $translate.instant('INFORMATION_IMPORTANT1')}, {text: $translate.instant('INFORMATION_IMPORTANT11')}, {text: $translate.instant('INFORMATION_IMPORTANT111')}, {text: $translate.instant('INFORMATION_IMPORTANT12')}, {text: $translate.instant('INFORMATION_IMPORTANT13')}]},
                            {text: [{text: $translate.instant('INFORMATION_IMPORTANT22')}, {text: $translate.instant('INFORMATION_IMPORTANT21')}, {text: $translate.instant('INFORMATION_IMPORTANT212')}, {text: $translate.instant('INFORMATION_IMPORTANT23')}, {text: $translate.instant('INFORMATION_IMPORTANT24')}]},
                        ]
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 12,
                        bold: true,
                        margin: [0, 5, 0, 5]
                    },
                    subheaderText: {
                        fontSize: 11,
                        bold: true,
                        margin: [0, 20, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'read'
                    },
                    textData: {
                        bold: true,
                        fontSize: 10,
                        color: 'read'
                    },
                    textDataSimple: {
                        bold: false,
                        fontSize: 10,
                        color: 'read'
                    }
                },
                defaultStyle: {
                    // alignment: 'justify'
                }
            };

            pdfMake.createPdf(docDefinition).open()


        }

    })
    .controller('ModalInstanceCtrlWizard', function ($scope, $uibModalInstance, $rootScope, $routeParams, $http, customerData, $translate) {
// Disable weekend selection
        function disabled(data) {
            //var date = data.date,
            //    mode = data.mode;
            //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);

            return false;
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
            console.log("Formation id", $scope.customerData.idformation)
            // $scope.creditCardData.CardExpirationDate = dateExpiration
            console.log("Credit Card Data ", $scope.creditCardData)
            config = {
                userdata: $scope.customerData,
                formationidentifier: $scope.customerData.idformation,
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
                    $scope.paymentMessages.push({type: mtype, info: message});

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
                return $translate.instant('CARDNUMBER_ERROR');
            }

        }

        $scope.isCardNumTooltipError = function () {
            return ($scope.paymentdata.number.$dirty && $scope.paymentdata.number.$invalid)
        }


    })
;
