import loginForm from './LoginForm.hbs';
import {Button, BUTTON_TYPES} from '../Button/Button';
import {Input, INPUT_TYPES} from '../Input/Input';
import {Text, TEXT_TYPES} from '../Text/Text';
import {Logo} from '../Logo/Logo';
import {BaseComponent} from '../Base/Base';
import {LOGIN_VIEW_NAMES} from '../../Consts/ViewConsts';
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
        super();
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
        // this.components.logo = new Logo({styles: ['auth-form__logo']});
        this.components.logo = new Logo({});
        this.components.emailInput = new Input({
            inputType: 'text',
            label: LOGIN_VIEW_NAMES.emailTittle,
            type: INPUT_TYPES.primary,
            // type: 'text',
            // label: LOGIN_VIEW_NAMES.inputs.email.title,
            // placeholder: LOGIN_VIEW_NAMES.inputs.email.placeholder,
            // styles: ['auth-form__input'],
        });
        this.components.passwordInput = new Input({
            inputType: 'password',
            label: LOGIN_VIEW_NAMES.passwordTitle,
            type: INPUT_TYPES.primary,
            // type: 'password',
            // label: LOGIN_VIEW_NAMES.inputs.password.title,
            // placeholder: LOGIN_VIEW_NAMES.inputs.password.placeholder,
            // styles: ['auth-form__input'],
        });
        this.components.mainError = new Text({
            text: '',
            type: TEXT_TYPES.error,
            // styles: ['auth-form__main-error'],
        });
        this.components.button = new Button({
            text: LOGIN_VIEW_NAMES.buttonTittle,
            type: BUTTON_TYPES.submit,
            // text: LOGIN_VIEW_NAMES.button.title,
            // styles: ['auth-form__button'],
            onClick: this.onButtonClick,
        });
        this.addComponents.Offer = {};
        this.addComponents.Offer.text = new Text({
            text: LOGIN_VIEW_NAMES.registerOffer,
            type: TEXT_TYPES.secondary,

        // this.components.registerContainer = new BaseComponent({styles: ['auth-form__alt-variant', 'alt-variant']});
        // this.components.registerContainer.components.registerOffer = new Text({
        //     text: LOGIN_VIEW_NAMES.altVariant.offer,
        //     styles: ['alt-variant__text'],
        });
        this.addComponents.Offer.link = new Text({
            text: LOGIN_VIEW_NAMES.registerLinkTittle,
        // this.components.registerContainer.components.registerLink = new Text({
        //     text: LOGIN_VIEW_NAMES.altVariant.linkTitle,
        //     styles: ['alt-variant__link'],
        //     href: APP_PATHS.registerPage,
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
        this.setErrors({email: '', password: '', main: LOGIN_VIEW_NAMES.errors.loginFail});
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
