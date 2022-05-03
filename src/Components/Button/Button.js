import button from './Button.hbs';
import {BaseComponent} from '../Base/Base';

export const BUTTON_STATES = {
    loginRegisterButton: 'loginRegisterButton',
    messageMenu: 'messageMenu',
    matchesMenu: 'matchesMenu',
    findCandidateMenu: 'findCandidateMenu',
    myProfileMenu: 'myProfileMenu',
    exitMenu: 'exitMenu',
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
     */
    constructor({state, text, onClick, href}) {
        super({state});
        this.enabled = false;
        this.href = href;
        this.buttonText = text;
        this.onClick = onClick;
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
