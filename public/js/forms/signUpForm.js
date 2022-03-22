import { SignUpValidation } from '../validate/signUpValidate.js';
import {Api} from "../api/api.js";
import {Errors} from "../modules/errors.js";
import activeUser from "../api/user.js";
import router from '../../router/router.js';

export class SignUpForm {
    /**
     * Event of form submit
     * @param {Event} event
     */
    static formSubmitEvent = async (event) => {
        event.preventDefault();
        if (this.#validateInput() !== 0) {
            return;
        }
        const fields = this.#getFormData();
        let response = await Api.logUp(fields.emailField.value, fields.passwordField.value);
        if (!response.status) {
            Errors.setErrorVisible(fields.emailField, 'visible', "Email already used");
            return;
        }
        activeUser.setId(response.body);
        
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
    static #validateInput() {
        let errors = SignUpValidation.inputsValidate([
            document.getElementById('form__login'),
            document.getElementById('form__password'),
            document.getElementById('form__repeat__password')
        ]);

        return errors;
    }

    /**
     * Remove handlers
     */
    static #removeHandlers() {
        const form = document.getElementById('form');
        form.removeEventListener('submit', this.formSubmitEvent);
    }
}
