import idGenerator from '../../Modules/IDGenerator';
import Base from './Base.hbs';
import EventBus from '../../Modules/EventBus';

/**
 * Base component
 */
export class BaseComponent {
    id;
    styles;
    events;
    components;
    stateChanged;

    /**
     *  Create Base component
     * @param {Array|undefined} styles
     */
    constructor({styles}) {
        this.id = idGenerator.getId();
        this.styles = (styles === undefined) ? '' : styles.join(' ');
        this.components = {};
        this.stateChanged = false;
        this.events = {};
        this.initComponents();
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
        this.renderedComponents = Object.values(this.components).reduce((prevStr, currElem) => {
            return prevStr + currElem.render();
        }, '');
    }

    /**
     * Start listenning for eventBus events and mount component
     */
    start() {
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
        this.mount();
    }

    /**
     * Stop listenning for eventBus events and unmount component
     */
    stop() {
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.removeEventListener(key, value);
        });
        this.unmount();
    }

    /**
     * Rerender component
     */
    reRender() {
        if (this.stateChanged) {
            const savedElem = this.elem;
            this.unmount();
            savedElem.insertAdjacentHTML('beforebegin', this.render());
            savedElem.parentNode.removeChild(savedElem);
            this.mount();
            this.stateChanged = false;
            return;
        }
        Object.values(this.components).forEach((component) =>{
            component.reRender();
        });
        this.stateChanged = false;
    }

    /**
     * Render component
     * @return {string}
     */
    render() {
        this.prepareRender();
        return Base(this);
    }

    /**
     * Mount component
     */
    mount() {
        this.findElem();
        Object.values(this.components).forEach((component) => {
            component.mount();
        });
    }

    /**
     * Unmount component
     */
    unmount() {
        Object.values(this.components).forEach((component) => {
            component.unmount();
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
