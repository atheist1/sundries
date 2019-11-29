/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

  输入: [7,1,5,3,6,4]
  输出: 7
  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
       随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 */
// 策略1 最低点买入 最高点卖出
// 策略2 低点买入 赚钱就卖出
// 策略3 最低点买入，价格高点卖出
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let buy = 0;
  let sale = 1;
  let price = 0;
  let result = 0;
  for (let i = 0; ; i += 1) {
    let temp = prices[sale] - prices[buy];
    if (temp <= 0) {
      buy ++;
      sale ++;
      continue;
    } else if (temp >= price) { 
      sale ++;
      buy ++;
      result += temp;
    }
    if (sale >= prices.length) {
      break;
    }
  }
  return result;
};
// 贪心算法 将多天的交易拆解成每两天的
var maxProfit = function(prices) {
  let result = 0;
  for (let i = 0; i < prices.length ; i += 1) {
    let temp = prices[sale] - prices[buy];
    if (temp > 0) {
      result += temp;
    }
  }
  return result;
};