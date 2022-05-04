import feedView from './FeedView.hbs';
import BaseView from '../BaseView/BaseView';
import {BASE_COMPONENT_STATES, BaseComponent} from '../../Components/Base/Base';
import FeedPhoto from '../../Components/FeedPhoto/FeedPhoto';
import FeedInfo from '../../Components/FeedInfo/FeedInfo';
import {Menu, MENU_STATES} from '../../Components/Menu/Menu';
import {ActiveUserComponent} from '../../Components/ActiveUser/ActiveUser';
import {Text} from '_components/Text/Text';
import {Settings} from '_components/Settings/Settings';

/**
 * View class for login page
 */
export default class FeedView extends BaseView {
    /**
     * Create new
     * @param {HTMLElement} parent
     */
    constructor({parent}) {
        super({parent});
        this.components.leftColumn = new BaseComponent({state: BASE_COMPONENT_STATES.leftColumn});
        this.components.leftColumn.components.activeUser = new ActiveUserComponent({});
        this.components.leftColumn.components.menu = new Menu({});
        this.components.rightColumn = new BaseComponent({state: BASE_COMPONENT_STATES.rightColumn});
        this.statesComponents = {};

        this.statesComponents[MENU_STATES.findCandidate] = {photo: new FeedPhoto({}), info: new FeedInfo({})};
        this.statesComponents[MENU_STATES.myProfile] = {settings: new Settings({})};
    }

    /**
     * Set state
     * @param {string} state
     */
    setState({state}) {
        super.setState({state});
        this.components.leftColumn.components.menu.setState({state});
        if (this.components.rightColumn.components) {
            Object.values(this.components.rightColumn.components).forEach((component) => {
                component.pause();
            });
        }
        this.components.rightColumn.components = this.statesComponents[state];
        this.components.rightColumn.stateChanged = true;
        this.reRender();
        Object.values(this.components.rightColumn.components).forEach((component) => {
            component.start();
        });
    }

    /**
     * Render feed view
     */
    render() {
        super.prepareRender();
        this.parent.innerHTML = feedView(this);
        this.mount();
    }
}
