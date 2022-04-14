import idGenerator from "../../Modules/idGenerator";
import LoginForm from "./LoginForms.hbs"
import {ButtonComponent} from "../Button/Button";
import {InputComponent} from "../Input/Input";
import eventBus from "../../Modules/EventBus";
import {TextComponent} from "../Text/Text";
import {LogoComponent} from "../Logo/Logo";
import {BaseComponent} from "../Base/Base";
import EventBus from "../../Modules/EventBus";

export default class LoginFormComponent extends BaseComponent{
    #components;
    #onSubmit;
    constructor({onSubmit}) {
        super({styles: Array.of("")})
        this.#onSubmit = onSubmit
        this.#components = {};
        this.#components.logo = new LogoComponent({styles: Array.of("logo-view-login")});
        this.#components.emailInput = new InputComponent({type: "text", label: "Email", styles: Array.of("login-register-input", "w-full")});
        // this.#components.emailError = new TextComponent({text: "", styles: Array.of("login-error-text")});
        this.#components.passwordInput = new InputComponent({type: "password", label: "Пароль", styles: Array.of("login-register-input", "w-full")});
        // this.#components.passwordError = new TextComponent({text: "", styles: Array.of("login-error-text")});
        this.#components.mainError = new TextComponent({text: "", styles: Array.of("login-error-text")});
        this.#components.button = new ButtonComponent({styles: Array.of("login-register-button"), text: "Войти", onClick: this.onSubmitInternal});
    }

    formSubmit = (ev) =>{
        ev.preventDefault();
        const Email = this.#components.emailInput.getValue();
        const Password = this.#components.passwordInput.getValue();
        this.#onSubmit({Email, Password});
    }

    render(){
        let rendered = Object.values(this.#components).reduce((prevStr, currElem)=>{
            return prevStr + currElem.render();
        }, "")
        return LoginForm({inner: rendered, id: this.id, styles : this.styles})
    }

    removeAllErrors(){
        this.#components.mainError.setText('');
        this.#components.emailInput.setError(null);
        this.#components.passwordInput.setError(null);
    }

    setUnloginned(){
        this.removeAllErrors();
        this.#components.mainError.setText('Неверный логин или пароль');
    }

    setValidationError({Email, Password}){
        this.removeAllErrors();
        if(Email){
            this.#components.emailInput.setError('Неверный email');
        }
        if(Password){
            this.#components.passwordInput.setError('Пароль должен содержать от 6 до 32 символов, присутствовать заглавная и строчная буквы и цифра');
        }
    }

    mount(){
        Object.values(this.#components).forEach((component) => {
            component.mount();
        });
        this.checkFound();
        this.elem.addEventListener('submit', this.formSubmit);
    }

    unmount(){
        super.unmount();
        Object.values(this.#components).forEach((component) => {
            component.unmount();
        })
    }
}
