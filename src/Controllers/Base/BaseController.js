import EventBus from '../../Modules/EventBus';
import router, {APP_PATHS} from '../../Modules/Router';
import {LOGIN_REGISTER_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Base controller class
 */
export class BaseController {
    /**
     * Create Base controller
     * @param {BaseView} view
     * @param {boolean} authRequired
     */
    constructor({view, authRequired = true}) {
        this.view = new view({parent: document.getElementById('root')});
        this.autheficated = false;
        this.authRequired = authRequired;
    }

    /**
     * Set controller events listening
     * @param {Object}events
     */
    setEvents(events) {
        this.events = events;
    }

    userAutheficated = () => {
        this.autheficated = true;
    }

    userUnautheficated = () => {
        this.autheficated = false;
    }

    userNotLoggined = () => {
        router.go(APP_PATHS.loginPage);
    }

    /**
     * Start controller
     */
    async start() {
        if (this.authRequired) {
            EventBus.addEventListener(LOGIN_REGISTER_EVENTS.userLoggined, this.userAutheficated);
            EventBus.addEventListener(LOGIN_REGISTER_EVENTS.userNotLoggined, this.userUnautheficated);
            await activeUser.checkLogin();
            EventBus.removeEventListener(LOGIN_REGISTER_EVENTS.userLoggined, this.userAutheficated);
            EventBus.removeEventListener(LOGIN_REGISTER_EVENTS.userNotLoggined, this.userUnautheficated);
            if (!this.autheficated) {
                router.go(APP_PATHS.loginPage);
                return;
            }
            EventBus.addEventListener(LOGIN_REGISTER_EVENTS.userNotLoggined, this.userNotLoggined);
        }
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
        this.view.start();
    }

    /**
     * Stop controller
     */
    stop() {
        if (this.authRequired && this.autheficated) {
            EventBus.removeEventListener(LOGIN_REGISTER_EVENTS.userNotLoggined, this.userNotLoggined);
        }
        this.view.stop();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}
