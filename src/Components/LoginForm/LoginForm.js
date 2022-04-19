import loginForm from './LoginForms.hbs';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {Text} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {loginViewNames} from '../../Modules/ViewConsts';
import {AppPaths} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';

/**
 * Login form smart component
 */
export default class LoginForm extends BaseComponent {
    /**
     * Create login form component
     */
    constructor() {
        super({});
        this.components.logo = new Logo({styles: ['logo-BaseView-login']});
        this.components.emailInput = new Input({
            type: 'text',
            label: loginViewNames.emailTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordInput = new Input({
            type: 'password',
            label: loginViewNames.passwordTitle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.mainError = new Text({
            text: '',
            styles: ['login-error-text'],
        });
        this.components.button = new Button({
            text: loginViewNames.buttonTittle,
            styles: ['login-register-button'],
            onClick: this.onButtonClick,
        });

        this.components.registerContainer = new BaseComponent({styles: ['login-form-register-offer-container', 'w-full']});
        this.components.registerContainer.components.registerOffer = new Text({
            text: loginViewNames.registerOffer,
            styles: [],
        });
        this.components.registerContainer.components.registerLink = new Text({
            text: loginViewNames.registerLinkTittle,
            styles: [],
            href: AppPaths.registerPage,
        });
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
        const email = this.components.emailInput.getValue();
        const password = this.components.passwordInput.getValue();
        EventBus.emitEvent('action-login', {email, password});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        super.preRender();
        return loginForm(this);
    }

    /**
     * Set errors
     * @param {string} email
     * @param {string} password
     * @param {string} main
     */
    setErrors({email, password, main}) {
        this.components.emailInput.setError(email);
        this.components.passwordInput.setError(password);
        this.components.mainError.setText(main);
    }

    /**
     * Mount login form component
     */
    mount() {
        this.findElem();
        if (this.elem) {
            this.elem.addEventListener('submit', this.formSubmit);
        }
    }

    /**
     * Unmount login form component
     */
    unmount() {
        if (this.elem) {
            this.elem.removeEventListener('submit', this.formSubmit);
        }
        super.unmount();
    }

    /**
     * Clear all inputs
     */
    clear() {
        this.components.emailInput.clear();
        this.components.passwordInput.clear();
    }
}
