export class Router {
    /**
     * Class constructor
     */
    constructor() {
        this.routes = {};
    }
 
    /**
     * Register path
     * @param {string} path 
     * @param {Class} view 
     * @returns {Object}
     */
    register(path, view) {
        this.routes[path] = new view();
        return this;
    }
 
    /**
     * Redirect to page by path
     * @param {*} path 
     */
    go(path) {
         window.history.pushState(null, null, path);
         this.routes[window.location.pathname].render();
     }
 
    /**
     * Render page
     */
    start() {
        let currentView = this.routes[window.location.pathname];
        currentView.render();
 
        window.addEventListener('popstate', () => {
            currentView = this.routes[window.location.pathname];
            currentView.render();
        });
    }
}
 
export default new Router();
