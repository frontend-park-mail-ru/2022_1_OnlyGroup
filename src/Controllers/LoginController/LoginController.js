import {LoginView} from '../../views/LoginView/LoginView.js';
import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import router, {AppPaths} from '../../Modules/Router';

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
            'user-not-loginned-registered': this.userNotLoggined,
            'user-validation-failed': this.userValidationFailed,
            'api-failed': this.apiFailed,
            'user-loggined': this.userLoggined,
        });
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
    userLoggined = () => {
        router.go(AppPaths.findCandidatePage);
    }

    /**
     * @callback Callback user not loggined
     */
    userNotLoggined = ({message}) => {
        this.view.setErrors({email: '', password: '', main: message});
        this.view.reRender();
    }

    /**
     * @callback Callback validation user data failed
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    userValidationFailed = ({email, password}) => {
        this.view.setErrors({email: email, password: password, main: ''});
        this.view.reRender();
    }

    /**
     * Start controller and check user loggined
     */
    start() {
        this.view.clear();
        super.start();
        activeUser.CheckLogin();
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


