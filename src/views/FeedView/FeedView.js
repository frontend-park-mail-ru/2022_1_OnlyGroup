import feedView from './FeedView.hbs';
import BaseView from '../BaseView/BaseView';
import MenuComponent, {menuStatesName} from '../../Components/Menu/Menu';
import EventBus from '../../Modules/EventBus';
import {ActiveUserComponent} from '../../Components/ActiveUser/ActiveUser';
import {BaseComponent} from '../../Components/Base/Base';

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
    }

    /**
     * Render feed view
     */
    render() {
        super.preRender();
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
