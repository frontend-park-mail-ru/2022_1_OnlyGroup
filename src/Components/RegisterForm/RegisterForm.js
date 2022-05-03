import registerForms from '../LoginForm/LoginForm.hbs';
import {Button, BUTTON_STATES} from '../Button/Button';
import {Input, INPUT_STATES} from '../Input/Input';
import {Text, TEXT_STATES} from '../Text/Text';
import {Logo, LOGO_STATES} from '../Logo/Logo';
import {BASE_COMPONENT_STATES, BaseComponent} from '../Base/Base';
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
        this.initComponents();
    }

    /**
     * Init all components
     */
    initComponents() {
        this.components.logo = new Logo({state: LOGO_STATES.logoLogin});
        this.components.emailInput = new Input({
            type: 'text',
            label: REGISTER_VIEW_NAMES.emailTittle,
            state: INPUT_STATES.loginRegisterInput,
        });
        this.components.passwordInput = new Input({
            type: 'password',
            label: REGISTER_VIEW_NAMES.passwordTitle,
            state: INPUT_STATES.loginRegisterInput,
        });
        this.components.passwordRepeatInput = new Input({
            type: 'password',
            label: REGISTER_VIEW_NAMES.passwordRepeatTittle,
            state: INPUT_STATES.loginRegisterInput,
        });
        this.components.mainError = new Text({
            text: '',
            state: TEXT_STATES.loginErrorText,
        });
        this.components.button = new Button({
            text: REGISTER_VIEW_NAMES.buttonTittle,
            state: BUTTON_STATES.loginRegisterButton,
            onClick: this.onButtonClick,
        });

        this.components.loginContainer = new BaseComponent({state: BASE_COMPONENT_STATES.loginFormOffer});
        this.components.loginContainer.components.registerOffer = new Text({
            text: REGISTER_VIEW_NAMES.loginOffer,
        });
        this.components.loginContainer.components.registerLink = new Text({
            text: REGISTER_VIEW_NAMES.loginLinkTittle,
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
