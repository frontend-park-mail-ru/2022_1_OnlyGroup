import registerForms from '../LoginForm/LoginForm.hbs';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {Text} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {REGISTER_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {LOGIN_REGISTER_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Login form smart component
 */
export default class RegisterForm extends BaseComponent {
    /**
     * Create login form component
     */
    constructor() {
        super({});
        this.setEvents({
            [LOGIN_REGISTER_EVENTS.clearForm]: this.clear,
            [LOGIN_REGISTER_EVENTS.userValidationFailed]: this.setErrors,
            [LOGIN_REGISTER_EVENTS.userNotLoggined]: this.setErrors,
        });
    }

    /**
     * Init all components
     */
    initComponents() {
        this.components.logo = new Logo({styles: ['logo-BaseView-login']});
        this.components.emailInput = new Input({
            type: 'text',
            label: REGISTER_VIEW_NAMES.emailTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordInput = new Input({
            type: 'password',
            label: REGISTER_VIEW_NAMES.passwordTitle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.passwordRepeatInput = new Input({
            type: 'password',
            label: REGISTER_VIEW_NAMES.passwordRepeatTittle,
            styles: ['login-register-input', 'w-full'],
        });
        this.components.mainError = new Text({
            text: '',
            styles: ['login-error-text'],
        });
        this.components.button = new Button({
            text: REGISTER_VIEW_NAMES.buttonTittle,
            styles: ['login-register-button'],
            onClick: this.onButtonClick,
        });

        this.components.registerContainer = new BaseComponent({styles: ['register-form-login-offer-container', 'w-full']});
        this.components.registerContainer.components.registerOffer = new Text({
            text: REGISTER_VIEW_NAMES.loginOffer,
            styles: [],
        });
        this.components.registerContainer.components.registerLink = new Text({
            text: REGISTER_VIEW_NAMES.loginLinkTittle,
            styles: [],
            href: APP_PATHS.loginPage,
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
        EventBus.emitEvent(LOGIN_REGISTER_EVENTS.actionRegister, {email, password, passwordRepeat});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        super.prepareRender();
        return registerForms(this);
    }

    /**
     * Set errors
     * @param {string} email
     * @param {string} password
     * @param {string} passwordRepeat
     * @param {string|undefined} main
     */
    setErrors = ({email, password, passwordRepeat, main}) => {
        this.components.emailInput.setError(email);
        this.components.passwordInput.setError(password);
        this.components.passwordRepeatInput.setError(passwordRepeat);
        if (main !== undefined) {
            this.components.mainError.setText(main);
        }
        this.reRender();
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

    /**
     * Clear all inputs
     */
    clear = () => {
        this.components.emailInput.clear();
        this.components.passwordInput.clear();
        this.components.passwordRepeatInput.clear();
    }
}
