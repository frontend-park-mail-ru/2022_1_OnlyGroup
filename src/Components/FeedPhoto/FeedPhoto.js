import {BaseComponent} from '../Base/Base';
import feedPhoto from './FeedPhoto.hbs';
import FeedAction, {FEED_ACTION_SOURCES} from '../FeedAction/FeedAction';
import Photo, {PHOTO_TYPES} from '../Photo/Photo';
import {Text, TEXT_TYPES} from '../Text/Text';
import EventBus from '../../Modules/EventBus';
import {FEED_EVENTS, PHOTO_EVENTS} from '../../Modules/EventBusEvents';
import {Container} from '_components/Container/Container';

/**
 * Feed photo component
 */
export default class FeedPhoto extends BaseComponent {
    /**
     * Create new feed photo
     * @param {boolean} createActions
     */
    constructor({createActions = false}) {
        super();
        this.ready = false;
        this.allPhotos = null;
        this.currentPhoto = null;
        this.needCreateActions = createActions;
        this.setEvents({
            [FEED_EVENTS.photosReady]: this.photosReady,
            [FEED_EVENTS.noPhotos]: this.noPhotos,
        });
        this.createCurrent();
        this.createMoves();
        this.createActions();
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
        this.addComponents.Current.text.setText(`${num + 1}/${this.allPhotos.length}`);
        this.reRender();
    }

    /**
     * Create current image component (e.g. 3/4)
     */
    createCurrent() {
        this.addComponents.Current = {};
        this.addComponents.Current.text = new Text({
            type: TEXT_TYPES.secondary,
            text: '',
        });
    }

    /**
     * Create moves buttons component
     */
    createMoves() {
        this.addComponents.Moves = {};
        this.addComponents.Moves.left = new FeedAction({
            src: FEED_ACTION_SOURCES.left,
            onClick: this.leftClick,
        });
        this.addComponents.Moves.right = new FeedAction({
            src: FEED_ACTION_SOURCES.right,
            onClick: this.rightClick,
        });
    }


    /**
     * Create like dislike buttons components
     */
    createActions() {
        if (!this.needCreateActions) {
            return;
        }
        this.addComponents.Actions = {};
        this.addComponents.Actions.dislike = new FeedAction({
            src: FEED_ACTION_SOURCES.dislike,
            onClick: this.dislikeClick,
        });
        this.addComponents.Actions.like = new FeedAction({
            src: FEED_ACTION_SOURCES.like,
            onClick: this.likeClick,
        });
    }

    /**
     * Callback for no photos current user have
     */
    noPhotos = () => {
        this.ready = true;
        if (this.allPhotos && this.allPhotos.length !== 0) {
            this.allPhotos.forEach((photo) => {
                photo.stop();
                photo.unmount();
            });
        }
        this.allPhotos = null;
        this.components.photoContainer = new Container({});
        this.components.photoContainer.components.photo = new Photo({
            type: PHOTO_TYPES.primary,
            loaderEnabled: true,
            // TODO no photos placeholder
            src: 'Static/Images/logo.png',
        });
        this.createActions();
        this.stateChanged = true;
        this.reRender();
    };

    /**
     * Photos ready callback
     * @param {[number]} photos
     */
    photosReady = ({photos}) => {
        this.ready = true;
        if (this.allPhotos && this.allPhotos.length !== 0) {
            this.allPhotos.forEach((photo) => {
                photo.stop();
                photo.unmount();
            });
        }
        this.allPhotosIds = photos;
        this.allPhotos = this.allPhotosIds.map((id) => {
            const loadEventName = `${PHOTO_EVENTS.photoGetID}${id.toString()}`;
            const onLoadEventName = `${PHOTO_EVENTS.photoReadyID}${id.toString()}`;
            const newPhoto = new Photo({
                type: PHOTO_TYPES.primary,
                loadEvent: loadEventName,
                onLoadEvent: onLoadEventName,
                loaderEnabled: true,
            });
            newPhoto.start();
            return newPhoto;
        });
        this.components.photoContainer = new Container({});
        this.stateChanged = true;
        this.changePhoto(0);
    };

    /**
     * @callback Callback for like click
     * @param {Event}ev
     */
    likeClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(FEED_EVENTS.like);
    };

    /**
     * Callback for dislike action
     * @param {Event} ev
     */
    dislikeClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(FEED_EVENTS.dislike);
    };

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
    };

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
    };
}
