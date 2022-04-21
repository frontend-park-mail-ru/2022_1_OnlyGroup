import {LOGIN_VIEW_NAMES} from './ViewConsts';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPatternLowerCase = `[a-z]+`;
const passwordPatternUpperCase = `[A-Z]+`;
const passwordPatternNumber = `[0-9]+`;
const passwordMinLength = 6;
const passwordMaxLength = 32;

/**
 * Validators class
 */
export default class Validators {
    /**
     * Validate email
     * @param {string} email
     * @return {RegExpMatchArray}
     */
    static validateEmail(email) {
        return String(email).toLowerCase().match(emailPattern);
    }


    /**
     * Validate password
     * @param {string} password
     * @return {boolean|RegExpMatchArray}
     */
    static validatePassword(password) {
        const passwordString = String(password);
        if (passwordString.length < passwordMinLength || passwordString.length > passwordMaxLength) {
            return false;
        }
        return passwordString.match(passwordPatternLowerCase) && passwordString.match(passwordPatternUpperCase) &&
            passwordString.match(passwordPatternNumber);
    }

    /**
     * Validate all user credentials(email, password, repeatPassword)
     * @param {string} email
     * @param {string} password
     * @param {string|null|undefined} passwordRepeat
     * @return {null|{password: string, passwordRepeat: string, email: string}}
     */
    static validateEmailPasswordRepeatPassword({email, password, passwordRepeat = null}) {
        let validationFailed = false;
        let validationError = {'email': '', 'password': '', 'passwordRepeat': ''};
        if (!this.validateEmail(email)) {
            validationFailed = true;
            validationError.email = LOGIN_VIEW_NAMES.emailVerificationFailed;
        }
        if (!this.validatePassword(password)) {
            validationFailed = true;
            validationError.password = LOGIN_VIEW_NAMES.passwordVerificationFailed;
        }
        passwordRepeat = (passwordRepeat === undefined) ? null : passwordRepeat;
        if (passwordRepeat && passwordRepeat !== password) {
            // TODO password name
            validationError.passwordRepeat = 'TODO';
            validationError = true;
        }
        if (validationFailed) {
            return validationError;
        }
        return null;
    }
}
