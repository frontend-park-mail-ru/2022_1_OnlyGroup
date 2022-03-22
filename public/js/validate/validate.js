/* Email can contain: numbers (0-9), lowercase letters (a-z),
   uppercase letters (A-Z) and must contain '@', '.' characters */
const emailRegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
/* Text input can contain: lowercase letters (a-z),
   uppercase letters (A-Z) and text length
   must be at least 1 characters */
const textRegExp = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{1,}/g;
/* Age need contain only numbers (0-9)
   and age value must be at least 2 numbers */
const yearOfBirth = /(?=.*[0-9])[0-9]{4,}/g;
const invalidEmail = `Email can contain numbers, lowercase letters, 
                      letters and must contain '@', '.' characters`;
const invalidEqual = 'Paswords are not equal';
const invalidText = `Field must contain only letters 
                     and must be at least 1 characters`;
const invalidAge = `Field must contain only numbers 
                    and must be at least 2 numbers`;
const emptyField = 'Field must be filled';

/**
 * Validation class
 */
export class Validation {
  /**
    * Validating email with RegExp
    * @param {string} email
    * @return {String}
    */
  static validateEmail(email) {
    if (email === '') {
      return emptyField;
    }

    if (!emailRegExp.test(email)) {
      return invalidEmail;
    }

    return '';
  }

  /**
    * Validating password with RegExp
    * @param {string} password
    * @return {String}
    */
  static validatePassword(password) {
    if (password === '') {
      return emptyField;
    }

    return '';
  }

  /**
    * Validating passwords on equal
    * @param {string} password
    * @param {string} repeatedPassword
    * @return {String}
    */
  static validatePasswordsRepeat(password, repeatedPassword) {
    if (password !== repeatedPassword) {
      return invalidEqual;
    }

    return '';
  }

  /**
    * Validating text input with RegExp
    * @param {string} text
    * @return {String}
    */
  static validateText(text) {
    if (text === '') {
      return emptyField;
    }

    if (!textRegExp.test(text)) {
      return invalidText;
    }

    return '';
  }

  /**
    * Validating age input with RegExp
    * @param {string} year
    * @return {String}
    */
  static validateAge(year) {
    if (year === '') {
      return emptyField;
    }

    if (!yearOfBirth.test(year)) {
      return invalidAge;
    }

    return '';
  }
}


