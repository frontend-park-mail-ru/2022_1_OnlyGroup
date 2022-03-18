import signInComponent from './signIn.pug.js';
import {SignInForm} from '../../js/forms/signInForm.js';
import {Api} from '../../js/api/api.js';
import activeUser from '../../js/api/user.js';
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
    this.checkUserLogin();
    this.root.innerHTML = signInComponent();
    this.setHandler();
  }

  /**
   * Async function for check user login
   * @returns
   */
  async checkUserLogin() {
    const userId = await Api.checkLogin();
    if (userId !== -1) {
      activeUser.setId(userId);
      router.redirect('/profile');
      return;
    }
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
