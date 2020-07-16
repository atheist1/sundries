/****
 * 给你一个字符串 s ，请你返回满足以下条件的最长子字符串的长度：每个元音字母，即 'a'，'e'，'i'，'o'，'u' ，在子字符串中都恰好出现了偶数次。
 *  输入：s = "eleetminicoworoep"
    输出：13
    解释：最长子字符串是 "leetminicowor" ，它包含 e，i，o 各 2 个，以及 0 个 a，u 。

    输入：s = "leetcodeisgreat"
    输出：5
    解释：最长子字符串是 "leetc" ，其中包含 2 个 e 。
 */
/***+
 * 思路 失败了失败了失败了！
 * leceocbbaa
 * 1. 第i位如果为非元音字母 且满足元音字母元素和为偶数个 则dp[i] = dp[i - 1] + 1;否则dp[i] = dp[i - 1]
 * 2. 如果第i位为元音字母 查找map 加入当前s[i]后是否为满足元音字母个数为偶数个，如果满足 dp[i] = i + 1不满足 dp[i] = dp[i - 1]
 * 3. 左右指针 当前s的最大值为从s的start到end - 1的最大值加上s[end]后的值与从start + 1到end的最大值加上s[start]后的值
 * 4. 综上所述 需要一个函数储存当前字符串的元音字母的状态，当前状态下的最大值，
 */
/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function(s) {
  // 一个储存元音字母个数的状态
  const map = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0,
  }
  // 这个函数的作用是 传入一个字符串与一个字符 算出加上这个字符的情况下字符串的最大长度
  var longestSubstring = function (str, word) {;
    let l = 0;
    let len = str.length;
    let left = str.substring(l, len - 1);
    let right = str.substring(l + 1, len);
    if (len < 1) {
      return count(str, word) ? 2 : 1;
    }
    let rightword = str[len - 1]
    let leftword = str[l]
    let maxLeft = longestSubstring(left, rightword);
    let maxRight = longestSubstring(right, leftword);
    console.log('--------')
    console.log('str', str)
    console.log('left', left)
    console.log('rigth', right)
    console.log('word', word)
    console.log('maxLeft', maxLeft)
    console.log('maxRight', maxRight)
    if (map[word] != undefined) { // 传入的字符是元音
      if (count(str, word)) {
        return str.length + 1;
      }else {
        return Math.max(maxLeft, maxRight)
      }
    } else { // 是一个辅音或者为第一次
      let max = Math.max(maxLeft, maxRight);
      if (word == '') {
        return max;
      }
      return max + 1;
    }
  }
  // 这个函数是用来计算元音字母是否饱和
  var count = function(s, word) {
    let charcode = 0;
    let wordCode = word ? word.charCodeAt() : 0;
    for (let i = 0; i < s.length; i += 1) {
      if (map[s[i]] != undefined) {
        charcode ^= s[i].charCodeAt();
      }
    }
    return (charcode ^ wordCode) === 0;
  }
  return longestSubstring(s,'')
};
console.log(findTheLongestSubstring('aaabiabb'));