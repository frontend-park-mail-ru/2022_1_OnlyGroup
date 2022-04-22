import {LoginView} from '../../Views/LoginView/LoginView.js';
import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {API_FAILED, LOGIN_REGISTER_EVENTS} from '../../Modules/EventBusEvents';

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
            [LOGIN_REGISTER_EVENTS.actionLogin]: this.actionLogin,
            [API_FAILED]: this.apiFailed,
            [LOGIN_REGISTER_EVENTS.userLoggined]: this.userLoggined,
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
     * @callback Callback api failed
     * @param {string} ErrorMsg
     */
    apiFailed = ({ErrorMsg}) => {
        // TODO api error processing
        alert(`Api error ${ErrorMsg}`);
    }

    /**
     * Start login controller
     */
    start() {
        super.start();
        activeUser.checkLogin();
    }
};
