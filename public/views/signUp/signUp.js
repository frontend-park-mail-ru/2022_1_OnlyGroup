import signUpComponent from './signUp.pug.js';
import {SignUpForm} from '../../js/forms/signUpForm.js';

/**
 * Sign up class
 */
export class SignUp {
  /**
   * Sign up page constructor
   * @param {Element} root
   */
  constructor(root) {
    this.root = root;
  }
  /**
    * Render page
    */
  render() {
    this.root.innerHTML = signUpComponent();
    this.setHandler();
  }

  /**
    * Event listeners
    */
  setHandler() {
    const form = document.getElementById('form');
    form.addEventListener('submit', SignUpForm.formSubmitEvent);
  }

  /**
   * Set error visibility
   * @param {*} input
   * @param {*} visibility
   * @param {*} text
   */
  static setErrorVisible(input, visibility, text) {
    const error = document.
        querySelector(`.${input.classList.item(0)}__error`);
    error.textContent = text;
    error.style.visibility = visibility;
  }
}
