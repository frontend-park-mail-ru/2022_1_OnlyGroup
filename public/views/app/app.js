import appComponent from './app.pug.js';
import {Api} from '../../js/api/api.js';
import activeUser from '../../js/api/user.js';
import router from '../../router/router.js';

/**
 * App page class
 */
export class App {
  data;
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
  async render() {
    this.getUserProfile();

    this.root.innerHTML = appComponent();
    const name = this.data.FirstName + ' ' + this.data.LastName + ', ' + this.data.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector('.info__city p').innerHTML = this.data.City;

    this.vectorCandidates = [];
    try {
      await this.insertCandidate();
    } catch (e) {
      return;
    }

    this.setHandlers();
  }

  /**
   * Async function for get user profile from server
   * @returns 
   */
  async getUserProfile() {
    try {
      this.data = await Api.getShortProfile(activeUser.id);
    } catch (e) {
      return;
    }
    
    if (data === false) {
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
   * Handlers for buttons on page
   */
  setHandlers() {
    const buttons = document.getElementById('navigation__icons');
    const editProfileButton = document.getElementById('settings__edit');
    const cancelButton = document.getElementById('cancel__button');
    const navigationButtons = document.getElementById('navigation__buttons');
    const navigationField = document.getElementById('navigation__field');
    const navigationProfile = document.getElementById('navigation__profile');
    const logout = document.getElementById('logout');
    
    buttons.addEventListener('click', (ev) =>{
      ev.preventDefault();
      ev.stopPropagation();
      this.insertCandidate();
    });

    editProfileButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigationButtons.style.display = 'none';
      navigationField.style.display = 'none';
      navigationProfile.style.display = 'flex';
    });

    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigationButtons.style.display = 'flex';
      navigationField.style.display = 'flex';
      navigationProfile.style.display = 'none';
    });

    logout.addEventListener('click', async (event) =>{
      event.preventDefault();
      event.stopPropagation();
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
    });
  }
}
