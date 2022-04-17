import LoginRegisterForms from './LoginForm.hbs';
import {ButtonComponent} from '../Button/Button';
import {InputComponent} from '../Input/Input';
import {TextComponent} from '../Text/Text';
import {LogoComponent} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {loginViewNames} from '../../Modules/ViewConsts';
import {AppPaths} from '../../Modules/Router';

/**
 * Login form smart component
 */
export default class LoginFormComponent extends BaseComponent {
    onSubmit;
    onLogoClick;

    /**
     * Create login form component
     * @param {function}onSubmit
     * @param {function}onLogoClick
     */
    constructor({onSubmit, onLogoClick}) {
        super({});
        this.onSubmit = onSubmit;
        this.onLogoClick = onLogoClick;
        this.components.logo = new LogoComponent({styles: ['logo-BaseView-login'], onClick: this.logoClick});
        this.components.emailInput = new InputComponent({
            type: 'text',
            label: loginViewNames.emailTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordInput = new InputComponent({
            type: 'password',
            label: loginViewNames.passwordTitle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.mainError = new TextComponent({
            text: '',
            styles: ['login-error-text'],
        });
        this.components.button = new ButtonComponent({
            text: loginViewNames.buttonTittle,
            styles: ['login-register-button'],
            onClick: this.onButtonClick,
        });

        this.components.registerContainer = new BaseComponent({styles: ['login-form-register-offer-container', 'w-full']});
        this.components.registerContainer.components.registerOffer = new TextComponent({
            text: loginViewNames.registerOffer,
            styles: [],
        });
        this.components.registerContainer.components.registerLink = new TextComponent({
            text: loginViewNames.registerLinkTittle,
            styles: [],
            href: AppPaths.registerPage,
        });
    }

    /**
     * @callback Callback for logo click
     * @param {Event}ev
     */
    logoClick = (ev) => {
        ev.preventDefault();
        this.onLogoClick();
    }

    /**
     * @callback Callback for button click
     * @param {Event}ev
     */
    onButtonClick = (ev) => {
        this.formSubmit(ev);
    }

    /**
     * @callback Callback for form submit
     * @param {Event}ev
     */
    formSubmit = (ev) => {
        ev.preventDefault();
        const email = this.components.emailInput.getValue();
        const password = this.components.passwordInput.getValue();
        this.onSubmit({email, password});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        super.preRender();
        return LoginRegisterForms(this);
    }

    /**
     * Remove all errors in form
     */
    removeAllErrors() {
        this.components.mainError.setText('');
        this.components.emailInput.setError(null);
        this.components.passwordInput.setError(null);
    }

    /**
     * Set errors
     * @param {string}email
     * @param {string}password
     * @param {string}main
     */
    setErrors({email, password, main}) {
        this.removeAllErrors();
        this.components.emailInput.setError(email);
        this.components.passwordInput.setError(password);
        this.components.mainError.setText(main);
    }

    /**
     * Mount login form component
     */
    mount() {
        super.mount();
        this.elem.addEventListener('submit', this.formSubmit);
    }

    /**
     * Unmount login form component
     */
    unmount() {
        super.unmount();
        this.removeAllErrors();
    }

    /**
     * Clear inputs
     */
    clear() {
        this.components.emailInput.clear();
        this.components.passwordInput.clear();
    }
}
