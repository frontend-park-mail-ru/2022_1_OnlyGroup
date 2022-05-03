import feedView from './FeedView.hbs';
import BaseView from '../BaseView/BaseView';
import MenuComponent, {MENU_STATES, menuStatesName} from '../../Components/Menu/Menu';
import EventBus from '../../Modules/EventBus';
import {ActiveUserComponent} from '../../Components/ActiveUser/ActiveUser';
import {BASE_COMPONENT_STATES, BaseComponent} from '../../Components/Base/Base';
import FeedPhoto from '../../Components/FeedPhoto/FeedPhoto';
import FeedInfo from '../../Components/FeedInfo/FeedInfo';

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
        this.components.leftColumn.components.activeUser = new ActiveUserComponent({
            styles: [],
        });
        this.components.leftColumn.components.menu = MenuComponent;
        MenuComponent.setState({state: MENU_STATES.findCandidate});
        this.components.rightColumn = new BaseComponent({
            state: BASE_COMPONENT_STATES.rightColumn,
        });
        this.components.rightColumn.components.photo = new FeedPhoto({});
        this.components.rightColumn.components.info = new FeedInfo({});
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
