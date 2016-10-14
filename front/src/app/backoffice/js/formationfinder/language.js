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
            CITY:"City",
            CITY_ERROR: "City invalid",
            ADDRESS : "Address",
            ADDRESS_ERROR: "Addres invalid",
            ZIPCODE: "Zipcode",
            ZIPCODE_ERROR: "Zipcode incorrect",
            AGREMENTNAME: "Jhon",
            AGREMENTNAME_ERROR: "Name incorrect",
            AGREMENTNUMBER: "55555",
            AGREMENTNUMBER_ERROR: "Number incorrect",
            SAVE_BUTTON:"Save",
            CITY_ZIPCODE: "City/ Zipcode",
            CITY_ZIPCODE_ERROR:"Value incorrect",
            NAME: "Name",
            NAME_ERROR:"Invalid name format. You should provide between 2 and 40  characters.",
            INSERT_NAME: "Insert user´s name",
            NUMBER_TEXT: "Number",
            NOT_LOCATION_PLACE: "Not exist place location",
            LABEL_MAP:"Places in map",
            NEW_PLACE: "Add place",
            ADVANCED_SEARCH: "Advanced search",
            VIEW_MAP: "View Map",
            DELETE: "Delete",
            EDIT: "Edit",
            ACCEPT: "OK",
            CANCEL: "CANCEL",
            EDIT_PLACE: "Edit place",
            DELETE_PLACE: "Delete place",
            EDIT_PLACE_MESSAGE: "Edit place´s attributes",
            ADD_PLACE_MESSAGE:"Insert place´s attributes",
            LOGOUT:"LOGOUT",
            LOGOUT_USER:"Logout user",
            GEOSEARCH:"Geosearch",
            LANGUAGE:"Language",
            USER_TOOLTIP:"User´s name",
            FORMATION_TOOLTIP:"Formation´s size",
            CUSTOMER_TOOLTIP:"Customer´s size",
            GEOSEARCH_TOOLTIP:"View maps",
            LANGUAGE_TOOLTIP:"Change site languages",
            FORMATION_CENTER_TEXT:"Formation center´s name",
            ADMIN_PAGE_HEAD:"Admin places",
            ADMIN_PAGE_HEAD_DESCRIPTION:"In this window you can admin formation center's places.",
            SHOW_ALL_BUTTON:"View places",
            ADMIN_PAGE_BILL_HEAD:"Admin bills",
            ADMIN_PAGE_BILL_HEAD_DESCRIPTION:"In this window you can admin formation center's bills.",
            CARD_CSV:"Csv",
            CARD_NUMBER:"Card number (*)",
            CARD_DATE:"Expiration date(*)",
            AMOUNT:"Amount",
            AMOUNT_ERROR:"Amount invalid",
            CARD_TYPE:"Card type",
            ADMIN_PAGE_ALERT_HEAD:"Admin alerts",
            ADMIN_PAGE_ALERT_HEAD_DESCRIPTION:"In this window you can admin formation center's alerts.",
            TEXT:"Text",
            TEXT_ERROR:"Text invalid",
            DATE_PLACEHOLDER : "12/06/2016",
            New_Costumer:"New costumer",
            Formation_Full:"Formation full",
            Place_Unable:"Place unable",
            REQUIRED_FIELD: "Required field",
            USERNAME: "Username",
            PASSWORD: "Password",
            INSERT_PASSWORD: "Insert password",
            REMEMBER_ME: "Remember me",
            FORGOT_PASSWORD: "Forgot Password?",
            LOGIN: "Login",
            MAIN: "Main",
            ACTIVATED: "Activated",
            CREATE: "Create",
            GO_BACK: "Go back",
            INVALID_USERNAME: "Invalid username",
            PASSWORD_MIN: "4 character minimum",
            CREATE_CREDENTIAL: "Create credential",
            UPDATE_CREDENTIAL: "Update credential",
            UPDATE: "Update",
            ADMIN_CREDENTIALS: "Admin credentials",
            CREDENTIALS: "Credentials",
            ACTIONS: "Actions",
            ADMIN_FORMATIONS: "Admin Formations",
            SEARCH_FORMATIONS_IN_LIST: "Search Formations in the list",
            CREATE_FORMATION: "Create Formation",
            PRICE: "Price",
            MAX_PEOPLE: "Max. People",
            CONFIRMED: "Confirmed",
            FORMATIONS: "Formations",
            SELECT_PLACE: "Select place",
            INSERT_PRICE: "Insert price",
            ONLY_NUMBER: "Only number",
            INSERT_MAX_PEOPLE: "Insert Max. People",
            SELECT_PSYCHOLOGIST: "Select Psychologist",
            SELECT_BAFM: "Select BAFM/BAFCRI",
            INSERT_DATES: "Insert dates",
            INSERT: "Insert",
            DATES: "Dates",
            PEAK_DATE: "Peak date",
            SEARCH_ANIMATOR_IN_LIST: "Search Animators in the list",
            ADMIN_ANIMATORS: "Admin Animators",
            CREATE_ANIMATOR: "Create Animator",
            FIRST_NAME: "First Name",
            TYPE: "Type",
            PSYCHOLOGIST: "Psychologist",
            EDIT_ANIMATOR: "Edit Animator",
            NOTHING_TO_SHOW: "Nothing to show",
            MORNING: "Morning",
            AFTERNOON: "Afternoon",
            START: "Start",
            END: "End",
            INSERT_VALID_DATE: "Insert a valid date",
            UPDATE_FORMATION_CENTER: "Update Formation Center",
            UPDATE_DATES: "Update dates",
            ANIMATORS:"Animators",
            PLACE:"Places",
            BILLS:"Bills",
            ALERTS:"Alerts",
            INIT_DATE_ERROR:"Init date field should be date",
            END_DATE_ERROR:"End date field should be date",
            SEARCH_CREDENTIAL_IN_LIST: "Search credentials in the list",
            ITEMS_PER_PAGE: "Items per page",
            INVALID_MORNING_TIME_RANGE: "Invalid morning time range",
            INVALID_AFTERNOON_TIME_RANGE: "Invalid afternoon time range",
            ERROR_END_DATE:"Sorry, End date isn´t correct",
            ERROR_ALERT_SEARCH:"Sorry, search don´t have results",
            MESSAGE_DELETE_PLACE:"Are you sure delete these place.",
            DELETE_PLACE_SUCESSFUL:"Place delete sucessful",
            DETAILS:"Details",
            DETAILS_FORMATION_CENTER:"Formation Center Details",
            DETAILS_FORMATION_INFO:"Formation Details",
            DETAILS_DATES:"Dates",
            DETAILS_FORMATION:"Details",
            ADRESS_FORMATION:"Adress",
            MAX_PEOPLE_FORMATION:"Max people",
            CURRENT_PEOPLE_FORMATION:"Current people",
            OPTION_FORMATION:"Other details",
            CREATION_ATTESTATION:"Attestation creation",
            PRINT_LIST:"Print list",
            DETAILS_SHIELD:"Details shield",
            CONTACTER_USERS:"Contacter users",
            DETAILS_PLACE:"Place",
            DETAILS_PRICE:"Price",
            DETAILS_MAX_PEOPLE:"Max people",
            DETAILS_PSYCHOLOGIST:"Psychologist",
            DETAILS_BAFM:"Bafm",
            VIEW_USER:"Users admin",
            EDIT_USER:"Edit",
            ADMIN_USER_PAGE_HEAD:"Admin clients",
            ADMIN_USER_PAGE_HEAD_DESCRIPTION:"In this window you can admin formation's clients.",
            NAME_USER:"name",
            NAME_USER_ERROR:"Name incorrect",
            FIRTS_NAME:"First name",
            FIRST_NAME_ERROR:"First name incorrect",
            PHONENUMBER_TEXT:"Phonenumber",
            PHONENUMBER:"034453456",
            PHONENUMBER_ERROR:"Phonenumber incorrect",
            TABLE_USER_NAME:"Name",
            TABLE_USER_FIRSTNAME:"First name",
            TABLE_USER_ADDRESS:"Address",
            TABLE_USER_PHONENUMBER:"Phonenumber",
            TABLE_USER_EMAIL:"Email",
            TABLE_PLACE_ACTIONS:"Actions",
            OTHER_DATA_USER_SEARCH:"Other info",
            CONVOCATION:"Convocation",
            CUSTOMER_DATA:"Customer info",
            TITLE_ATTESTATION_PAGE:"ATTESTATION DE SUIVI DE STAGE",
            ATTESTATION_CAS1_PAGE:"Cas 1 : Stage volontaire.",
            ATTESTATION_CAS2_PAGE:"Cas 2 : Stage obligatoire pour les conducteurs qui ont commis pendant le délai probatoire une infraction ayant donné lieu à une perte d'au moins  trois points.",
            ATTESTATION_CAS3_PAGE:"Cas 3 : Stage en alternative à la poursuite judiciaire proposé par le Procureur de la République ou en exécution d'une composition pénale.",
            ATTESTATION_CAS4_PAGE:"Cas 4 : Peine complémentaire ou obligation imposée dans le cadre du sursis avec mise à l'épreuve.",
            FOOT_SING_ATTESTATION_PAGE:"Je soussigné(e)",
            TEXT_SING_ATTESTATION_PAGE:"Responsable de la formation spécifique, titulaire de l’Agrément Préfectoral",
            END_SING_ATTESTATION_PAGE:"atteste que",
            SQUARE_LINE1_ATTESTATION_PAGE:"Rubrique à compléter uniquement dans les cas 2 à 4.",
            SQUARE_LINE1_ATTESTATION_PAGE:"Ayant commis une infraction au code de la route.",
            CENTER_DIRECTOR_ATTESTATION_PAGE:"Directeur du centre",
            WORKERS_ATTESTATION_PAGE:"Animateurs",
            CUSTOMERS_ATTESTATION_PAGE:"Stagiaire",
            DATE_CONFIRMATION_ATTESTATION_PAGE:"a suivi le stage de formation spécifique correspondant au cas visé ci-dessus, qui s’est déroulé",
            SING:"Signature",
            SINGS:"Signatures",
            SING_CACHET:"Signature et Cachet ",
            N_0:"N° ",
            NAME_ATTESTATION_PAGE:"Name",
            BIRTHDATE_ATTESTATION_PAGE:"Date de naissance",
            ADDRESS_ATTESTATION_PAGE:"Résidant à",
            ZIPCODE_ATTESTATION_PAGE:"Code postal",
            NOLICENCE_ATTESTATION_PAGE:"N° de permis",
            NOLICENCEDATE_ATTESTATION_PAGE:"Délivré le",
            FIRSTNAME_ATTESTATION_PAGE:"Prénom",
            BIRTHCITY_ATTESTATION_PAGE:"Lieu de naissance",
            LIVEADDRESS_ATTESTATION_PAGE:"Ville",
            NOLICENCEPLACE_ATTESTATION_PAGE:"Par la Préfecture de",
            DATE_ARTICLE: "Created at ",
            ERROR_USING_AUTH_SERVICE: "Error using auth service",
            INVALID_USERNAME_PASSWORD: "Invalid username/password combination. Please check and try again",
            CREDENTIAL_CREATED: "Credential created",
            ERROR_USING_SERVICE: "Error using service",
            ERROR_SEARCHING_CREDENTIALS: "Error searching credentials",
            ERROR_SEARCHING_CREDENTIAL: "Error searching credential",
            ERROR_DELETE_ACTUAL_CREDENTIAL: "Can´t delete the actual Credential",
            ERROR_UPDATE_ACTUAL_CREDENTIAL: "Can´t update the actual Credential",
            DELETE_CREDENTIAL_CONFIRMATION: "You are going to delete this Credential. Continue?",
            CREDENTIAL_DELETED: "Credential deleted",
            ERROR_DELETING_CREDENTIAL: "Error deleting credential",
            UPDATE_CREDENTIAL_CONFIRMATION: "You are going to update this Credential. Continue?",
            CONFIRMATION: "Confirmation",
            ERROR: "Error",
            INFO: "Info",
            ENTER_VALID_PARAMETER_OR_MAKE_CHANGES: "Enter valid new parameters, or make some chance.",
            CREDENTIAL_UPDATED: "Credential updated",
            CREDENTIAL_NOT_UPDATED: "Credential not updated",
            ERROR_SEARCHING_FORMATIONS: "Error searching formations",
            DELETE_FORMATION_CONFIRMATION: "You are going to delete this formation. Continue?",
            FORMATION_DELETED: "Formation deleted",
            ERROR_DELETING_FORMATION: "Error deleting formation",
            ERROR_SEARCHING_FORMATION: "Error searching formation",
            ERROR_SEARCHING_PLACES: "Error searching places",
            ERROR_SEARCHING_ANIMATORS_PSY: "Error searching animators PSY",
            ERROR_SEARCHING_ANIMATORS_BAFM: "Error searching animators BAFM",
            UPDATE_FORMATION_CONFIRMATION: "You are going to update this formation. Continue?",
            FORMATION_UPDATED: "Formation updated",
            ERROR_UPDATING_FORMATION: "Error updating formation",
            FORMATION_CREATED: "Formation created",
            ERROR_CREATING_FORMATION: "Error creating formation",
            ERROR_SEARCHING_ANIMATORS: "Error searching animators",
            ERROR_SEARCHING_ANIMATOR: "Error searching animator",
            DELETE_ANIMATOR_CONFIRMATION: "You are going to delete this animator. Continue?",
            ANIMATOR_DELETED: "Animator deleted",
            ERROR_DELETING_ANIMATOR: "Error deleting animator",
            UPDATE_ANIMATOR_CONFIRMATION: "You are going to update this animator. Continue?",
            ANIMATOR_UPDATED: "Animator updated",
            ERROR_UPDATING_ANIMATOR: "Error updating animator",
            ANIMATOR_CREATED: "Animator created",
            ERROR_CREATING_ANIMATOR: "Error creating animator",
            PRINT:"PRINT",
            TABLE_PLACE_NAME:"Name",
            TABLE_PLACE_ADDRESS:"Adress",
            TABLE_PLACE_POSTAL_CODE:"Postal code",
            TABLE_PLACE_CITY:"City",
            TABLE_PLACE_AGREMENT:"Agrement",
            TABLE_PLACE_ACTIVATED:"Activated",
            TABLE_PLACE_ACTIONS:"Actions",
            //------ Piterson last change -------------------
            WAITING_ROOM: "Waitting room",
            DOCUMENTS: "Documents",
            ERROR_PRINTING_WAITING_ROOM: "Error printing waiting room's customers list",
            ADD_CUSTOMER: "Add customer from waiting room",
            ADD_CUSTOMERS_TO_FORMATIONS: "Add customers in waiting room to formations",
            SELECT_CUSTOMER: "Select customer",
            SELECT_FORMATION: "Select formation",
            ERROR_SEARCHING_CUSTOMERS: "Error searching customers",
            ADD: "Add"


        })
        .translations('fr', {
            HEADLINE: 'Hey, das ist meine großartige App!',
            INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
            BUTTON_TEXT_EN: 'englisch',
            BUTTON_TEXT_DE: 'deutsch',
            CLOSE:"fermer",
            CITY:"Ville",
            CITY_ERROR: "Ville pas corret",
            ADDRESS : "Address",
            ADDRESS_ERROR: "Addres pas corret",
            ZIPCODE: "Zipcode",
            ZIPCODE_ERROR: "Zipcode pas corret",
            AGREMENTNAME: "Florian",
            AGREMENTNAME_ERROR: "Prenome incorrecto",
            AGREMENTNUMBER: "55555",
            AGREMENTNUMBER_ERROR: "Nombre pas correct",
            SAVE_BUTTON:"Save",
            CITY_ZIPCODE: "Ville/ Zipcode",
            CITY_ZIPCODE_ERROR:"Value pas correct",
            NAME: "Prenome",
            NAME_ERROR:"Prenome format pas correct. You should provide between 2 and 40 characters.",
            INSERT_NAME: "Ecrive le prenome",
            NUMBER_TEXT: "Nombre",
            NOT_LOCATION_PLACE: "N´est pas place location",
            LABEL_MAP:"Leux sur le map",
            NEW_PLACE: "Ajouter lieux",
            ADVANCED_SEARCH: "Researche complex",
            VIEW_MAP: "Voir map",
            DELETE: "Delete",
            EDIT: "Editer",
            ACCEPT: "D´ACCORD",
            CANCEL: "CANCELAR",
            EDIT_PLACE: "Edit",
            EDIT_PLACE_MESSAGE: "Edit place´s attributes",
            ADD_PLACE_MESSAGE:"Insert place´s attributes",
            LOGOUT:"LOGOUT",
            LOGOUT_USER:"Logout user",
            GEOSEARCH:"Geolocalisation",
            LANGUAGE:"Language",
            USER_TOOLTIP:"User´s name",
            FORMATION_TOOLTIP:"Formation´s size",
            CUSTOMER_TOOLTIP:"Customer´s size",
            GEOSEARCH_TOOLTIP:"View maps",
            LANGUAGE_TOOLTIP:"Change site languages",
            FORMATION_CENTER_TEXT:"Prenome du Centre de formation ",
            ADMIN_PAGE_HEAD:"Admin places",
            ADMIN_PAGE_HEAD_DESCRIPTION:"In this window you can admin formation center places.",
            SHOW_ALL_BUTTON:"Touts Lieuxs",
            ADMIN_PAGE_BILL_HEAD:"Management bills",
            ADMIN_PAGE_BILL_HEAD_DESCRIPTION:"In this window you can admin formation center's bills.",
            CARD_CSV:"Csv",
            CARD_NUMBER:"Card number (*)",
            CARD_DATE:"Expiration date(*)",
            AMOUNT:"Nombre",
            AMOUNT_ERROR:"Nombre invalid",
            CARD_TYPE:"Card type",
            ADMIN_PAGE_ALERT_HEAD:"Admin alerts",
            ADMIN_PAGE_ALERT_HEAD_DESCRIPTION:"In this window you can admin formation center's alerts.",
            TEXT:"Text",
            TEXT_ERROR:"Text invalid",
            DATE_PLACEHOLDER : "12/06/2016",
            New_Costumer:"New costumer",
            Formation_Full:"Formation full",
            Place_Unable:"Place unable",
            REQUIRED_FIELD: "Required field",
            USERNAME: "Username",
            PASSWORD: "Password",
            INSERT_PASSWORD: "Insert password",
            REMEMBER_ME: "Remember me",
            FORGOT_PASSWORD: "Forgot Password?",
            LOGIN: "Login",
            MAIN: "Main",
            ACTIVATED: "Activated",
            CREATE: "Create",
            GO_BACK: "Go back",
            INVALID_USERNAME: "Invalid username",
            PASSWORD_MIN: "4 character minimum",
            CREATE_CREDENTIAL: "Create credential",
            UPDATE_CREDENTIAL: "Update credential",
            UPDATE: "Update",
            ADMIN_CREDENTIALS: "Admin credentials",
            CREDENTIALS: "Credentials",
            ACTIONS: "Actions",
            ADMIN_FORMATIONS: "Admin Formations",
            SEARCH_FORMATIONS_IN_LIST: "Search Formations in the list",
            CREATE_FORMATION: "Create Formation",
            PRICE: "Price",
            MAX_PEOPLE: "Max. People",
            CONFIRMED: "Confirmed",
            FORMATIONS: "Formations",
            SELECT_PLACE: "Select place",
            INSERT_PRICE: "Insert price",
            ONLY_NUMBER: "Only number",
            INSERT_MAX_PEOPLE: "Insert Max. People",
            SELECT_PSYCHOLOGIST: "Select Psychologist",
            SELECT_BAFM: "Select BAFM/BAFCRI",
            INSERT_DATES: "Insert dates",
            INSERT: "Insert",
            DATES: "Dates",
            PEAK_DATE: "Peak date",
            SEARCH_ANIMATOR_IN_LIST: "Search Animators in the list",
            ADMIN_ANIMATORS: "Admin Animators",
            CREATE_ANIMATOR: "Create Animator",
            FIRST_NAME: "First Name",
            TYPE: "Type",
            PSYCHOLOGIST: "Psychologist",
            EDIT_ANIMATOR: "Edit Animator",
            NOTHING_TO_SHOW: "Nothing to show",
            MORNING: "Morning",
            AFTERNOON: "Afternoon",
            START: "Start",
            END: "End",
            INSERT_VALID_DATE: "Insert a valid date",
            UPDATE_FORMATION_CENTER: "Update Formation Center",
            UPDATE_DATES: "Update dates",
            ANIMATORS:"Animators",
            PLACE:"Lieux",
            BILLS:"Bills",
            ALERTS:"Alerts",
            SEARCH_CREDENTIAL_IN_LIST: "Search credentials in the list",
            ITEMS_PER_PAGE: "Items per page",
            INVALID_MORNING_TIME_RANGE: "Invalid morning time range",
            INVALID_AFTERNOON_TIME_RANGE: "Invalid afternoon time range",
            DETAILS:"Details",
            DETAILS_FORMATION_CENTER:"Formation Center Details",
            DETAILS_FORMATION_INFO:"Formation Details",
            DETAILS_DATES:"Dates",
            DETAILS_FORMATION:"Details",
            ADRESS_FORMATION:"Adress",
            MAX_PEOPLE_FORMATION:"Max people",
            CURRENT_PEOPLE_FORMATION:"Current people",
            OPTION_FORMATION:"Other details",
            CREATION_ATTESTATION:"Creation des attestations",
            PRINT_LIST:"Imprimir la liste",
            DETAILS_SHIELD:"Feuille d'emargement",
            CONTACTER_USERS:"Contacter les stagiaires",
            DETAILS_PLACE:"Place",
            DETAILS_PRICE:"Price",
            DETAILS_MAX_PEOPLE:"Max people",
            DETAILS_PSYCHOLOGIST:"Psychologist",
            DETAILS_BAFM:"Bafm",
            VIEW_USER:"Users admin",
            EDIT_USER:"Edit",
            ADMIN_USER_PAGE_HEAD:"Admin clients",
            ADMIN_USER_PAGE_HEAD_DESCRIPTION:"In this window you can admin formation's clients.",
            NAME_USER:"name",
            NAME_USER_ERROR:"Name incorrect",
            FIRTS_NAME:"First name",
            FIRST_NAME_ERROR:"First name incorrect",
            PHONENUMBER_TEXT:"Phonenumber",
            PHONENUMBER:"034453456",
            PHONENUMBER_ERROR:"Phonenumber incorrect",
            TABLE_USER_NAME:"Name",
            TABLE_USER_FIRSTNAME:"First name",
            TABLE_USER_ADDRESS:"Address",
            TABLE_USER_PHONENUMBER:"Phonenumber",
            TABLE_USER_EMAIL:"Email",
            TABLE_PLACE_ACTIONS:"Actions",
            OTHER_DATA_USER_SEARCH:"Other info",
            CONVOCATION:"Convocation",
            CUSTOMER_DATA:"Customer info",
            TITLE_ATTESTATION_PAGE:"ATTESTATION DE SUIVI DE STAGE",
            ATTESTATION_CAS1_PAGE:"Cas 1 : Stage volontaire.",
            ATTESTATION_CAS2_PAGE:"Cas 2 : Stage obligatoire pour les conducteurs qui ont commis pendant le délai probatoire une infraction ayant donné lieu à une perte d'au moins  trois points.",
            ATTESTATION_CAS3_PAGE:"Cas 3 : Stage en alternative à la poursuite judiciaire proposé par le Procureur de la République ou en exécution d'une composition pénale.",
            ATTESTATION_CAS4_PAGE:"Cas 4 : Peine complémentaire ou obligation imposée dans le cadre du sursis avec mise à l'épreuve.",
            FOOT_SING_ATTESTATION_PAGE:"Je soussigné(e)",
            TEXT_SING_ATTESTATION_PAGE:"Responsable de la formation spécifique, titulaire de l’Agrément Préfectoral",
            END_SING_ATTESTATION_PAGE:"atteste que",
            SQUARE_LINE1_ATTESTATION_PAGE:"Rubrique à compléter uniquement dans les cas 2 à 4.",
            SQUARE_LINE1_ATTESTATION_PAGE:"Ayant commis une infraction au code de la route.",
            CENTER_DIRECTOR_ATTESTATION_PAGE:"Directeur du centre",
            WORKERS_ATTESTATION_PAGE:"Animateurs",
            CUSTOMERS_ATTESTATION_PAGE:"Stagiaire",
            DATE_CONFIRMATION_ATTESTATION_PAGE:"a suivi le stage de formation spécifique correspondant au cas visé ci-dessus, qui s’est déroulé",
            SING:"Signature",
            SINGS:"Signatures",
            SING_CACHET:"Signature et Cachet ",
            N_0:"N° ",
            NAME_ATTESTATION_PAGE:"Name",
            BIRTHDATE_ATTESTATION_PAGE:"Date de naissance",
            ADDRESS_ATTESTATION_PAGE:"Résidant à",
            ZIPCODE_ATTESTATION_PAGE:"Code postal",
            NOLICENCE_ATTESTATION_PAGE:"N° de permis",
            NOLICENCEDATE_ATTESTATION_PAGE:"Délivré le",
            FIRSTNAME_ATTESTATION_PAGE:"Prénom",
            BIRTHCITY_ATTESTATION_PAGE:"Lieu de naissance",
            LIVEADDRESS_ATTESTATION_PAGE:"Ville",
            NOLICENCEPLACE_ATTESTATION_PAGE:"Par la Préfecture de",
            DATE_ARTICLE: "Le ",
            ERROR_USING_AUTH_SERVICE: "Error using auth service",
            INVALID_USERNAME_PASSWORD: "Invalid username/password combination. Please check and try again",
            CREDENTIAL_CREATED: "Credential created",
            ERROR_USING_SERVICE: "Error using service",
            ERROR_SEARCHING_CREDENTIALS: "Error searching credentials",
            ERROR_SEARCHING_CREDENTIAL: "Error searching credential",
            ERROR_DELETE_ACTUAL_CREDENTIAL: "Can´t delete the actual Credential",
            ERROR_UPDATE_ACTUAL_CREDENTIAL: "Can´t update the actual Credential",
            DELETE_CREDENTIAL_CONFIRMATION: "You are going to delete this Credential. Continue?",
            CREDENTIAL_DELETED: "Credential deleted",
            ERROR_DELETING_CREDENTIAL: "Error deleting credential",
            UPDATE_CREDENTIAL_CONFIRMATION: "You are going to update this Credential. Continue?",
            CONFIRMATION: "Confirmation",
            ERROR: "Error",
            INFO: "Info",
            ENTER_VALID_PARAMETER_OR_MAKE_CHANGES: "Enter valid new parameters, or make some chance.",
            CREDENTIAL_UPDATED: "Credential updated",
            CREDENTIAL_NOT_UPDATED: "Credential not updated",
            DELETE_FORMATION_CONFIRMATION: "You are going to delete this formation. Continue?",
            FORMATION_DELETED: "Formation deleted",
            ERROR_DELETING_FORMATION: "Error deleting formation",
            ERROR_SEARCHING_FORMATION: "Error searching formation",
            ERROR_SEARCHING_PLACES: "Error searching places",
            ERROR_SEARCHING_ANIMATORS_PSY: "Error searching animators PSY",
            ERROR_SEARCHING_ANIMATORS_BAFM: "Error searching animators BAFM",
            UPDATE_FORMATION_CONFIRMATION: "You are going to update this formation. Continue?",
            FORMATION_UPDATED: "Formation updated",
            ERROR_UPDATING_FORMATION: "Error updating formation",
            FORMATION_CREATED: "Formation created",
            ERROR_CREATING_FORMATION: "Error creating formation",
            ERROR_SEARCHING_ANIMATORS: "Error searching animators",
            ERROR_SEARCHING_ANIMATOR: "Error searching animator",
            DELETE_ANIMATOR_CONFIRMATION: "You are going to delete this animator. Continue?",
            ANIMATOR_DELETED: "Animator deleted",
            ERROR_DELETING_ANIMATOR: "Error deleting animator",
            UPDATE_ANIMATOR_CONFIRMATION: "You are going to update this animator. Continue?",
            ANIMATOR_UPDATED: "Animator updated",
            ERROR_UPDATING_ANIMATOR: "Error updating animator",
            ANIMATOR_CREATED: "Animator created",
            ERROR_CREATING_ANIMATOR: "Error creating animator",
            PRINT:"PRINT",
            TABLE_PLACE_NAME:"Name",
            TABLE_PLACE_ADDRESS:"Adress",
            TABLE_PLACE_POSTAL_CODE:"Postal code",
            TABLE_PLACE_CITY:"City",
            TABLE_PLACE_AGREMENT:"Agrement",
            TABLE_PLACE_ACTIVATED:"Activated",
            TABLE_PLACE_ACTIONS:"Actions",
            //------ Piterson last change -------------------
            WAITING_ROOM: "Waitting room",
            DOCUMENTS: "Documents",
            ERROR_PRINTING_WAITING_ROOM: "Error printing waiting room's customers list",
            ADD_CUSTOMER: "Add customer from waiting room",
            ADD_CUSTOMERS_TO_FORMATIONS: "Add customers to formations",
            ERROR_SEARCHING_CUSTOMERS: "Error searching customers",
            ADD: "Add"

        })
    .translations('es', {
        HEADLINE: 'Hey, das ist meine großartige App!',
        INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
        BUTTON_TEXT_EN: 'englisch',
        BUTTON_TEXT_DE: 'deutsch',
        CLOSE:"cerrar",
        CITY:"Ciudad",
        CITY_ERROR: "Ciudad invalidad",
        ADDRESS : "Dirección",
        ADDRESS_ERROR: "Direccion incorrecta",
        ZIPCODE: "Código postal",
        ZIPCODE_ERROR: "Código postal incorrecto",
        AGREMENTNAME: "Pedro",
        AGREMENTNAME_ERROR: "Nombre incorrecto",
        AGREMENTNUMBER: "55555",
        AGREMENTNUMBER_ERROR: "Numero incorrecto",
        SAVE_BUTTON:"Guardar",
        CITY_ZIPCODE: "Ciudad/ Zipcode",
        CITY_ZIPCODE_ERROR:"Dato incorrecto",
        NAME: "Nombre",
        NAME_ERROR:"Nombre incorrecto.Usted debe insertar entre 2 a 40 caracteres.",
        INSERT_NAME: "Inserte el nombre",
        NUMBER_TEXT: "Número",
        NOT_LOCATION_PLACE: "No existe la localización",
        LABEL_MAP:"Mapa de lugares",
        NEW_PLACE: "Añadir lugar",
        ADVANCED_SEARCH: "Búsqueda avanzada",
        VIEW_MAP: "Ver mapa",
        EDIT_PLACE_MESSAGE: "Edit place´s attributes",
        ADD_PLACE_MESSAGE:"Insert place´s attributes",
        DELETE: "Eliminar",
        EDIT: "Editar",
        ACCEPT: "ACEPTAR",
        CANCEL: "CANCELAR",
        EDIT_PLACE: "Edit",
        LOGOUT:"Salir",
        LOGOUT_USER:"Desconectar usuario",
        GEOSEARCH:"Geolocalización",
        LANGUAGE:"Language",
        USER_TOOLTIP:"User´s name",
        FORMATION_TOOLTIP:"Formation´s size",
        CUSTOMER_TOOLTIP:"Customer´s size",
        GEOSEARCH_TOOLTIP:"View maps",
        LANGUAGE_TOOLTIP:"Change site languages",
        FORMATION_CENTER_TEXT:"Nombre del centro de formación",
        ADMIN_PAGE_HEAD:"Admin places",
        ADMIN_PAGE_HEAD_DESCRIPTION:"In this window you can admin formation center places.",
        SHOW_ALL_BUTTON:"Lugares",
        ADMIN_PAGE_BILL_HEAD:"Administrar pagos",
        ADMIN_PAGE_BILL_HEAD_DESCRIPTION:"En esta ventana usted podra administrar los pagos de un Centro de Formación.",
        CARD_CSV:"Csv",
        CARD_NUMBER:"Número de tarjeta (*)",
        CARD_DATE:"Expiration date(*)",
        AMOUNT:"Nombre",
        AMOUNT_ERROR:"Nombre invalid",
        CARD_TYPE:"Tarjeta de crédito/débito",
        ADMIN_PAGE_ALERT_HEAD:"Administrar alerts",
        ADMIN_PAGE_ALERT_HEAD_DESCRIPTION:"En esta vista se podra administrar las alertas de un Centro de Formación.",
        TEXT:"Texto",
        TEXT_ERROR:"Texto invalido",
        DATE_PLACEHOLDER : "12/06/2016",
        New_Costumer:"New costumer",
        Formation_Full:"Formation full",
        Place_Unable:"Place unable",
        REQUIRED_FIELD: "Campo requerido",
        USERNAME: "Usuario",
        PASSWORD: "Contraseña",
        INSERT_PASSWORD: "Inserte contraseña",
        REMEMBER_ME: "Recordarme",
        FORGOT_PASSWORD: "Olvidó su contraseña?",
        LOGIN: "Entrar",
        MAIN: "Principal",
        ACTIVATED: "Activado",
        CREATE: "Crear",
        GO_BACK: "Ir atrás",
        INVALID_USERNAME: "Usuario inválido",
        PASSWORD_MIN: "Mínimo 4 caracteres",
        CREATE_CREDENTIAL: "Crear credencial",
        UPDATE_CREDENTIAL: "Actualizar credencial",
        UPDATE: "Actualizar",
        ADMIN_CREDENTIALS: "Administrar credenciales",
        CREDENTIALS: "Credenciales",
        ACTIONS: "Acciones",
        ADMIN_FORMATIONS: "Administrar Formaciones",
        SEARCH_FORMATIONS_IN_LIST: "Buscar Formaciones en la lista",
        CREATE_FORMATION: "Crear Formación",
        PRICE: "Precio",
        MAX_PEOPLE: "Max. Personas",
        CONFIRMED: "Confirmada",
        FORMATIONS: "Formaciones",
        SELECT_PLACE: "Seleccione el lugar",
        INSERT_PRICE: "Inserte el precio",
        ONLY_NUMBER: "Solo números",
        INSERT_MAX_PEOPLE: "Inserte Cant. Max. Personas",
        SELECT_PSYCHOLOGIST: "Seleccione el Psicólogo",
        SELECT_BAFM: "Seleccione BAFM/BAFCRI",
        INSERT_DATES: "Inserte fechas",
        INSERT: "Insertar",
        DATES: "Fechas",
        PEAK_DATE: "Seleccione fecha",
        SEARCH_ANIMATOR_IN_LIST: "Buscar trabajador en la lista",
        ADMIN_ANIMATORS: "Administrar trabajadores",
        CREATE_ANIMATOR: "Crear trabajador",
        FIRST_NAME: "Apellidos",
        TYPE: "Tipo",
        PSYCHOLOGIST: "Psicólogo",
        EDIT_ANIMATOR: "Editar trabajador",
        NOTHING_TO_SHOW: "Nada para mostrar",
        MORNING: "Mañana",
        AFTERNOON: "Tarde",
        START: "Inicio",
        END: "Fin",
        INSERT_VALID_DATE: "Inserte una fecha válida",
        UPDATE_FORMATION_CENTER: "Actualizar Centro de Formación",
        UPDATE_DATES: "Actualizar fechas",
        ANIMATORS:"Trabajadores",
        PLACE:"Lugares",
        BILLS:"Cuentas",
        ALERTS:"Alertas",
        SEARCH_CREDENTIAL_IN_LIST: "Buscar credenciales en la lista",
        ITEMS_PER_PAGE: "Elementos por página",
        INVALID_MORNING_TIME_RANGE: "Rango de tiempo inválido en la mañana",
        INVALID_AFTERNOON_TIME_RANGE: "Rango de tiempo inválido en la tarde",
        DETAILS:"Detalles",
        DETAILS_FORMATION_CENTER:"Detalles del Centro de Formación",
        DETAILS_FORMATION_INFO:"Detalles de la formación",
        DETAILS_DATES:"Fechas",
        DETAILS_FORMATION:"Detalles",
        ADRESS_FORMATION:"Dirección",
        MAX_PEOPLE_FORMATION:"Cantidad máxima",
        CURRENT_PEOPLE_FORMATION:"Cantidad actual",
        OPTION_FORMATION:"Otros detalles",
        DETAILS_DATES:"Fechas",
        DETAILS_PLACE:"Lugar",
        DETAILS_PRICE:"Precio",
        DETAILS_MAX_PEOPLE:"Cantidad máxima",
        DETAILS_PSYCHOLOGIST:"Psicólogo",
        DETAILS_BAFM:"Bafm",
        VIEW_USER:"Administrar usuarios",
        EDIT_USER:"Editar",
        ADMIN_USER_PAGE_HEAD:"Administrar clientes",
        ADMIN_USER_PAGE_HEAD_DESCRIPTION:"En esta vista se podra administrar los clientes de una formación.",
        NAME_USER:"Nombre",
        NAME_USER_ERROR:"Nompre incorrecto",
        FIRTS_NAME:"Apellidos",
        FIRST_NAME_ERROR:"Apellidos incorrecto",
        PHONENUMBER_TEXT:"Telefono",
        PHONENUMBER:"034453456",
        PHONENUMBER_ERROR:"Telefono incorrecto",
        TABLE_USER_NAME:"Nombre",
        TABLE_USER_FIRSTNAME:"Apellidos",
        TABLE_USER_ADDRESS:"Dirección",
        TABLE_USER_PHONENUMBER:"Telefono",
        TABLE_USER_EMAIL:"Correo",
        TABLE_PLACE_ACTIONS:"Acciones",
        OTHER_DATA_USER_SEARCH:"Otra información",
        CONVOCATION:"Convocatoria",
        CUSTOMER_DATA:"Información de usuario",
        TITLE_ATTESTATION_PAGE:"ATTESTATION DE SUIVI DE STAGE",
        ATTESTATION_CAS1_PAGE:"Cas 1 : Stage volontaire.",
        ATTESTATION_CAS2_PAGE:"Cas 2 : Stage obligatoire pour les conducteurs qui ont commis pendant le délai probatoire une infraction ayant donné lieu à une perte d'au moins  trois points.",
        ATTESTATION_CAS3_PAGE:"Cas 3 : Stage en alternative à la poursuite judiciaire proposé par le Procureur de la République ou en exécution d'une composition pénale.",
        ATTESTATION_CAS4_PAGE:"Cas 4 : Peine complémentaire ou obligation imposée dans le cadre du sursis avec mise à l'épreuve.",
        FOOT_SING_ATTESTATION_PAGE:"Je soussigné(e)",
        TEXT_SING_ATTESTATION_PAGE:"Responsable de la formation spécifique, titulaire de l’Agrément Préfectoral",
        END_SING_ATTESTATION_PAGE:"atteste que",
        SQUARE_LINE1_ATTESTATION_PAGE:"Rubrique à compléter uniquement dans les cas 2 à 4.",
        SQUARE_LINE1_ATTESTATION_PAGE:"Ayant commis une infraction au code de la route.",
        CENTER_DIRECTOR_ATTESTATION_PAGE:"Directeur du centre",
        WORKERS_ATTESTATION_PAGE:"Animateurs",
        CUSTOMERS_ATTESTATION_PAGE:"Stagiaire",
        DATE_CONFIRMATION_ATTESTATION_PAGE:"a suivi le stage de formation spécifique correspondant au cas visé ci-dessus, qui s’est déroulé",
        SING:"Signature",
        SINGS:"Signatures",
        SING_CACHET:"Signature et Cachet ",
        N_0:"N° ",
        NAME_ATTESTATION_PAGE:"Name",
        BIRTHDATE_ATTESTATION_PAGE:"Date de naissance",
        ADDRESS_ATTESTATION_PAGE:"Résidant à",
        ZIPCODE_ATTESTATION_PAGE:"Code postal",
        NOLICENCE_ATTESTATION_PAGE:"N° de permis",
        NOLICENCEDATE_ATTESTATION_PAGE:"Délivré le",
        FIRSTNAME_ATTESTATION_PAGE:"Prénom",
        BIRTHCITY_ATTESTATION_PAGE:"Lieu de naissance",
        LIVEADDRESS_ATTESTATION_PAGE:"Ville",
        NOLICENCEPLACE_ATTESTATION_PAGE:"Par la Préfecture de",
        DATE_ARTICLE: "Creado el ",
        ERROR_USING_AUTH_SERVICE: "Error usando servicio de autenticación",
        INVALID_USERNAME_PASSWORD: "Combinación usuario/contraseña inválida. Verifique y trate otra vez.",
        CREDENTIAL_CREATED: "Credencial creada",
        ERROR_USING_SERVICE: "Error usando el servicio",
        ERROR_SEARCHING_CREDENTIALS: "Error buscando credenciales",
        ERROR_SEARCHING_CREDENTIAL: "Error buscando credencial",
        ERROR_DELETE_ACTUAL_CREDENTIAL: "No se puede eliminar la credencial actual",
        ERROR_UPDATE_ACTUAL_CREDENTIAL: "No se puede actualizar la credencial actual",
        DELETE_CREDENTIAL_CONFIRMATION: "Está a punto de eliminar esta credencial. Continuar?",
        CREDENTIAL_DELETED: "Credencial eliminada",
        ERROR_DELETING_CREDENTIAL: "Error eliminando credencial",
        UPDATE_CREDENTIAL_CONFIRMATION: "Está a punto de actualizar esta credencial. Continuar?",
        CONFIRMATION: "Confirmación",
        ERROR: "Error",
        INFO: "Info",
        ENTER_VALID_PARAMETER_OR_MAKE_CHANGES: "Entre nuevos parámetros válidos, o realice algun cambio",
        CREDENTIAL_UPDATED: "Credencial actualizada",
        CREDENTIAL_NOT_UPDATED: "Credencial no actualizada",
        DELETE_FORMATION_CONFIRMATION: "Está a punto de eliminar esta formación. Continuar?",
        FORMATION_DELETED: "Formación eliminada",
        ERROR_DELETING_FORMATION: "Error eliminando formación",
        ERROR_SEARCHING_FORMATION: "Error buscando formación",
        ERROR_SEARCHING_PLACES: "Error buscando lugares",
        ERROR_SEARCHING_ANIMATORS_PSY: "Error buscando animators PSY",
        ERROR_SEARCHING_ANIMATORS_BAFM: "Error buscando animators BAFM",
        UPDATE_FORMATION_CONFIRMATION: "Está a punto de actualizar esta formación. Continuar?",
        FORMATION_UPDATED: "Formación actualizada",
        ERROR_UPDATING_FORMATION: "Error actualizando formación",
        FORMATION_CREATED: "Formación creada",
        ERROR_CREATING_FORMATION: "Error creando formación",
        ERROR_SEARCHING_ANIMATORS: "Error buscando trabajadores",
        ERROR_SEARCHING_ANIMATOR: "Error buscando trabajador",
        DELETE_ANIMATOR_CONFIRMATION: "Está a punto de eliminar este trabajador. Continuar?",
        ANIMATOR_DELETED: "Trabajador eliminado",
        ERROR_DELETING_ANIMATOR: "Error eliminando trabajador",
        UPDATE_ANIMATOR_CONFIRMATION: "Está a punto de actualizar este trabajador. Continuar?",
        ANIMATOR_UPDATED: "Trabajador actualizado",
        ERROR_UPDATING_ANIMATOR: "Error actualizando trabajador",
        ANIMATOR_CREATED: "Trabajador creado",
        ERROR_CREATING_ANIMATOR: "Error creando trabajador",
        PRINT:"IMPRIMIR",
        TABLE_PLACE_NAME:"Nombre",
        TABLE_PLACE_ADDRESS:"Dirección",
        TABLE_PLACE_POSTAL_CODE:"Postal code",
        TABLE_PLACE_CITY:"City",
        TABLE_PLACE_AGREMENT:"Agrement",
        TABLE_PLACE_ACTIVATED:"Activated",
        TABLE_PLACE_ACTIONS:"Actions",
        //------ Piterson last change -------------------
        WAITING_ROOM: "Sala de espera",
        DOCUMENTS: "Documentos",
        ERROR_PRINTING_WAITING_ROOM: "Error imprimiento lista de clientes en la sala de espera",
        ADD_CUSTOMER: "Adicionar cliente desde la sala de espera",
        ADD_CUSTOMERS_TO_FORMATIONS: "Adicionar clientes de la sala de espera a las formaciones",
        ERROR_SEARCHING_CUSTOMERS: "Error buscando clientes",
        ADD: "Adicionar"

    });
     $translateProvider.preferredLanguage('en');
});