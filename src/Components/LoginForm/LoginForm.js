import idGenerator from "../../Modules/idGenerator";
import LoginForm from "./LoginForms.hbs"
import {ButtonComponent} from "../Button/Button";
import {InputComponent} from "../Input/Input";
import eventBus from "../../Modules/EventBus";

export default class LoginFormComponent{
    constructor() {
        this.id = idGenerator.getId();
        this.emailInput = new InputComponent({type: "email", styles: Array.of("login-register-input")});
        this.emailError = new Text()
        this.passwordInput = new InputComponent({type: "email", styles: Array.of("login-register-input")});
        this.button = new ButtonComponent({styles: Array.of("login-register-button"), text: "Войти"});
    }

    render(){
        let rendered = this.emailInput.render() + this.passwordInput.render() + this.button.render()
        return LoginForm({inner: rendered, id: this.id, styles: Array.of("login-layout")})
    }

    buttonPress = (ev) =>{
        ev.preventDefault();

        this.

        // console.log(this.emailInput.getValue());
        // console.log(this.passwordInput.getValue());
    }

    mount(){
        this.button.mount(this.buttonPress);
    }
}
