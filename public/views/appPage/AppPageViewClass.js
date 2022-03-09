import appPageComponent from './appPage.pug.js';
import router from '../../router/router.js';
import {userApi} from '../../js/api/api.js';
import {Errors} from '../../js/modules/errors.js';
import activeUser from '../../js/api/userApi.js';

const root = document.getElementById('root');

let vectorCandidates = [];

export class AppPageViewClass {
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
    // eslint-disable-next-line prefer-const
    let name = data.FirstName + ' ' + data.LastName + ', ' + data.Birthday;
    let candidateName = Candidate.FirstName + ' ' + Candidate.LastName + ', ' + Candidate.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector(' .info__name p').innerHTML = candidateName;

    document.querySelector('.info__city p').innerHTML = data.City;
    document.querySelector('.info__name .info__city p').innerHTML = Candidate.City;
    document.querySelector('.info__description .description').innerHTML = Candidate.AboutUser;

    this.setHandler();
  }


  async setHandler() {


    const editProfileButton = document.querySelector('.settings__edit');
    editProfileButton.addEventListener('click', (event) => {
      event.preventDefault();
      router.go(editProfileButton.pathname);
    });
  }
}
