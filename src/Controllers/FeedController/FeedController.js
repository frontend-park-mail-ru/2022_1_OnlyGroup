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
        this.stateModels = {
            [MENU_STATES.findCandidate]: [new Feed()],
            [MENU_STATES.myProfile]: [],
        };
        this.currentState = undefined;
        super.setEvents({
            [LOGIN_EVENTS.logout]: this.logout,
            [API_FAILED]: this.apiFailed,
        });
    }

    /**
     * Change url
     * @param {string} url
     * @return {Promise<void>}
     */
    async changeUrl({url}) {
        await super.changeUrl({url});
        if (this.currentState) {
            this.stateModels[this.currentState].forEach((model) => {
                model.stop();
            });
        }
        this.currentState = STATES_BY_APP_PATHS[url];
        this.view.setState({state: this.currentState});
        this.stateModels[this.currentState]?.forEach((model) => {
            model.start();
        });
    }

    /**
     * Start feed page controller
     * @param {string} url
     */
    async start({url}) {
        if (await super.start()) {
            await this.changeUrl({url});
        }
    }

    /**
     * Stop feed page controller
     */
    stop() {
        super.stop();
        this.feedModel.stop();
    }

    /**
     * @callback Callback for exit button click
     */
    logout = () => {
        activeUser.logOut();
    }

    /**
     * @callback Callback for api failed
     */
    apiFailed = () => {
        alert('Api failed');
    }
};
