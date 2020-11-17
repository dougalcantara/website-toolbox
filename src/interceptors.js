export default {
  data: (component) => ({
    get(target, key) {
      const handler = target[key];

      if (!handler) {
        throw new Error(
          `[website-toolbox]: property ${key} does not exist on Component.data`
        );
      }

      return target[key];
    },
    set(target, key) {
      const handler = target[key];

      if (!handler) {
        throw new Error(
          '[website-toolbox]: Cannot assign a value to an undeclared data property'
        );
      }

      const didCall = Reflect.set(...arguments);

      if (typeof component.hooks.updated === 'function') {
        component.hooks.updated.apply(component, [target]);
      }

      return didCall;
    },
  }),
  methods: (component) => ({
    get(target, key) {
      const handler = target[key];

      return function (...args) {
        const result = handler.apply(component, args);

        return result;
      };
    },
  }),
};
