/**
 * 你现在是棒球比赛记录员。
  给定一个字符串列表，每个字符串可以是以下四种类型之一：
  1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
  2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
  3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
  4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。

  每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
  你需要返回你在所有回合中得分的总和。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/baseball-game
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  var stack = [];
  for (let i = 0; i < ops.length; i += 1) {
    let len = stack.length;
    switch (ops[i]) {
      case '+':
        stack.push((stack[len - 1] || 0) + (stack[len - 2] || 0))
        break;
      case 'D':
        stack.push((stack[len - 1] || 0) * 2)
        break;
      case 'C':
        stack.pop();
        break;
      default:
        stack.push(parseInt(ops[i], 10));
    }
  }
  let sum = 0;
  stack.forEach(item => sum += item);
  return sum;
};