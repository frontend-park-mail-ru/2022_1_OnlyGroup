import feedView from './FeedView.hbs';
import BaseView from '../BaseView/BaseView';
import MenuComponent, {MENU_STATES} from '../../Components/Menu/Menu';
import {ActiveUserComponent} from '../../Components/ActiveUser/ActiveUser';
import FeedPhoto from '../../Components/FeedPhoto/FeedPhoto';
import FeedInfo from '../../Components/FeedInfo/FeedInfo';
import {Container} from '_components/Container/Container';

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
        this.addComponents.LeftColumn = {};
        this.addComponents.LeftColumn.activeUser = new ActiveUserComponent({});
        this.addComponents.LeftColumn.menu = MenuComponent;
        this.addComponents.RightColumn = {};
        this.addComponents.RightColumn.container = new Container({});

        this.statesComponents = {};

        this.statesComponents[MENU_STATES.findCandidate] = {};
        this.statesComponents[MENU_STATES.findCandidate].feedPhoto = new FeedPhoto({
            createActions: true,
        });
        this.statesComponents[MENU_STATES.findCandidate].feedInfo = new FeedInfo({});

        this.statesComponents[MENU_STATES.myProfile] = {};
        this.statesComponents[MENU_STATES.myProfile].feedPhoto = new FeedPhoto({});
        this.statesComponents[MENU_STATES.myProfile].feedInfo = new FeedInfo({});
    }

    /**
     * Set menu state
     * @param {string} state
     */
    setState({state}) {
        this.addComponents.LeftColumn.menu.setState({state});
        Object.values(this.addComponents.RightColumn.container.components).forEach((component) => {
            component.pause();
        });
        if (this.statesComponents[state]) {
            this.addComponents.RightColumn.container.components = this.statesComponents[state];
            Object.values(this.addComponents.RightColumn.container.components).forEach((component) => {
                component.start();
            });
        } else {
            this.addComponents.RightColumn.container.components = {};
        }
        this.addComponents.RightColumn.container.stateChanged = true;
        this.reRender();
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
