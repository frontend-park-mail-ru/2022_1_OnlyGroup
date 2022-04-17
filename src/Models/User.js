import {Api} from '../Modules/Api.js';
import EventBus from '../Modules/EventBus.js';
import {loginViewNames, registerViewNames} from '../Modules/ViewConsts';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPatternLowerCase = `[a-z]+`;
const passwordPatternUpperCase = `[A-Z]+`;
const passwordPatternNumber = `[0-9]+`;
const passwordMinLength = 6;
const passwordMaxLength = 32;
const statusUnathorized = 401;

/**
 * User class
 */
class User {
    id;

    /**
     * Create new user
     * @param {number|null|undefined}id
     */
    constructor(id = null) {
        this.id = id;
    }

    /**
     * Validate user email
     * @param {string}email
     * @return {RegExpMatchArray}
     */
    static #validateEmail(email) {
        return String(email).toLowerCase().match(emailPattern);
    }

    /**
     * Validate user password
     * @param {string}password
     * @return {boolean|RegExpMatchArray}
     */
    static #validatePassword(password) {
        const passwordString = String(password);
        if (passwordString.length < passwordMinLength || passwordString.length > passwordMaxLength) {
            return false;
        }
        return passwordString.match(passwordPatternLowerCase) && passwordString.match(passwordPatternUpperCase) &&
            passwordString.match(passwordPatternNumber);
    }

    /**
     * @param {string}email
     * @param {string}password
     * @param {string|null|undefined}passwordRepeat
     * @return {null|{password: string, passwordRepeat: string, email: string}}
     */
    static #validateEmailPasswordRepeatPassword({email, password, passwordRepeat = null}) {
        let validationFailed = false;
        const validationError = {'email': '', 'password': '', 'passwordRepeat': ''};
        if (!User.#validateEmail(email)) {
            validationFailed = true;
            validationError.email = loginViewNames.emailVerificationFailed;
        }
        if (!User.#validatePassword(password)) {
            validationFailed = true;
            validationError.password = loginViewNames.passwordVerificationFailed;
        }
        passwordRepeat = (passwordRepeat === undefined) ? null : passwordRepeat;
        if (passwordRepeat !== null && (passwordRepeat.length === 0 || passwordRepeat !== password)) {
            validationFailed = true;
            validationError.passwordRepeat = registerViewNames.passwordRepeatVerifictionFailed;
        }
        if (validationFailed) {
            return validationError;
        }
        return null;
    }

    /**
     * Process api /user result
     * @param {ApiResult}result
     */
    #processAuthResult(result) {
        if (result.Status === statusUnathorized) {
            this.id = -1;
            EventBus.emitEvent('user-unloginned');
            return;
        }
        if (!result.isOk()) {
            EventBus.emitEvent('api-failed', result);
            return;
        }
        this.id = +result.Body.ID;
        EventBus.emitEvent('user-loggined');
    }

    /**
     * Check user already loggined
     * @return {Promise<void>}
     * @constructor
     */
    async CheckLogin() {
        if (this.id === -1) {
            EventBus.emitEvent('user-unloginned');
            return;
        }
        if (this.id !== null) {
            EventBus.emitEvent('user-loggined');
            return;
        }
        const result = await Api.CheckLogin();
        this.#processAuthResult(result);
    }

    /**
     * Login user
     * @param {string}email
     * @param {string}password
     * @return {Promise<void>}
     * @constructor
     */
    async Login({email, password}) {
        const validationRes = User.#validateEmailPasswordRepeatPassword({email, password});
        if (validationRes) {
            EventBus.emitEvent('user-validation-failed', validationRes);
            return;
        }

        const result = await Api.LogIn({Email: email, Password: password});
        this.#processAuthResult(result);
    }

    /**
     * Logup user
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     * @return {Promise<void>}
     * @constructor
     */
    async LogUp({email, password, passwordRepeat}) {
        const validationRes = User.#validateEmailPasswordRepeatPassword({email, password, passwordRepeat});
        if (validationRes) {
            EventBus.emitEvent('user-validation-failed', validationRes);
            return;
        }
        const result = await Api.LogUp({Email: email, Password: password});
        if (result.Status === 409) {
            EventBus.emitEvent('user-not-loginned-registered', {message: registerViewNames.userEmailUsed});
            return;
        }

        this.#processAuthResult(result);
    }

    /**
     * Logout user
     * @return {Promise<void>}
     * @constructor
     */
    async LogOut() {
        const result = await Api.LogOut();
        if (!result.isOk()) {
            EventBus.emitEvent('api-failed', result);
            return;
        }
        this.id = -1;
        EventBus.emitEvent('user-unloginned');
    }
}

const activeUser = new User();
export default activeUser;
