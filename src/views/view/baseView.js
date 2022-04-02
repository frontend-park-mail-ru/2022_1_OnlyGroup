/**
 * Base view class
 */
export class View {
  /**
     * Constructor
     * @param {Object} parent
     * @param {Object} controller
     * @param {Object} routing
     */
  constructor({
    parent = document.body,
    controller,
    routing = () => {},
  }) {
    this.parent = parent;
    this.controller = controller;
    this.routing = routing;
  }

  /**
     * Render function
     * @param {Object} props
     */
  render(props = {}) {}

  /**
     * Function for set handlers before render
     */
  setHandlers() {}

  /**
     * Function for remove handlers
     */
  removeHandlers() {}
}
