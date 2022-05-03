import EventBus from '../../Modules/EventBus';
import {APP_PATHS, REDIRECT} from '../../Modules/Router';
import {LOGIN_EVENTS} from '../../Modules/EventBusEvents';
import activeUser from '../../Models/User';

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
        this.authRequired = authRequired;
    }

    /**
     * Set controller events listening
     * @param {Object}events
     */
    setEvents(events) {
        this.events = events;
    }

    userNotLoggined = () => {
        EventBus.emitEvent(REDIRECT, {path: APP_PATHS.loginPage});
    }

    /**
     * Start controller
     */
    async start() {
        if (this.authRequired) {
            await activeUser.checkLogin();
            if (!activeUser.id || activeUser.id === -1) {
                EventBus.emitEvent(REDIRECT, {path: APP_PATHS.loginPage});
                return false;
            }
            EventBus.addEventListener(LOGIN_EVENTS.userNotLoggined, this.userNotLoggined);
        }
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
        this.view.start();
        return true;
    }

    /**
     * Stop controller
     */
    stop() {
        if (this.authRequired) {
            EventBus.removeEventListener(LOGIN_EVENTS.userNotLoggined, this.userNotLoggined);
        }
        this.view.stop();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}
