import {BaseView} from '../BaseView/BaseView.js';
import loginView from './LoginView.hbs';
import LoginFormComponent from '../../Components/LoginForm/LoginForm';
import EventBus from '../../Modules/EventBus';
import {loginViewNames} from '../../Modules/ViewConsts';
import {loginRegisterEvents} from '../../Modules/EventBusEvents';

/**
 * View class for login page
 */
export class LoginView extends BaseView {
    #loginForm;

    /**
     * Create login BaseView
     * @param {HTMLElement} parent
     */
    constructor({parent}) {
        super({parent});
        this.#loginForm = new LoginFormComponent({onSubmit: this.formSubmit, onLogoClick: this.logoClick});
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
    logoClick() {
        EventBus.emitEvent('logo-click');
    }

    /**
     * Callback for form submit
     * @param {string} email
     * @param {string} password
     */
    formSubmit({email, password}) {
        EventBus.emitEvent(loginRegisterEvents.actionLogin, {email, password});
    }

    /**
     * Set errors in login form and rerender
     * @param {boolean} email
     * @param {boolean} password
     * @param {boolean} main
     */
    setErrors({email, password, main}) {
        this.#loginForm.setErrors({
            email: (email) ? loginViewNames.emailVerificationFailed : '',
            password: password ? loginViewNames.passwordVerificationFailed : '',
            main: main ? loginViewNames.userLoginFailed : '',
        });
    }

    /**
     * Unmount BaseView
     */
    unmount() {
        this.#loginForm.unmount();
    }
}
