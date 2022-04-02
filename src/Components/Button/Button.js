import Button from './Button.hbs';
import IdGenerator from "../../Modules/idGenerator";

export class ButtonComponent {
    constructor({styles, text}) {
        this.id = IdGenerator.getId();
        this.buttonText = text
        this.styles = styles;
    }
    render() {
        let styles = this.styles.join(' ');
        const template = Button({buttonId: this.id, buttonText: this.buttonText, styles: styles});
        return template;
    }
    mount(callback){
        this.button = document.getElementById(this.id);
        this.callback = callback;
        this.button.addEventListener('click', callback);
    }
    unmount(){
        this.button.removeEventListener('click', this.callback);
    }
    changeText(text){
        this.buttonText = text
        this.button.innerText=text
    }
}
