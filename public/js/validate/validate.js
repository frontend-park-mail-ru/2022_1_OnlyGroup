/* Email can contain: numbers (0-9), lowercase letters (a-z),
   uppercase letters (A-Z) and must contain '@', '.' characters */
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/* Password must contain: numbers (0-9), lowercase letters (a-z),
   uppercase letters (A-Z) and password length must be at least 6 characters */
const passwordRegExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;
/* Text input can contain: lowercase letters (a-z), uppercase letters (A-Z)
   and text length must be at least 1 characters */
const textRegExp = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{1,}/g;
/* Age need contain only numbers (0-9) and age value must be at least 2 numbers */
const ageRegExp = /(?=.*[0-9])[0-9]{2,}/g;
const invalidEmail = "Email can contain numbers, lowercase letters, uppercase letters and must contain '@', '.' characters";
const invalidPassword = "Password must contain numbers, lowercase letters, uppercase letters and must be at least 6 characters";
const invalidEqual = "Paswords are not equal";
const invalidText = "Field must contain only letters and must be at least 1 characters";
const invalidAge = "Field must contain only numbers and must be at least 2 numbers";

const emptyResult = {
    validationResult: false,
    validationText: 'Field must be filled',
};

const validResult = {
    validationResult: true,
    validationText: '',
};

/**
 * Validation class
 */
export class Validation {
    /**
     * Validating email with RegExp
     * @param {string} email
     * @return {Object}
     */
    static validateEmail = (email) => {
        if (email === '') {
            return emptyResult;
        }

        if (!emailRegExp.test(email)) {
            return {
                validationResult: false,
                validationText: invalidEmail,
            };
        }

        return validResult;
    };

    /**
     * Validating password with RegExp
     * @param {string} password
     * @return {Object}
     */
    static validatePassword = (password) => {
        if (password === '') {
            return emptyResult;
        }

        if (!passwordRegExp.test(password)) {
            return {
                validationResult: false,
                validationText: invalidPassword,
            };
        }

        return validResult;
    };

    /**
     * Validating passwords on equal
     * @param {string} password
     * @param {string} repeatedPassword
     * @return {Object}
     */
    static validatePasswordsRepeat = (password, repeatedPassword) => {
        if (password !== repeatedPassword) {
            return {
                validationResult: false,
                validationText: invalidEqual,
            };
        }

        return validResult;
    };

    /**
     * Validating text input with RegExp
     * @param {string} text
     * @return {Object}
     */
    static validateText = (text) => {
        if (text === '') {
            return emptyResult;
        } 

        if (!textRegExp.test(text)) {
            return {
                validationResult: false,
                validationText: invalidText,
            };
        }

        return validResult;
    };

    /**
     * Validating age input with RegExp
     * @param {string} age
     * @return {Object}
     */
    static validateAge = (age) => {
        if (age === '') {
            return emptyResult;
        }

        if (!ageRegExp.test(age)) {
            return {
                validationResult: false,
                validationText: invalidAge,
            };
        }

        return validResult;
    }
}

