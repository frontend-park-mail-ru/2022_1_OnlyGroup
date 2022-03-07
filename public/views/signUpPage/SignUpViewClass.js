import signUpPageComponent from "./signUpPage.pug.js";
import router from "../../router/router.js";
import {SignUpController} from "../../js/controller/signUpController.js";

const root = document.getElementById('root');

export class SignUpViewClass {
    /**
     * Render page
     */
    render() {
        root.innerHTML = signUpPageComponent();
        this.setHandler();
    }

    /**
     * Event listeners
     */
    setHandler() {
        const form = document.getElementById('form');
        form.addEventListener('submit', SignUpController.formSubmitEvent);

        Array.from(document.getElementsByTagName('a')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                router.go(item.pathname);
            });
        });
    }
}
