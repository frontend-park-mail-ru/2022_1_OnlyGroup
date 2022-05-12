import button from './Button.hbs';
import {BaseComponent} from '../Base/Base';
import IDGenerator from '../../Modules/IDGenerator';

export const BUTTON_ACTIVE_TYPES = {
    red: 'activeRedType',
    blue: 'activeBlueType',
};

export const BUTTON_TYPES = {
    primary: 'primaryType',
    submit: 'submitType',
};

/**
 * Button Component
 */
export class Button extends BaseComponent {
    /**
     * Create button component
     * @param {string|undefined} type
     * @param {string} text
     * @param {function|undefined|null} onClick
     * @param {string|undefined}href
     * @param {string|undefined} icon
     * @param {string|undefined} iconActive
     * @param {boolean} canActivate
     * @param {string} activeType
     */
    constructor({
        type = BUTTON_TYPES.primary,
        text,
        onClick,
        href,
        icon,
        iconActive,
        canActivate = false,
        activeType = BUTTON_ACTIVE_TYPES.blue,
    }) {
        super();
        this.active = false;
        this.href = href;
        this.buttonText = text;
        this.onClick = onClick;
        this.icon = icon;
        this.iconActive = iconActive;
        this.canActivate = canActivate;
        this.buttonId = IDGenerator.getId();

        this[type] = true;
        this[activeType] = true;
    }

    /**
     * Find button
     */
    findElem() {
        super.findElem();
        this.buttonElem = document.getElementById(this.buttonId.toString());
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
        if (this.onClick && this.elem && !this.active) {
            this.buttonElem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount button component
     */
    unmount() {
        if (this.onClick && this.elem && !this.active) {
            this.buttonElem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }

    /**
     * Set button enabled
     * @param {boolean} active
     */
    setActive(active) {
        if (!this.canActivate) {
            return;
        }
        this.active = active;
        this.stateChanged = true;
    }

    /**
     * Set button text
     * @param {string} text
     */
    changeText(text) {
        this.buttonText = text;
    }
}
