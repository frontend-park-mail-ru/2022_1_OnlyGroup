import {Api} from "../Modules/api.js";
import EventBus from "../Modules/EventBus.js";

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordPatternLowerCase = `[a-z]+`
const passwordPatternUpperCase = `[A-Z]+`
const passwordPatternNumber = `[0-9]+`
const passwordMinLength = 6
const passwordMaxLength = 32
const statusUnathorized = 401;

class User{
    #id;
    constructor(Id) {
        this.#id = Id;
    }
    static #validateEmail(email){
        return String(email).toLowerCase().match(emailPattern);
    }

    static #validatePassword(password){
        const passwordString = String(password);
        if(passwordString.length < passwordMinLength || passwordString.length > passwordMaxLength){
            return false;
        }
        return passwordString.match(passwordPatternLowerCase) && passwordString.match(passwordPatternUpperCase) &&
            passwordString.match(passwordPatternNumber);
    }

    static #validateEmailPasswordRepeatPassword({Email, Password, PasswordRepeat = null}){
        let validationFailed = false;
        let validationError = {'Email' : false, 'Password' : false, 'PasswordRepeat': false};
        if(!User.#validateEmail(Email)){
            validationFailed = true;
            validationError.Email = true;
        }
        if(!User.#validatePassword(Password)){
            validationFailed = true;
            validationError.Password = true;
        }
        if(PasswordRepeat && PasswordRepeat !== Password){
            validationError.PasswordRepeat = true;
            validationError = true;
        }
        if(validationFailed){
            return validationError;
        }
        return null;
    }

    #processAuthResult(result){
        if(result.Status === statusUnathorized){
            this.id = -1;
            EventBus.emitEvent("user-unloginned");
            return;
        }
        if(!result.isOk()){
            EventBus.emitEvent('api-failed', result);
            return;
        }
        this.id = +result.Body.ID;
        EventBus.emitEvent('user-loggined');
    }

    async CheckLogin(){
        let result = await Api.CheckLogin();
        this.#processAuthResult(result);
    }
    async Login({Email, Password}){
        const validationRes = User.#validateEmailPasswordRepeatPassword({Email, Password});
        if(validationRes){
            EventBus.emitEvent('user-validation-failed', validationRes);
            return;
        }

        let result = await Api.LogIn({Email, Password});
        this.#processAuthResult(result);
    }
    async LogUp({Email, Password, PasswordRepeat}){
        const validationRes = User.#validateEmailPasswordRepeatPassword({Email, Password, PasswordRepeat});
        if(validationRes){
            EventBus.emitEvent('user-validation-failed', validationRes);
            return;
        }
        let result = Api.LogUp({Email, Password});
        this.#processAuthResult(result);
    }
    async LogOut(){
        let result = Api.LogOut();
        if(!result.isOk()){
            EventBus.emitEvent('api-failed', result);
            return;
        }
        this.#id = -1;
        EventBus.emitEvent("user-unloginned");
    }
}

let activeUser = new User(undefined);
export default activeUser;
