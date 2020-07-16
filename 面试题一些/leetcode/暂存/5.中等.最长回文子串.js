/****
 * 
  给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 */
/**
 * 双指针切割法 同第680题
 * 1. 定义一个判断是否是回文字符串的函数
 * 2. 定义左右两个指针左右开始移动
 * 3. 当两个指针移动位置当所在位置的两个值不一样时切割字符串 继续查找
 * 4. 当查找到的字符串是回文字符串时 记录这个回文的最大值
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let maxStr = '';
  var ispalidrome = function(s) {
    let l = 0;
    let r = s.length - 1;
    while(l < r) {
      if (s[l] != s[r])
        return false;
      l ++;
      r --;
    }
    return true;
  }
  var deepLongestPalindrome = function(s) {
    let l = 0;
    let r = s.length - 1;
    let flag = true;
    while(l < r) {
      if(s[l] != s[r]) {
        let left = s.substring(l + 1, r + 1);
        let right = s.substring(l, r);
        flag = false;
        if (ispalidrome(left)) {
          if (left.length > maxStr.length) {
            maxStr = left;
          }
        }
        if (ispalidrome(right)) {
          if (right.length > maxStr.length) {
            maxStr = right;
          }
        }
        deepLongestPalindrome(left);
        deepLongestPalindrome(right);
      }
      l ++;
      r --;
    }
    if(flag) {
      if (s.length > maxStr.length) {
        maxStr = s;
      }
    }
  }
  deepLongestPalindrome(s);
  return maxStr;
};
console.log(longestPalindrome("babadada"));