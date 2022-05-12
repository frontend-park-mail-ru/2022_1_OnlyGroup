import {BaseComponent} from '../Base/Base';
import menu from './Menu.hbs';
import {Button, BUTTON_ACTIVE_TYPES} from '../Button/Button';
import {FEED_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {LOGIN_EVENTS} from '../../Modules/EventBusEvents';

export const MENU_STATES = {
    message: 'message',
    matches: 'matches',
    findCandidate: 'find-candidate',
    myProfile: 'my-profile',
    settings: 'settings',
};
/**
 * Left menu main page component
 */
export default new class Menu extends BaseComponent {
    /**
     * Create new menu component
     */
    constructor() {
        super({});
        this.currentEnabled = undefined;
        this.components.myProfile = new Button({
            text: FEED_VIEW_NAMES.buttonMyProfileTittle,
            href: APP_PATHS.profilePage,
            icon: '/static/images/profileDisable.png',
            iconActive: '/static/images/profileActive.png',
            canActivate: true,
            activeType: BUTTON_ACTIVE_TYPES.blue,
        });
        this.components.messages = new Button({
            text: FEED_VIEW_NAMES.buttonMessagesTittle,
            href: APP_PATHS.messagesPage,
            icon: '/static/images/MsgDark.png',
            iconActive: '/static/images/MsgLight.png',
            canActivate: true,
            activeType: BUTTON_ACTIVE_TYPES.red,
        });
        this.components.matches = new Button({
            text: FEED_VIEW_NAMES.buttonMatchesTittle,
            href: APP_PATHS.matchesPage,
            icon: '/static/images/cards.png',
            iconActive: '/static/images/cardsDisable.png',
            canActivate: true,
            activeType: BUTTON_ACTIVE_TYPES.blue,
        });
        this.components.findCandidate = new Button({
            text: FEED_VIEW_NAMES.buttonFindCandidatesTittle,
            href: APP_PATHS.findCandidatePage,
            icon: '/static/images/RefreshDisable.png',
            iconActive: '/static/images/RefreshActive.png',
            canActivate: true,
            activeType: BUTTON_ACTIVE_TYPES.red,
        });
        this.components.settings = new Button({
            text: FEED_VIEW_NAMES.buttonSettingsTittle,
            href: APP_PATHS.settingsPage,
            icon: '/static/images/settings.png',
            iconActive: '/static/images/settingsLight.png',
            canActivate: true,
            activeType: BUTTON_ACTIVE_TYPES.blue,
        });
        this.components.exit = new Button({
            text: FEED_VIEW_NAMES.buttonExitTittle,
            onClick: this.exitClick,
            icon: '/static/images/logout.png',
            canActivate: true,
        });
    }

    /**
     * Set enabled menu state
     * @param {string} state
     */
    setState({state}) {
        if (this.currentEnabled) {
            this.currentEnabled.setActive(false);
        }
        switch (state) {
        case MENU_STATES.message:
            this.currentEnabled = this.components.messages;
            break;
        case MENU_STATES.matches:
            this.currentEnabled = this.components.matches;
            break;
        case MENU_STATES.findCandidate:
            this.currentEnabled = this.components.findCandidate;
            break;
        case MENU_STATES.myProfile:
            this.currentEnabled = this.components.myProfile;
            break;
        case MENU_STATES.settings:
            this.currentEnabled = this.components.settings;
            break;
        }
        this.currentEnabled.setActive(true);
    }

    /**
     * @callback Exit button click
     * @param {Event} ev
     */
    exitClick = (ev) => {
        ev.preventDefault();
        EventBus.emitEvent(LOGIN_EVENTS.logout);
    }

    /**
     * Render menu component
     * @return {string}
     */
    render() {
        return menu(this);
    }
};
