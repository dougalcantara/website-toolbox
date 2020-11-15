export function queryNodes(rootEl, rawNodes) {
  const ctx = {};

  Object.keys(rawNodes).forEach((key) => {
    const selector = rawNodes[key];
    const isArr = Array.isArray(selector);
    const isStr = typeof selector === 'string';
    const query = isArr ? 'querySelectorAll' : 'querySelector';

    if (!isArr && !isStr) {
      ctx[key] = null;
      return;
    }

    ctx[key] = rootEl[query](selector);
  });

  return ctx;
}
