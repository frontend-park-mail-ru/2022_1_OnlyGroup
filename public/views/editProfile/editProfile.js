import editProfileComponent from './editProfile.pug.js';

const root = document.getElementById('root');

/**
 * Edit profile class
 */
export class EditProfile {
  /**
    * Render page
    */
  render() {
    root.innerHTML = editProfileComponent();
  }
}
