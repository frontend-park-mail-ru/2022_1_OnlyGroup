import errorComponent from './error.pug.js';

/**
 * Error not found class
 */
export class ErrorNotFound {
  constructor(root) {
    this.root = root;
  }

  /**
    * Render page
    */
  render() {
    this.root.innerHTML = errorComponent();
  }
}