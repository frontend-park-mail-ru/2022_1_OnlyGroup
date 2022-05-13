import input from './Input.hbs';
import idGenerator from '../../Modules/IDGenerator';
import {BaseComponent} from '../Base/Base';

export const INPUT_LABEL_POS = {
    vertical: 'vertical',
    horizontal: 'horizontal',
};

export const INPUT_TYPES = {
    primary: 'primaryType',
};

/**
 * Input component
 */
export class Input extends BaseComponent {
    /**
     * Create input component
     * @param {string|undefined} type
     * @param {string} inputType
     * @param {string} labelPos
     * @param {string|null|undefined} label
     * @param {string|null|undefined} placeholder
     * @param {string|null|undefined} icon
     * @param {function|null|undefined} iconOnClick
     */
    constructor({
        type = INPUT_TYPES.primary,
        inputType,
        labelPos = INPUT_LABEL_POS.vertical,
        label,
        placeholder,
        icon,
        iconOnClick,
    }) {
        super();
        this.inputType = inputType;
        this.labelPos = labelPos;
        this.label = label;
        this[type] = true;
        this.value = '';
        this.placeholder = placeholder;
        this.inputId = idGenerator.getId();
        this.icon = icon;
        if (icon) {
            this.buttonId = idGenerator.getId();
        }
        this.iconOnClick = iconOnClick;
    }

    /**
     * Prepare for input render
     */
    prepareRender() {
        super.prepareRender();
        this[this.labelPos] = true;
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
