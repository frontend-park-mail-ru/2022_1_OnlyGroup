import {View} from '../view/baseView.js';
import loginView from './loginView.hbs';
import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginFormComponent from "../../Components/LoginForm/LoginForm";
import EventBus from "../../Modules/EventBus";
import router from "../../Modules/router";
import {TextComponent} from "../../Components/Text/Text";

/**
 * View class for login page
 */
export class LoginView extends View {
    #loginForm;

    constructor({parent}) {
        super({parent});
        this.#loginForm = new LoginFormComponent({onSubmit: this.formSubmit});
    }

    render() {
        let rendered = this.#loginForm.render();
        this.parent.innerHTML = loginView({inner: rendered});
        this.#loginForm.mount();
    }

    formSubmit({Email, Password}){
        EventBus.emitEvent('action-login', {Email, Password});
    }

    setUnloginned(){
        this.#loginForm.setUnloginned();
        this.#loginForm.unmount();
        this.render();
    }

    setValidationError({Email, Password, PasswordRepeat}){
        this.#loginForm.setValidationError({Email, Password});
        this.#loginForm.unmount();
        this.render();
    }

    unmount(){
        this.#loginForm.unmount();
    }
}
