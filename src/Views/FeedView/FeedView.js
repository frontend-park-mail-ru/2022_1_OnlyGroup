import feedView from './FeedView.hbs';
import BaseView from '../BaseView/BaseView';
import MenuComponent, {menuStatesName} from '../../Components/Menu/Menu';
import EventBus from '../../Modules/EventBus';
import {ActiveUserComponent} from '../../Components/ActiveUser/ActiveUser';
import {BaseComponent} from '../../Components/Base/Base';
import FeedPhoto from '../../Components/FeedPhoto/FeedPhoto';
import FeedInfo from '../../Components/FeedInfo/FeedInfo';

/**
 * View class for login page
 */
export default class FeedView extends BaseView {
    /**
     * Create new
     * @param {HTMLElement}parent
     */
    constructor({parent}) {
        super({parent});
        this.components.leftColumn = new BaseComponent({
            styles: ['left-column'],
        });
        this.components.leftColumn.components.activeUser = new ActiveUserComponent({
            styles: [],
        });
        this.components.leftColumn.components.menu = new MenuComponent({
            styles: [],
            state: menuStatesName.findCandidate,
            onExitClick: this.exitClick,
        });
        this.components.rightColumn = new BaseComponent({
            styles: ['right-column'],
        });
        this.components.rightColumn.components.photo = new FeedPhoto({
            styles: [],
        });
        this.components.rightColumn.components.info = new FeedInfo({
            styles: [],
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

    /**
     * @callback Callback for exit button click
     */
    exitClick = () =>{
        EventBus.emitEvent('action-logout');
    }
}
