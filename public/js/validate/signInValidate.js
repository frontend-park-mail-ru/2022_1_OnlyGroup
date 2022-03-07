import { Validation } from "./validate.js";
import { Errors } from "../modules/errors.js"

export class SignInValidation {
    /**
     * Validate form inputs
     * @param {Object} inputs 
     * @returns {number} - errors quantity
     */
    static inputsValidate = (inputs) => {
        let errors = 0;
        
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            Errors.setErrorVisible(input, 'hidden');

            if (input.classList.contains('form__login')) {
                const validationResult = Validation.validateEmail(input.value);
                if (!validationResult.validationResult) {
                    Errors.setErrorVisible(input, 'visible', validationResult.validationText);
                    errors++;
                }
            }

            if (input.classList.contains('form__password')) {
                const validationResult = Validation.validatePassword(input.value);
                if (!validationResult.validationResult) {
                    Errors.setErrorVisible(input, 'visible', validationResult.validationText);
                    errors++;
                }
            }
        }

        return errors;
    };
}



