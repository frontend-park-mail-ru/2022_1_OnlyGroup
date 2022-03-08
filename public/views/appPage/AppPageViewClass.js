import appPageComponent from "./appPage.pug.js";
import router from "../../router/router.js";
import {userApi} from "../../js/api/api.js"
import {Errors} from "../../js/modules/errors.js";
import activeUser from "../../js/api/userApi.js";
const root = document.getElementById('root');

let vectorCandidates

export class AppPageViewClass {

     async render() {
        let data
        debugger
        try{
            data = await userApi.getShortProfile(activeUser.id)
        } catch (e){
            // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
            return;
        }
        if (data === false) {
            router.go("/login");
            return;
        }

        try{
            vectorCandidates = await userApi.findCandidate()
        } catch (e){
            // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
            return;
        }
        if (vectorCandidates === false) {
            router.go("/login");
            return;
        }

        try{
            vectorCandidates = await userApi.getLongProfile(vectorCandidates[0])
        } catch (e){
            // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
            return;
        }
        if (vectorCandidates === false) {
            router.go("/login");
            return;
        }


        let city1
        root.innerHTML = appPageComponent();

        city1 = document.querySelector('.info__city p');
        city1.innerHTML = data.City;

        this.setHandler();
    }


    async setHandler() {


        const editProfileButton = document.querySelector('.settings__edit');
        editProfileButton.addEventListener('click', (event) => {
            event.preventDefault();
            router.go(editProfileButton.pathname);
        });
    }
}
