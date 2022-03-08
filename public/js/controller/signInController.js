import { SignInValidation } from '../validate/signInValidate.js';
import {userApi} from '../api/api.js';
import { Errors } from "../modules/errors.js"
import activeUser from "../api/userApi.js";
import router from "../../router/router.js";


export class SignInController {
    /**
     * Event of form submit
     * @param {Event} event
     */
    static formSubmitEvent = async (event) => {
        event.preventDefault();

        let errors = SignInValidation.inputsValidate(document.querySelectorAll('.form__input__require'));

        if (errors !== 0) {
            return;
        }

        const form = document.querySelectorAll('.form__input__require');

        let emailField, passwordField;
        form.forEach(field => {
            if (field.classList.contains('form__login')) {
                emailField = field;
            }
            if (field.classList.contains('form__password')) {
                passwordField = field;
            }
        })

        let userId;
        try{
            userId = await userApi.logIn(emailField.value, passwordField.value)
        } catch (e){
            Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
            return;
        }
        activeUser.id = userId;
        const button = document.querySelector('.form__button');
        // button.setAttribute('onclick', "window.location.href='/profile'");
        router.go("/profile")
        // button.click();
    }
}




