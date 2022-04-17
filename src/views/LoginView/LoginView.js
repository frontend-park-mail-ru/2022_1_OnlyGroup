import {BaseView} from '../BaseView/BaseView.js';
import loginView from './LoginView.hbs';
import LoginFormComponent from '../../Components/LoginForm/LoginForm';
import EventBus from '../../Modules/EventBus';

/**
 * View class for login page
 */
export class LoginView extends BaseView {
    #loginForm;

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
    }

    /**
     * Render BaseView and mount components
     */
    render() {
        this.renderedComponents = this.#loginForm.render();
        this.parent.innerHTML = loginView(this);
        this.#loginForm.mount();
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
        EventBus.emitEvent('logo-click');
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
     * Set errors in login form and rerender
     * @param {string}email
     * @param {string}password
     * @param {string}main
     */
    setErrors({email, password, main}) {
        this.#loginForm.setErrors({email, password, main});
    }

    /**
     * Unmount BaseView
     */
    unmount() {
        this.#loginForm.unmount();
    }
}
