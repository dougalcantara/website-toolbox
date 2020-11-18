function nodes(component) {
  const interceptor = {
    get(target, key) {
      return target[key];
    },
    set(target, key, nextVal) {
      const prevVal = target[key];

      if (!prevVal && typeof prevVal !== 'string') {
        throw new Error(
          `[website-toolbox]: Nodes must be declared before they are assigned a value${
            component.name && ` in ${component.name}.nodes`
          }`
        );
      }

      if (typeof component.hooks.updated === 'function') {
        component.hooks.updated.apply(component, [nextVal, prevVal, key]);
      }

      return Reflect.set(...arguments);
    },
  };

  return interceptor;
}

function data(component) {
  const interceptor = {
    get(target, key) {
      const existingVal = target[key];

      if (!existingVal) {
        throw new Error(
          `[website-toolbox]: property ${key} does not exist on ${
            component.name || 'Component'
          }.data`
        );
      }

      return target[key];
    },
    set(target, key, nextVal) {
      const prevVal = target[key];

      if (!prevVal) {
        throw new Error(
          `[website-toolbox]: Cannot assign a value to an undeclared property${
            component.name && ` in ${component.name}.data`
          }`
        );
      }

      if (typeof component.hooks.updated === 'function') {
        component.hooks.updated.apply(component, [nextVal, prevVal, key]);
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
        const result = handler.apply(component, args);

        return result;
      };
    },
  };

  return interceptor;
}

export default {
  nodes,
  data,
  methods,
};
