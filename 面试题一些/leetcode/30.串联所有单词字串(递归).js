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