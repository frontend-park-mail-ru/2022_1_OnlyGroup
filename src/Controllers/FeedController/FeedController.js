import {BaseController} from '../Base/BaseController';
import FeedView from '../../Views/FeedView/FeedView';
import {Feed} from '../../Models/Feed';
import activeUser from '../../Models/User';
import {API_FAILED, LOGIN_EVENTS} from '../../Modules/EventBusEvents';
import {APP_PATHS} from '../../Modules/Router';
import {MENU_STATES} from '_components/Menu/Menu';

const STATES_BY_APP_PATHS = {
    [APP_PATHS.findCandidatePage]: MENU_STATES.findCandidate,
    [APP_PATHS.profilePage]: MENU_STATES.myProfile,
    [APP_PATHS.messagesPage]: MENU_STATES.message,
    [APP_PATHS.matchesPage]: MENU_STATES.matches,
    [APP_PATHS.settingsPage]: MENU_STATES.settings,
};

/**
 * Feed page controller
 */
export default new class FeedController extends BaseController {
    /**
     * Create new feed page controller
     */
    constructor() {
        super({view: FeedView});
        this.feedModel = new Feed();
        this.activeModels = null;
        super.setEvents({
            [LOGIN_EVENTS.logout]: this.logout,
            [API_FAILED]: this.apiFailed,
        });
    }

    /**
     * Start feed page controller
     * @param {string} url
     */
    async start({url}) {
        this.view.setState({state: STATES_BY_APP_PATHS[url]});
        if (await super.start()) {
            await this.startModels({state: STATES_BY_APP_PATHS[url]});
        }
    }

    /**
     * Start models by state
     * @param {string} state
     * @return {Promise<void>}
     */
    async startModels({state}) {
        this.stopModels();
        this.activeModels = {};
        switch (state) {
        case MENU_STATES.myProfile:
            activeUser.startFeed();
            this.activeModels.activeFeed = () => {
                activeUser.stopFeed();
            };
            break;
        case MENU_STATES.findCandidate:
            this.feedModel.start();
            this.activeModels.feed = () => {
                this.feedModel.stop();
            };
            break;
        }
    }

    /**
     * Stop active models
     */
    stopModels() {
        if (this.activeModels) {
            Object.values(this.activeModels).forEach((stopFunc) => {
                stopFunc();
            });
            this.activeModels = null;
        }
    }

    /**
     * Set menu state by change url
     * @param {string} url
     * @return {Promise<void>}
     */
    async changeUrl({url}) {
        this.view.setState({state: STATES_BY_APP_PATHS[url]});
        this.startModels({state: STATES_BY_APP_PATHS[url]});
    }

    /**
     * Stop feed page controller
     */
    stop() {
        super.stop();
        this.stopModels();
    }

    /**
     * @callback Callback for exit button click
     */
    logout = () => {
        activeUser.logOut();
    };

    /**
     * @callback Callback for api failed
     */
    apiFailed = () => {
        alert('Api failed');
    };
};
