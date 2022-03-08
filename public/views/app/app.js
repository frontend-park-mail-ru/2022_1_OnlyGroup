import appComponent from './app.pug.js';

const root = document.getElementById('root');

/**
 * App page class
 */
export class App {
  /**
    * Render page
    */
  render() {
    root.innerHTML = appComponent();
  }
}
