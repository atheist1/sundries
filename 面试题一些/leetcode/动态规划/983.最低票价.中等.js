/****
 * 
 * 在一个火车旅行很受欢迎的国度，你提前一年计划了一些火车旅行。在接下来的一年里，你要旅行的日子将以一个名为 days 的数组给出。每一项是一个从 1 到 365 的整数。

  火车票有三种不同的销售方式：

  一张为期一天的通行证售价为 costs[0] 美元；
  一张为期七天的通行证售价为 costs[1] 美元；
  一张为期三十天的通行证售价为 costs[2] 美元。
  通行证允许数天无限制的旅行。 例如，如果我们在第 2 天获得一张为期 7 天的通行证，那么我们可以连着旅行 7 天：第 2 天、第 3 天、第 4 天、第 5 天、第 6 天、第 7 天和第 8 天。

  返回你想要完成在给定的列表 days 中列出的每一天的旅行所需要的最低消费。

   

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/minimum-cost-for-tickets
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/****
 * 输入：days = [1,4,6,7,8,20], costs = [2,7,15]
  输出：11
  解释： 
  例如，这里有一种购买通行证的方法，可以让你完成你的旅行计划：
  在第 1 天，你花了 costs[0] = $2 买了一张为期 1 天的通行证，它将在第 1 天生效。
  在第 3 天，你花了 costs[1] = $7 买了一张为期 7 天的通行证，它将在第 3, 4, ..., 9 天生效。
  在第 20 天，你花了 costs[0] = $2 买了一张为期 1 天的通行证，它将在第 20 天生效。
  你总共花了 $11，并完成了你计划的每一天旅行。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/minimum-cost-for-tickets
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// dp[n] = min(dp[n - 7] + costs[1], dp[n - 1] + costs[0], dp[n - 30] + costs[1])
// if n not in days; dp[n] = dp[n - 1];
/**
  * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
  let last = days[days.length - 1];
  let p1 = costs[0];
  let p7 = costs[1];
  let p30 = costs[2];
  var dp = [0];
  for (let i = 0; i < days.length; i += 1) {
    let day = days[i];
    dp[day] = 1;
  }
  for (let i = 0; i <= last; i += 1) {
    if (dp[i]) {
      // 没有足够天数的时候可以用足够天数的价格补齐，比如前六天的价格总和比直接买一个七天的通行证还多
      let _p1 = (dp[i - 1] || 0) + p1;
      let _p7 = dp[i - 7 < 0 ? 0 : i - 7] + p7;
      let _p30 = dp[i - 30 < 0 ? 0 : i - 30] + p30;
      dp[i] = Math.min.call(this, _p1, _p30, _p7);
    } else {
      dp[i] = dp[i - 1] || 0;
    }
  }
  return dp[last];
};
// console.log(mincostTickets([1,2,3,4,6,8,9,10,13,14,16,17,19,21,24,26,27,28,29], [14,3,50]));
console.log(mincostTickets([1,4,6,7,8,20],[7,2,15]));