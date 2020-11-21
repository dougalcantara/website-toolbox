import interceptors from './interceptors';

export default function Container(components = [], config = {}) {
  this.initialState = config.state || {};
  this.config = config;

  this.state = new Proxy(this.initialState, interceptors.state(this));
  this.components = components.map((component) => component(this));

  this.hooks = {
    updated() {
      this.components
        // only get components that have a registered updated hook
        .filter((component) => component.hooks.containerUpdated)
        // call each component's updated() hook with global state's `next`, `prev` & `prop`
        .forEach((component) => component.hooks.containerUpdated(...arguments));
    },
  };

  this.setState = (newState, cb) => {
    for (let key in newState) {
      this.state[key] = newState[key];
    }

    // pass the new state back to the optional callback arg
    cb && cb(this.state);
  };

  return this;
}
