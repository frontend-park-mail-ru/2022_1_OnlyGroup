import logo from './Logo.hbs';
import {BaseComponent} from '../Base/Base';
import EventBus from '../../Modules/EventBus';
import {LOGO_CLICK} from '../../Modules/EventBusEvents';

export const LOGO_STATES = {
    logoLogin: 'logoLogin',
};

/**
 * Logo component
 */
export class Logo extends BaseComponent {
    /**
     * Create logo component
     * @param {string|undefined} state
     */
    constructor({state}) {
        super({state});
    }

    /**
     * Render logo component
     * @return {string}
     */
    render() {
        return logo(this);
    }

    /**
     * @callback Callback for logo click
     */
    onClick = () => {
        EventBus.emitEvent(LOGO_CLICK);
    }

    /**
     * Mount logo component
     */
    mount() {
        this.findElem();
        if (this.elem && this.onClick) {
            this.elem.addEventListener('click', this.onClick);
        }
    }

    /**
     * Unmount logo component
     */
    unmount() {
        if (this.elem && this.onClick) {
            this.elem.removeEventListener('click', this.onClick);
        }
        super.unmount();
    }
}
