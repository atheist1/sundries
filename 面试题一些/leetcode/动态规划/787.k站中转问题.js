/**
 *  有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。
    现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 如果没有这样的路线，则输出 -1。
    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/cheapest-flights-within-k-stops
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
// 1. 递归方式 超时咯

var findCheapestPrice = function(n, flights, src, dst, K) {
  // 状态转移方程
  // fn(src, dst, k) = min(fn(src,dst - 1, k - 1) + fn(dst - 1, dst, 1));
  // 边界条件 k < 0
  let cheap = function (src, dst, k) {
    // 1. 找到目的地的前一站
    let prev = flights.filter(item => item[1] === dst);
    let min = Math.min.apply(null, prev.map(item => {
      if (k < 0) {
        return Number.MAX_SAFE_INTEGER;
      } else {
        if (item[0] === src) {
          return item[2];
        } else {
          return item[2] + cheap(src, item[0], k - 1);;
        }
      }
    }));
    return min;
  }
  let result = cheap(src, dst, K)
  return result > Number.MAX_SAFE_INTEGER ? -1 : result;
};


// 2. 动态规划数组算法
var findCheapestPrice = function(n, flights, src, dst, K) {
  // 状态转移方程
  // dp表示从src到位置i最多经过k站所需要的最小费用
  let dp = new Array(n).fill('').map(() => new Array(K + 2).fill(Number.MAX_SAFE_INTEGER));
  for (let i = 0; i <= K + 1; i += 1) {
    // 从src到src不管多少站都是0元
    dp[src][i] = 0;
  }
  for (let k = 1; k <= K + 1; k += 1) {
    for (let j = 0;j < flights.length; j +=1) {
      let flight = flights[j];
      let _src = flight[0];
      let _dst = flight[1];
      let tempPrice = flight[2];
      // k站达到_dst所需要的最少价格是K-1站到达_src所需的最小价格加上当前的价格与src直接到_dst不中转的价格的最小值
      dp[_dst][k] = Math.min.apply(null, [dp[_src][k - 1] + tempPrice, dp[_dst][k]])
    }
  }
  return dp[dst][K + 1] >= Number.MAX_SAFE_INTEGER ? -1 : dp[dst][K + 1];
};