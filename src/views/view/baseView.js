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
  constructor({parent}) {
    this.parent = parent;
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
