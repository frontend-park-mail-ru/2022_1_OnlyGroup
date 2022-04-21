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
     * @param {Array|undefined}enabledStyles
     * @param {string|undefined}href
     * @param {Array|undefined}hrefStyles
     * @param {string|undefined}iconEnabled
     */
    constructor({styles, text, icon, onClick, enabledStyles, href, hrefStyles, iconEnabled}) {
        super({styles});
        this.enabled = false;
        this.enabledStyles = (enabledStyles === undefined) ? '' : enabledStyles.join(' ');
        this.icon = (icon === undefined) ? null : icon;
        this.iconEnabled = (iconEnabled === undefined) ? null: icon;
        this.href = href;
        this.hrefStyles = (hrefStyles === undefined) ? '' : hrefStyles.join(' ');
        this.buttonText = text;
        this.onClick = (onClick === undefined) ? null : onClick;
    }

    /**
     * Render button component
     * @return {string}
     */
    render() {
        return button(this);
    }

    /**
     * Mount button component
     */
    mount() {
        this.findElem();
        if (this.onClick && this.elem && !this.enabled) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount button component
     */
    unmount() {
        if (this.onClick && this.elem && !this.enabled) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }

    /**
     * Set button enabled
     * @param {boolean}enabled
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Set button text
     * @param {string} text
     */
    changeText(text) {
        this.buttonText = text;
    }
}
