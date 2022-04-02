/**
 * Class Event Bus
 */
class EventBus {
    /**
     * Constructor
     */
    constructor() {
        this.listeners = {};
    }

    /**
     * Get instance of class Event Bus
     */
    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }

        return EventBus.instance;
    }

    /**
     * Get all listeners 
     * @returns {Array} listeners
     */
    getEventListeners() {
        return this.listeners;
    }

    /**
     * Add event listener to Event Bus
     * @param {String} eventName 
     * @param {Function} callbackFunction 
     */
    addEventListener(eventName, callbackFunction) {
        this.listeners[eventName] = this.listeners[eventName] ? this.listeners[eventName] : [];
        this.listeners[eventName].push(callbackFunction);
    }

    /**
     * Delete event listener from Event Bus
     * @param {String} eventName
     * @param {Function} callbackFunction
     */
    removeEventListener(eventName, callbackFunction) {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== callbackFunction);
        }
    }

    /**
     * Emit event listener
     * @param {String} eventName 
     * @param {Object} parameters
     */
    emitEventListener(eventName, parameters) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => listener(parameters ? parameters : {}));
        }
    }
}

export default EventBus.getInstance();