import {BaseView} from '../BaseView/BaseView.js';
import loginView from './LoginRegisterView.hbs';
import LoginFormComponent from '../../Components/LoginForm/LoginForm';
import EventBus from '../../Modules/EventBus';
import RegisterFormComponent from '../../Components/LoginForm/RegisterForm';

/**
 * View class for login page
 */
export class LoginRegisterView extends BaseView {
    #loginForm;
    #registerForm;
    #currentForm;

    /**
     * Create login BaseView
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        super({parent});
        this.#loginForm = new LoginFormComponent({
            onSubmit: this.loginFormSubmit,
            onLogoClick: this.logoClick,
            onRegisterClick: this.registerLinkClick,
        });
        this.#registerForm = new RegisterFormComponent({
            onSubmit: this.registerFormSubmit,
            onLogoClick: this.logoClick,
            onLoginClick: this.loginLinkClick,
        });
        this.#currentForm = this.#loginForm;
    }

    /**
     * Render BaseView and mount components
     */
    render() {
        this.renderedComponents = this.#currentForm.render();
        this.parent.innerHTML = loginView(this);
        this.#currentForm.mount();
    }

    /**
     * Rerender BaseView
     */
    reRender() {
        this.unmount();
        this.render();
    }

    /**
     * @callback Callback for logo click
     */
    logoClick = () => {
        this.#currentForm = this.#loginForm;
        this.reRender();
    }

    /**
     * Callback for login link click
     */
    registerLinkClick = () => {
        this.#currentForm = this.#registerForm;
        this.reRender();
    }

    /**
     * Callback for register link click
     */
    loginLinkClick = () => {
        this.#currentForm = this.#loginForm;
        this.reRender();
    }

    /**
     * Callback for login form submit
     * @param {string}email
     * @param {string}password
     */
    loginFormSubmit({email, password}) {
        EventBus.emitEvent('action-login', {email, password});
    }

    /**
     * Callback for register form submit
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     */
    registerFormSubmit({email, password, passwordRepeat}) {
        EventBus.emitEvent('action-register', {email, password, passwordRepeat});
    }

    /**
     * Set errors in login form and rerender
     * @param {string}email
     * @param {string}password
     * @param {string}passwordRepeat
     * @param {string}main
     */
    setErrors({email, password, passwordRepeat, main}) {
        if (this.#currentForm === this.#loginForm) {
            this.#loginForm.setErrors({email, password, main});
            return;
        }
        this.#registerForm.setErrors({email, password, passwordRepeat, main});
    }

    /**
     * Unmount BaseView
     */
    unmount() {
        this.#currentForm.unmount();
    }
}
