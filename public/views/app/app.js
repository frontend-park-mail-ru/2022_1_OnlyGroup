import appComponent from './app.pug.js';

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
  render() {
    this.root.innerHTML = appComponent();
  }
}
