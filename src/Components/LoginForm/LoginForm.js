import loginForm from './LoginForm.hbs';
import {Button, BUTTON_STATES} from '../Button/Button';
import {Input, INPUT_STATES} from '../Input/Input';
import {Text, TEXT_STATES} from '../Text/Text';
import {Logo, LOGO_STATES} from '../Logo/Logo';
import {BASE_COMPONENT_STATES, BaseComponent} from '../Base/Base';
import {LOGIN_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {LOGIN_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Login form smart component
 */
export default class LoginForm extends BaseComponent {
    /**
     * Create login form component
     */
    constructor() {
        super({});
        this.setEvents({
            [LOGIN_EVENTS.clearForm]: this.clear,
            [LOGIN_EVENTS.userValidationFailed]: this.setErrors,
            [LOGIN_EVENTS.userNotLoggined]: this.setUnloggined,
        });
        this.initComponents();
    }

    /**
     * Create all components on page
     */
    initComponents() {
        this.components.logo = new Logo({state: LOGO_STATES.logoLogin});
        this.components.emailInput = new Input({
            type: 'text',
            label: LOGIN_VIEW_NAMES.emailTittle,
            state: INPUT_STATES.loginRegisterInput,
        });
        this.components.passwordInput = new Input({
            type: 'password',
            label: LOGIN_VIEW_NAMES.passwordTitle,
            state: INPUT_STATES.loginRegisterInput,
        });
        this.components.mainError = new Text({
            text: '',
            state: TEXT_STATES.loginErrorText,
        });
        this.components.button = new Button({
            text: LOGIN_VIEW_NAMES.buttonTittle,
            state: BUTTON_STATES.loginRegisterButton,
            onClick: this.onButtonClick,
        });

        this.components.registerContainer = new BaseComponent({state: BASE_COMPONENT_STATES.loginFormOffer});
        this.components.registerContainer.components.registerOffer = new Text({
            text: LOGIN_VIEW_NAMES.registerOffer,
        });
        this.components.registerContainer.components.registerLink = new Text({
            text: LOGIN_VIEW_NAMES.registerLinkTittle,
            href: APP_PATHS.registerPage,
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
        EventBus.emitEvent(LOGIN_EVENTS.login, {email, password});
    }

    /**
     * Render login form component
     * @return {string}
     */
    render() {
        this.prepareRender();
        return loginForm(this);
    }

    /**
     * Set user not loggined
     */
    setUnloggined = () => {
        this.setErrors({email: '', password: '', main: LOGIN_VIEW_NAMES.userLoginFailed});
        this.reRender();
    }

    /**
     * Start login form
     */
    start() {
        super.start();
        this.components.mainError.setText('');
        this.components.emailInput.setError('');
        this.components.passwordInput.setError('');
    }

    /**
     * Set errors
     * @param {string} email
     * @param {string} password
     * @param {string|undefined} main
     */
    setErrors = ({email, password, main}) => {
        this.components.emailInput.setError(email);
        this.components.passwordInput.setError(password);
        if (main !== undefined) {
            this.components.mainError.setText(main);
        }
        this.reRender();
    }

    /**
     * Mount login form component
     */
    mount() {
        super.mount();
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
        this.clear();
        super.unmount();
    }

    /**
     * Clear all inputs
     */
    clear = () => {
        this.components.emailInput.clear();
        this.components.passwordInput.clear();
    }
}
