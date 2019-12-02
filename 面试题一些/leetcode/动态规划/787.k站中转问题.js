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