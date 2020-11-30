function nodes(component) {
  const { name, hooks } = component;

  const interceptor = {
    set(target, key, nextVal) {
      const prevVal = target[key];

      if (!prevVal && typeof prevVal !== 'string') {
        throw new Error(
          `[website-toolbox]: Nodes must be declared before they are assigned a value${
            name && ` in ${name}.nodes`
          }`
        );
      }

      if (typeof hooks.updated === 'function') {
        hooks.updated.apply(component, [nextVal, prevVal, key]);
      }

      return Reflect.set(...arguments);
    },
  };

  return interceptor;
}

function data(component) {
  const { name, hooks } = component;

  const interceptor = {
    set(target, key, nextVal) {
      const prevVal = target[key];

      if (!prevVal) {
        throw new Error(
          `[website-toolbox]: Cannot assign a value to an undeclared property${
            name && ` in ${name}.data`
          }`
        );
      }

      if (typeof hooks.updated === 'function') {
        hooks.updated.apply(component, [nextVal, prevVal, key]);
      }

      return Reflect.set(...arguments);
    },
  };

  return interceptor;
}

function methods(component) {
  const interceptor = {
    get(target, key) {
      const handler = target[key];

      return function (...args) {
        // inject component instance into method call as `this`
        const result = handler.apply(component, args);

        return result;
      };
    },
  };

  return interceptor;
}

function state(container) {
  const interceptor = {
    set(target, key, nextVal) {
      const prevVal = target[key];

      if (typeof container.hooks.updated === 'function') {
        container.hooks.updated.apply(container, [nextVal, prevVal, key]);
      }

      return Reflect.set(...arguments);
    },
  };

  return interceptor;
}

export default {
  nodes,
  data,
  methods,
  state,
};
