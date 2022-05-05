import input from './Input.hbs';
import idGenerator from '../../Modules/IDGenerator';
import {BaseComponent} from '../Base/Base';

/**
 * Input component
 */
export class Input extends BaseComponent {
    /**
     * Create input component
     * @param {string} type
     * @param {Array} styles
     * @param {string|null|undefined} label
     * @param {string|null|undefined} placeholder
     * @param {string|null|undefined} icon
     * @param {function|null|undefined} iconOnClick
     */
    constructor({type, styles, label, placeholder, icon, iconOnClick}) {
        super({styles});
        this.type = type;
        this.value = '';
        this.inputId = idGenerator.getId();
        this.icon = (icon === undefined) ? null : icon;
        if (icon) {
            this.buttonId = idGenerator.getId();
        }
        this.iconOnClick = (iconOnClick === undefined) ? null : iconOnClick;
        this.label = (label === undefined) ? null : label;
        this.placeholder = (placeholder === undefined) ? null : placeholder;
    }

    /**
     * Render input component
     * @return {string}
     */
    render() {
        return input(this);
    }

    /**
     * Find elem
     */
    findElem() {
        super.findElem();
        this.inputElem = document.getElementById(this.inputId.toString());
        if (this.icon) {
            this.iconElem = document.getElementById(this.buttonId.toString());
        }
    }

    /**
     * Get value of input
     * @return {string}
     */
    getValue() {
        this.findElem();
        this.value = this.inputElem.value;
        return this.value;
    }

    /**
     * Set error text
     * @param {string|null} error
     */
    setError(error) {
        if (error === this.error) {
            return;
        }
        this.error = error;
        this.stateChanged = true;
    }

    /**
     * Mount input component(click on icon)
     */
    mount() {
        this.findElem();
        if (this.iconOnClick && this.elem) {
            this.elem.addEventListener('click', this.iconOnClick);
        }
    }

    /**
     * Unmount input component
     */
    unmount() {
        if (this.iconOnClick && this.elem) {
            this.elem.removeEventListener('click', this.iconOnClick);
        }
        super.unmount();
    }

    /**
     * Clear input
     */
    clear() {
        this.value = '';
        this.stateChanged = true;
    }
}
