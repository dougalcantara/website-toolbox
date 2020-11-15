export const dataInterceptor = (component) => ({
  get(target, key) {
    const handler = target[key];

    if (!handler) {
      throw new Error(
        `[COMPASS]: property ${key} does not exist on Component.data`
      );
    }

    return target[key];
  },
  set(target, key) {
    const handler = target[key];

    if (!handler) {
      throw new Error(
        '[COMPASS]: Cannot assign a value to an undeclared data property'
      );
    }

    return Reflect.set(...arguments);
  },
});

export const methodsInterceptor = (component) => ({
  get(target, key) {
    const handler = target[key];

    return function (...args) {
      const result = handler.apply(component, args);

      return result;
    };
  },
});
