import {LoginRegisterView} from '../../views/LoginRegisterView/LoginRegisterView.js';
import activeUser from '../../Models/User';
import {BaseController} from '../base/BaseController';

/**
 * Login controller
 */
export default new class LoginController extends BaseController {
    /**
     * Create new login controller
     */
    constructor() {
        super({view: LoginRegisterView});
        super.setEvents({
            'action-login': this.actionLogin,
            'action-register': this.actionRegister,
            'user-not-loginned-registered': this.userNotLogginedRegistered,
            'user-validation-failed': this.userValidationFailed,
            'api-failed': this.apiFailed,
            'user-loggined': this.userLogginedRegistered,
        });
    }

    /**
     * @callback Callback register form submitted
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    actionRegister({email, password, passwordRepeat}) {
        activeUser.LogUp({email, password, passwordRepeat});
    }

    /**
     * @callback Callback login form submitted
     * @param {string}email
     * @param {string}Password
     */
    actionLogin = ({email, password}) => {
        activeUser.Login({email, password});
    }

    /**
     * @callback Callback user sucsessfully loggined
     */
    userLogginedRegistered = () => {
        // TODO router.go('/');
    }

    /**
     * @callback Callback user not loggined
     */
    userNotLogginedRegistered = ({message}) => {
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
     * @callback Callback api failed
     * @param {string}ErrorMsg
     */
    apiFailed = ({ErrorMsg}) => {
        // TODO api error processing
        alert(`Api error ${ErrorMsg}`);
    }
};


