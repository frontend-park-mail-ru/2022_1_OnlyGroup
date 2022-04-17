import {BaseView} from '../../views/BaseView/BaseView';
import EventBus from '../../Modules/EventBus';

/**
 * Base controller classx
 */
export class BaseController {
    /**
     * Create Base controller
     * @param {BaseView}view
     */
    constructor({view}) {
        this.view = new view({parent: document.getElementById('root')});
    }

    /**
     * Set controller events listening
     * @param {Object}events
     */
    setEvents(events) {
        this.events = events;
    }

    /**
     * Start controller
     */
    start() {
        this.view.render();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
    }

    /**
     * Stop controller
     */
    stop() {
        this.view.unmount();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}
