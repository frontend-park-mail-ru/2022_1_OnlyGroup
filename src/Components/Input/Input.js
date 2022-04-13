import Input from './Input.hbs';
import idGenerator from "../../Modules/idGenerator";
import {BaseComponent} from "../Base/Base";

export class InputComponent extends BaseComponent{
    constructor({type, styles}) {
        super({styles})
        this.type = type;
        this.id = idGenerator.getId();
    }
    render() {
        let styles = this.styles.join(' ');
        return Input({inputType: this.type, inputId: this.id, styles: styles});
    }
    getValue(){
        this.checkFound();
        return this.elem.value;
    }
    setError(visible){
        this.checkFound();
        if(visible){
            this.elem.classList.add('input-error');
            return;
        }
        this.elem.classList.remove('input-error');
    }
}
