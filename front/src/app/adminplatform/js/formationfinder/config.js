/**
 * Created by XPS15 on 30/09/2016.
 */
var config_module = angular.module('app.config', [])
    .constant('CONFIG', {
        'SYSTEM_NAME' : 'Formationfinder',
        'GOOGLE_ANALYTICS_ID' : '',
        'BASE_URL' : 'http://137.74.172.220:1337',
        'API_URL' : 'http://localhost:1337',
        'SYSTEM_LANGUAGE' : 'en'
    });