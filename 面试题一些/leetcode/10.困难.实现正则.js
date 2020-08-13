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
      // aaaaab a*b 第1种是S*匹配一个字符，然后递归匹配表示s*匹配多个s
      // aaaaab a*b 第2种是s*匹配0个字符
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
/** 动态规划 */
var isMatch = function (s, p) {
  // 初始化dp
  var dp = new Array(s.length + 1).fill().map(item => []);
  dp[0][0] = true;
  // 状态转移方程
  // for (let i = 0; i < s.length; i += 1) {
  //   for (let j = 0; j < p.length; j += 1) {
  //     // 1.s[i]===p[j] p[j] === '.' 点是通用符，直接向前一位
  //     if (s[i] === p[j] || p[j] === '.') {
  //       dp[i][j] = dp[i - 1][j - 1];
  //     }
  //     if (p[j] === '*') {
  //       if (s[i] !== p[j - 1] && p[j - 1] !== '.') { // ab匹配abc* 当b与c不相等时且前一位不为.时，移除两位判断是否当前*代表0个
  //         dp[i][j] = dp[i][j - 2];
  //       } else {
  //         // j为* s[i]与p[j - 1]相等 或者p[j - 1]是.
  //         // 第一种情况p[j]为*，abbbbbb匹配ab* 当前是否匹配只需要查看s[i - 1]位置是否匹配 匹配多字符
  //         // 第二种情况为p[j]为* p[j - 1]为. p向前挪动一位，查看是否匹配
  //         // 第三种情况为p[j]为* p[j - 1]s[j]无所谓，因为这里的*代表0个匹配，直接向前匹配两位，如果三个一个满足则满足
  //         dp[i][j] = d[i - 1][j] || dp[i][j - 1] || dp[i][j - 2];
  //       }
  //     }
  //   }
  // }
  // s和p虽然是两个数组，但是0号位是不做操作的。下标从1开始当p[i] = *则当前i + 1位置是否能匹配跟i - 1位置一致 i号位代表是当前*
  // 或者p[i - 1]位为*时，dp[i][j]与dp[i][j - 2]保持一致
  for (let i = 0; i < p.length; i += 1) {
    if (p[i] === '*' && dp[0][i - 1]) {
      dp[0][i + 1] = true;
    }
  }
  for (let i = 0; i < s.length; i += 1) {
    for (let j = 0; j < p.length; j += 1) {
      // 1.s[i]===p[j] p[j] === '.' 点是通用符，直接向前一位
      if (s[i] === p[j] || p[j] === '.') {
        dp[i + 1][j + 1] = dp[i][j];
      }
      if (p[j] === '*') {
        if (s[i] !== p[j - 1] && p[j - 1] !== '.') { // ab匹配abc* 当b与c不相等时且前一位不为.时，移除两位判断是否当前*代表0个
          dp[i + 1][j + 1] = dp[i + 1][j - 1];
        } else {
          dp[i + 1][j + 1] = (dp[i][j + 1] || dp[i + 1][j] || dp[i + 1][j - 1]);
        }
      }
    }
  }
  return dp[s.length][p.length] || false;
}