/**
 * Base BaseView class
 */
export class BaseView {
    /**
     * Create Base view
     * @param {HTMLElement} parent
     */
    constructor({parent}) {
        this.parent = parent;
    }

    /**
     * Render Base view
     */
    render() {
    }

    /**
     * Unmount Base view
     */
    unmount() {
    }
}
