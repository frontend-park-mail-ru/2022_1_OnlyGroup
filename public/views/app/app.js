import appComponent from './app.pug.js';
import {userApi} from '../../js/api/api.js';
import activeUser from '../../js/api/userApi.js';
import router from '../../router/router.js';
import appPageComponent from '../appPage/appPage.pug.js';

/**
 * App page class
 */
let vectorCandidates = [];

export class App {
  constructor(root) {
    this.root = root;
  }

  /**
    * Render page
    */
  async render() {
    debugger;
    let Candidate;
    let data;
    try {
      data = await userApi.getShortProfile(activeUser.id);
    } catch (e) {
      // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
      return;
    }
    if (data === false) {
      router.go('/login');
      return;
    }
    if (vectorCandidates.length === 0) {
      try {
        vectorCandidates = await userApi.findCandidate();
      } catch (e) {
        // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
        return;
      }
      if (vectorCandidates === false) {
        router.go('/login');
        return;
      }
    }

    try {
      Candidate = await userApi.getLongProfile(vectorCandidates[0]);
    } catch (e) {
      // Errors.setErrorVisible(passwordField, 'visible', "Not authorized");
      return;
    }
    vectorCandidates.shift();
    if (vectorCandidates === false) {
      router.go('/login');
      return;
    }

    root.innerHTML = appPageComponent();
    this.root.innerHTML = appComponent();

    // eslint-disable-next-line prefer-const
    let name = data.FirstName + ' ' + data.LastName + ', ' + data.Birthday;
    const candidateName = Candidate.FirstName + ' ' + Candidate.LastName + ', ' + Candidate.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector(' .info__name p').innerHTML = candidateName;

    document.querySelector('.info__city p').innerHTML = data.City;
    document.querySelector('.info__name .info__city p').innerHTML = Candidate.City;
    document.querySelector('.info__description .description').innerHTML = Candidate.AboutUser;
  }
}
