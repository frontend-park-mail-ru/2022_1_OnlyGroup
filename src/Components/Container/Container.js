import {BaseComponent} from '../Base/Base';
import container from './Container.hbs';


export const CONTAINER_TYPES = {};

/**
 * Container class
 */
export class Container extends BaseComponent {
    /**
     * Create container
     * @param {string|undefined}type
     */
    constructor({type}) {
        super({type});
    }

    /**
     * Render container
     * @return {string}
     */
    render() {
        return container(this);
    }

    /**
     * Mount container
     */
    mount() {
        super.mount();
        if (this.elem) {
            this.elem.classList = this.elem.parentElement.classList;
        }
    }
}
