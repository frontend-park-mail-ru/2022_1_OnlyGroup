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
        this.addComponents = {};
        this.parent = parent;
    }

    /**
     * Start base view
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
        this.render();
    }

    /**
     * Start base view
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
                elem.unmount();
            });
        });
    }

    /**
     * Render Base view
     */
    prepareRender() {
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
        Object.values(this.addComponents).forEach((value) => {
            if (typeof value !== 'object') {
                return;
            }
            Object.values(value).forEach((elem) => {
                elem.reRender();
            });
        });
    }

    /**
     * Mount view
     */
    mount() {
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
     * Unmount Base view
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
    }
}
