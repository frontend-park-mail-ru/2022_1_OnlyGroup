import BaseView from '../BaseView/BaseView.js';
import EventBus from '../../Modules/EventBus';
import RegisterFormComponent from '../../Components/RegisterForm/RegisterForm';
import loginView from '../LoginView/LoginView.hbs';

/**
 * View class for login page
 */
export class RegisterView extends BaseView {
    registerForm;

    /**
     * Create login BaseView
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        super({parent});
        this.components.registerForm = new RegisterFormComponent({
            onSubmit: this.registerFormSubmit,
            onLogoClick: this.logoClick,
        });
    }

    /**
     * Render register view
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
        this.components.registerForm.setErrors({email, password, passwordRepeat, main});
    }

    /**
     * Remove all form inputs values
     */
    clear() {
        this.components.registerForm.clear();
    }
}
