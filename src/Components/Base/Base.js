import idGenerator from '../../Modules/IDGenerator';
import Base from './Base.hbs';

/**
 * Base component
 */
export class BaseComponent {
    id;
    styles;
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
    }

    /**
     * Prepare for render(this.renderedComponents)
     */
    preRender() {
        this.renderedComponents = Object.values(this.components).reduce((prevStr, currElem) => {
            return prevStr + currElem.render();
        }, '');
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
        this.preRender();
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
