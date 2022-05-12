import registerForms from '../LoginForm/LoginForm.hbs';
import {Button, BUTTON_TYPES} from '../Button/Button';
import {Input, INPUT_TYPES} from '../Input/Input';
import {Text, TEXT_TYPES} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {REGISTER_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {LOGIN_EVENTS} from '../../Modules/EventBusEvents';

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
            [LOGIN_EVENTS.clearForm]: this.clear,
            [LOGIN_EVENTS.userValidationFailed]: this.setErrors,
            [LOGIN_EVENTS.userNotLoggined]: this.setErrors,
        });
        this.initComponents();
    }

    /**
     * Init all components
     */
    initComponents() {
        this.components.logo = new Logo({});
        this.components.emailInput = new Input({
            inputType: 'text',
            label: REGISTER_VIEW_NAMES.emailTittle,
            type: INPUT_TYPES.primary,
        });
        this.components.passwordInput = new Input({
            inputType: 'password',
            label: REGISTER_VIEW_NAMES.passwordTitle,
            type: INPUT_TYPES.primary,
        });
        this.components.passwordRepeatInput = new Input({
            inputType: 'password',
            label: REGISTER_VIEW_NAMES.passwordRepeatTittle,
            type: INPUT_TYPES.primary,
        });
        this.components.mainError = new Text({
            text: '',
            type: TEXT_TYPES.error,
        });
        this.components.button = new Button({
            text: REGISTER_VIEW_NAMES.buttonTittle,
            type: BUTTON_TYPES.submit,
            onClick: this.onButtonClick,
        });

        this.addComponents.Offer = {};
        this.addComponents.Offer.text = new Text({
            text: REGISTER_VIEW_NAMES.loginOffer,
            type: TEXT_TYPES.secondary,
        });
        this.addComponents.Offer.link = new Text({
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
        EventBus.emitEvent(LOGIN_EVENTS.register, {email, password, passwordRepeat});
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
