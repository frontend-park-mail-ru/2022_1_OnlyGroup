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
            this.routes[window.location.pathname].render();
        } else {
            this.go('/error');
        }

        window.addEventListener('click', (event) => {
            let parentElem = event.target;
            while (parentElem && parentElem.tagName !== 'A') {
                parentElem = parentElem.parentElement;
            }

            if (parentElem) {
                this.go(parentElem.pathname)
                event.preventDefault()
            }
        });
    }
}

export default new Router();
