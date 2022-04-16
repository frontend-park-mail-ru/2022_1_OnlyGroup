import Input from './Input.hbs';
import idGenerator from '../../Modules/IDGenerator';
import {BaseComponent} from '../Base/Base';

/**
 * Input component
 */
export class InputComponent extends BaseComponent {
    /**
     * Create input component
     * @param {string} type
     * @param {Array}styles
     * @param {string|null|undefined}label
     * @param {string|null|undefined}icon
     * @param {function|null|undefined}iconOnClick
     */
    constructor({type, styles, label, icon, iconOnClick}) {
        super({styles});
        this.type = type;
        this.value = '';
        this.icon = (icon === undefined) ? null : icon;
        if (icon) {
            this.buttonId = idGenerator.getId();
        }
        this.iconOnClick = (iconOnClick === undefined) ? null : iconOnClick;
        this.label = (label === undefined) ? null : label;
    }

    /**
     * Render input component
     * @return {string}
     */
    render() {
        return Input(this);
    }

    /**
     * Get value of input
     * @return {string}
     */
    getValue() {
        this.findElem();
        this.value = this.elem.value;
        return this.elem.value;
    }

    /**
     * Set error text
     * @param {string|null}error
     */
    setError(error) {
        this.error = error;
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
}
