import {SignInValidation} from '../validate/signInValidate.js';
import router from '../../router/router.js';
import {Api} from '../api/api.js';
import {Errors} from '../modules/errors.js';
import activeUser from '../api/user.js';

/**
 * Sign in events
 */
export class SignInForm {
/**
  * Event of form submit
  * @param {Event} event
  */
  static formSubmitEvent = async (event)=> {
    event.preventDefault();
    if (this.#validateErrors() !== 0) {
      return;
    }
    const fields = this.#getFormData();
    let response = await Api.logIn(fields.emailField.value, fields.passwordField.value);
    if (!response.status) {
      Errors.setErrorVisible(fields.passwordField, 'visible', 'Not authorized');
      return;
    }
    activeUser.setId(response.body);
    
    const button = document.querySelector('.form__button');
    this.#removeHandlers();
    router.redirect('/profile');
  }

  /**
   * Get data form inputs 
   * @returns {Object}
   */
  static #getFormData() {
    const form = document.querySelectorAll('.form__input__require');
    let fields = {};
    form.forEach(field => {
      if (field.id === 'form__login') {
        fields.emailField = field;
      }
      if (field.id === 'form__password') {
        fields.passwordField = field;
      }
    });

    return fields;
  }

  /**
   * Check input fields
   * @returns {number} errors
   */
  static #validateErrors() {
    let errors = SignInValidation.inputsValidate([
      document.getElementById('form__login'),
      document.getElementById('form__password')
    ]);

    return errors;
  }

  /**
   * Remove event listeners
   */
  static #removeHandlers() {
    const form = document.getElementById('form');
    form.removeEventListener('submit', this.formSubmitEvent);
  }
}
