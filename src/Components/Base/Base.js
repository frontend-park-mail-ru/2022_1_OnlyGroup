import idGenerator from '../../Modules/idGenerator';

/**
 * Base component
 */
export class BaseComponent {
    id;
    styles;

    /**
     *  Create base component
     * @param {Array} styles
     */
    constructor({styles}) {
        this.id = idGenerator.getId();
        this.styles = styles;
    }

    /**
     * Get styles for handlebars
     * @return {string}
     */
    get styles() {
        return this.styles.join(' ');
    }

    /**
     * Render component
     */
    render() {
    }

    /**
     * Mount component
     */
    mount() {
    }

    /**
     * Unmount component
     */
    unmount() {
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
