import Input from './Input.hbs';
import idGenerator from "../../Modules/idGenerator";
import {BaseComponent} from "../Base/Base";

export class InputComponent extends BaseComponent{
    constructor({type, styles, label}) {
        super({styles})
        this.type = type;
        this.value = '';
        this.label = label ? label : null;
    }
    render() {
        let styles = this.styles.join(' ');
        return Input({inputType: this.type, inputId: this.id, styles: styles, value: this.value, label: this.label, error: this.error});
    }
    getValue(){
        this.checkFound();
        this.value = this.elem.value;
        return this.elem.value;
    }
    setError(error){
        this.error = error
    }
}
