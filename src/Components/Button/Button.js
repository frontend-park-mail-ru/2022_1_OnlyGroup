import Button from './Button.hbs';
import {BaseComponent} from "../Base/Base";

export class ButtonComponent extends BaseComponent{
    constructor({styles, text, onClick}) {
        super({styles});
        this.buttonText = text
        this.onClick = onClick;
    }
    render() {
        let styles = this.styles.join(' ');
        return Button({buttonId: this.id, buttonText: this.buttonText, styles: styles});
    }
    mount(){
        this.checkFound();
        this.elem.addEventListener('click', this.onClick);
    }
    unmount(){
        super.unmount();
        if(this.elem){
            this.elem.removeEventListener('click', this.onClick);
        }
    }
    changeText(text){
        this.checkFound();
        this.buttonText = text
        this.button.innerText = text
    }
}
