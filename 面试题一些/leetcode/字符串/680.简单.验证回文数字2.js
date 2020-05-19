/****
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * 条件解读
 * 1. s非空 不需要判断空字符串的异常
 * 2. 最多删除一个字符 意思是也可以不删除 代表s本身为回文也是可以的
 * 思路
 * 1. 一个判断回文的函数
 * 2. 每次删除一个字母 判断删除后的数字是否是回文
 * 3. 判断原字符串是否是回文
 */
/**
 * 贪心算法
 * 时间复杂度O(n2) leetcode 超时过不去
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  // 两头找
  var isPalindrome = function (s) {
    let start = 0;
    let end = s.length - 1;
    let rlt = true;
    while (start <= end) {
      if (s[start] != s[end]) {
        rlt = false;
        break;
      }
      start += 1;
      end -= 1;
    }
    return rlt;
  };
  var rlt = false;
  for (let i = 0; i <= s.length; i += 1) {
    if (isPalindrome(s.substring(0, i - 1) + s.substring(i, s.length))) {
      console.log(s.substring(0, i - 1) + s.substring(i, s.length));
      rlt = true;
      break;
    }
  }
  return rlt;
};

// /**
//  * 解法2 双指针移动 有点像leetcode的另一道字符串题，忘记是那个了。。
//  * 1. 前后两个指针移动
//  * 2. 如果前后两个指针所在位置的值相等 比对剩余的字符串是否为回文
//  * 3. 如果前后两个指针值不相等 删除前指针 比对剩下的 或者删除后指针位置的比对剩下的(PS最多删除一个，所以需要一个标志位标识是否已经是删除过的字符串)
//  * 4. 结束条件 前后指针碰撞
//  * @param {string} s
//  * @return {boolean}
//  */
var validPalindrome = function (s) {
  var isPalindrome = function (t, flag) {
    var start = 0;
    var end = t.length - 1;
    var rlt = true;
    while (start <= end) {
      if (t[start] == t[end]) {
        start += 1;
        end -= 1;
      } else {
        if (flag) {
          return false;
        } else if (end - start == 1) { // 只剩一个了
          return true
        } else {
          let left = t.substring(start + 1, end + 1);
          let right = t.substring(start, end);
          rlt = isPalindrome(left, true) || isPalindrome(right, true);
        }
        break;
      }
    }
    return rlt;
  };
  return isPalindrome(s, false);
};
/**
 * 解法3 双指针移动 2
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  
  var isValid = function(t, l, r) {
    while(l < r) {
      if (t[l] != t[r]) {
        return false;
      }
      l ++;
      r --;
    }
    return true;
  }
  var l = 0;
  var r = s.length - 1;
  while(l < r) {
    if (s[l] !== s[r]) { // 转为判断删掉左右指针字符之一的字串，是否是回文串
      return isValid(s, l + 1, r) || isValid(s, l, r - 1)
    }
    l++
    r--;
  }
  return true;
};
console.log(validPalindrome('abc'));