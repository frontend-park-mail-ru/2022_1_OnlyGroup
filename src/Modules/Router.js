export const APP_PATHS = {
    loginPage: '/login',
    registerPage: '/register',
    messagesPage: '/messages',
    matchesPage: 'matches',
    findCandidatePage: '/',
    profilePage: '/settings',
    notFoundPage: '/404',
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
     * @param {string} path
     */
    go(path) {
        this.#currentRoute.stop();
        if (typeof this.#routes[window.location.pathname] !== undefined) {
            path = (path) ? path : '/';
            window.history.pushState(null, null, path);
            this.#currentRoute = this.#routes[path];
            this.#currentRoute.start();
            return;
        }

        this.#routes[APP_PATHS.notFoundPage].start();
    }

    /**
     * Redirect to page by path
     * @param {*} path
     */
    redirect(path) {
        window.history.pushState(null, null, path);
    }

    /**
     * Register path
     * @param {string} path
     * @param {BaseController} controller
     */
    register(path, controller) {
        this.#routes[path] = controller;
    }

    /**
     * Render page
     */
    start() {
        window.addEventListener('click', (event) => {
            let parentElem = event.target;
            while (parentElem) {
                if (parentElem.tagName === 'A') {
                    event.preventDefault();

                    this.go(event.target.pathname);
                    break;
                }

                parentElem = parentElem.parentElement;
            }
        });

        window.addEventListener('popstate', (event) => {
            event.preventDefault();
            this.#currentRoute.stop();
            this.#currentRoute = this.#routes[window.location.pathname];
            this.#currentRoute.start();
        });
        this.#currentRoute = this.#routes[window.location.pathname];
        this.#currentRoute.start();
    }
}

export default new Router();
