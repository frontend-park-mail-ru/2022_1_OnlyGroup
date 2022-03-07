import editProfilePageComponent from "./editProfilePage.pug.js";
import router from "../../router/router.js";

const root = document.getElementById('root');

export class EditProfileViewClass {
    /**
     * Render page
     */
    render() {
        root.innerHTML = editProfilePageComponent();
        this.setHandler();
    }

    /**
     * Event listeners
     */
    setHandler() {
        const cancelButton = document.querySelector('.cancel');
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            router.go('/profile');
        });
    }
}
