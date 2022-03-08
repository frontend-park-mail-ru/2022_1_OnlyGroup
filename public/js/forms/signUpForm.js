import {SignUpValidation} from '../validate/signUpValidate.js';
import router from "../../router/router.js";

/**
 * Sign up events
 */
export class SignUpForm {
  /**
    * Event of form submit
    * @param {Event} event
    */
  static formSubmitEvent(event) {
    event.preventDefault();

    const errors = SignUpValidation.
        inputsValidate(document.querySelectorAll('.form__input__require'));

    if (errors === 0) {
      // const button = document.querySelector('.form__button');

      router.go("/profile");
      // button.setAttribute('onclick', 'window.location.href="/profile"');
      // button.click();
    }
  }
}
