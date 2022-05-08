import {BaseComponent, COMPONENTS_TYPES} from '../Base/Base';
import feedAction from './FeedAction.hbs';
import Photo from '../Photo/Photo';

export const FEED_ACTION_SOURCES = {
    like: 'static/images/like.png',
    dislike: 'static/images/dislike.png',
    left: 'static/images/left.png',
    right: 'static/images/right.png',
};

/**
 * Feed action component
 */
export default class FeedAction extends BaseComponent {
    /**
     * Create feed action
     * @param {string|undefined} type
     * @param {string} src
     * @param {function} onClick
     */
    constructor({type, src, onClick}) {
        super({type});
        this.src = src;
        this.onClick = onClick;
        this.initComponents();
    }

    /**
     * Init components
     */
    initComponents() {
        this.components.image = new Photo({
            type: COMPONENTS_TYPES.secondary,
            src: this.src,
        });
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
