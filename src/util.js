export function queryNodes(rootEl, rawNodes) {
  const ctx = {};

  Object.keys(rawNodes).forEach((key) => {
    const selector = rawNodes[key];
    const isArr = Array.isArray(selector);
    const query = isArr ? 'querySelectorAll' : 'querySelector';

    if (!isArr && typeof selector !== 'string') {
      ctx[key] = null;
      return;
    }

    ctx[key] = rootEl[query](selector);
  });

  return ctx;
}
