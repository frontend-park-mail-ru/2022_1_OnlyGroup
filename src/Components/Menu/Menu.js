import {BaseComponent} from '../Base/Base';
import menu from './Menu.hbs';
import {Button} from '../Button/Button';
import {FEED_VIEW_NAMES} from '../../Modules/ViewConsts';
import {APP_PATHS} from '../../Modules/Router';

export const menuStatesName = {
    message: 'message',
    matches: 'matches',
    findCandidate: 'find-candidate',
    myProfile: 'my-profile',
};
/**
 * Left menu main page component
 */
export default class Menu extends BaseComponent {
    #currentEnabled;

    /**
     * Create new menu component
     * @param {Array}styles
     * @param {string}state
     * @param {function}onExitClick
     */
    constructor({styles, state, onExitClick}) {
        super(styles);
        this.onExitClick = onExitClick;
        this.components.messages = new Button({
            styles: ['button__menu'],
            text: FEED_VIEW_NAMES.buttonMessagesTittle,
            href: APP_PATHS.messagesPage,
            hrefStyles: ['w-full'],
            enabledStyles: [''],
            icon: '/static/images/MsgDark.png',
        });
        this.components.matches = new Button({
            styles: ['button__menu'],
            text: FEED_VIEW_NAMES.buttonMatchesTittle,
            href: APP_PATHS.matchesPage,
            hrefStyles: ['w-full'],
            icon: 'static/images/cards.png',
        });
        this.components.findCandidate = new Button({
            styles: ['button__menu'],
            text: FEED_VIEW_NAMES.buttonFindCandidatesTittle,
            href: APP_PATHS.findCandidatePage,
            hrefStyles: ['w-full'],
            enabledStyles: ['button__menu-enabled-red'],
            icon: 'static/images/RefreshActive.png',
            iconEnabled: 'static/images/RefreshDisable.png',
        });
        this.components.myProfile = new Button({
            styles: ['button__menu'],
            text: FEED_VIEW_NAMES.buttonMyProfileTittle,
            href: APP_PATHS.profilePage,
            hrefStyles: ['w-full'],
            icon: 'static/images/profileDisable.png',
        });
        this.components.exit = new Button({
            styles: ['button__menu'],
            text: FEED_VIEW_NAMES.buttonExitTittle,
            onClick: this.exitClick,
            hrefStyles: ['w-full'],
            icon: 'static/images/logout.png',
        });
        switch (state) {
        case menuStatesName.message:
            this.#currentEnabled = this.components.messages;
            break;
        case menuStatesName.matches:
            this.#currentEnabled = this.components.matches;
            break;
        case menuStatesName.findCandidate:
            this.#currentEnabled = this.components.findCandidate;
            break;
        case menuStatesName.myProfile:
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
        this.onExitClick();
    }

    /**
     * Render menu component
     * @return {string}
     */
    render() {
        super.prepareRender();
        return menu(this);
    }
}
