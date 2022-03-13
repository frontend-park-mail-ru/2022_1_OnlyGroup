import {Validation} from './validate.js';
import {SignIn} from '../../views/signIn/signIn.js';

/**
 * Sign in validation
 */
export class SignInValidation {
  /**
    * Validate form inputs
    * @param {Object} inputs
    * @return {number} - errors quantity
    */
  static inputsValidate(inputs) {
    let errors = 0;

    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      SignIn.setErrorVisible(input, 'hidden');

      if (input.classList.contains('form__login')) {
        const validationResult = Validation.
            validateEmail(input.value);
        if (!validationResult.validationResult) {
          SignIn.setErrorVisible(input, 'visible',
              validationResult.validationText);
          errors++;
        }
      }

      if (input.classList.contains('form__password')) {
        const validationResult = Validation.
            validatePassword(input.value);
        if (!validationResult.validationResult) {
          SignIn.setErrorVisible(input, 'visible',
              validationResult.validationText);
          errors++;
        }
      }
    }

    return errors;
  }
}
