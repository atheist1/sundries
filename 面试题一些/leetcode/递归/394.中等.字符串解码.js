/****
 * 给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
s = "3[a]2[bc]", 返回 "aaabcbc".
s = "3[a2[c]]", 返回 "accaccacc".
s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/decode-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/decode-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} s
 * @return {string}
 * 思路 最简单的
 * 首先碰到数字 记录当前数字 推入数字数组
 * 碰到非数字 推入字符数组
 * 碰到后括号 将字符串数组推出 直到碰到前括号 数字数组推出一个数字 重复字符串数字次数
 *
 * 递归
 * 每次碰到数字时判断当前数字数组是否只有一个 是则代表第一次碰到中括号，直接记录 往下
 * 如果不是 代表这个数字后面的字符是已经被中括号包裹住一次的了，将这个数字往后的字符串记录 给下次递归
 */
var decodeString = function (s) {
  let l = 0;
  let current = '';
  let rlt = '';
  let num = [];
  let str = '';
  while (l < s.length) {
    current = s[l];
    if (!Number.isNaN(current - 0)) {
      // 数字
      if (num.length >= 1) {
        // 证明上一次已经找到了一个数字
        // 找到下一个子串 交给下次函数处理
        let prevBracketsCount = 0;
        let lastBracketsCount = 0;
        while (prevBracketsCount != lastBracketsCount || prevBracketsCount == 0){
          l += 1;
          current += s[l];
          if (s[l] === '[') {
            prevBracketsCount += 1;
          } else if (s[l] === ']') {
            lastBracketsCount += 1;
          }
        }
        let _rlt = decodeString(current);
        str += _rlt;
      } else {
        // 找到这次处理字符串需要重复的个数
        let prevNum = current;
        while (s[l + 1] != '[') {
          l += 1;
          prevNum += s[l];
        }
        num.push(prevNum);
      }
    } else if (current == ']') {
      let count = num.pop();
      rlt += str.repeat(count);
      str = '';
    } else if (current != '[') {
      if (num.length === 0) {
        rlt += s[l];
      } else {
        str += current;
      }
    }
    l += 1;
  }
  return rlt;
};
// console.log(decodeString("pq4[2[jk]e1[f]]"));
console.log(decodeString('2[abc]3[cd]ef'));
