import { queryNodes } from './util';
import { dataInterceptor, methodsInterceptor } from './interceptors';

export default function Component(component) {
  this.root = document.querySelector(component.root);
  this.nodes = queryNodes(this.root, component.nodes);
  this.data = new Proxy(component.data, dataInterceptor(component));

  let _component = {
    ...component,
    root: this.root,
    nodes: this.nodes,
    data: this.data,
  };

  /**
   * `Component.methods` shouldn't be proxied until `Component.data` has been proxied first.
   *
   * Beneficial because we can pass the enhanced `_component` to methods as `this` when
   * they're called from inside the `Component`.
   * */
  this.methods = new Proxy(component.methods, methodsInterceptor(_component));

  _component = {
    ..._component,
    methods: this.methods,
  };

  if (typeof component.setup === 'function') {
    component.setup.apply(_component);
  }

  return _component;
}
