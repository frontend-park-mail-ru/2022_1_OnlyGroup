import {LoginView} from '../../Views/LoginView/LoginView.js';
import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {API_FAILED, LOGIN_EVENTS} from '../../Modules/EventBusEvents';
import {APP_PATHS, REDIRECT} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';

/**
 * Login controller
 */
export default new class LoginController extends BaseController {
    /**
     * Create new login controller
     */
    constructor() {
        super({view: LoginView, authRequired: false});
        super.setEvents({
            [LOGIN_EVENTS.login]: this.login,
            [API_FAILED]: this.apiFailed,
        });
    }

    /**
     * @callback Callback form submitted
     * @param {string} email
     * @param {string} Password
     */
    login = ({email, password}) => {
        activeUser.login({email, password});
    }

    /**
     * @callback Callback user sucsessfully loggined
     */
    userLoggined = () => {
        EventBus.emitEvent(REDIRECT, {path: APP_PATHS.findCandidatePage});
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
    async start() {
        EventBus.addEventListener(LOGIN_EVENTS.userLoggined, this.userLoggined);
        await activeUser.checkLogin();
        await super.start();
    }

    /**
     * Stop login controller
     */
    stop() {
        EventBus.removeEventListener(LOGIN_EVENTS.userLoggined, this.userLoggined);
        super.stop();
    }
};
