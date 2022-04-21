import BaseView from '../BaseView/BaseView.js';
import loginView from './LoginView.hbs';
import LoginFormComponent from '../../Components/LoginForm/LoginForm';

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
        this.components.loginForm = new LoginFormComponent();
    }

    /**
     * Render login view
     */
    render() {
        this.prepareRender();
        this.parent.innerHTML = loginView(this);
        this.mount();
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
}
