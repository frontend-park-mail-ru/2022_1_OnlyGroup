import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {RegisterView} from '../../Views/RegisterView/RegisterView';
import {APP_PATHS} from '../../Modules/Router';
import {API_FAILED, LOGIN_EVENTS, REDIRECT} from '../../Modules/EventBusEvents';
import EventBus from '../../Modules/EventBus';

/**
 * Login controller
 */
export default new class RegisterController extends BaseController {
    /**
     * Create new login controller
     */
    constructor() {
        super({view: RegisterView, authRequired: false});
        super.setEvents({
            [LOGIN_EVENTS.register]: this.register,
            [API_FAILED]: this.apiFailed,
        });
    }

    /**
     * @callback Callback register form submitted
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    register({email, password, passwordRepeat}) {
        activeUser.logUp({email, password, passwordRepeat});
    }

    /**
     * @callback Callback user sucsessfully loggined
     */
    userRegistered = () => {
        EventBus.emitEvent(REDIRECT, {path: APP_PATHS.findCandidatePage});
    }

    /**
     * Start controller
     */
    async start() {
        EventBus.addEventListener(LOGIN_EVENTS.userLoggined, this.userRegistered);
        await activeUser.checkLogin();
        await super.start();
    }

    /**
     * Stop register controller
     */
    stop() {
        EventBus.removeEventListener(LOGIN_EVENTS.userLoggined, this.userRegistered);
        super.stop();
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


