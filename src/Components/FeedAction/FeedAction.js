import {BaseComponent} from '../Base/Base';
import feedAction from './FeedAction.hbs';
import Photo, {PHOTO_TYPES} from '../Photo/Photo';

export const FEED_ACTION_SOURCES = {
    like: 'Static/Images/like.png',
    dislike: 'Static/Images/dislike.png',
    left: 'Static/Images/left.png',
    right: 'Static/Images/right.png',
};

/**
 * Feed action component
 */
export default class FeedAction extends BaseComponent {
    /**
     * Create feed action
     * @param {string} src
     * @param {function} onClick
     */
    constructor({src, onClick}) {
        super();
        this.src = src;
        this.onClick = onClick;
        this.initComponents();
    }

    /**
     * Init components
     */
    initComponents() {
        this.components.image = new Photo({
            type: PHOTO_TYPES.secondary,
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
