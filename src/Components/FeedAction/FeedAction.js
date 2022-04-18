import {BaseComponent} from '../Base/Base';
import feedAction from './FeedAction.hbs';

/**
 * Feed action component
 */
export default class FeedAction extends BaseComponent {
    /**
     * Create feed action
     * @param {Array}styles
     * @param {function}onClick
     */
    constructor({styles, onClick, src}) {
        super({styles});
        this.onClick = onClick;
        this.src = src;
    }

    /**
     * Render feed action
     * @return {string}
     */
    render() {
        return feedAction(this);
    }

    /**
     * Mount feed action component
     */
    mount() {
        super.mount();
        if (this.elem && this.onClick) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount feed action component
     */
    unmount() {
        if (this.elem && this.onClick) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }
}
