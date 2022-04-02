export default new class IDGenerator{
    #id
    constructor() {
        this.#id = 0;
    }
    getId(){
        this.#id++;
        return this.#id
    }
}
