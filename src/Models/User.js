import {Api} from '../Modules/Api.js';
import EventBus from '../Modules/EventBus.js';
import Validators from '../Modules/Validators';
import {apiFailed, loginRegisterEvents} from '../Modules/EventBusEvents';

const statusUnathorized = 401;

/**
 * User class
 */
class User {
    #id;

    /**
     * Create new user
     * @param {number|null|undefined} id
     */
    constructor(id = null) {
        this.#id = id;
    }

    /**
     * Process api /user result
     * @param {ApiResult} result
     */
    #processAuthResult(result) {
        if (result.Status === statusUnathorized) {
            this.id = -1;
            EventBus.emitEvent(loginRegisterEvents.userNotLoggined);
            return;
        }
        if (!result.isOk()) {
            EventBus.emitEvent(apiFailed, result);
            return;
        }
        this.id = +result.Body.ID;
        EventBus.emitEvent(loginRegisterEvents.userLoggined);
    }

    /**
     * Check user already loggined
     * @return {Promise<void>}
     * @constructor
     */
    async checkLogin() {
        const result = await Api.CheckLogin();
        this.#processAuthResult(result);
    }

    /**
     * Login user
     * @param {string} email
     * @param {string} password
     * @return {Promise<void>}
     * @constructor
     */
    async login({email, password}) {
        const validationRes = Validators.validateEmailPasswordRepeatPassword({email, password});
        if (validationRes) {
            EventBus.emitEvent(loginRegisterEvents.userValidationFailed, validationRes);
            return;
        }

        const result = await Api.LogIn({Email: email, Password: password});
        this.#processAuthResult(result);
    }

    /**
     * Logup user
     * @param {string} email
     * @param {string} password
     * @param {string} passwordRepeat
     * @return {Promise<void>}
     * @constructor
     */
    async logUp({email, password, passwordRepeat}) {
        const validationRes = Validators.validateEmailPasswordRepeatPassword({email, password, passwordRepeat});
        if (validationRes) {
            EventBus.emitEvent(loginRegisterEvents.userValidationFailed, validationRes);
            return;
        }
        const result = await Api.LogUp({Email: email, Password: password});
        this.#processAuthResult(result);
    }

    /**
     * Logout user
     * @return {Promise<void>}
     * @constructor
     */
    async logOut() {
        const result = Api.LogOut();
        if (!result.isOk()) {
            EventBus.emitEvent(apiFailed, result);
            return;
        }
        this.#id = -1;
        EventBus.emitEvent(loginRegisterEvents.userNotLoggined);
    }
}

const activeUser = new User();
export default activeUser;
