import {BaseComponent, COMPONENTS_TYPES} from '../Base/Base';
import {Text} from '../Text/Text';
import activeUser from './ActiveUser.hbs';
import Photo from '../Photo/Photo';
import EventBus from '../../Modules/EventBus';
import {FEED_EVENTS, LOGIN_EVENTS, PHOTO_EVENTS} from '../../Modules/EventBusEvents';

/**
 * Feed left top active user component
 */
export class ActiveUserComponent extends BaseComponent {
    /**
     * Create active user component
     */
    constructor() {
        super({});
        this.ready = false;
        this.setEvents({
            [FEED_EVENTS.activeUserReadyMin]: this.onReady,
            [LOGIN_EVENTS.userNotLoggined]: this.clearInfo,
        });
    }

    /**
     * Ready to place info
     */
    onReady = ({avatar, info}) => {
        this.ready = true;
        if (avatar) {
            this.components.avatar = new Photo({
                type: COMPONENTS_TYPES.secondary,
                loadEvent: `${PHOTO_EVENTS.avatarGetID}${avatar}`,
                onLoadEvent: `${PHOTO_EVENTS.avatarReadyID}${avatar}`,
                loaderEnabled: true,
            });
        } else {
            this.components.avatar = new Photo({
                type: COMPONENTS_TYPES.secondary,
                // TODO avatar placeholder
                src: 'static/images/logo.png',
                loaderEnabled: true,
            });
        }
        this.addComponents.rightColumn = {};
        this.addComponents.rightColumn.name = new Text({
            type: COMPONENTS_TYPES.secondary,
            text: `${info.firstName} ${info.lastName}`,
        });
        this.addComponents.rightColumn.city = new Text({
            type: COMPONENTS_TYPES.secondary,
            text: `${info.city}`,
        });
        this.stateChanged = true;
        this.reRender();
    }

    /**
     * Render active user component
     * @return {string}
     */
    render() {
        return activeUser(this);
    }

    clearInfo = () => {
        this.ready = false;
    }

    /**
     * Mount active user component
     */
    mount() {
        if (!this.ready) {
            EventBus.emitEvent(FEED_EVENTS.activeUserLoadMin);
        }
        super.mount();
    }
}
