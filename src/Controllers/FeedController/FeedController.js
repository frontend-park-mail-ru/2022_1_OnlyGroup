import {BaseController} from '../Base/BaseController';
import FeedView from '../../Views/FeedView/FeedView';
import router, {APP_PATHS} from '../../Modules/Router';
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
            'user-loggined': this.userLoggined,
            'user-unloginned': this.userUnloggined,
            'api-failed': this.apiFailed,
        });
    }

    /**
     * Start feed page controller
     */
    start() {
        activeUser.checkLogin();
        super.start();
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

    userLoggined = () =>{
        this.feedModel.start();
    }

    /**
     * @callback Callback for user unloggined
     */
    userUnloggined = () =>{
        router.go(APP_PATHS.loginPage);
    }

    /**
     * @callback Callback for api failed
     */
    apiFailed = () => {
        alert('Api failed');
    }
};
