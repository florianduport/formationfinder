/**
 * Created by dionis on 8/10/2016.
 */
app.config(function($translateProvider) {
    $translateProvider.translations('en', {
            HEADLINE: 'Hello there, This is my awesome app!',
            INTRO_TEXT: 'And it has i18n support!',
            BUTTON_TEXT_EN: 'english',
            BUTTON_TEXT_DE: 'german',
            CLOSE:"close",
        ///----------
            LEGAL_MENTIONS:"Legal Mentions",
            INFORMACION_GENERAL:"General informations",
            MANAGER:"Manager",
            EMAIL_LABEL:"Email",
            INFORMACION_EDITOR:"Editor informations",
        })
        .translations('fr', {
            HEADLINE: 'Hey, das ist meine großartige App!',
            INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
            BUTTON_TEXT_EN: 'englisch',
            BUTTON_TEXT_DE: 'deutsch',
            CLOSE:"fermer",
 ///--------------------------------------------------
            LEGAL_MENTIONS:"Mentions légales",
            INFORMACION_GENERAL:"Informations générals",
            MANAGER:"Gérant ",
            EMAIL_LABEL:"Courriel",
            INFORMACION_EDITOR:"Informations de l’éditeur",

        })
    .translations('es', {
        HEADLINE: 'Hey, das ist meine großartige App!',
        INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
        BUTTON_TEXT_EN: 'englisch',
        BUTTON_TEXT_DE: 'deutsch',
        CLOSE:"cerrar",
        ///--------------------------------------------------
        LEGAL_MENTIONS:"Informacion legal",
        INFORMACION_GENERAL:"Informaciónes generales",
        MANAGER:"Gerente ",
        EMAIL_LABEL:"Correo",
        INFORMACION_EDITOR:"Informaciónes del editor",

    });;
     $translateProvider.preferredLanguage('en');
});