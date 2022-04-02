import {LoginView} from './../../views/loginView/loginView.js'

export default new class LoginController{
    constructor() {
        this.view = new LoginView({parent: document.getElementById('root')});
    }

    start(){
        this.view.render();

    }
    stop(){
        this.view.unmount();
    }
}


