function Component(component) {
  const {
    name,
    nodes,
    data,
    methods,
    setup
  } = component;
  console.log('hello');
  this.data = new Proxy(data, {
    get(target, key) {
      const handler = target[key];

      if (!handler) {
        return handler;
      }

      return target[key];
    },

    set(target, key, val) {
      return Reflect.set(...arguments);
    }

  });
  this.methods = new Proxy(methods, {
    get(target, key) {
      const handler = target[key];
      return function (...args) {
        const result = handler.apply(component, args);
        return result;
      };
    }

  });
  const _component = { ...component,
    data: this.data,
    methods: this.methods
  };

  if (typeof setup === 'function') {
    setup.apply(component);
  }

  return _component;
}

export { Component };
