/**
 * BaseView class
 */
export default class BaseView {
    components;

    /**
     * Create Base view
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        this.components = {};
        this.parent = parent;
    }

    /**
     * Render Base view
     */
    preRender() {
        this.renderedComponents = Object.values(this.components).reduce((prevStr, currElem) => {
            return prevStr + currElem.render();
        }, '');
    }

    /**
     * Render base view
     */
    render() {
    }

    /**
     * Rerender view
     */
    reRender() {
        this.unmount();
        this.render();
    }

    /**
     * Mount view
     */
    mount() {
        Object.values(this.components).forEach((component) => {
            component.mount();
        });
    }

    /**
     * Unmount Base view
     */
    unmount() {
        Object.values(this.components).forEach((component) => {
            component.unmount();
        });
    }
}
