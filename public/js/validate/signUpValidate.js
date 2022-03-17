import {Validation} from './validate.js';
import {SignUp} from '../../views/signUp/signUp.js';

/**
 * Sign up validation
 */
export class SignUpValidation {
  /**
    * Validate form inputs
    * @param {Object} inputs
    * @return {number} - errors quantity
    */
  static inputsValidate(inputs) {
    let errors = 0;

    for (let index = 0; index < inputs.length; index++) {
      let validationResult = '';
      const input = inputs[index];
      SignUp.setErrorVisible(input, 'hidden');

      if (input.id === 'form__login') {
        validationResult = Validation.validateEmail(input.value);
        if (validationResult) {
          SignUp.setErrorVisible(input, 'visible',
              validationResult);
          errors++;
        }
      }

      if (input.id === 'form__password') {
        validationResult = Validation.validatePassword(input.value);
        if (validationResult) {
          SignUp.setErrorVisible(input, 'visible',
              validationResult);
          errors++;
        }
      }

      if (input.id === 'form__repeat__password') {
        const password = document.querySelector('#form__password');
        validationResult = Validation.
            validatePasswordsRepeat(password.value, input.value);
        if (validationResult) {
          SignUp.setErrorVisible(password, 'visible',
              validationResult);
          errors++;
        }
      }
    }

    return errors;
  }
}
