/****
 * 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:

输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
示例 2:
"(())))))"
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
1. 一个栈 前括号栈
2. 碰到前括号 入栈 碰到后括号前括号出栈 每次后括号出栈 count重置
3. 如果栈内元素不为空 比较当前count和之前count谁大 否则 count += 2即可
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let stack = [];
  let rlt = 0;
  // stack.push(-1)
  for (let i = 0; i < s.length; i+= 1) {
    if (s[i] == '(') {
      stack.push(i)
      continue;
    }
    stack.pop();
    if (stack.length === 0) { // 遇到右括号 但是栈内没有元素了
      stack.push(i)
    } else {
      rlt = Math.max(i - stack[stack.length - 1], rlt)
    }

    
  }
  return rlt;
};
// ")()())" ((((()
console.log(longestValidParentheses(")()())"))