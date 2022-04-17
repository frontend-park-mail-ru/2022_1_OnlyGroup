import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {RegisterView} from '../../views/RegisterView/RegisterView';

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
            'action-register': this.actionRegister,
            'user-not-loginned-registered': this.userNotRegistered,
            'user-validation-failed': this.userValidationFailed,
            'api-failed': this.apiFailed,
            'user-loggined': this.userRegistered,
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
     * @callback Callback user sucsessfully loggined
     */
    userRegistered = () => {
        // TODO router.go('/');
    }

    /**
     * @callback Callback user not loggined
     */
    userNotRegistered = ({message}) => {
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


