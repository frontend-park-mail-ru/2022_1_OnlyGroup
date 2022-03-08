// import { SignInValidation } from '../validate/signInValidate.js';
// import {userApi} from '../api/api.js';
// import { Errors } from "../modules/errors.js"
// import activeUser from "../api/userApi.js";
// // import {Router} from "../../router/router";
// // import {re} from "@babel/core/lib/vendor/import-meta-resolve";
//
// export class AppController {
//     /**
//      * Event of form submit
//      * @param {Event} event
//      */
//     static formSubmitEvent = async (event) => {
//         event.preventDefault();
//
//         // let errors = SignInValidation.inputsValidate(document.querySelectorAll('.form__input__require'));
//         //
//         // if (errors !== 0) {
//         //     return;
//         // }
//
//         let emailField, passwordField;
//         form.forEach(field => {
//             if (field.classList.contains('form__login')) {
//                 emailField = field;
//             }
//             if (field.classList.contains('form__password')) {
//                 passwordField = field;
//             }
//         })
//
//         let userId;
//         try{
//             userId = await userApi.logIn(emailField.value, passwordField.value)
//         } catch (e){
//             Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
//             return;
//         }
//         activeUser.id = userId;
//
//         const button = document.querySelector('.form__button');
//         button.setAttribute('onclick', "window.location.href='/profile'");
//         button.click();
//     }
// }
//
//
//
//
