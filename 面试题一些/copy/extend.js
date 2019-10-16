// 两个对象深继承
var deepExtend = (target = {}, from = {}) => {
  const obj = this.deepClone(target);
  const extend = (target, from) => {
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(from).forEach((item) => {
      if (target[item] && this.isObject(target[item])) {
        target[item] = extend(target[item], from[item]);
      } else  {
        target[item] = from[item];
      }
    });
    return target;
  };
  extend(obj, from);
  return obj;
}
