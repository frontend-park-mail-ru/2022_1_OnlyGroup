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
    constructor() {
        super({styles: Array.of("")})
        this.components = {};
        this.components.logo = new LogoComponent();
        this.components.emailInput = new InputComponent({type: "email", styles: Array.of("login-register-input", "mb-10")});
        this.components.emailError = new TextComponent({text: "", styles: Array.of("")});
        this.components.passwordInput = new InputComponent({type: "email", styles: Array.of("login-register-input")});
        this.components.passwordError = new TextComponent({text: "", styles: Array.of("")});
        this.components.button = new ButtonComponent({styles: Array.of("login-register-button"), text: "Войти", onClick: this.buttonPress});
    }

    render(){
        let rendered = Object.values(this.components).reduce((prevStr, currElem)=>{
            return prevStr + currElem.render();
        }, "")
        return LoginForm({inner: rendered, id: this.id, styles: Array.of("login-layout")})
    }

    buttonPress = async (ev) => {
        ev.preventDefault();
        this.components.emailError.setText("<script>alert('jdwjbdwjbdew');</script>")
        // const email = this.components.emailInput.getValue();
        // const password = this.components.passwordInput.getValue();
        // //TODO validation
        view.
        // await EventBus.emitEvent(', {email: email, password: password});
    }

    setErrors({emailError, passwordError}){
        if(emailError){
            this.components.emailInput.setError(true);
            //TODO error processing
            // this.components.emailError.setText("")
        }
        if(passwordError){
            this.components.passwordInput.setError(true);
            //TODO error processing
            // this.components.emailError.setText("")
        }
    }

    mount(){
        Object.values(this.components).forEach((component) => {
            component.mount();
        })
    }

    unmount(){
        Object.values(this.components).forEach((component) => {
            component.unmount();
        })
    }
}
