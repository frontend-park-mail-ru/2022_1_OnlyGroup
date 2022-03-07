import { SignUpValidation } from '../validate/signUpValidate.js'; 

export class SignUpController {
    /**
     * Event of form submit
     * @param {Event} event 
     */
    static formSubmitEvent = (event) => {
        event.preventDefault();

        let errors = SignUpValidation.inputsValidate(document.querySelectorAll('.form__input__require'));

        if (errors === 0) {
            const button = document.querySelector('.form__button');
            button.setAttribute('onclick', "window.location.href='/profile'");
            button.click();
        } 
    }
}
