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
        ) .when("/place/edit", {
            controller: "PlaceEditcontroller",
            templateUrl: "templates/place/editplace.html"
        }) .when("/place/listdata", {
            controller: "PlaceListcontroller",
            templateUrl: "templates/place/listplace.html"
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
