import {View} from '../view/baseView.js';
import loginView from './loginView.hbs';
import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginFormComponent from "../../Components/LoginForm/LoginForm";
import EventBus from "../../Modules/EventBus";
import router from "../../Modules/router";

/**
 * View class for login page
 */
export class LoginView extends View {
  /**
   * Constructor
   * @param {Object} parent
   */
  constructor({parent}) {
    // super({parent});
    // debugger
    super({parent})
    this.loginForm = new LoginFormComponent()
  }

  /**
   * Render page function
   * @param {Object} props
   */
  render() {
    let rendered = this.loginForm.render();
    this.parent.innerHTML = rendered;
    this.loginForm.mount();
    EventBus.addEventListener('api finished', this.view.rerfeshuserinfo)
    EventBus.addEventListener('form-submit', ()=>{
      //api получить авторизаиця
      сцьлцу
      сцулошцус
      EventBus.emitEventListener('login suscess', {wcjiwecwbnecnwec})
    })
    EventBus.addEventListener('login suscees', ()=>{
      router.go("/profile")
    })

    this.loginForm.button.button
    // this.parent.insertAdjacentHTML('afterbegin', );
    // this.setHandlers();
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

    // const form = document.getElementById('form');
    // form.addEventListener('click', this.login.bind(this));
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
