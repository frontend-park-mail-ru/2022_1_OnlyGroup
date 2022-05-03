import {BaseComponent} from '../Base/Base';
import feedPhoto from './FeedPhoto.hbs';
import FeedAction from '../FeedAction/FeedAction';
import IDGenerator from '../../Modules/IDGenerator';
import Photo from '../Photo/Photo';
import {Text} from '../Text/Text';
import EventBus from '../../Modules/EventBus';
import {FEED_EVENTS, PHOTO_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Feed photo component
 */
export default class FeedPhoto extends BaseComponent {
    /**
     * Create new feed photo
     * @param {Array}styles
     */
    constructor({styles}) {
        super({styles});
        this.ready = false;
        this.allPhotos = null;
        this.currentPhoto = null;
        this.photoContainerId = IDGenerator.getId();
        this.setEvents({
            [FEED_EVENTS.photosReady]: this.photosReady,
            [FEED_EVENTS.noPhotos]: this.noPhotos,
        });
    }


    /**
     * Render feed photo
     * @return {string}
     */
    render() {
        super.prepareRender();
        return feedPhoto(this);
    }

    /**
     * Set photo
     * @param {number} num
     */
    changePhoto(num) {
        this.currentPhotoNum = num;
        this.components.photoContainer.components.photo = this.allPhotos[num];
        this.components.photoContainer.stateChanged = true;
        this.components.photoOverlay.components.current.components.handler.components.text.setText(`${num + 1}/${this.allPhotos.length}`);
        this.reRender();
    }

    /**
     * Create current image component (e.g. 3/4)
     */
    createCurrent() {
        this.components.photoOverlay.components.current = new BaseComponent({
            styles: ['feed-photo-current-container'],
        });
        this.components.photoOverlay.components.current.components.handler = new BaseComponent({
            styles: ['feed-photo-current-handler'],
        });
        this.components.photoOverlay.components.current.components.handler.components.text = new Text({
            styles: [''],
            text: '',
        });
    }

    /**
     * Create moves buttons component
     */
    createMoves() {
        this.components.photoOverlay.components.moveContainer = new BaseComponent({
            styles: ['feed-photo-move-container'],
        });
        this.components.photoOverlay.components.moveContainer.components.left = new FeedAction({
            styles: ['height-fit-content'],
            onClick: this.leftClick,
            src: 'static/images/left.png',
        });
        this.components.photoOverlay.components.moveContainer.components.right = new FeedAction({
            styles: ['height-fit-content'],
            onClick: this.rightClick,
            src: 'static/images/right.png',
        });
    }

    /**
     * Create like dislike buttons components
     */
    createActions() {
        this.components.photoOverlay.components.likesContainer = new BaseComponent({
            styles: ['feed-photo-actions-container'],
        });
        this.components.photoOverlay.components.likesContainer.components.dislike = new FeedAction({
            styles: ['height-fit-content'],
            onClick: this.dislikeClick,
            src: 'static/images/dislike.png',
        });
        this.components.photoOverlay.components.likesContainer.components.like = new FeedAction({
            styles: ['height-fit-content'],
            onClick: this.likeClick,
            src: 'static/images/like.png',
        });
    }

    /**
     * Callback for no photos current user have
     */
    noPhotos = () => {
        this.ready = true;
        this.components.photoContainer = new BaseComponent({
            styles: ['feed-photo'],
        });
        this.components.photoContainer.components.photo = new Photo({
            styles: ['feed-photo'],
            loaderEnabled: true,
            // TODO no photos placeholder
            src: 'static/images/logo.png',
        });
        this.components.photoOverlay = new BaseComponent({
            styles: ['feed-photo-overlay', 'feed-photo-overlay__no-photos'],
        });
        this.createActions();
        this.stateChanged = true;
        this.reRender();
    }

    /**
     * Photos ready callback
     * @param {[number]} photos
     */
    photosReady = ({photos}) => {
        this.ready = true;
        this.allPhotosIds = photos;
        if (this.allPhotos && this.allPhotos.length !== 0) {
            this.allPhotos.forEach((photo) => {
                photo.stop();
                photo.unmount();
            });
        }
        this.allPhotos = this.allPhotosIds.map((value) => {
            const loadEventName = `${PHOTO_EVENTS.photoGetID}${value.toString()}`;
            const onLoadEventName = `${PHOTO_EVENTS.photoReadyID}${value.toString()}`;
            const newPhoto = new Photo({
                styles: ['feed-photo'],
                loadEvent: loadEventName,
                onLoadEvent: onLoadEventName,
                loaderEnabled: true,
            });
            newPhoto.start();
            return newPhoto;
        });
        this.components.photoOverlay = new BaseComponent({
            styles: ['feed-photo-overlay'],
        });
        this.createCurrent();
        this.createMoves();
        this.createActions();
        this.components.photoContainer = new BaseComponent({
            styles: ['feed-photo'],
        });
        this.stateChanged = true;
        this.changePhoto(0);
    }

    /**
     * @callback Callback for like click
     * @param {Event}ev
     */
    likeClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(FEED_EVENTS.like);
    }

    /**
     * Callback for dislike action
     * @param {Event} ev
     */
    dislikeClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(FEED_EVENTS.dislike);
    }

    /**
     * Callback for right click
     * @param {Event} ev
     */
    rightClick = (ev) => {
        ev.preventDefault();
        if (this.currentPhotoNum === this.allPhotos.length - 1) {
            this.changePhoto(0);
            return;
        }
        this.changePhoto(this.currentPhotoNum + 1);
    }

    /**
     * Callback for left click
     * @param {Event} ev
     */
    leftClick = (ev) => {
        ev.preventDefault();
        if (this.currentPhotoNum === 0) {
            this.changePhoto(this.allPhotos.length - 1);
            return;
        }
        this.changePhoto(this.currentPhotoNum - 1);
    }
}
