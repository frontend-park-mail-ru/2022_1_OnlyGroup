import {LoginView} from '../../Views/LoginView/LoginView.js';
import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {apiFailed, loginRegisterEvents} from '../../Modules/EventBusEvents';
import {loginViewNames} from '../../Modules/ViewConsts';

/**
 * Login controller
 */
export default new class LoginController extends BaseController {
    /**
     * Create new login controller
     */
    constructor() {
        super({view: LoginView});
        super.setEvents({
            [loginRegisterEvents.actionLogin]: this.actionLogin,
            [loginRegisterEvents.userNotLoggined]: this.userUnloggined,
            [loginRegisterEvents.userValidationFailed]: this.userValidationFailed,
            [apiFailed]: this.apiFailed,
            [loginRegisterEvents.userLoggined]: this.userLoggined,
        });
    }

    /**
     * @callback Callback form submitted
     * @param {string} email
     * @param {string} Password
     */
    actionLogin = ({email, password}) => {
        activeUser.login({email, password});
    }

    /**
     * @callback Callback user sucsessfully loggined
     */
    userLoggined = () => {
        // TODO router.go('/');
    }

    /**
     * @callback Callback user not loggined
     */
    userUnloggined = () => {
        this.view.setErrors({email: '', password: '', main: loginViewNames.userLoginFailed});
        this.view.reRender();
    }

    /**
     * @callback Callback validation user data failed
     * @param {string} email
     * @param {string} password
     */
    userValidationFailed = ({email, password}) => {
        this.view.setErrors({email: email, password: password, main: ''});
        this.view.reRender();
    }

    /**
     * @callback Callback api failed
     * @param {string} ErrorMsg
     */
    apiFailed = ({ErrorMsg}) => {
        // TODO api error processing
        alert(`Api error ${ErrorMsg}`);
    }
};


