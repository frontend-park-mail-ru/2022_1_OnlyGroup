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
      console.log(this.routes[window.location.pathname]);
      this.routes[path].render();
    } else {
      this.routes['/error'].render();
    }
  }

  /**
   * Register path
   * @param {string} path
   * @param {Class} view
   * @return {Object}
   */
  register(path, view) {
    this.routes[path] = new view(root);
  }

  /**
   * Render page
   */
  start() {
    if (typeof this.routes[window.location.pathname] !== undefined) {
      console.log(this.routes[window.location.pathname]);
      this.routes[window.location.pathname].render();
    } else {
      this.go('/error');
    }

    window.addEventListener('click', (event) => {
      // debugger
      // console.log(event.target.tagName);

      let parentElem = event.target.parentElement;
      while (parentElem) {
        if (event.target.tagName === 'A') {
          event.preventDefault();

          this.go(event.target.pathname);
          break;
        }

        // if (event.target.tagName === 'BUTTON') {
        //   if (event.target.className === 'cancel') {
        //     this.go('/profile');
        //     break;
        //   }
        // }
        parentElem = parentElem.parentElement;
      }
    });
  }
}

export default new Router();
