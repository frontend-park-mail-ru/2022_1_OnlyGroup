import idGenerator from "../../Modules/idGenerator";

export class BaseComponent {
    id;
    styles;
    constructor({styles}) {
        this.id = idGenerator.getId();
        this.styles = styles;
    }

    render(){
        return '';
    }

    mount(){

    }

    unmount(){
        this.elem = null;
    }

    checkFound(){
        if(!this.elem){
            this.elem = document.getElementById(this.id);
        }
    }
}
