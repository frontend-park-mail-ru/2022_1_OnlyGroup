import button from './Button.hbs';
import {BaseComponent} from '../Base/Base';
import IDGenerator from '../../Modules/IDGenerator';

export const BUTTON_ACTIVE_TYPES = {
    red: 'activeRedType',
    blue: 'activeBlueType',
};

/**
 * Button Component
 */
export class Button extends BaseComponent {
    /**
     * Create button component
     * @param {string|undefined} state
     * @param {string} text
     * @param {function|undefined|null} onClick
     * @param {string|undefined}href
     * @param {string|undefined} icon
     * @param {string|undefined} iconActive
     * @param {boolean} isActive
     * @param {string} activeType
     */
    constructor({
        type,
        text,
        onClick,
        href,
        icon,
        iconActive,
        isActive = false,
        activeType = BUTTON_ACTIVE_TYPES.blue,
    }) {
        super({type});
        this.active = false;
        this.href = href;
        this.buttonText = text;
        this.onClick = onClick;
        this.icon = icon;
        this.iconActive = iconActive;
        this.activeType = activeType;
        this.isActive = isActive;
        this.buttonId = IDGenerator.getId();
    }

    /**
     * Prepare button render
     */
    prepareRender() {
        super.prepareRender();
        if (!this.isActive) {
            return;
        }
        this[this.activeType] = true;
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
        if (!this.isActive) {
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
