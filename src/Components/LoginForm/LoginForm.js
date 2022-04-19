import idGenerator from '../../Modules/idGenerator';
import loginForm from './LoginForms.hbs';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {Text} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';

/**
 * Login form smart component
 */
export default class LoginForm extends BaseComponent {
    #components;
    #onSubmit;
    #onLogoClick;

    /**
     * Create login form component
     * @param {function} onSubmit
     * @param {function} onLogoClick
     */
    constructor({onSubmit, onLogoClick}) {
        super({styles: []});
        this.#onSubmit = onSubmit;
        this.#onLogoClick = onLogoClick;
        this.#components = {};
        this.#components.logo = new Logo({styles: ['logo-view-login'], onClick: this.onLogoClick});
        this.#components.emailInput = new Input({
            type: 'text',
            label: 'Email',
            styles: ['login-register-input', 'w-full'],
        });
        this.#components.passwordInput = new Input({
            type: 'password',
            label: 'Пароль',
            styles: ['login-register-input', 'w-full'],
        });
        this.#components.mainError = new Text({
            text: '',
            styles: ['login-error-text'],
        });
        this.#components.button = new Button({
            text: 'Войти',
            styles: ['login-register-button'],
            onClick: this.onButtonClick,
        });
    }

    /**
     * @callback Callback for logo click
     * @param {Event} ev
     */
    onLogoClick(ev) {
        ev.preventDefault();
        this.#onLogoClick();
    }

    /**
     * @callback Callback for button click
     * @param {Event} ev
     */
    onButtonClick = (ev) => {
        this.formSubmit(ev);
    }

    /**
     * @callback Callback for form submit
     * @param {Event} ev
     */
    formSubmit = (ev) => {
        ev.preventDefault();
        const email = this.#components.emailInput.getValue();
        const password = this.#components.passwordInput.getValue();
        this.#onSubmit({email, password});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        this.renderedComponents = Object.values(this.#components).reduce((prevStr, currElem) => {
            return prevStr + currElem.render();
        }, '');
        return loginForm(...this);
    }

    /**
     * Remove all errors in form
     */
    removeAllErrors() {
        this.#components.mainError.setText('');
        this.#components.emailInput.setError(null);
        this.#components.passwordInput.setError(null);
    }

    /**
     * Set validation error
     * @param {string} Email
     * @param {string} Password
     * @param {string} Main
     */
    setValidationError({Email, Password, Main}) {
        this.removeAllErrors();
        this.#components.emailInput.setError(Email);
        this.#components.passwordInput.setError(Password);
        this.#components.mainError.setText(Main);
    }

    /**
     * Mount login form component
     */
    mount() {
        Object.values(this.#components).forEach((component) => {
            component.mount();
        });
        this.findElem();
        this.elem.addEventListener('submit', this.formSubmit);
    }

    /**
     * Unmount login form component
     */
    unmount() {
        Object.values(this.#components).forEach((component) => {
            component.unmount();
        });
        super.unmount();
    }
}
