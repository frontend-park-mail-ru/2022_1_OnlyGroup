import appPageComponent from "./appPage.pug.js";
import router from "../../router/router.js";
import {userApi} from "../../js/api/api.js";
import activeUser from "../../js/api/userApi.js";

const root = document.getElementById('root');

export class AppPageViewClass {
    /**
     * Render page
     */
    async render() {
        const userId = await userApi.checkLogin()
        if (userId === -1){
            router.go('/')
            return
        }

        activeUser.id = userId
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
