/**
 * 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

  重复出现的子串要计算它们出现的次数。

/**
 * 输入: "00110011"
    输出: 6
    解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

    请注意，一些重复出现的子串要计算它们出现的次数。

    另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
 */
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
  let result = [];
  let match;
  var matchStr = function (str) {
    let firstMatch = str.match(/^(0+|1+)/);
    let first = firstMatch[0];
    let second = (first[0] ^ 1).toString().repeat(first.length);
    let _match = new RegExp(`^(${first[0]}{${first.length}}${second}{${second.length}})`);
    if (_match.test(str)) {
      return RegExp.$1;
    } else {
      return false;
    }
    
  }

  for (let i = 0; i < s.length - 1; i += 1) {
    match = matchStr(s.slice(i))
    if (match) {
      result.push(match);
    }
  }
  return result.length;
};

let countBinarySubstrings2 = function (s) {
  let n = 0, pre = 0, curr = 1
  for (let i = 0, len = s.length; i < len - 1; i++) {
    if (s[i] == s[i+1]) {
      curr++
    } else {
      pre = curr
      curr = 1
    }
    if (pre >= curr) n++
  }
  return n
}
