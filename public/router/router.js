const root = document.getElementById('root');

/**
 * Router
 */
export class Router {
  /**
   * Class constructor
   */
  constructor() {
    this.routes = {};
  }

  /**
   * Redirect to page by path
   * @param {*} path
   */
  go(path) {
    if (typeof this.routes[window.location.pathname] !== undefined) {
      this.routes[path].render();
    } else {
      this.routes['/error'].render();
    }
  }

  /**
   * Register path
   * @param {string} path
   * @param {Class} View
   */
  register(path, View) {
    this.routes[path] = new View(root);
  }

  /**
   * Render page
   */
  start() {
    if (typeof this.routes[window.location.pathname] !== undefined) {
      this.go(window.location.pathname);
    } else {
      this.go('/error');
    }

    window.addEventListener('click', (event) => {
      let parentElem = event.target.parentElement;
      while (parentElem) {
        if (event.target.tagName === 'A') {
          event.preventDefault();

          this.go(event.target.pathname);
          break;
        }

        parentElem = parentElem.parentElement;
      }
    });
  }
}

export default new Router();
