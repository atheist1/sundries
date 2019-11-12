/**
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 */
/**
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 *  所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var sArr = s.split('');
  var pArr = p.split('');
  let flag = true;
  let prev;
  for (let i = 0;  ; i += 1) {
    if (sArr.length === 0 && pArr.length === 0) {
      if (pArr.length !== 0) {
        flag = false;
      }
      break;
    }
    if (sArr[i] === pArr[i]) {
      i -= 1;
      sArr.shift();
      prev = pArr.shift();
    } else if (pArr[i] === '.') {
      if (sArr.length === 0) {
        flag = false;
        return flag;
      }
      if (prev === '*') {

      }
      i -= 1;
      prev = sArr.shift();
      pArr.shift();
    } else if (pArr[i] === '*') {
      if (prev !== sArr[i]) {
        pArr.shift();
      } else {
        prev = sArr.shift();
      }
      i -= 1;
    } else {
      flag = false;
      return false;
    }
  }
  return flag;
};
var isMatch = function (s, p) {
  if (s === '' && p === '') {
    return true;
  }
  if ((p === '' && s !== '')) {
    return false;
  }
  // 递归
  let result = false;
  let char = s[0];
  let reg = p[0];
  let isStar = (p[1] === '*')
  if (isStar) {
    if (char && (reg === '.' || reg === char)) { // .*  char必须存在是为了匹配s为空时reg还剩下.或者.*的情况
      // aaaaab a*b 第1种是每次匹配到一个a去除一个a
      // aaaaab a*b 第2种是匹配到a a*a 去除a*直接匹配
      // aaaaab aaaa.b
      result = isMatch(s.slice(1), p) || isMatch(s, p.slice(2));
    } else {
      // b a*b
      result = isMatch(s, p.slice(2)); // 去除.*后是否匹配
    }
  } else {
    if (char && (reg === char || reg === '.')) { // char必须存在是为了匹配s为空时reg还剩下.或者.*的情况
      result = isMatch(s.slice(1), p.slice(1));
    } else {
      result = false;
    }
  }
  return result;
}