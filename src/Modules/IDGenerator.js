export default new class IDGenerator {
    #id

    /**
     * Create new IDGenerator
     */
    constructor() {
        this.#id = 0;
    }

    /**
     * Get id for new element
     * @return {number}
     */
    getId() {
        this.#id++;
        return this.#id;
    }
};
