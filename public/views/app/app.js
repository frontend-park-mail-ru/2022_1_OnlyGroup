import appComponent from './app.pug.js';
import {userApi} from '../../js/api/api.js';
import activeUser from '../../js/api/userApi.js';
import router from '../../router/router.js';
import {buttonsHandlers} from '../../js/app/appButtons.js';

/**
 * App page class
 */
export class App {
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
    let data;
    try {
      data = await userApi.getShortProfile(activeUser.id);
    } catch (e) {
      return;
    }
    if (data === false) {
      router.go('/login');
      return;
    }

    this.root.innerHTML = appComponent();
    this.root.innerHTML = appComponent();

    const name = data.FirstName + ' ' + data.LastName + ', ' + data.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector('.info__city p').innerHTML = data.City;

    this.vectorCandidates = [];

    try {
      await this.insertCandidate();
    } catch (e) {
      return;
    }

    const logout = document.querySelector('.logout');

    logout.addEventListener('click', async (ev) =>{
      ev.preventDefault();
      ev.stopPropagation();
      try {
        const res = await userApi.logOut();
        if (!res) {
          return;
        }
      } catch (e) {
        return;
      }

      activeUser.id = -1;
      router.go('/');
    });

    this.setHandlers();
  }

  /**
   * Async function for get candidate from server
   * @return {Promise<number|T>}
   */
  async getCandidate() {
    if (this.vectorCandidates.length === 0) {
      this.vectorCandidates = await userApi.findCandidate();

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
    const Candidate = await userApi.getLongProfile(candidateId);

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
    const buttons = document.querySelector('.navigation__icons');
    buttons.addEventListener('click', (ev) =>{
      ev.preventDefault();
      ev.stopPropagation();
      this.insertCandidate();
    });

    buttonsHandlers();
  }
}
