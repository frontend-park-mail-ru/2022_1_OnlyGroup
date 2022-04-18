import button from './Button.hbs';
import {BaseComponent} from '../Base/Base';

/**
 * Button Component
 */
export class Button extends BaseComponent {
    /**
     * Create button component
     * @param {Array} styles
     * @param {string} text
     * @param {string|null|undefined} icon
     * @param {function|undefined|null} onClick
     */
    constructor({styles, text, icon, onClick}) {
        super({styles});
        this.icon = (icon === undefined) ? null : icon;
        this.buttonText = text;
        this.onClick = (onClick === undefined) ? null : onClick;
    }

    /**
     * Render button component
     * @return {string}
     */
    render() {
        return button(...this);
    }

    /**
     * Mount button component
     */
    mount() {
        this.findElem();
        if (this.onClick && this.elem) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount button component
     */
    unmount() {
        if (this.onClick && this.elem) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }

    /**
     * Set button text
     * @param {string} text
     */
    changeText(text) {
        this.buttonText = text;
    }
}
