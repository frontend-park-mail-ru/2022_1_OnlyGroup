import { LoginController } from '../../controllers/authController.js';
import {View} from '../view/baseView.js';
import loginView from './loginView.hbs';

/**
 * View class for login page
 */
export class LoginView extends View {
  /**
   * Constructor
   * @param {Object} parent
   */
  constructor({
    parent: parent = document.body,
    controller: controller = new LoginController({
      parent: parent,
    }),
  }) {
    super({
      parent: parent,
      controller: controller,
    });
  }

  /**
   * Render page function
   * @param {Object} props
   */
  render(props = {}) {
    this.parent.insertAdjacentHTML('afterbegin', loginView({}));
    this.setHandlers();
  }

  /**
   * Function for login user (connect with API)
   * @param {Event} event
   */
  login(event) {
    // TODO: set controller
  }

  /**
   * Function for show errors on page
   * @param {Object} error
   */
  showErrors(error) {
    if (error.emailError ) {
      document.getElementById('login').style.borderColor = '#CF5151';
      document.getElementById('email-error').innerHTML = error.emailError;
    }

    if (error.passwordError) {
      document.getElementById('password').style.borderColor = '#CF5151';
      document.getElementById('password-error').innerHTML = error.passwordError;
    }
  }

  /**
   * Function for remove errors from page
   */
  removeErrors() {
    const errors = document.querySelectorAll('.error-title');
    console.log(errors.length);
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
    form.addEventListener('click', this.login.bind(this));
  }

  /**
   * Remove event listeners from elements
   */
  removeHandlers() {
    const form = document.getElementById('form');
    if (form) {
      form.removeEventListener('click', this.login.bind(this));
    }

    this.parent.innerHtml = '';
  }
}
