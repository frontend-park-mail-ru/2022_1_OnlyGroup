import {View} from '../view/baseView.js';
import registerView from './registerView.hbs';

/**
 * View class for login page
 */
export class RegisterView extends View {
  /**
   * Constructor
   * @param {Object} parent
   */
  constructor({
    parent: parent = document.body,
  }) {
    super({
      parent: parent,
    });
  }

  /**
   * Render page function
   * @param {Object} props
   */
  render(props = {}) {
    this.parent.insertAdjacentHTML('afterbegin', registerView({}));
    this.setHandlers();
  }

  /**
   * Function for login user (connect with API)
   * @param {Event} event
   */
   register(event) {
    // TODO: set controller
  }

  /**
   * Function for show errors on page
   * @param {Object} error
   */
  showErrors(error) {
    if (error.emailError ) {
      document.getElementById('signup').style.borderColor = '#CF5151';
      document.getElementById('email-error').innerHTML = error.emailError;
    }

    if (error.passwordError) {
      document.getElementById('password').style.borderColor = '#CF5151';
      document.getElementById('password-error').innerHTML = error.passwordError;
    }

    if (error.repeatPasswordError) {
      document.getElementById('password').style.borderColor = '#CF5151';
      document.getElementById('repeat-password').style.borderColor = '#CF5151';
      document.getElementById('password-repeat-error').innerHTML = error.repeatPasswordError;
    }
  }

  /**
   * Function for remove errors from page
   */
  removeErrors() {
    const errors = document.querySelectorAll('.error-title');
    for (let i = 0; i < errors.length; i++) {
      errors[i].style.borderColor = '#594c74';
      errors[i].visibility = 'hidden';
    }
  }

  /**
   * Add event listeners on elements
   */
  setHandlers() {
    const form = document.getElementById('form');
    form.addEventListener('click', this.register.bind(this));
  }

  /**
   * Remove event listeners from elements
   */
  removeHandlers() {
    const form = document.getElementById('form');
    if (form) {
      form.removeEventListener('click', this.register.bind(this));
    }

    this.parent.innerHtml = '';
  }
}
