import signInPageComponent from './signInPage.pug.js';
import router from '../../router/router.js';
import {SignInController} from '../../js/controller/signInController.js';
import activeUser from '../../js/api/userApi.js';
import {userApi} from '../../js/api/api.js';

const root = document.getElementById('root');

export class SignInViewClass {
  /**
     * Render page
     */
  async render() {
    const userId = await userApi.checkLogin();
    if (userId !== -1) {
      activeUser.id = userId;
      router.go('/profile');
      return;
    }

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
