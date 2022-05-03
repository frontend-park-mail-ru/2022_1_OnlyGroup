import {BaseController} from '../Base/BaseController';
import FeedView from '../../Views/FeedView/FeedView';
import {Feed} from '../../Models/Feed';
import activeUser from '../../Models/User';
import {API_FAILED, LOGIN_EVENTS} from '../../Modules/EventBusEvents';

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
        super.setEvents({
            [LOGIN_EVENTS.logout]: this.logout,
            [API_FAILED]: this.apiFailed,
        });
    }

    /**
     * Start feed page controller
     */
    async start() {
        await super.start();
        if (this.autheficated) {
            this.feedModel.start();
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
