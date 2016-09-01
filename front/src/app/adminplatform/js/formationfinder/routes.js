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
        .when("/formationcenter", {
                controller: "FormationCenterController",
                templateUrl: "templates/formationcenter/managment.html"
            }
        )
        .when("/formationcenter/create", {
                controller: "CreateFormationCenterController",
                templateUrl: "templates/formationcenter/create.html"
            }
        )
        .when("/formationcenter/update/:id", {
                controller: "UpdateFormationCenterController",
                templateUrl: "templates/formationcenter/update.html"
            }
        )
        .otherwise("/");
}])
