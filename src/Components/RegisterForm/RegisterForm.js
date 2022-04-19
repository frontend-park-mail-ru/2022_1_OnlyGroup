import registerForms from '../LoginForm/LoginForm.hbs';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {Text} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {registerViewNames} from '../../Modules/ViewConsts';
import {AppPaths} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {loginRegisterEvents} from '../../Modules/EventBusEvents';

/**
 * Login form smart component
 */
export default class RegisterForm extends BaseComponent {
    /**
     * Create login form component
     */
    constructor() {
        super({});
        this.components.logo = new Logo({styles: ['logo-BaseView-login']});
        this.components.emailInput = new Input({
            type: 'text',
            label: registerViewNames.emailTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordInput = new Input({
            type: 'password',
            label: registerViewNames.passwordTitle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordRepeatInput = new Input({
            type: 'password',
            label: registerViewNames.passwordRepeatTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.mainError = new Text({
            text: '',
            styles: ['login-error-text'],
        });
        this.components.button = new Button({
            text: registerViewNames.buttonTittle,
            styles: ['login-register-button'],
            onClick: this.onButtonClick,
        });

        this.components.registerContainer = new BaseComponent({styles: ['register-form-login-offer-container', 'w-full']});
        this.components.registerContainer.components.registerOffer = new Text({
            text: registerViewNames.loginOffer,
            styles: [],
        });
        this.components.registerContainer.components.registerLink = new Text({
            text: registerViewNames.loginLinkTittle,
            styles: [],
            href: AppPaths.loginPage,
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
        const passwordRepeat = this.components.passwordRepeatInput.getValue();
        EventBus.emitEvent(loginRegisterEvents.actionRegister, {email, password, passwordRepeat});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        super.preRender();
        return registerForms(this);
    }

    /**
     * Set errors
     * @param {string} email
     * @param {string} password
     * @param {string} passwordRepeat
     * @param {string} main
     */
    setErrors({email, password, passwordRepeat, main}) {
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
        if (this.elem) {
            this.elem.addEventListener('submit', this.formSubmit);
        }
    }

    /**
     * Unmount register form component
     */
    unmount() {
        if (this.elem) {
            this.elem.removeEventListener('submit', this.formSubmit);
        }
        super.unmount();
    }
}
