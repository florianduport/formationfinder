/**
 * Created by dionis on 8/10/2016.
 */
app.config(function($translateProvider) {
    $translateProvider.translations('en', {
            HEADLINE: 'Hello there, This is my awesome app!',
            INTRO_TEXT: 'And it has i18n support!',
            BUTTON_TEXT_EN: 'english',
            BUTTON_TEXT_DE: 'german',
            CLOSE:"close"

        })
        .translations('de', {
            HEADLINE: 'Hey, das ist meine großartige App!',
            INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
            BUTTON_TEXT_EN: 'englisch',
            BUTTON_TEXT_DE: 'deutsch',
            CLOSE:"close"
        })
        .translations('fr', {
            HEADLINE: 'Hey, das ist meine großartige App!',
            INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
            BUTTON_TEXT_EN: 'englisch',
            BUTTON_TEXT_DE: 'deutsch',
            CLOSE:"fermer"
        })
    .translations('es', {
        HEADLINE: 'Hey, das ist meine großartige App!',
        INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
        BUTTON_TEXT_EN: 'englisch',
        BUTTON_TEXT_DE: 'deutsch',
        CLOSE:"cerrar"
    });;
     $translateProvider.preferredLanguage('en');
});