import {BaseComponent} from '../Base/Base';
import AvatarComponent from '../Avatar/Avatar';
import {Text} from '../Text/Text';
import activeUser from './ActiveUser.hbs';

/**
 * Feed left top active user component
 */
export class ActiveUserComponent extends BaseComponent {
    /**
     * Create active user component
     * @param {Array}styles
     */
    constructor({styles}) {
        super({styles});
        this.components.avatar = new AvatarComponent({
            styles: [''],
            src: 'static/images/avatar.png',
        });
        this.components.column = new BaseComponent({
            styles: ['flex', 'flex-column', 'justify-content-center', 'align-item-center'],
        });
        this.components.column.components.name = new Text({
            text: 'David Jsons',
            styles: [],
        });
        this.components.column.components.city = new Text({
            text: 'Moscow',
            styles: [],
        });
    }

    /**
     * Render active user component
     * @return {string}
     */
    render() {
        this.prepareRender();
        return activeUser(this);
    }
}
