import Text from './Text.hbs';
import IdGenerator from "../../Modules/idGenerator";
import {BaseComponent} from "../Base/Base";

export class TextComponent extends BaseComponent{
    constructor({text, styles}) {
        super({styles})
        this.id = IdGenerator.getId();
        this.textContent = text;
    }

    render() {
        let styles = this.styles.join(' ');
        return Text({textContent: this.textContent, styles: styles, id: this.id});
    }

    setText(text){
        this.checkFound();
        this.textContent = text;
        this.elem.innerText = text;
    }

}
