import idGenerator from '../../Modules/IDGenerator';
import EventBus from '../../Modules/EventBus';

export const COMPONENTS_TYPES = {
    primary: 'primaryType',
    secondary: 'secondaryType',
    submit: 'submitType',
    error: 'errorType',
};

/**
 * Base component
 */
export class BaseComponent {
    id;
    type;
    events;
    components;
    stateChanged;

    /**
     *  Create Base component
     *  @param {string|undefined} type
     */
    constructor({type= COMPONENTS_TYPES.primary}) {
        this.id = idGenerator.getId();
        this.type = type;
        this.components = {};
        this.addComponents = {};
        this.stateChanged = false;
        this.events = {};
    }

    /**
     * Create all components
     */
    initComponents() {
    }

    /**
     * Set events from eventBus that component should listen
     * @param {Object} events
     */
    setEvents(events) {
        this.events = events;
    }

    /**
     * Prepare for render(this.renderedComponents)
     */
    prepareRender() {
        this[this.type] = true;
        this.renderedComponents = Object.values(this.components).reduce((prevStr, currElem) => {
            currElem.prepareRender();
            return prevStr + currElem.render();
        }, '');
        Object.entries(this.addComponents).forEach(([key, value]) => {
            if (typeof value !== 'object') {
                return;
            }
            this[`rendered${key}`] = Object.values(value).reduce((prevStr, currElem) => {
                currElem.prepareRender();
                return prevStr + currElem.render();
            }, '');
        });
    }

    /**
     * Start listenning for eventBus events
     */
    start() {
        Object.values(this.components).forEach((component) => {
            component.start();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.start();
            });
        });
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
    }

    /**
     * Pause component
     */
    pause() {
        Object.values(this.components).forEach((component) => {
            component.pause();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.pause();
            });
        });
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }

    /**
     * Stop listenning for eventBus events
     */
    stop() {
        Object.values(this.components).forEach((component) => {
            component.stop();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.stop();
            });
        });
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
    }

    /**
     * Rerender component
     */
    reRender() {
        if (this.stateChanged && this.elem) {
            const savedElem = this.elem;
            this.unmount();
            this.prepareRender();
            savedElem.insertAdjacentHTML('beforebegin', this.render());
            savedElem.parentNode.removeChild(savedElem);
            this.mount();
            this.stateChanged = false;
            return;
        }
        Object.values(this.components).forEach((component) => {
            component.reRender();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.reRender();
            });
        });
        this.stateChanged = false;
    }

    /**
     * Render component
     * @return {string}
     */
    render() {
        return '';
    }

    /**
     * Mount component
     */
    mount() {
        this.findElem();
        Object.values(this.components).forEach((component) => {
            component.mount();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.mount();
            });
        });
    }

    /**
     * Unmount component
     */
    unmount() {
        Object.values(this.components).forEach((component) => {
            component.unmount();
        });
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.unmount();
            });
        });
        this.elem = null;
    }

    /**
     * Find element in DOM
     */
    findElem() {
        if (!this.elem) {
            this.elem = document.getElementById(this.id.toString());
        }
    }
}
