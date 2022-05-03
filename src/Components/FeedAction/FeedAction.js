import {BaseComponent} from '../Base/Base';
import feedAction from './FeedAction.hbs';
import Photo, {PHOTO_STATES} from '../Photo/Photo';

export const FEED_ACTIONS_STATES = {
    like: 'like',
    dislike: 'dislike',
    left: 'left',
    right: 'right',
};

const PHOTO_SOURCES = {
    [FEED_ACTIONS_STATES.like]: 'static/images/like.png',
    [FEED_ACTIONS_STATES.dislike]: 'static/images/dislike.png',
    [FEED_ACTIONS_STATES.left]: 'static/images/left.png',
    [FEED_ACTIONS_STATES.right]: 'static/images/right.png',
};

/**
 * Feed action component
 */
export default class FeedAction extends BaseComponent {
    /**
     * Create feed action
     * @param {string|undefined} state
     * @param {function} onClick
     */
    constructor({state, onClick}) {
        super({state});
        this.onClick = onClick;
        this.initComponents();
    }

    /**
     * Init components
     */
    initComponents() {
        this.components.image = new Photo({
            state: PHOTO_STATES.feedAction,
            src: PHOTO_SOURCES[this.state],
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
