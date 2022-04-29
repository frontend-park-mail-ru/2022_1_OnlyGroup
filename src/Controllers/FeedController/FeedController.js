import {BaseController} from '../Base/BaseController';
import FeedView from '../../Views/FeedView/FeedView';
import {Feed} from '../../Models/Feed';
import activeUser from '../../Models/User';

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
            'action-logout': this.actionLogout,
            'api-failed': this.apiFailed,
        });
    }

    /**
     * Start feed page controller
     */
    async start() {
        await super.start();
        this.feedModel.start();
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
    actionLogout = () =>{
        activeUser.logOut();
    }

    /**
     * @callback Callback for api failed
     */
    apiFailed = () => {
        alert('Api failed');
    }
};
