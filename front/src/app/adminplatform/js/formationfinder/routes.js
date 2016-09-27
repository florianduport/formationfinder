/**
 * Created by JKindelan on 5/20/2016.
 */
app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/", {
            controller: "LoginController",
            templateUrl: "templates/login.html"
            //authorization: false
        })
        .when("/dashboard", {
                controller: "DashboardController",
                templateUrl: "templates/dashboard.html"
                //authorization: true
            }
        )
        .when("/formationcenter", {
                controller: "FormationCenterController",
                templateUrl: "templates/formationcenter/managment.html"
                //authorization: true
            }
        )
        .when("/formationcenter/create", {
                controller: "CreateFormationCenterController",
                templateUrl: "templates/formationcenter/create.html"
                //authorization: true
            }
        )
        .when("/formationcenter/update/:id", {
                controller: "UpdateFormationCenterController",
                templateUrl: "templates/formationcenter/update.html"
                //authorization: true
            }
        )
        .otherwise("/dashboard");
}])
