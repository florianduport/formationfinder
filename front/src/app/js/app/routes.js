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
                templateUrl: "templates/searchlist.html"
            }
        )
        .when("/formationcenter/:id", {
                controller: "FormationCenterController",
                templateUrl: "templates/formationcenter/index.html"
            }
        )
        .when("/formation/book/:id", {
            controller: "FormationBookController",
            templateUrl: "templates/formation/book.html"
            }
        )
        .when("/testimony/search", {
            controller: "TestimonySearchController",
            templateUrl: "templates/testimony/search.html"
        })
        .otherwise("/");

}])
