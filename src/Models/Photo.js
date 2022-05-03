import {API_PREFIX, IP, PORT} from '../Modules/FetchWrap';
import {Api, PHOTO_API_URL} from '../Modules/Api';
import EventBus from '../Modules/EventBus';
import {API_FAILED, PHOTO_EVENTS} from '../Modules/EventBusEvents';

/**
 * User photo model
 */
export class Photo {
    id;
    image;
    photoReady;
    paramsReady;
    loading;
    emitOnLoad;
    authorId;
    leftTopX;
    leftTopY;
    rightBottomX;
    rightBottomY;

    /**
     * Create user photo
     * @param {number|undefined} id
     * @param {boolean} isAvatar
     * @param {number|undefined} userId
     */
    constructor({id, userId, isAvatar = false}) {
        this.id = id;
        this.image = null;
        this.photoReady = false;
        this.paramsReady = false;
        this.loading = false;
        this.emitOnLoad = false;
        this.isAvatar = isAvatar;
        this.userId = userId;
    }

    /**
     * Start photo model processing feed
     */
    start() {
        EventBus.addEventListener(`${PHOTO_EVENTS.photoGetID}${this.id.toString()}`, this.getPhoto);
    }

    /**
     * Stop photo model processing feed
     */
    stop() {
        EventBus.removeEventListener(`${PHOTO_EVENTS.photoGetID}${this.id.toString()}`, this.getPhoto);
    }

    /**
     * Start photo processing avatars
     */
    startAvatar() {
        if (this.id) {
            EventBus.addEventListener(`${PHOTO_EVENTS.avatarGetID}${this.id.toString()}`, this.getPhoto);
        }
    }

    /**
     * stop photo processing avatars
     */
    stopAvatar() {
        if (this.id) {
            EventBus.removeEventListener(`${PHOTO_EVENTS.avatarGetID}${this.id.toString()}`, this.getPhoto);
        }
    }

    /**
     * Emit ready event
     */
    emit() {
        const eventName = (this.isAvatar) ? `${PHOTO_EVENTS.avatarReadyID}${this.id.toString()}` : `${PHOTO_EVENTS.photoReadyID}${this.id.toString()}`;
        EventBus.emitEvent(eventName, {
            image: this.image,
            leftTopX: this.leftTopX,
            leftTopY: this.leftTopY,
            rightBottomX: this.rightBottomX,
            rightBottomY: this.rightBottomY,
        });
    }

    /**
     * Get photo if its ready
     */
    getPhoto = () => {
        if (this.paramsReady && this.photoReady) {
            this.emitOnLoad = false;
            this.emit();
            return;
        }
        if (!this.loading) {
            this.load();
        }
        this.emitOnLoad = true;
    }

    /**
     * Load image
     */
    load = async () => {
        this.loading = true;

        if (this.isAvatar) {
            const result = await Api.GetAvatar({userId: this.userId});
            if (result.Status === 404) {
                this.id = null;
                return;
            }
            if (!result.isOk()) {
                EventBus.emitEvent(API_FAILED, result);
                return;
            }
            this.id = result.Body.Avatar;
            this.image = new Image();
            this.image.src = `${IP + PORT}/${API_PREFIX}${PHOTO_API_URL}/${this.id.toString()}`;
            this.image.addEventListener('load', this.onLoadImage);
            this.leftTopX = result.Body.Params.LeftTop[0];
            this.leftTopY = result.Body.Params.LeftTop[1];
            this.rightBottomX = result.Body.Params.RightBottom[0];
            this.rightBottomY = result.Body.Params.RightBottom[1];
        } else {
            this.image = new Image();
            this.image.src = `${IP + PORT}/${API_PREFIX}${PHOTO_API_URL}/${this.id.toString()}`;
            this.image.addEventListener('load', this.onLoadImage);

            const result = await Api.GetPhotoParams({id: this.id});
            if (!result.isOk()) {
                return;
            }
            this.leftTopX = result.Body.LeftTop[0];
            this.leftTopY = result.Body.LeftTop[1];
            this.rightBottomX = result.Body.RightBottom[0];
            this.rightBottomY = result.Body.RightBottom[1];
        }

        this.paramsReady = true;
        if (this.emitOnLoad && this.photoReady) {
            this.getPhoto();
        }
    }

    onLoadImage = () => {
        this.image.removeEventListener('load', this.onLoadImage);
        this.photoReady = true;
        if (this.emitOnLoad && this.paramsReady) {
            this.getPhoto();
        }
    }
}
