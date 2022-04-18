import {BaseComponent} from '../Base/Base';
import feedPhoto from './FeedPhoto.hbs';
import FeedAction from '../FeedAction/FeedAction';

/**
 * Feed photo component
 */
export default class FeedPhoto extends BaseComponent {
    /**
     * Create new feed photo
     * @param {Array}styles
     * @param {function}onLikeClick
     * @param {function}onDislikeClick
     * @param {function|undefined}onSuperLikeClick
     * @param {string}src
     */
    constructor({styles, onLikeClick, onDislikeClick, onSuperLikeClick, src}) {
        super({styles});
        this.onSuperLikeClick = (onSuperLikeClick === undefined) ? null : onSuperLikeClick;
        this.onLikeClick = onLikeClick;
        this.onDislikeClick = onDislikeClick;
        this.src = src;
        this.components.like = new FeedAction({
            styles: [],
            onClick: this.likeClick,
            src: 'static/images/like.png',
        });
        this.components.dislike = new FeedAction({
            styles: [],
            onClick: this.dislikeClick,
            src: 'static/images/dislike.png',
        });
        if (onSuperLikeClick) {
            this.components.superLike = new FeedAction({
                styles: [],
                onClick: this.superLikeClick,
                src: 'static/images/favorite.png',
            });
        }
    }

    /**
     * Render feed photo
     * @return {string}
     */
    render() {
        super.preRender();
        return feedPhoto(this);
    }

    /**
     * Mount feed component
     */
    mount() {
        super.mount();
    }

    /**
     * @callback Callback for like click
     * @param {Event}ev
     */
    likeClick = (ev) => {
        ev.preventDefault();
        this.onLikeClick();
    }

    /**
     * @callback Callback for dislike click
     * @param {Event}ev
     */
    dislikeClick = (ev) => {
        ev.preventDefault();
        this.onDislikeClick();
    }

    /**
     * @callback Callback for super like click
     * @param {Event}ev
     */
    superLikeClick = (ev) => {
        ev.preventDefault();
        this.onSuperLikeClick();
    }
}
