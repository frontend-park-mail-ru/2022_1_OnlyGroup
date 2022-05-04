/**
 * Base view class
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
     * Start base view
     */
    start() {
        Object.values(this.components).forEach((component) => {
            component.start();
        });
        this.render();
    }

    /**
     * Start base view
     */
    stop() {
        Object.values(this.components).forEach((component) => {
            component.stop();
        });
    }

    /**
     * Render Base view
     */
    prepareRender() {
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
        Object.values(this.components).forEach((component) => {
            component.reRender();
        });
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
