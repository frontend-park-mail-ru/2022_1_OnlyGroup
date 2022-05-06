import {BASE_COMPONENT_STATES, BaseComponent} from '_components/Base/Base';
import {Input, INPUT_STATES} from '_components/Input/Input';
import {SETTINGS_VIEW_NAME} from '../../Modules/ViewConsts';
import setting from './Settings.hbs';

/**
 * Settings component
 */
export class Settings extends BaseComponent {
    /**
     * Create settings component
     * @param {string|undefined} state
     */
    constructor({state}) {
        super({state});
        this.initComponents();
    }

    /**
     * Init settings components
     */
    initComponents() {
        super.initComponents();
        this.components.row = new BaseComponent({state: BASE_COMPONENT_STATES.settingsMainRow});
        this.components.row.components.leftColumn = new BaseComponent({state: BASE_COMPONENT_STATES.settingsLeftColumn});
        this.components.row.components.rightColumn = new BaseComponent({state: BASE_COMPONENT_STATES.settingsLeftColumn});
        const left = this.components.row.components.leftColumn;
        const right = this.components.row.components.rightColumn;
        left.components.firstName = new Input({
            type: 'text',
            label: SETTINGS_VIEW_NAME.firstNameLabel,
            state: INPUT_STATES.settingsInput,
        });
        left.components.lastName = new Input({
            type: 'text',
            label: SETTINGS_VIEW_NAME.lastNameLabel,
            state: INPUT_STATES.settingsInput,
        });
        left.components.birthDay = new Input({
            type: 'date',
            label: SETTINGS_VIEW_NAME.firstNameLabel,
            state: INPUT_STATES.settingsInput,
        });
    }

    /**
     * Render settings component
     * @return {string}
     */
    render() {
        return setting(this);
    }
}
