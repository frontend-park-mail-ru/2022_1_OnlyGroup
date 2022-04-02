import Input from './Input.hbs';
import idGenerator from "../../Modules/idGenerator";

export class InputComponent {
    constructor({type, styles}) {
        this.type = type;
        this.id = idGenerator.getId();
        this.styles = styles
    }
    render() {
        return Input({inputType: this.type, inputId: this.id, styles: this.styles});
    }
    getValue(){
        if (!this.input){
            this.input = document.getElementById(this.id)
        }
        return this.input.value
    }
}
