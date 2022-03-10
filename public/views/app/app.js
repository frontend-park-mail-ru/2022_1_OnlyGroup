import appComponent from './app.pug.js';
import {userApi} from '../../js/api/api.js';
import activeUser from '../../js/api/userApi.js';
import router from '../../router/router.js';
import appPageComponent from '../appPage/appPage.pug.js';

/**
 * App page class
 */

export class App {
  constructor(root) {
    this.root = root;
  }

  /**
    * Render page
    */
  async render() {
    ;

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

    root.innerHTML = appPageComponent();
    this.root.innerHTML = appComponent();

    let name = data.FirstName + ' ' + data.LastName + ', ' + data.Birthday;
    document.querySelector('.fullname').innerHTML = name;
    document.querySelector('.info__city p').innerHTML = data.City;

    this.vectorCandidates = [];



    try{
      await this.insertCandidate()
    }catch (e){
      return
    }

    let logout_a = document.createElement('a');
    logout_a.innerHTML = "Logout";
    logout_a.classList.add("a_logout");

    logout_a.addEventListener('click', async ev =>{
      ev.preventDefault();
      ev.stopPropagation();
      try{
        const res = await userApi.logOut();
        if (!res){
          return
        }
      }catch (e){
        return
      }

      activeUser.id = -1;
      router.go('/');
    })

    let logOut = document.querySelector('.settings__link');
    logOut.append(logout_a);

    // eslint-disable-next-line prefer-const

    this.setHandlers();
  }

  async getCandidate(){
    if (this.vectorCandidates.length === 0) {
      this.vectorCandidates = await userApi.findCandidate();

      if (this.vectorCandidates === false) {
        return -1;
      }
    }
    return this.vectorCandidates.shift();
  }

  async insertCandidate(){
    let candidateId = await this.getCandidate();
    if (candidateId === -1){
      router.go('/login');
    }
    let Candidate = await userApi.getLongProfile(candidateId);


    const candidateName = Candidate.FirstName + ' ' + Candidate.LastName + ', ' + Candidate.Birthday;

    document.querySelector(' .info__name p').innerHTML = candidateName;
    document.querySelector('.info__name .info__city p').innerHTML = Candidate.City;
    document.querySelector('.info__description .description').innerHTML = Candidate.AboutUser;
  }

  setHandlers(){

    let buttons = document.querySelector('.navigation__icons');
    buttons.addEventListener('click', ev =>{

      ev.preventDefault();
      ev.stopPropagation();
      this.insertCandidate()
    })
  }
}
