import appComponent from './app.pug.js';
import {Api} from '../../js/api/api.js';
import activeUser from '../../js/api/user.js';
import router from '../../router/router.js';

/**
 * App page class
 */
export class App {
  data;
  vectorCandidates = [];
  /**
   * App page constructor
   * @param {Element} root
   */
  constructor(root) {
    this.root = root;
  }
  /**
    * Render page
    */
  render() {
    this.getUserProfile();
    this.root.innerHTML = appComponent();
    this.innerUserInformation();
    this.callInsertCandidate();
    this.setHandlers();
  }

  /**
   * Async function for call insert candidates
   * @returns
   */
  async callInsertCandidate() {
    try {
      await this.insertCandidate();
    } catch (e) {
      return;
    }
  }

  /**
   * Async function for inner user information to page
   */
  innerUserInformation() {
    const name = this.data.FirstName + ' ' + this.data.LastName + ', ' + this.data.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector('.info__city p').innerHTML = this.data.City;
  }

  /**
   * Async function for get user profile from server
   * @returns 
   */
  async getUserProfile() {
    try {
      this.data = await Api.getShortProfile(activeUser.getId());
    } catch (e) {
      return;
    }
    
    if (this.data === false) {
      this.removeHandlers();
      router.go('/login');
      return;
    }
  }

  /**
   * Async function for get candidate from server
   * @return {Promise<number|T>}
   */
  async getCandidate() {
    if (this.vectorCandidates.length === 0) {
      this.vectorCandidates = await Api.findCandidate();

      if (this.vectorCandidates === false) {
        return -1;
      }
    }
    return this.vectorCandidates.shift();
  }

  /**
   * Async function for insert candidate
   * @return {Promise<void>}
   */
  async insertCandidate() {
    const candidateId = await this.getCandidate();
    if (candidateId === -1) {
      this.removeHandlers();
      router.go('/login');
    }
    const Candidate = await Api.getLongProfile(candidateId);

    const candidateName = Candidate.FirstName + ' ' +
      Candidate.LastName + ', ' + Candidate.Birthday;

    document.querySelector(' .info__name p').innerHTML = candidateName;
    document.querySelector('.info__name .info__city p').
        innerHTML = Candidate.City;
    document.querySelector('.info__description .description').
        innerHTML = Candidate.AboutUser;
  }

  /**
   * Function for get DOM elements from page
   * @returns {Array} elements
   */
  getDOMElements() {
    const elements = [];
    const editProfileBlocks = [];
    editProfileBlocks.push(document.getElementById('navigation__buttons'));
    editProfileBlocks.push(document.getElementById('navigation__field'));
    editProfileBlocks.push(document.getElementById('navigation__profile'));
    elements.push(document.getElementById('navigation__icons'));
    elements.push(document.getElementById('settings__edit'));
    elements.push(document.getElementById('cancel__button'));
    elements.push(editProfileBlocks);
    elements.push(document.getElementById('logout'));
    
    return elements;
  }

  /**
   * Change event behavior for handlers
   * @param {Event} event 
   */
  changeEventBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Function for edit profile actions
   * @param {Array} elements 
   * @param {Array} styles 
   * @param {Event} event 
   */
  editProfileActions(elements, styles, event) {
    this.changeEventBehavior(event);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = styles[i];
    }
  }

  /**
   * Logout function for handlers
   * @returns 
   */
  async logoutButton(event) {
    this.changeEventBehavior(event);
    try {
      const result = await Api.logOut();
      if (!result) {
        return;
      }
    } catch (event) {
      return;
    }

    activeUser.logout();
    router.go('/');
    this.removeHandlers();
  }

  /**
   * Handlers for buttons on page
   */
  setHandlers() {
    const elements = this.getDOMElements();
    
    elements[0].addEventListener('click', (event) => {
      this.changeEventBehavior(event);
      this.insertCandidate();
    });

    elements[1].addEventListener('click', (event) => this.editProfileActions(elements[3], ['none', 'none', 'flex'], event));

    elements[2].addEventListener('click', (event) => this.editProfileActions(elements[3], ['flex', 'flex', 'none'], event));

    elements[4].addEventListener('click', (event) => {
      this.logoutButton(event);
    });
  }

  /**
   * Remove handlers from elements
   */
  removeHandlers() {
    const elements = this.getDOMElements();

    elements[0].addEventListener('click', (event) => {
      this.changeEventBehavior(event);
      this.insertCandidate();
    });

    elements[1].removeEventListener('click', (event) => this.editProfileActions(elements[3], ['none', 'none', 'flex'], event));

    elements[2].removeEventListener('click', (event) => this.editProfileActions(elements[3], ['flex', 'flex', 'none'], event));

    elements[4].addEventListener('click', (event) => {
      this.logoutButton(event);
    });
  }
}
