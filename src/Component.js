import { queryNodes } from './util';
import interceptors from './interceptors';

export default function Component(component) {
  /**
   * Copy over the component to `this` -- we want to keep the Function
   * prototype intact.
   */
  Object.keys(component).forEach((key) => (this[key] = component[key]));

  if (component.root) {
    // TODO: validate
    this.root = document.querySelectorAll(this.root);
  }

  const handlers = {
    nodes: interceptors.nodes(this),
    data: interceptors.data(this),
    methods: interceptors.methods(this),
  };

  // TODO: dry all this up
  if (component.nodes && typeof component.root === 'string') {
    this.nodes = new Proxy(queryNodes(this.root, this.nodes), handlers.nodes);
  }

  if (component.data) {
    this.data = new Proxy(this.data, handlers.data);
  }

  if (component.methods) {
    this.methods = new Proxy(this.methods, handlers.methods);
  }

  if (typeof this.hooks.setup === 'function') {
    this.hooks.setup.apply(this);
  }

  return (container) => {
    this.container = container;

    this._reset = () => {}; // TODO: reset to initialState

    this.setState = container.setState;

    return this;
  };
}
