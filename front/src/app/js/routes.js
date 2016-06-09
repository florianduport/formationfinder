/**
 * Created by JKindelan on 5/20/2016.
 */
app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/", {
                controller: "IndexController",
                templateUrl: "templates/index.html"
            }
        )
        .when("/search/:criterio", {
                controller: "SearchController",
                templateUrl: "templates/search.html"
            }
        )
        .when("/formationcenter/:id", {
                controller: "FormationCenterController",
                templateUrl: "templates/formationcenter/index.html"
            }
        )
        .otherwise("/");
}])
