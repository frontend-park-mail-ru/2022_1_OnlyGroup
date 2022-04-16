export const AppPaths = {
    loginPage: '/login',
    logupPage: '/logup',
    mainPage: '/',
};

/**
 * Router
 */
export class Router {
    #routes;
    #currentRoute;

    /**
     * Create router
     */
    constructor() {
        this.#routes = {};
        this.#currentRoute = undefined;
    }

    /**
     * Go to path
     * @param {string}path
     */
    go(path) {
        // this.#currentRoute.unmount()
        if (typeof this.#routes[window.location.pathname] !== undefined) {
            window.history.pushState(null, null, path);
            this.#routes[path].start();
            return;
        }

        this.#routes['/error'].render();
    }

    /**
     * Redirect to page by path
     * @param {*} path
     */
    redirect(path) {
        // this.#currentRoute.unmount()
        window.history.pushState(null, null, path);
        this.#routes[path].render();
    }

    /**
     * Register path
     * @param {string} path
     * @param {Class} controller
     */
    register(path, controller) {
        this.#routes[path] = controller;
    }

    /**
     * Render page
     */
    start() {
        this.go(window.location.pathname);

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

        window.addEventListener('popstate', (event) => {
            event.preventDefault();
            this.#routes[window.location.pathname].render();
        });
    }
}

export default new Router();
