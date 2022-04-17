import BaseView from '../BaseView/BaseView.js';
import loginView from './LoginView.hbs';
import LoginFormComponent from '../../Components/LoginForm/LoginForm';
import EventBus from '../../Modules/EventBus';

/**
 * View class for login page
 */
export class LoginView extends BaseView {
    /**
     * Create login BaseView
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        super({parent});
        this.components.loginForm = new LoginFormComponent({
            onSubmit: this.loginFormSubmit,
            onLogoClick: this.logoClick,
        });
    }

    /**
     * Render login view
     */
    render() {
        super.preRender();
        this.parent.innerHTML = loginView(this);
        this.mount();
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
        this.components.loginForm.setErrors({email, password, main});
    }

    /**
     * Remove all form inputs values
     */
    clear() {
        this.components.loginForm.clear();
    }
}
