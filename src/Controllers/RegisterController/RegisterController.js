import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {RegisterView} from '../../Views/RegisterView/RegisterView';
import {apiFailed, loginRegisterEvents} from '../../Modules/EventBusEvents';

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
            [loginRegisterEvents.actionRegister]: this.actionRegister,
            [loginRegisterEvents.userNotLoggined]: this.userNotLoggined,
            [loginRegisterEvents.userValidationFailed]: this.userValidationFailed,
            [apiFailed]: this.apiFailed,
            [loginRegisterEvents.userLoggined]: this.userRegistered,
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
        // TODO router.go('/');
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


