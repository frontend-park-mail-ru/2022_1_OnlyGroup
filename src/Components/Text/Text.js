import text from './Text.hbs';
import {BaseComponent} from '../Base/Base';

/**
 * Text component
 */
export class Text extends BaseComponent {
    /**
     * Create text component
     * @param {string} text
     * @param {Array} styles
     * @param {string|null|undefined} href
     */
    constructor({text, styles, href}) {
        super({styles});
        this.textContent = text;
        this.href = (href === undefined) ? null : href;
    }

    /**
     * Render text component
     * @return {string}
     */
    render() {
        return text(this);
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
