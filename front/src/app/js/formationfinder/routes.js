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
        .when("/search/:criteria", {
                controller: "SearchController",
                templateUrl: "templates/formationcenter/searchlist.html"
            }
        )
        .when("/formationcenter/:id", {
                controller: "FormationCenterController",
                templateUrl: "templates/formationcenter/index.html"
            }
        )
        .when("/formation/book/:id", {
                //controller: "FormationBookController",
                controller: "WizardController",
                templateUrl: "templates/formation/wizardpaginationDateBook.html"
            }
        )
        .when("/testimony/search", {
            controller: "TestimonySearchController",
            templateUrl: "templates/testimony/search.html"
        })
        .otherwise("/");
}])
