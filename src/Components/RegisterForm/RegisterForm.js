import LoginRegisterForms from '../LoginForm/LoginForm.hbs';
import {ButtonComponent} from '../Button/Button';
import {InputComponent} from '../Input/Input';
import {TextComponent} from '../Text/Text';
import {LogoComponent} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {loginViewNames, registerViewNames} from '../../Modules/ViewConsts';
import {AppPaths} from '../../Modules/Router';

/**
 * Login form smart component
 */
export default class RegisterFormComponent extends BaseComponent {
    onSubmit;
    onLogoClick;

    /**
     * Create login form component
     * @param {function}onSubmit
     * @param {function}onLogoClick
     * @param {function}onLoginClick
     */
    constructor({onSubmit, onLogoClick}) {
        super({});
        this.onSubmit = onSubmit;
        this.onLogoClick = onLogoClick;
        this.components.logo = new LogoComponent({styles: ['logo-BaseView-login'], onClick: this.logoClick});
        this.components.emailInput = new InputComponent({
            type: 'text',
            label: registerViewNames.emailTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordInput = new InputComponent({
            type: 'password',
            label: registerViewNames.passwordTitle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordRepeatInput = new InputComponent({
            type: 'password',
            label: registerViewNames.passwordRepeatTittle,
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

        this.components.registerContainer = new BaseComponent({styles: ['register-form-login-offer-container', 'w-full']});
        this.components.registerContainer.components.registerOffer = new TextComponent({
            text: registerViewNames.loginOffer,
            styles: [],
        });
        this.components.registerContainer.components.registerLink = new TextComponent({
            text: registerViewNames.loginLinkTittle,
            styles: [],
            href: AppPaths.loginPage,
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
        const passwordRepeat = this.components.passwordRepeatInput.getValue();
        this.onSubmit({email, password, passwordRepeat});
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
        this.components.passwordRepeatInput.setError(null);
    }

    /**
     * Set errors
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     * @param {string}main
     */
    setErrors({email, password, passwordRepeat, main}) {
        this.removeAllErrors();
        this.components.emailInput.setError(email);
        this.components.passwordInput.setError(password);
        this.components.passwordRepeatInput.setError(passwordRepeat);
        this.components.mainError.setText(main);
    }

    /**
     * Mount register form component
     */
    mount() {
        super.mount();
        this.elem.addEventListener('submit', this.formSubmit);
    }

    /**
     * Unmount register form component
     */
    unmount() {
        super.unmount();
    }
}
