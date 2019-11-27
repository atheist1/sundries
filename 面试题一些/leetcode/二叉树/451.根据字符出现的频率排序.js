// 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  // 桶排序
  let map = new Map();
  let num = 0;
  let result = '';
  for (let i = 0; i < s.length; i += 1) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1)
    } else {
      map.set(s[i], 1);
    }
  }
  while (result.length < s.length) {
    let max;
    map.forEach((item, key) => {
      if (!max || map.get(max) < item) {
        max = key;
      }
    });
    result += max.repeat(map.get(max));
    map.set(max, 0);
  }
  return result;
};