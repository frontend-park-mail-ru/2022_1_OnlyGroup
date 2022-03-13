import signInComponent from './signIn.pug.js';
import {SignInForm} from '../../js/forms/signInForm.js';
import {userApi} from '../../js/api/api.js';
import activeUser from '../../js/api/userApi.js';
import router from '../../router/router.js';

/**
 * Sign in class
 */
export class SignIn {
  /**
   * Sign in page constructor
   * @param {Element} root
   */
  constructor(root) {
    this.root = root;
  }
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
    this.root.innerHTML = signInComponent();
    this.setHandler();
  }


  /**
   * Event listeners
   */
  setHandler() {
    const form = document.getElementById('form');
    form.addEventListener('submit', SignInForm.formSubmitEvent);
  }

  /**
   * Set error visibility
   * @param {*} input
   * @param {*} visibility
   * @param {*} text
   */
  static setErrorVisible(input, visibility, text) {
    const error = document.querySelector(`.${input.classList.item(0)}__error`);
    error.textContent = text;
    error.style.visibility = visibility;
  }
}
