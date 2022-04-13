import {LoginView} from './../../views/loginView/loginView.js'
import EventBus from "../../Modules/EventBus";

export default new class LoginController{
    constructor() {
        this.view = new LoginView({parent: document.getElementById('root')});
    }

    start(){
        this.view.render();
        EventBus.addEventListener('action-login', )
    }
    stop(){
        this.view.unmount();
    }
}


