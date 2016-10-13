app.controller("indexController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {
            $scope.formationcenterData = $rootScope.formationcenterData

            $scope.logout = function () {
                $rootScope.userToken = null;
                $rootScope.userAuthenticated = false;
                $rootScope.username = null;
                $location.path('/');
            };

        }])
    .controller("LoginController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            //If i get here and the user is logged, go to dashboard.
            if ($rootScope.userAuthenticated === true) {
                $location.path('/dashboard');
            }

            $scope.initParameters = function () {
                $scope.username = null;
                $scope.password = null;
                $scope.loginButtonText = "Login";
            };

            $scope.initParameters();

            $scope.usernameExpReg = /^[µçùàèáéíóúA-Za-z]([µçùàèáéíóúA-Za-z\d]*[_.\s]*[µçùàèáéíóúA-Za-z\d]*)+$/;

            $scope.login = function () {

                $scope.loginButtonText = "Login in ...";

                $http.post($rootScope.urlBase + "/adminlogin/login", {
                        username: $scope.username,
                        password: $scope.password
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $rootScope.userToken = result.token;
                            $rootScope.userAuthenticated = true;
                            $rootScope.username = $scope.username;

                            $location.path('/dashboard').replace();
                        } else {
                            $rootScope.userToken = null;
                            $rootScope.userAuthenticated = false;
                            $rootScope.formationCenter = null;
                            alert("Invalid intent. Please verify your credentials and try again.");
                        }
                    })
                    .error(function (err) {
                        alert("Error using auth services.");
                    })
                    .finally(function () {
                        $scope.loginButtonText = "Login";
                    });
            };
        }])
    .controller("DashboardController", ["$scope", "$rootScope",
        function ($scope, $rootScope) {
            $scope.username = $rootScope.username

        }])
    .controller("FormationCenterController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.initParameters = function () {
                if ($scope.formationCenters) {
                    delete $scope.formationCenters;
                }

                $scope.formationCenters = [];

                $scope.len = 5;
                $scope.maxSize = null;
                $scope.currentPage = 1;

                $scope.lens = [5, 10, 15, 20];

                $scope.itemsPerPageChance = function () {
                    $scope.currentPage = 1;
                    $scope.searchFormationCenters();
                };

            };
            $scope.initParameters();

            $scope.showFormationCenter = true;

            $scope.searchFormationCenters = function () {

                $http.post($rootScope.urlBase + "/formationCenter/searchAllNoPopulate", {
                        page: $scope.currentPage - 1,
                        len: $scope.len
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formationCenters = result.data;
                            $scope.showFormationCenter = true;

                            $scope.maxSize = result.maxSize;

                        } else {
                            $scope.initParameters();
                            $scope.showFormationCenter = false;
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation Centers: ", err);
                        alert("Error searching Formation Centers: " + err);
                    });//End of HTTP.POST.
            };
            $scope.searchFormationCenters();

            $scope.deleteFormationCenter = function (formationCenter) {

                var confirmation = confirm("You are going to delete all Formation Center Objects. Continue?");

                if (confirmation) {

                    //como voy a eliminar, si estoy en la ultima pagina y elimino el ultimo
                    //elemento de esa pagina, reinicio la paginacion, para que no se quede vacia.
                    $scope.currentPage = 1;

                    $http.post($rootScope.urlBase + "/formationCenter/delete", {
                            id: formationCenter.id
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                alert('Formation Center deleted.');
                                $scope.searchFormationCenters();
                            } else {
                                console.log("Error deleting Formation Centers: ", status.info);
                                alert("Error deleting Formation Centers: " + status.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error deleting Formation Centers: ", err);
                            alert("Error deleting Formation Centers: " + err);
                        });//End of HTTP.POST.
                }
            };

            $scope.gotoCreateFormatioCenter = function () {
                $location.path('/formationcenter/create');
            };

            $scope.editFormationCenter = function (formationCenter) {
                $location.path('/formationcenter/update/' + formationCenter.id);
            };

            $scope.clearCriteria = function () {
                $scope.criteria = "";
            };

        }])
    .controller("CreateFormationCenterController", ["$scope", "$location", "$http", "$rootScope",
        function ($scope, $location, $http, $rootScope) {

            $scope.zipcodeRegExp = /^\d{5}$/;
            $scope.nameRegExp = /^[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z\s]+$/;
            $scope.usernameExpReg = /^[µçùàèáéíóúA-Za-z]([µçùàèáéíóúA-Za-z\d]*[_.\s]*[µçùàèáéíóúA-Za-z\d]*)+$/;
            //$scope.emailRedExp = /^[A-Za-z][_A-Za-z0-9-]*(\.[_A-Za-z0-9-]+)*@[A-Za-z][A-Za-z0-9-]*(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})$/;
            $scope.emailRedExp = /^[µçùàèáéíóúa-zA-Z][_µçùàèáéíóúa-zA-Z0-9-]*(\.[_µçùàèáéíóúa-zA-Z0-9-]+)*@[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z0-9-]*(\.[µçùàèáéíóúa-zA-Z0-9-]+)*(\.[µçùàèáéíóúa-zA-Z]{2,3})$/;
            $scope.phoneRegExp = /^(0)\d{9}$/;

            var initParameter = function () {

                if ($scope.formationcenter) {
                    delete $scope.formationcenter;
                }

                $scope.formationcenter = {};
                $scope.formationcenter.name = null;
                $scope.formationcenter.address = null;
                $scope.formationcenter.zipCode = null;
                $scope.formationcenter.city = null;
                $scope.formationcenter.email = null;
                $scope.formationcenter.phoneNumber = null;
                $scope.formationcenter.isActivated = false;
            };
            initParameter();

            var validParameters = function () {
                return ($scope.formationcenter.name && $scope.formationcenter.address
                    && $scope.formationcenter.zipCode
                    && $scope.formationcenter.city
                    && $scope.formationcenter.email
                    && $scope.formationcenter.phoneNumber
                );
            };

            $scope.createFormationCenter = function () {
                if (validParameters()) {
                    $http.post($rootScope.urlBase + "/formationCenter/create", {
                            name: $scope.formationcenter.name,
                            address: $scope.formationcenter.address,
                            zipCode: $scope.formationcenter.zipCode,
                            city: $scope.formationcenter.city,
                            email: $scope.formationcenter.email,
                            phoneNumber: $scope.formationcenter.phoneNumber,
                            isActivated: $scope.formationcenter.isActivated,
                            defaultLogin: $scope.formationcenter.defaultLogin
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                console.log("Formation Center created.");
                                alert("Formation Center created.");
                                $scope.gotoToFormationCenters();

                            } else {
                                console.log("Error creating Formation Center: ", result.info);
                                alert("Error creating Formation Center: " + result.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error creating Formation Center: ", err);
                            alert("Error creating Formation Center: " + err);
                        });//End of HTTP.POST.
                }
            };

            $scope.gotoToFormationCenters = function () {
                $location.path('/formationcenter');
            };


            ///***************************************************/
            ///***               TOOLTIPS AREA                  **/
            ///***************************************************/
            //$scope.tooltipNameText = "Field required. Only letters allowed. At list two characters.";
            //$scope.tooltipNameShow = false;
            //$scope.checkName = function () {
            //
            //    if ($scope.formationcenter.name && $scope.nameRegExp.test($scope.formationcenter.name)) {
            //        $scope.tooltipNameShow = false;
            //    } else {
            //        $scope.tooltipNameShow = true;
            //    }
            //};
            //
            //$scope.tooltipUserNameText = "Field required. Letters and numbers allowed. At list two characters.";
            //$scope.tooltipUserNameShow = false;
            //$scope.checkUserName = function () {
            //
            //    console.log("El valor de defaultLogin: ", $scope.formationcenter.defaultLogin);
            //    console.log("Evaluar EXPREG da: ", $scope.usernameExpReg.test($scope.formationcenter.defaultLogin));
            //
            //    if (($scope.formationcenter.defaultLogin !== undefined) && $scope.usernameExpReg.test($scope.formationcenter.defaultLogin)) {
            //        $scope.tooltipUserNameShow = false;
            //    } else {
            //        $scope.tooltipUserNameShow = true;
            //    }
            //};
            //$scope.closeTooltipUserName = function () {
            //    $scope.tooltipUserNameShow = false;
            //};
            //
            //$scope.checkAll = function () {
            //    $scope.checkName();
            //    $scope.checkUserName();
            //};
            //
            //$scope.closeAll = function () {
            //    $scope.closeTooltipUserName();
            //};

        }])
    .controller("UpdateFormationCenterController", ["$scope", "$rootScope", "$location", "$http", "$routeParams", "$translate",
        function ($scope, $rootScope, $location, $http, $routeParams, $translate) {

            $scope.zipcodeRegExp = /^\d{5}$/;
            $scope.nameRegExp = /^[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z\s]+$/;
            $scope.emailRedExp = /^[µçùàèáéíóúa-zA-Z][_µçùàèáéíóúa-zA-Z0-9-]*(\.[_µçùàèáéíóúa-zA-Z0-9-]+)*@[µçùàèáéíóúa-zA-Z][µçùàèáéíóúa-zA-Z0-9-]*(\.[µçùàèáéíóúa-zA-Z0-9-]+)*(\.[µçùàèáéíóúa-zA-Z]{2,3})$/;
            $scope.phoneRegExp = /^(0)\d{9}$/;

            $scope.formationcenter = {};
            var oldAttributes = {};
            var copyToOldAttributes = function () {
                oldAttributes.name = $scope.formationcenter.name;
                oldAttributes.address = $scope.formationcenter.address;
                oldAttributes.zipCode = $scope.formationcenter.zipCode;
                oldAttributes.email = $scope.formationcenter.email;
                oldAttributes.city = $scope.formationcenter.city;
                oldAttributes.phoneNumber = $scope.formationcenter.phoneNumber;
                oldAttributes.isActivated = $scope.formationcenter.isActivated;
            };

            var searchFormationCenter = function () {

                $http.post($rootScope.urlBase + "/formationCenter/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formationcenter = result.data;
                            copyToOldAttributes();
                        } else {
                            console.log("Error searching Formation Centers: " + result.info);
                            alert("Error searching Formation Centers: " + result.info);
                            $scope.gotoToFormationCenters();
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation Centers: ", err);
                        alert("Error searching Formation Centers: " + err);
                    });//End of HTTP.POST.
            };
            searchFormationCenter();

            var prepareUpdate = function () {

                if ($scope.formationcenter.name && ($scope.formationcenter.name === oldAttributes.name)) {
                    delete $scope.formationcenter.name;
                }

                if ($scope.formationcenter.address && ($scope.formationcenter.address === oldAttributes.address)) {
                    delete $scope.formationcenter.address;
                }

                if ($scope.formationcenter.zipCode && ($scope.formationcenter.zipCode === oldAttributes.zipCode)) {
                    delete $scope.formationcenter.zipCode;
                }

                if ($scope.formationcenter.email && ($scope.formationcenter.email === oldAttributes.email)) {
                    delete $scope.formationcenter.email;
                }

                if ($scope.formationcenter.city && ($scope.formationcenter.city === oldAttributes.city)) {
                    delete $scope.formationcenter.city;
                }

                if ($scope.formationcenter.phoneNumber && ($scope.formationcenter.phoneNumber === oldAttributes.phoneNumber)) {
                    delete $scope.formationcenter.phoneNumber;
                }

                if ($scope.formationcenter.isActivated && ($scope.formationcenter.isActivated === oldAttributes.isActivated)) {
                    delete $scope.formationcenter.isActivated;
                }

                console.log("************** Estoy en prepare para update *********************");
                console.log("formationcenter: ", $scope.formationcenter);
                console.log("oldAttributes: ", $scope.oldAttributes);


                if ($scope.formationcenter.name || $scope.formationcenter.address
                    || $scope.formationcenter.zipCode
                    || $scope.formationcenter.email
                    || $scope.formationcenter.city
                    || $scope.formationcenter.phoneNumber
                    || ($scope.formationcenter.isActivated !== undefined)) {
                    return true;
                } else {
                    return false;
                }

            };

            $scope.updateFormationCenter = function () {

                if (prepareUpdate()) {

                    $http.post($rootScope.urlBase + "/formationCenter/update", {
                            id: $routeParams.id,
                            attributes: $scope.formationcenter
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                alert("Formation Center Updated.");
                                $location.path('/formationcenter');
                            } else {
                                searchFormationCenter();
                                console.log("Error updating Formation Centers: " + result.info);
                                alert("Error updating Formation Centers: " + result.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error updating Formation Centers: ", err);
                            alert("Error updating Formation Centers: " + err);
                        });//End of HTTP.POST.
                } else {
                    searchFormationCenter();
                    alert('Enter valid new parameter.');
                }
            };

            $scope.gotoToFormationCenters = function () {
                $location.path('/formationcenter');
            };
        }])
;