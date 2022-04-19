import {BaseView} from '../BaseView/BaseView.js';
import registerView from './RegisterView.hbs';
import RegisterFormComponent from '../../Components/RegisterForm/RegisterForm';

/**
 * View class for login page
 */
export class RegisterView extends BaseView {
    /**
     * Create login BaseView
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        super({parent});
        this.components.registerForm = new RegisterFormComponent();
    }

    /**
     * Render BaseView and mount components
     */
    render() {
        super.preRender();
        this.parent.innerHTML = registerView(this);
        this.mount();
    }

    /**
     * Rerender BaseView
     */
    reRender() {
        this.unmount();
        this.render();
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
}
