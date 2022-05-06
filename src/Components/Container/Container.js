import {BaseComponent} from '../Base/Base';
import container from './Container.hbs';


/**
 * Container class
 */
export class Container extends BaseComponent {
    /**
     * Create container
     * @param {string|undefined}type
     */
    constructor({type}) {
        super();
        this.type = type;
    }

    /**
     * Render container
     * @return {string}
     */
    render() {
        this.prepareRender();
        return container(this);
    }
}
