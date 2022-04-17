import {BaseComponent} from '../Base/Base';
import avatar from './Avatar.hbs';


/**
 * User avatar component
 */
export default class AvatarComponent extends BaseComponent {
    /**
     * Create user avatar component
     * @param {Array}styles
     * @param {string}src
     * @param {Image|undefined}image
     */
    constructor({styles, src, image}) {
        super({styles});
        this.src = src;
        this.image = (image === undefined) ? null : image;
    }

    /**
     * Render avatar component
     * @return {string}
     */
    render() {
        return avatar(this);
    }
}
