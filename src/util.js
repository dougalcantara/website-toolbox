export function queryNodes(rootEl, rawNodes) {
  const ctx = {};

  Object.keys(rawNodes).forEach((key) => {
    const selector = rawNodes[key];
    const isStr = typeof selector === 'string';
    const isArr = Array.isArray(selector);
    const query = isArr ? 'querySelectorAll' : 'querySelector';

    if (!isArr && !isStr) {
      ctx[key] = null;
      return;
    } else if (isStr && !selector.length) {
      // allow for '' node declarations, a hint that it will be queried later
      ctx[key] = selector;
      return;
    }

    ctx[key] = rootEl[query](selector);
  });

  return ctx;
}
