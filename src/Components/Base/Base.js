import idGenerator from '../../Modules/IDGenerator';
import Base from './Base.hbs';
import EventBus from '../../Modules/EventBus';

export const BASE_COMPONENT_STATES = {
    default: 'default',
    leftColumn: 'leftColumn',
    rightColumn: 'rightColumn',
    activeUserColumn: 'activeUserColumn',
    feedPhotoCurrentContainer: 'feedPhotoCurrentContainer',
    feedPhotoCurrentHandler: 'feedPhotoCurrentHandler',
    feedPhotoMoveContainer: 'feedPhotoMoveContainer',
    feedPhotoActionsContainer: 'feedPhotoActionsContainer',
    feedPhoto: 'feedPhoto',
    feedPhotoOverlay: 'feedPhotoOverlay',
    feedPhotoOverlayNoPhotos: 'feedPhotoOverlayNoPhotos',
    loginFormOffer: 'loginFormRegisterOfferContainer',
};

/**
 * Base component
 */
export class BaseComponent {
    id;
    state;
    events;
    components;
    stateChanged;

    /**
     *  Create Base component
     * @param {string|undefined} state
     */
    constructor({state = BASE_COMPONENT_STATES.default}) {
        this.id = idGenerator.getId();
        this.state = state;
        this.components = {};
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
        this[this.state] = true;
        this.renderedComponents = Object.values(this.components).reduce((prevStr, currElem) => {
            currElem.prepareRender();
            return prevStr + currElem.render();
        }, '');
    }

    /**
     * Start listenning for eventBus events
     */
    start() {
        Object.values(this.components).forEach((component) => {
            component.start();
        });
        Object.entries(this.events).forEach(([key, value]) => {
            EventBus.addEventListener(key, value);
        });
    }

    /**
     * Stop listenning for eventBus events
     */
    stop() {
        Object.values(this.components).forEach((component) => {
            component.stop();
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
