import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {RegisterView} from '../../views/RegisterView/RegisterView';
import router, {APP_PATHS} from '../../Modules/Router';
import {API_FAILED, LOGIN_REGISTER_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Login controller
 */
export default new class RegisterController extends BaseController {
    /**
     * Create new login controller
     */
    constructor() {
        super({view: RegisterView});
        super.setEvents({
            [LOGIN_REGISTER_EVENTS.actionRegister]: this.actionRegister,
            [LOGIN_REGISTER_EVENTS.userNotLoggined]: this.userNotLoggined,
            [LOGIN_REGISTER_EVENTS.userValidationFailed]: this.userValidationFailed,
            [API_FAILED]: this.apiFailed,
            [LOGIN_REGISTER_EVENTS.userLoggined]: this.userRegistered,
        });
    }

    /**
     * @callback Callback register form submitted
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    actionRegister({email, password, passwordRepeat}) {
        activeUser.logUp({email, password, passwordRepeat});
    }

    /**
     * @callback Callback user sucsessfully loggined
     */
    userRegistered = () => {
        router.go(APP_PATHS.findCandidatePage);
    }

    /**
     * @callback Callback user not loggined
     */
    userNotLoggined = ({message}) => {
        this.view.setErrors({email: '', password: '', passwordRepeat: '', main: message});
        this.view.reRender();
    }

    /**
     * @callback Callback validation user data failed
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    userValidationFailed = ({email, password, passwordRepeat}) => {
        this.view.setErrors({email: email, password: password, passwordRepeat: passwordRepeat, main: ''});
        this.view.reRender();
    }

    /**
     * Start controller and check user loggined
     */
    start() {
        super.start();
        activeUser.checkLogin();
    }

    /**
     * @callback Callback api failed
     * @param {string}ErrorMsg
     */
    apiFailed = ({ErrorMsg}) => {
        // TODO api error processing
        alert(`Api error ${ErrorMsg}`);
    }
};


