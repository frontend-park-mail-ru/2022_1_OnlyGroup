import text from './Text.hbs';
import {BaseComponent} from '../Base/Base';

export const TEXT_STATES = {
    loginErrorText: 'loginErrorText',
};

/**
 * Text component
 */
export class Text extends BaseComponent {
    /**
     * Create text component
     * @param {string} text
     * @param {string|undefined} state
     * @param {string|null|undefined} href
     * @param {function|undefined} onClick
     */
    constructor({text, state, href, onClick}) {
        super({state});
        this.textContent = text;
        this.href = (href === undefined) ? null : href;
        this.onClick = (onClick === undefined) ? null : onClick;
    }

    /**
     * Render text component
     * @return {string}
     */
    render() {
        return text(this);
    }

    /**
     * Mount text component
     */
    mount() {
        super.mount();
        if (this.onClick && this.elem) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount text component
     */
    unmount() {
        if (this.onClick && this.elem) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }

    /**
     * Set text of text component
     * @param {string} text
     */
    setText(text) {
        if (text !== this.textContent) {
            this.textContent = text;
            this.stateChanged = true;
        }
    }
}
