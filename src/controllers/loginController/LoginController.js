import {LoginView} from '../../views/LoginView/LoginView.js';
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
        super({view: LoginView});
        super.setEvents({
            'action-login': this.actionLogin,
            'user-unloginned': this.userUnloggined,
            'user-validation-failed': this.userValidationFailed,
            'api-failed': this.apiFailed,
            'user-loggined': this.userLoggined,
        });
    }

    /**
     * @callback Callback form submitted
     * @param {string}email
     * @param {string}Password
     */
    actionLogin = ({email, password}) => {
        activeUser.Login({email, password});
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
        this.view.setErrors({email: false, password: false, main: true});
        this.view.reRender();
    }

    /**
     * @callback Callback validation user data failed
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    userValidationFailed = ({email, password, passwordRepeat}) => {
        this.view.setErrors({email: email, password: password, main: false});
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


