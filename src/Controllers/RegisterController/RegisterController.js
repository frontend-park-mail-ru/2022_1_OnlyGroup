import activeUser from '../../Models/User';
import {BaseController} from '../Base/BaseController';
import {RegisterView} from '../../Views/RegisterView/RegisterView';
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
        // TODO router.go('/');
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


