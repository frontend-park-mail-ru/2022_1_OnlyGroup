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
      let validationResult = {};
      const input = inputs[index];
      SignUp.setErrorVisible(input, 'hidden');

      if (input.classList.contains('form__login')) {
        validationResult = Validation.validateEmail(input.value);
        if (!validationResult.validationResult) {
          SignUp.setErrorVisible(input, 'visible',
              validationResult.validationText);
          errors++;
        }
      }

      if (input.classList.contains('form__password')) {
        validationResult = Validation.validatePassword(input.value);
        if (!validationResult.validationResult) {
          SignUp.setErrorVisible(input, 'visible',
              validationResult.validationText);
          errors++;
        }
      }

      if (input.classList.contains('form__repeat__passwords')) {
        const password = document.querySelector('.form__password');
        validationResult = Validation.
            validatePasswordsRepeat(password.value, input.value);
        if (!validationResult.validationResult) {
          SignUp.setErrorVisible(password, 'visible',
              validationResult.validationText);
          errors++;
        }
      }
    }

    return errors;
  }
}
