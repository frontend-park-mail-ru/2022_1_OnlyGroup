import {LoginView} from './../../views/loginView/loginView.js'
import EventBus from "../../Modules/EventBus";
import activeUser from "../../Models/user";
import router from "../../Modules/router";

export default new class LoginController {
    #events;

    constructor() {
        this.#events = {
            'action-login': this.actionLogin,
            'action-register': this.actionLogup,
            'user-unloginned': this.userUnloggined,
            'user-validation-failed': this.userValidationFailed,
            'api-failed': this.apiFailed,
            'user-loggined': this.userLoggined,
        };
        this.view = new LoginView({parent: document.getElementById('root')});
    }

    actionLogin = ({Email, Password}) => {
        activeUser.Login({Email, Password});
    }

    actionLogup = ({Email, Password, PasswordRepeat}) => {
        activeUser.LogUp({Email, Password, PasswordRepeat});
    }

    userLoggined = () => {
        // router.go('/');
        alert('router go');
    }

    userUnloggined = () => {
        debugger;
        this.view.setUnloginned();
    }

    userValidationFailed = ({Email, Password, PasswordRepeat}) => {
        this.view.setValidationError({Email, Password, PasswordRepeat});
    }

    apiFailed = ({ErrorMsg}) => {
        alert(`Api error ${ErrorMsg}`);
    }

    start() {
        this.view.render();
        Object.entries(this.#events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
    }

    stop() {
        this.view.unmount();
        Object.entries(this.#events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}


