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
                                    $scope.showModalMessage($translate.instant('CREDENTIAL_NOT_UPDATED')+ ": " + result.info, objeData);
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

            $scope.clearCriteria = function () {
                $scope.criteria = "";
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
                            $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') +": "+ result.info, objeData);
                            //alert("Error searching Formation: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation: ", err);

                        objeData = {type: $translate.instant('ERROR')};
                        $scope.showModalMessage($translate.instant('ERROR_SEARCHING_FORMATION') +": "+ err, objeData);

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

                console.log("Asignando datos 1" ,  map.markers[0])
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

                $scope.seachPlace.name =  $scope.seachPlaceAux.name
                $scope.seachPlace.agreementName =  $scope.seachPlaceAux.agreementName
                $scope.seachPlace.agreementNumber =   $scope.seachPlaceAux.agreementNumber
                $scope.seachPlace.address =  $scope.seachPlaceAux.address

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
                console.log('Form title ' ,   $scope.titleformplace )
                console.log("EDICION ", $scope.SAVE_BUTTON);
                $location.path('/place/edit');
            }


            $scope.editPlace = function (placeId) {

                if (typeof placeId == "undefined") {
                } else {
                    ///Show edit place
                    $scope.placetoEditID = placeId;
                    console.log("Update editing value ListController")


                    console.log('Form title ' ,   $scope.titleformplace )
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

                console.log("Object Place" , placeObject )
                if (typeof placeObject != "undefined" && typeof placeObject.id != "undefined") {

                    ///Show modal with validation message confirmation
                    messageWindow = $translate.instant("MESSAGE_DELETE_PLACE");
                    if (typeof placeObject.formations != "undefined" && placeObject.formations.length > 0) {
                        messageWindow +=  "\n Formations asociated will be modified too."
                    }

                    $scope.showModalData( messageWindow , placeObject);

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


            $scope.clearSearchField = function (){
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
            $scope.toggleMode = function() {
                $scope.ismeridian = ! $scope.ismeridian;
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
                    config.initialDate = initDateAndTime.getTime() ;
                    console.log("Init date to search " ,  config.initialDate, initDateAndTime)
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
                    endDateAndTime =  $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " +  config.finalDate)
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
                    config.initialDate = initDateAndTime.getTime() ;
                    console.log("Init date to search " ,  config.initialDate, initDateAndTime)
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
                    endDateAndTime =  $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " +  config.finalDate)
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
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + (value.getMonth()+ 1) + "/" + value.getFullYear() + " " + value.getUTCHours() + ":" + value.getMinutes() + ":"+ value.getSeconds();

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

                if ($scope.searchAux.initialDate != "" || typeof $scope.searchAux.endDate != "" ) {
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

                    if (($scope.searchAux.initialDate != "" && $scope.searchAux.initialDate != null)&& ( $scope.searchAux.endDate != "" && $scope.searchAux.endDate != null)) {


                        initDateAndTime = $scope.searchAux.initialDate //new Date( $scope.searchAux.initialDate)
                        //initTime =
                        console.log("Simple Hour", $scope.timeInit.getHours())
                        console.log("Simple Hour", $scope.timeInit.getUTCHours())
                        initDateAndTime.setUTCHours($scope.timeInit.getHours())
                        initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                        initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())

                        timestampInit = initDateAndTime.getTime()

                        endDateAndTime =  $scope.searchAux.endDate
                        endDateAndTime.setUTCHours($scope.timeEnd.getHours())
                        endDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                        endDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                        timestampEnd = endDateAndTime.getTime()

                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA",$scope.searchAux.endDate )
                            message = $translate.instant("ERROR_END_DATE")  ;
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


                $scope.search.name =   $scope.searchAux.name
                $scope.search.initialDate = $scope.searchAux.initialDate
                $scope.search.endDate =  $scope.searchAux.endDate


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
            $scope.usernameExpReg =/^([ê|µ|ç|ùàè|áéíóú|a-z|A-Z|ñ|Ñ]*)([\w|\d])*([_|\s]*[\.|\-|\'|ê|ç|ùàè|áéíóú|A-Z|a-z|ñ|Ñ|\d])*$/;


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

            $scope.clearSearchField = function (){
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
            $scope.toggleMode = function() {
                $scope.ismeridian = ! $scope.ismeridian;
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
                    config.initialDate = initDateAndTime.getTime() ;
                    console.log("Init date to search " ,  config.initialDate, initDateAndTime)
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
                    endDateAndTime =  $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " +  config.finalDate)
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
                    config.initialDate = initDateAndTime.getTime() ;
                    console.log("Init date to search " ,  config.initialDate, initDateAndTime)
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
                    endDateAndTime =  $scope.search.endDate
                    initDateAndTime.setUTCHours($scope.timeEnd.getHours())
                    initDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                    initDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                    config.finalDate = endDateAndTime.getTime()
                    console.log("End date to search " +  config.finalDate)
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
                            message =  $translate.instant("ERROR_ALERT_SEARCH");
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
                resultDate = $scope.weekDay[value.getDay()] + ": " + value.getDate() + "/" + (value.getMonth()+ 1) + "/" + value.getFullYear() + " " + value.getUTCHours() + ":" + value.getMinutes() + ":"+ value.getSeconds();

                return resultDate

            };

            $scope.getReadableType = function (type) {

                if (typeof type != "undefined") {
                    config = {}
                    config.language = "en" //$translate.determinePreferredLanguage()
                    config.type = type
                    traslateValue  = $translate.instant(type) || type ;
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

                    console.log("Hour Init vv " , $scope.timeInit, $scope.timeEnd)
                    if (($scope.searchAux.initialDate != "" && $scope.searchAux.initialDate != null)&& ( $scope.searchAux.endDate != "" && $scope.searchAux.endDate != null)) {


                        initDateAndTime = $scope.searchAux.initialDate //new Date( $scope.search.initialDate)
                        //initTime =
                        console.log("Simple Hour", $scope.timeInit.getHours())
                        console.log("Simple Hour", $scope.timeInit.getUTCHours())
                        initDateAndTime.setUTCHours($scope.timeInit.getHours())
                        initDateAndTime.setUTCMinutes($scope.timeInit.getMinutes())
                        initDateAndTime.setUTCSeconds($scope.timeInit.getSeconds())

                        timestampInit = initDateAndTime.getTime()

                        endDateAndTime =  $scope.searchAux.endDate
                        endDateAndTime.setUTCHours($scope.timeEnd.getHours())
                        endDateAndTime.setUTCMinutes($scope.timeEnd.getMinutes())
                        endDateAndTime.setUTCSeconds($scope.timeEnd.getSeconds())

                        timestampEnd = endDateAndTime.getTime()

                        if (timestampEnd < timestampInit) {
                            $scope.errorValid = true
                            console.log("INSERTANDO ALERTA",$scope.search.endDate )
                            message = $translate.instant("ERROR_END_DATE")  ;
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
                $scope.search.initialDate =  $scope.searchAux.initialDate
                $scope.search.endDate =  $scope.searchAux.endDate


                console.log("Search elements")
                $scope.countRecordsAlert();
                $scope.getAlertRecords();
                console.log("Search elements")

            }


            ///-----------------------------------------------------
            $scope.countRecordsAlert();
            $scope.getAlertRecords();
        }]);

;
