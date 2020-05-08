/**
 * 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

  注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

   

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
// 暴力解法，先查找word所有的排列组合，再去s找，
// 超时，且有一个问题，
// "foobarfoobar"
// ["foo","bar"] 输出应当为[0,3,6]
var findSubstring = function(s, words) {
  let strArr = [];
  let result = [];
  let idx;
  // 排列组合找子串
  let findStr = function (r, choose) {
    if (choose.length === words.length) {
      strArr.push(choose.join(''))
      return;
    }
    for (let i = 0; i < words.length; i += 1) {
      let temp = [].concat(words);
      temp.splice(i, 1);
      findStr(temp, choose.concat(words[i]))
    }
  }
  findStr(words, []);
  for (let i = 0; i < strArr.length; i += 1) {
    idx = s.indexOf(strArr[i]);
    if (idx > -1 && result.indexOf(idx) === -1) {
      result.push(idx);
    }
  }
  return result;
};
/**
 * foo bar ->2
 * barfoothefoobarman
 * bar match +1 右滑
 * foo match +1 右滑
 * 匹配数等于单词数 bar的出现次数与单词数一致 foo出现次数与bar一致 表示第一个匹配完成
 * 加入res数组，一个成功
 * 移动左指针 往右移动一个字符长度(并清空match与窗口夹住的单词)
 * 左指针移动到右指针的位置 即the开始 继续右滑
 * 
 * foo match +1 右滑
 * bar match +1 右滑
 * 匹配 推入res数组 第二个成功
 * 移动左指针
 * 一直到数组最后一个单词长度 发现不匹配
 * i++ 从arf开始继续移动窗口匹配，直到i结束
 */
// js滑动窗口
var findSubstring = function(s, words) {
  if (s.length === 0 || words.length === 0) {
    return [];
  }
  let len = words[0].length;
  var wordMap = new Map();
  let left;
  let right;
  let winMap = new Map();
  let result = [];
  // 构建word的窗口
  for (let idx = 0; idx < words.length; idx += 1) {
    let temp = wordMap.get(words[idx])
    if (temp) {
      wordMap.set(words[idx], temp + 1);
    } else {
      wordMap.set(words[idx], 1);
    }
  }
  for (let i = 0; i < s.length; i += 1) {
    // 窗口开始位置
    left = right = i;
    let match = 0;
    // 最后一个单词长度之前
    while (right <= s.length - len) {
      let s2 = s.substring(right, right + len);
      let count = winMap.get(s2) || 0;
      winMap.set(s2, count + 1);
      if (winMap.get(s2) === wordMap.get(s2)) {
        match += 1;
      }
      right += len;
      // 移动左指针
      while (left < right && match === wordMap.size) {
        if ((right - left) / len === words.length) { // 左右间隔长度与单词数量一致
          if (result.indexOf(left) === -1) {
            result.push(left);
          }
          
        }
        let s3 = s.substring(left, left + len);
        left += len;
        let winTemp = winMap.get(s3) || 0;
        winMap.set(s3, winTemp - 1);
        // 如果窗口里面的选取元素个数比所需元素个数少，左指针左移停止，右移继续
        if (winMap.get(s3) <= wordMap.get(s3)) {
          match -= 1;
        }
      }
    }
    winMap.clear();
  }
  return result;
};