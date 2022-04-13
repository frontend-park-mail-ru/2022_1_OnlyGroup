import Logo from './Logo.hbs';
import idGenerator from "../../Modules/idGenerator";
import router from "../../Modules/router";
import {BaseComponent} from "../Base/Base";

export class LogoComponent extends BaseComponent{
    constructor() {
        super({styles: Array.from("")});
    }

    render() {
        return Logo({id: this.id});
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
        if(this.elem){
            this.elem.removeEventListener('click', LogoComponent.onCLick);
        }
    }
}
