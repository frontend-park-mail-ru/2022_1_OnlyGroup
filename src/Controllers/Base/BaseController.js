import EventBus from '../../Modules/EventBus';

/**
 * Base controller class
 */
export class BaseController {
    /**
     * Create Base controller
     * @param {BaseView} view
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
        this.view.start();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
    }

    /**
     * Stop controller
     */
    stop() {
        this.view.stop();
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }
}
