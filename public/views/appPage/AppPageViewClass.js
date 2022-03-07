import appPageComponent from "./appPage.pug.js";
import router from "../../router/router.js";

const root = document.getElementById('root');

export class AppPageViewClass {
    /**
     * Render page
     */
    render() {
        root.innerHTML = appPageComponent();
        this.setHandler();
    }

    /**
     * Event listeners
     */
    setHandler() {
        const editProfileButton = document.querySelector('.settings__edit');
        editProfileButton.addEventListener('click', (event) => {
            event.preventDefault();
            router.go(editProfileButton.pathname);
        });
    }
}
