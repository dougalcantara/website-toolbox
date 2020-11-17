import { queryNodes } from './util';
import interceptors from './interceptors';

export default function Component(component) {
  /**
   * Copy over the component to `this` -- we want to keep the Function
   * prototype intact here so `this = component` would be a bad idea.
   */
  Object.keys(component).forEach((key) => (this[key] = component[key]));

  if (component.root) {
    // TODO: validate
    this.root = document.querySelector(this.root);
  }

  this.nodes = queryNodes(this.root, this.nodes);

  this.data = new Proxy(this.data, interceptors.data(this));

  this.methods = new Proxy(this.methods, interceptors.methods(this));

  if (typeof this.hooks.setup === 'function') {
    this.hooks.setup.apply(this);
  }

  this._reset = () => {}; // TODO: reset to initialState

  return () => this;
}
