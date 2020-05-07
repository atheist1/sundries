/****
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

  示例 1:

  输入: "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
  示例 2:

  输入: "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
  示例 3:

  输入: "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} s
 * @return {number}
 */
// 暴力解法 时间复杂度为o(n2)
// var lengthOfLongestSubstring = function(s) {
//   let map = new Map();
//   let max = 0;
//   for (let i = 0; i < s.length; i += 1) {
//     let _max = 0;
//     for (let j = i; j < s.length; j += 1) {
//       if (!map.has(s[j])) {
//         _max += 1;
//         map.set(s[j]);
//       } else {
//         map.clear();
//         break;
//       }
//     }
//     max = Math.max(max, _max);
//   }
//   return max;
// };
// 滑动窗口
var lengthOfLongestSubstring = function(s) {
  let map = new Map();
  let max = 0;
  for (let start = 0, end = 0; end < s.length; end += 1) {
    let char = s[end];
    if (map.has(char)) {
      // 将start滑动到最后一个相同字母的位置，保证该字符串内没有相同的字母
      // 这里必须加max 比如abba或者abaab 我第二次碰到重复时start位置已经靠右了而重复的位置是在start左边
      start = Math.max(map.get(char), start);
      // map里记录的是字母出现的最后一个位置，不能clear
      // abcabcba 先找到a、b、c然后a重复滑到b位置，如果此时clear掉了，后面map中就不存在重复元素了
      // map.clear();
    }
    map.set(char, end + 1);  
    max = Math.max(max, end - start + 1);
  }
  return max;
};
console.log(lengthOfLongestSubstring('abba'));