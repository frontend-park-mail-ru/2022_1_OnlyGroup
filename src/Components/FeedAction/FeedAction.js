import {BaseComponent} from '../Base/Base';
import feedAction from './FeedAction.hbs';
import Photo from '_components/Photo/Photo';

/**
 * Feed action component
 */
export default class FeedAction extends BaseComponent {
    /**
     * Create feed action
     * @param {Array} styles
     * @param {function} onClick
     * @param {string} src
     */
    constructor({styles, onClick, src}) {
        super({styles});
        this.onClick = onClick;
        this.src = src;
        this.components.image = new Photo({
            styles: ['feed-action'],
            src: this.src,
        });
    }

    /**
     * Init components
     */
    initComponents() {
    }

    /**
     * Render feed action
     * @return {string}
     */
    render() {
        this.prepareRender();
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
