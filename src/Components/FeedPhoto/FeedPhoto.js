import {BASE_COMPONENT_STATES, BaseComponent} from '../Base/Base';
import feedPhoto from './FeedPhoto.hbs';
import FeedAction, {FEED_ACTIONS_STATES} from '../FeedAction/FeedAction';
import Photo, {PHOTO_STATES} from '../Photo/Photo';
import {Text} from '../Text/Text';
import EventBus from '../../Modules/EventBus';
import {FEED_EVENTS, PHOTO_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Feed photo component
 */
export default class FeedPhoto extends BaseComponent {
    /**
     * Create new feed photo
     * @param {string|undefined} state
     */
    constructor({state}) {
        super({state});
        this.ready = false;
        this.allPhotos = null;
        this.currentPhoto = null;
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
            state: BASE_COMPONENT_STATES.feedPhotoCurrentContainer,
        });
        this.components.photoOverlay.components.current.components.handler = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhotoCurrentHandler,
        });
        this.components.photoOverlay.components.current.components.handler.components.text = new Text({
            text: '',
        });
    }

    /**
     * Create moves buttons component
     */
    createMoves() {
        this.components.photoOverlay.components.moveContainer = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhotoMoveContainer,
        });
        this.components.photoOverlay.components.moveContainer.components.left = new FeedAction({
            state: FEED_ACTIONS_STATES.left,
            onClick: this.leftClick,
        });
        this.components.photoOverlay.components.moveContainer.components.right = new FeedAction({
            state: FEED_ACTIONS_STATES.right,
            onClick: this.rightClick,
        });
    }

    /**
     * Create like dislike buttons components
     */
    createActions() {
        this.components.photoOverlay.components.likesContainer = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhotoActionsContainer,
        });
        this.components.photoOverlay.components.likesContainer.components.dislike = new FeedAction({
            state: FEED_ACTIONS_STATES.dislike,
            onClick: this.dislikeClick,
        });
        this.components.photoOverlay.components.likesContainer.components.like = new FeedAction({
            state: FEED_ACTIONS_STATES.like,
            onClick: this.likeClick,
        });
    }

    /**
     * Callback for no photos current user have
     */
    noPhotos = () => {
        this.ready = true;
        this.components.photoContainer = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhoto,
        });
        this.components.photoContainer.components.photo = new Photo({
            state: PHOTO_STATES.feedPhoto,
            loaderEnabled: true,
            // TODO no photos placeholder
            src: 'static/images/logo.png',
        });
        this.components.photoOverlay = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhotoOverlayNoPhotos,
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
                state: PHOTO_STATES.feedPhoto,
                loadEvent: loadEventName,
                onLoadEvent: onLoadEventName,
                loaderEnabled: true,
            });
            newPhoto.start();
            return newPhoto;
        });
        this.components.photoOverlay = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhotoOverlay,
        });
        this.createCurrent();
        this.createMoves();
        this.createActions();
        this.components.photoContainer = new BaseComponent({
            state: BASE_COMPONENT_STATES.feedPhoto,
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
        EventBus.emitEvent(FEED_EVENTS.actionLike);
    }

    /**
     * Callback for dislike action
     * @param {Event} ev
     */
    dislikeClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(FEED_EVENTS.actionDislike);
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
