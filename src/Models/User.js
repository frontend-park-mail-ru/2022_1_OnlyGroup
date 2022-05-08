import {Api} from '../Modules/Api.js';
import EventBus from '../Modules/EventBus.js';
import Validators from '../Modules/Validators';
import {REGISTER_VIEW_NAMES} from '../Modules/ViewConsts';
import {API_FAILED, FEED_EVENTS, LOGIN_EVENTS} from '../Modules/EventBusEvents';
import {Photo} from './Photo';

const statusUnathorized = 401;

/**
 * User class
 */
export class User {
    id;

    /**
     * Create new user
     * @param {number|null|undefined} id
     * @param {boolean} active
     */
    constructor({id = null, active = false}) {
        this.id = id;
        this.photos = null;
        this.photosIds = null;
        this.active = active;
    }

    startActiveUser = () => {
        if (this.active) {
            EventBus.addEventListener(FEED_EVENTS.activeUserLoadMin, this.loadMin);
        }
    };

    loadMin = async () => {
        if (!this.id || this.id === -1) {
            return;
        }
        await Promise.all([this.getShortInfo(), this.getAvatar()]);
        this.avatar.startAvatar();
        EventBus.emitEvent(FEED_EVENTS.activeUserReadyMin, {avatar: this.avatar.id, info: this});
    };

    /**
     * Process api /user result
     * @param {ApiResult} result
     */
    #processAuthResult(result) {
        if (result.Status === statusUnathorized) {
            this.id = -1;
            EventBus.emitEvent(LOGIN_EVENTS.userNotLoggined);
            return;
        }
        if (!result.isOk()) {
            EventBus.emitEvent(API_FAILED, result);
            return;
        }
        this.id = +result.Body.ID;
        EventBus.emitEvent(LOGIN_EVENTS.userLoggined);
    }

    /**
     * Check user already loggined
     * @return {Promise<void>}
     * @constructor
     */
    async checkLogin() {
        if (this.id === -1) {
            EventBus.emitEvent(LOGIN_EVENTS.userNotLoggined);
            return;
        }
        if (this.id !== null) {
            EventBus.emitEvent(LOGIN_EVENTS.userLoggined);
            return;
        }
        const result = await Api.CheckLogin();
        this.#processAuthResult(result);
    }

    /**
     * Login user
     * @param {string} email
     * @param {string} password
     * @return {Promise<void>}
     * @constructor
     */
    async login({email, password}) {
        const validationRes = Validators.validateEmailPasswordRepeatPassword({email, password});
        if (validationRes) {
            EventBus.emitEvent(LOGIN_EVENTS.userValidationFailed, validationRes);
            return;
        }

        const result = await Api.LogIn({Email: email, Password: password});
        this.#processAuthResult(result);
    }

    /**
     * Register user
     * @param {string} email
     * @param {string} password
     * @param {string} passwordRepeat
     * @return {Promise<void>}
     * @constructor
     */
    async logUp({email, password, passwordRepeat}) {
        const validationRes = Validators.validateEmailPasswordRepeatPassword({email, password, passwordRepeat});
        if (validationRes) {
            EventBus.emitEvent(LOGIN_EVENTS.userValidationFailed, validationRes);
            return;
        }
        const result = await Api.LogUp({Email: email, Password: password});
        if (result.Status === 409) {
            EventBus.emitEvent(LOGIN_EVENTS.userValidationFailed, {email: REGISTER_VIEW_NAMES.userEmailUsed});
            return;
        }

        this.#processAuthResult(result);
    }

    /**
     * Logout user
     * @return {Promise<void>}
     * @constructor
     */
    async logOut() {
        const result = await Api.LogOut();
        if (!result.isOk()) {
            EventBus.emitEvent(API_FAILED, result);
            return;
        }
        this.id = -1;
        EventBus.emitEvent(LOGIN_EVENTS.userNotLoggined);
    }

    startFeed = async () => {
        await Promise.all([this.getAllPhotos(), this.getLongInfo()]);
        EventBus.emitEvent(FEED_EVENTS.infoReady, {info: this});
        if (this.photosIds.length === 0) {
            EventBus.emitEvent(FEED_EVENTS.noPhotos);
            return;
        }
        this.photos.forEach((value) => {
            value.start();
        });
        EventBus.emitEvent(FEED_EVENTS.photosReady, {photos: this.photosIds});
    };

    preLoad = () => {
        this.getLongInfo();
        this.getAllPhotos();
    };

    /**
     * Calculate age by birthday
     */
    calculateAge() {
        if (this.birthDay === undefined) {
            this.age = '?';
            return;
        }
        const birth = new Date(this.birthDay);
        const now = Date.now();
        const ageDiff = new Date(now - birth);
        this.age = ageDiff.getFullYear().toString();
    }

    getShortInfo = async () => {
        const response = await Api.GetShortProfile({id: this.id});
        if (!response.isOk()) {
            EventBus.emitEvent(API_FAILED, response);
            return;
        }
        this.firstName = response.Body.FirstName;
        this.lastName = response.Body.LastName;
        this.city = response.Body.City;
    };

    getAvatar = async () => {
        if (!this.avatar) {
            this.avatar = new Photo({
                userId: this.id,
                isAvatar: true,
            });
            await this.avatar.load();
        }
    };

    getLongInfo = async () => {
        if (this.aboutUser) {
            return;
        }
        const response = await Api.GetLongProfile({
            id: this.id,
        });
        if (!response.isOk()) {
            EventBus.emitEvent(API_FAILED, response);
            return;
        }
        this.aboutUser = response.Body.AboutUser;
        this.firstName = response.Body.FirstName;
        this.lastName = response.Body.LastName;
        this.age = response.Body.Age;
        this.birthDay = response.Body.BirthDay;
        this.city = response.Body.City;
        this.gender = response.Body.Gender;
        this.height = response.Body.Height;
        this.interests = response.Body.Interests;
        this.calculateAge();
    };

    getAllPhotos = async () => {
        if (this.photos) {
            return;
        }
        const response = await Api.GetAllUserPhotos({
            userId: this.id,
        });
        if (!response.isOk()) {
            EventBus.emitEvent(API_FAILED, response);
            return;
        }
        this.photosIds = response.Body.Photos;
        if (this.photosIds.length === 0) {
            return;
        }
        this.photos = this.photosIds.map((value, index) => {
            const photo = new Photo({id: value});
            if (index < 1) {
                photo.load();
            }
            return photo;
        });
    };

    like = async () => {
        const response = await Api.SetLikeDislike({
            id: this.id,
            action: 1,
        });
        if (!response.isOk()) {
            EventBus.emitEvent(API_FAILED, response);
        }
    };

    dislike = async () => {
        const response = await Api.SetLikeDislike({
            id: this.id,
            action: 2,
        });
        if (!response.isOk()) {
            EventBus.emitEvent(API_FAILED, response);
        }
    };

    stopFeed = async () => {
        if (this.photos) {
            this.photos.forEach((value) => {
                value.stop();
            });
        }
    };
}

const
    activeUser = new User({
        active: true,
    });
activeUser
    .startActiveUser();

export default activeUser;
