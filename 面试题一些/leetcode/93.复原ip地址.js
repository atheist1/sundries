/**
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(st) {
  let result = [];
  if (st.length > 12) {
    return [];
  }
  var getAddress = function (s, arr) {
    // 剪枝算法
    if (arr.length === 4 && arr.join('').length === st.length) {
      let str = arr.join('.');
      result.push(str);
      return;
    }
    if (s.length >= 1) {
      let $1 = parseInt(s.substring(0, 1), 10);
      // 2
      if ($1 >= 0 && $1 <= 255) {
        getAddress(s.substring(1), arr.concat($1))
      }
    }
    if (s.length >= 2) {
      let $2 = parseInt(s.substring(0, 2), 10);
      // 25
      if ($2 >= 0 && $2 <= 255) {
        getAddress(s.substring(2), arr.concat($2))
      }
    }
    if (s.length >= 3) {
      let $3 = parseInt(s.substring(0, 3), 10);
      // 255
      if ($3 >= 0 && $3 <= 255) {
        getAddress(s.substring(3), arr.concat($3))
      }
    }
  }
  getAddress(st, []);
  return result;
};