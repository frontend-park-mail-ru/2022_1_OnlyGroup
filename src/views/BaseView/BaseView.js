/**
 * Base BaseView class
 */
export class BaseView {
    /**
     * Create base view
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        this.parent = parent;
    }

    /**
     * Render base view
     */
    render() {
    }

    /**
     * Unmount base view
     */
    unmount() {
    }
}
