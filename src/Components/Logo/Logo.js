import Logo from './Logo.hbs';
import idGenerator from "../../Modules/idGenerator";
import router from "../../Modules/router";
import {BaseComponent} from "../Base/Base";

export class LogoComponent extends BaseComponent{
    constructor({styles}) {
        super({styles});
    }

    render() {
        const styles = this.styles.join(' ');
        return Logo({id: this.id, styles: styles});
    }

    static onCLick(ev){
        ev.preventDefault();
        router.go("/");
    }

    mount() {
        this.checkFound();
        this.elem.addEventListener('click', LogoComponent.onCLick);
    }

    unmount(){
        super.unmount();
        if(this.elem){
            this.elem.removeEventListener('click', LogoComponent.onCLick);
        }
    }
}
