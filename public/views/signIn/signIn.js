import signInComponent from './signIn.pug.js';
import SignInForm from '../../js/forms/signInForm.js';

/**
 * Sign in class
 */
export class SignIn {
  constructor(root) {
    this.root = root;
  }

  /**
    * Render page
    */
  render() {
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
    const error = document
      .querySelector(`.${input.classList.item(0)}__error`);
    error.textContent = text;
    error.style.visibility = visibility;
  }
}
