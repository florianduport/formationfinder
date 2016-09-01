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

            $scope.initParameters = function () {
                $scope.username = null;
                $scope.password = null;
                $scope.loginButtonText = "Login";
            };

            $scope.initParameters();

            $scope.usernameExpReg = /^[a-z][a-z\d]*[_.\s]*[a-z\d]*$/;

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

                            $location.path('/dashboard');
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

            };
            $scope.initParameters();

            $scope.showFormationCenter = true;

            $scope.searchFormationCenters = function () {

                $http.post($rootScope.urlBase + "/formationCenter/searchAllNoPopulate")
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formationCenters = result.data;
                            $scope.showFormationCenter = true;
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

            $scope.deleteFormationCenter = function (index) {

                var confirmation = confirm("You are going to delete all Formation Center Objects. Continue?");

                if(confirmation) {

                    $http.post($rootScope.urlBase + "/formationCenter/delete", {
                            id: $scope.formationCenters[index].id
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

            $scope.editFormationCenter = function (index) {
                $location.path('/formationcenter/update/' + $scope.formationCenters[index].id);
            }

        }])
    .controller("CreateFormationCenterController", ["$scope", "$rootScope", "$location", "$http",
        function ($scope, $rootScope, $location, $http) {

            $scope.zipcodeRegExp = /^\d{5}$/;
            $scope.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
            $scope.usernameExpReg = /^[A-Za-z][A-Za-z\d]*[_.\s]*[A-Za-z\d]*$/;
            $scope.emailRedExp = /^[A-Za-z][_A-Za-z0-9-]*(\.[_A-Za-z0-9-]+)*@[A-Za-z][A-Za-z0-9-]*(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})$/;
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

        }])
    .controller("UpdateFormationCenterController", ["$scope", "$rootScope", "$location", "$http", "$routeParams",
        function ($scope, $rootScope, $location, $http, $routeParams) {

            $scope.formationcenter = {};
            $scope.newAttributes = {};
            $scope.newAttributes.isActivated     = false;

            $scope.zipcodeRegExp = /^\d{5}$/;
            $scope.nameRegExp = /^[A-Za-z][A-Za-z\s]+$/;
            $scope.emailRedExp = /^[A-Za-z][_A-Za-z0-9-]*(\.[_A-Za-z0-9-]+)*@[A-Za-z][A-Za-z0-9-]*(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})$/;
            $scope.phoneRegExp = /^(0)\d{9}$/;

            var searchFormationCenter = function () {

                $http.post($rootScope.urlBase + "/formationCenter/searchByID", {
                        id: $routeParams.id
                    })
                    .success(function (result) {
                        if (result.status === "ok") {
                            $scope.formationcenter = result.data;
                        } else {
                            console.log("Error searching Formation Centers: " + result.info);
                            alert("Error searching Formation Centers: " + result.info);
                        }
                    })
                    .error(function (err) {
                        console.log("Error searching Formation Centers: ", err);
                        alert("Error searching Formation Centers: " + err);
                    });//End of HTTP.POST.
            };
            searchFormationCenter();

            //$scope.newAttributes.isActivated = $scope.formationcenter.isActivated;

            var validNewParameter = function () {

                if ($scope.newAttributes.name || $scope.newAttributes.address
                    || $scope.newAttributes.zipCode
                    || $scope.newAttributes.email
                    || $scope.newAttributes.city
                    || $scope.newAttributes.phoneNumber
                    || ($scope.newAttributes.isActivated !== $scope.formationcenter.isActivated)) {
                    return true;
                } else {
                    return false;
                }

            };

            $scope.updateFormationCenter = function () {

                if (validNewParameter()) {

                    $http.post($rootScope.urlBase + "/formationCenter/update", {
                            id: $routeParams.id,
                            attributes: $scope.newAttributes
                        })
                        .success(function (result) {
                            if (result.status === "ok") {
                                alert("Formation Center Updated.");
                                $location.path('/formationcenter');
                            } else {
                                console.log("Error updating Formation Centers: " + result.info);
                                alert("Error updating Formation Centers: " + result.info);
                            }
                        })
                        .error(function (err) {
                            console.log("Error updating Formation Centers: ", err);
                            alert("Error updating Formation Centers: " + err);
                        });//End of HTTP.POST.
                } else {
                    alert('Enter valid new parameter.');
                }
            };

            $scope.gotoToFormationCenters = function () {
                $location.path('/formationcenter');
            };
        }])
;