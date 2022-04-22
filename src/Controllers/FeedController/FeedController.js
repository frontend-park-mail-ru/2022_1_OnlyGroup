import {BaseController} from '../Base/BaseController';
import FeedView from '../../Views/FeedView/FeedView';
import activeUser from '../../Models/User';
import router, {APP_PATHS} from '../../Modules/Router';

/**
 * Feed page controller
 */
export default new class FeedController extends BaseController {
    /**
     * Create new feed page controller
     */
    constructor() {
        super({view: FeedView});
        super.setEvents({
            'action-logout': this.actionLogout,
            'user-unloginned': this.userUnloggined,
            'api-failed': this.apiFailed,
        });
    }

    /**
     * Start feed page controller
     */
    start() {
        super.start();
        activeUser.checkLogin();
    }

    /**
     * @callback Callback for exit button click
     */
    actionLogout = () =>{
        activeUser.logOut();
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
