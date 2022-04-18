import logo from './Logo.hbs';
import {BaseComponent} from '../Base/Base';

/**
 * Logo component
 */
export class Logo extends BaseComponent {
    /**
     * Create logo component
     * @param {Array} styles
     * @param {function|undefined|null} onClick
     */
    constructor({styles, onClick}) {
        super({styles});
        this.onClick = (onClick === undefined) ? null : onClick;
    }

    /**
     * Render logo component
     * @return {string}
     */
    render() {
        return logo(this);
    }

    /**
     * Mount logo component
     */
    mount() {
        this.findElem();
        if (this.elem && this.onClick) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount logo component
     */
    unmount() {
        if (this.elem && this.onClick) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }
}
