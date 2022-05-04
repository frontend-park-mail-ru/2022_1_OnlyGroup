import registerView from './RegisterView.hbs';
import RegisterFormComponent from '../../Components/RegisterForm/RegisterForm';
import BaseView from '../BaseView/BaseView';

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
        super.prepareRender();
        this.parent.innerHTML = registerView(this);
        this.mount();
    }
}
