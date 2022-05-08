import {BaseComponent, COMPONENTS_TYPES} from '../Base/Base';
import photo from './Photo.hbs';
import EventBus from '../../Modules/EventBus';


const PHOTO_STYLES = {
    [COMPONENTS_TYPES.primary]: ['photo', 'photo_primary'],
    [COMPONENTS_TYPES.secondary]: ['photo', 'photo_secondary'],
};

/**
 * Photo component
 */
export default class Photo extends BaseComponent {
    /**
     * Create photo component
     * @param {string|undefined} type
     * @param {string|undefined} onLoadEvent
     * @param {string|undefined} loadEvent
     * @param {string|undefined} src
     * @param {boolean} loaderEnabled
     */
    constructor({type, onLoadEvent, loadEvent, src, loaderEnabled = false}) {
        super({type});
        this.loadEventName = loadEvent;
        this.src = src;
        this.image = null;
        this.loaderEnabled = loaderEnabled;
        this.imageReady = false;
        this.photoStyle = PHOTO_STYLES[type];
        if (src !== undefined) {
            this.image = new Image();
            this.image.src = this.src;
            this.image.addEventListener('load', this.onPhotoLoadedInternal);
        }
        if (onLoadEvent !== undefined) {
            this.setEvents({
                [onLoadEvent]: this.onPhotoLoadedExternal,
            });
        }
    }

    /**
     * Render photo component
     * @return {string}
     */
    render() {
        return photo(this);
    }

    /**
     * Callback for image loaded event
     * @param {Image} image
     * @param {number} leftTopX
     * @param {number} leftTopY
     * @param {number} rightBottomX
     * @param {number} rightBottomY
     */
    onPhotoLoadedExternal = ({image, leftTopX, leftTopY, rightBottomX, rightBottomY}) => {
        const width = rightBottomX - leftTopX;
        const height = rightBottomY - leftTopY;
        this.image = document.createElement('canvas');
        this.image.width = width;
        this.image.height = height;
        this.image.getContext('2d').drawImage(image, leftTopX, leftTopY, width, height, 0, 0, width, height);
        this.imageReady = true;
        this.stateChanged = true;
        this.reRender();
    }


    /**
     * Stop/remove photo component
     */
    stop() {
        super.stop();
        if (this.src !== undefined) {
            this.image.src = '';
            this.image.removeEventListener('load', this.onPhotoLoadedInternal);
        }
    }

    /**
     * Callback for image load EventListener
     */
    onPhotoLoadedInternal = () => {
        this.stateChanged = true;
        this.imageReady = true;
        this.reRender();
    }

    /**
     * Mount photo component
     */
    mount() {
        super.mount();
        if (!this.image && this.loadEventName !== undefined) {
            EventBus.emitEvent(this.loadEventName);
        }
        if (this.imageReady && this.elem) {
            this.elem.innerHTML = '';
            this.image.classList.add(...this.photoStyle);
            this.elem.insertAdjacentElement('afterbegin', this.image);
        }
    }
}
