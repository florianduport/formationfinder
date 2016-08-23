/**
 * Created by JKindelan on 5/20/2016.
 */
app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/", {
            controller: "LoginController",
            templateUrl: "templates/login.html"
        })
        .when("/dashboard", {
                controller: "DashboardController",
                templateUrl: "templates/dashboard.html"
            }
        )
        .when("/login/create", {
                controller: "CreateLogincontroller",
                templateUrl: "templates/login/create.html"
            }
        )
        .when("/login/delete", {
                controller: "DeleteLogincontroller",
                templateUrl: "templates/login/delete.html"
            }
        )
        .when("/login/update/:id", {
                controller: "UpdateLogincontroller",
                templateUrl: "templates/login/update.html"
            }
        )
        .when("/login/admin", {
                controller: "AdminLoginController",
                templateUrl: "templates/login/admin.html"
            }
        )
        .when("/formation/admin", {
                controller: "AdminFormationController",
                templateUrl: "templates/formation/admin.html"
            }
        )
        .when("/formation/create", {
                controller: "CreateFormationController",
                templateUrl: "templates/formation/create.html"
            }
        )
        .when("/formation/update/:id", {
                controller: "UpdateFormationController",
                templateUrl: "templates/formation/update.html"
            }
        )
        .when("/animator/manage", {
                controller: "ManageAnimatorController",
                templateUrl: "templates/animator/manage.html"
            }
        )
        .when("/animator/edit/:id", {
                controller: "EditAnimatorController",
                templateUrl: "templates/animator/edit.html"
            }
        )
        .when("/place/edit", {
            controller: "PlaceEditcontroller",
            templateUrl: "templates/place/editplace.html"
            }
        )
        .when("/place/listdata", {
            controller: "PlaceListcontroller",
            templateUrl: "templates/place/listplace.html"
          }
        )
        .when("/banck/edit", {
                controller: "ManagementBanckAccountController",
                templateUrl: "templates/bill/managementbankAccount.html"
            }
        )
        .when("/bill/list", {
                controller: "BillListController",
                templateUrl: "templates/bill/listbillEx.html"
            }
        )
        //.when("/formation/book/:id", {
        //        //controller: "FormationBookController",
        //        controller: "WizardController",
        //        templateUrl: "templates/formation/wizardpaginationDateBook.html"
        //    }
        //)
        //.when("/testimony/search", {
        //    controller: "TestimonySearchController",
        //    templateUrl: "templates/testimony/search.html"
        //})
        //
        //.when("/index", {
        //    controller: "IndexBackofficeController",
        //    templateUrl: "templates/index.html"
        //})
        //.when("/formations", {
        //    controller: "FormationCenterManagementController",
        //    templateUrl: "templates/formationcenter.html"
        //})
        .otherwise("/");
}])
