import {Api} from '../Modules/Api.js';
import EventBus from '../Modules/EventBus.js';
import Validators from '../Modules/Validators';
import {REGISTER_VIEW_NAMES} from '../Consts/ViewConsts';
import {API_FAILED, LOGIN_REGISTER_EVENTS} from '../Modules/EventBusEvents';

const statusUnathorized = 401;

/**
 * User class
 */
export class User {
    id;

    /**
     * Create new user
     * @param {number|null|undefined} id
     */
    constructor(id = null) {
        this.id = id;
    }

    /**
     * Process api /user result
     * @param {ApiResult} result
     */
    #processAuthResult(result) {
        if (result.Status === statusUnathorized) {
            this.id = -1;
            EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userNotLoggined);
            return;
        }
        if (!result.isOk()) {
            EventBus.emitEvent(API_FAILED, result);
            return;
        }
        this.id = +result.Body.ID;
        EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userLoggined);
    }

    /**
     * Check user already loggined
     * @return {Promise<void>}
     * @constructor
     */
    async checkLogin() {
        if (this.id === -1) {
            EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userNotLoggined);
            return;
        }
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
            EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userValidationFailed, validationRes);
            return;
        }

        const result = await Api.LogIn({Email: email, Password: password});
        this.#processAuthResult(result);
    }

    /**
     * Register user
     * @param {string} email
     * @param {string} password
     * @param {string} passwordRepeat
     * @return {Promise<void>}
     * @constructor
     */
    async logUp({email, password, passwordRepeat}) {
        const validationRes = Validators.validateEmailPasswordRepeatPassword({email, password, passwordRepeat});
        if (validationRes) {
            EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userValidationFailed, validationRes);
            return;
        }
        const result = await Api.LogUp({Email: email, Password: password});
        if (result.Status === 409) {
            EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userValidationFailed, {email: REGISTER_VIEW_NAMES.userEmailUsed});
            return;
        }

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
            EventBus.emitEvent(API_FAILED, result);
            return;
        }
        this.id = -1;
        EventBus.emitEvent(LOGIN_REGISTER_EVENTS.userNotLoggined);
    }
}

const activeUser = new User();
export default activeUser;
