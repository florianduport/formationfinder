/**
 * Created by dionis on 8/2/2016.
 */
app.factory('sessionInjector', ['SessionService', "$rootScope",function(SessionService,$rootScope) {
    var sessionInjector = {
        request: function(config) {

                config.headers['Autorization'] = $rootScope.userToken;

            return config;
        }
    };
    return sessionInjector;
}]);
