import idGenerator from '../../Modules/IDGenerator';
import Base from './Base.hbs';

/**
 * Base component
 */
export class BaseComponent {
    id;
    styles;
    components;

    /**
     *  Create base component
     * @param {Array|undefined}styles
     */
    constructor({styles}) {
        this.id = idGenerator.getId();
        this.styles = (styles === undefined) ? '' : styles.join(' ');
        this.components = {};
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
            this.elem = document.getElementById(this.id);
        }
    }
}
