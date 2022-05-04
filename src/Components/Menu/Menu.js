import {BASE_COMPONENT_STATES, BaseComponent} from '../Base/Base';
import menu from './Menu.hbs';
import {Button, BUTTON_STATES} from '../Button/Button';
import {FEED_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';
import EventBus from '../../Modules/EventBus';
import {LOGIN_EVENTS} from '../../Modules/EventBusEvents';

export const MENU_STATES = {
    message: 'message',
    matches: 'matches',
    findCandidate: 'find-candidate',
    myProfile: 'my-profile',
};
/**
 * Left menu main page component
 */
export class Menu extends BaseComponent {
    #currentEnabled;

    /**
     * Create new menu component
     * @param {string|undefined}state
     */
    constructor({state}) {
        super({state});
        this.components.messages = new Button({
            state: BUTTON_STATES.messageMenu,
            text: FEED_VIEW_NAMES.buttonMessagesTittle,
            href: APP_PATHS.messagesPage,
        });
        this.components.matches = new Button({
            state: BUTTON_STATES.matchesMenu,
            text: FEED_VIEW_NAMES.buttonMatchesTittle,
            href: APP_PATHS.matchesPage,
        });
        this.components.findCandidate = new Button({
            state: BUTTON_STATES.findCandidateMenu,
            text: FEED_VIEW_NAMES.buttonFindCandidatesTittle,
            href: APP_PATHS.findCandidatePage,
        });
        this.components.myProfile = new Button({
            state: BUTTON_STATES.myProfileMenu,
            text: FEED_VIEW_NAMES.buttonMyProfileTittle,
            href: APP_PATHS.profilePage,
        });
        this.components.exit = new Button({
            state: BUTTON_STATES.exitMenu,
            text: FEED_VIEW_NAMES.buttonExitTittle,
            onClick: this.exitClick,
        });
    }

    /**
     * Set enabled menu state
     * @param {string} state
     */
    setState({state}) {
        if (this.#currentEnabled) {
            this.#currentEnabled.setEnabled(false);
        }
        switch (state) {
        case MENU_STATES.message:
            this.#currentEnabled = this.components.messages;
            break;
        case MENU_STATES.matches:
            this.#currentEnabled = this.components.matches;
            break;
        case MENU_STATES.findCandidate:
            this.#currentEnabled = this.components.findCandidate;
            break;
        case MENU_STATES.myProfile:
            this.#currentEnabled = this.components.myProfile;
            break;
        }
        this.#currentEnabled.setEnabled(true);
    }

    /**
     * @callback Exit button click
     * @param {Event}ev
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
}
