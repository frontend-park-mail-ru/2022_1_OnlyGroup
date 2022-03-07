import signInPageComponent from "./signInPage.pug.js";
import router from "../../router/router.js";
import {SignInController} from "../../js/controller/signInController.js";

const root = document.getElementById('root');

export class SignInViewClass {
    /**
     * Render page
     */
    render() {
        root.innerHTML = signInPageComponent();
        this.setHandler();
    }

    /**
     * Event listeners
     */
    setHandler() {
        const form = document.getElementById('form');
        form.addEventListener('submit', SignInController.formSubmitEvent);

        Array.from(document.getElementsByTagName('a')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                router.go(item.pathname);
            });
        });
    }
}
