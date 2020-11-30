import interceptors from './interceptors';

export default function Container(components = [], config = {}) {
  const { state, mixins } = config;

  this.initialState = state || {};
  this.mixins = mixins || {};

  this.state = new Proxy(state, interceptors.state(this));
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

  for (let key in this.mixins) {
    if (typeof this.mixins[key] === 'function') {
      this.mixins[key].apply(this);
    }
  }

  this.setState = (newState, cb) => {
    for (let key in newState) {
      this.state[key] = newState[key];
    }

    // pass the new state back to the optional callback arg
    cb && cb(this.state);
  };

  return this;
}
