/**
 * Base view class
 */
export class View {
  constructor({parent}) {
    this.parent = parent;
  }

  render() {}

  unmount() {}
}
