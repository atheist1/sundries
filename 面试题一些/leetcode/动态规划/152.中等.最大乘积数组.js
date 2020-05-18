/****
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 *  输入: [2,3,-2,4]
    输出: 6
    解释: 子数组 [2,3] 有最大乘积 6。
    [2,3,-2,4，-5]
    [2,6,-12,-48]
 */
/** 解法1 动态规划
 *  如果nums仅包含正整数和0 第i项的乘积最大值为Max(dp[i - 1] * nums[i], nums[i]) 考虑nums[i]可能为0
 *  现在nums包含了负整数 将负数也加入dp数组 这时最大值不是dp[i - 1] * nums[i]和nums[i]相比了，因为符号的介入，上一个的最小值可能导致当前的最大值
 *  dp[i]min = Min(dp[i - 1]min * nums[i], dp[i - 1]max * nums[i], nums[i])
 *  dp[i]max = Max(dp[i - 1]max * nums[i], dp[i - 1]min * nums[i], nums[i])
 *  时间复杂度O(n)空间复杂度O(n) 其实时间复杂度是O(n2)因为math.max的时间复杂度是O(n)
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let dp = [{
    max: 1,
    min: 1,
  }];
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i += 1) {
    let current = [dp[i].max * nums[i], dp[i].min * nums[i], nums[i]];
    let _max = Math.max(...current);
    let min = Math.min(...current)
    dp[i + 1] = {
      max: _max,
      min: min,
    }
    max = Math.max(max,_max)
  }
  return max;
};
/** 解法2 暴力法
 * @param {number[]} nums
 * @return {number}
 * 时间复杂度O(n2)空间复杂度O(1)
 */
var maxProduct1 = function(nums) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i += 1) {
    let sum = 1;
    for (let k = i; k < nums.length; k += 1) {
      sum *= nums[k];
      max = Math.max(max, sum);
    }
  }
  return max;
};
/** 解法3 动态规划优化
 *  基于解法2将空间复杂度优化 不用Math.min Math.max方法
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  // 用变量储存dp[i - 1]min与dp[i - 1]max
  let fmax = nums[0];
  let fmin = nums[0];
  let max = nums[0];
  let f1 = 0;
  let f2 = 0;
  for (let i = 1; i < nums.length; i += 1) {
    f1 = fmax * nums[i];
    f2 = fmin * nums[i];
    // 直接用if判断减少一次循环
    if (f1 >= f2) { // f1 > f2
      if (f1 > nums[i]) { // f1 > nums f1 > f2
        fmax = f1
        if (f2 > nums[i]) { // f1 > f2 > nums[i]
          fmin = nums[i]
        } else {
          fmin = f2; // f1 > nums[i] > f2
        }
      } else { // 312
        fmax = nums[i];
        fmin = f2;
      }
    } else { // f2 > f1
      if (f2 > nums[i]) { // f2 > nums[i] f2 > f1
        fmax = f2;
        if (nums[i] > f1) { // f2 nums[i] f1
          fmin = f1;
        } else {
          fmin = nums[i];
        }
      } else { // nums[i] f2 f1
        fmax = nums[i];
        fmin = f1;
      }
    }
    max = max > fmax ? max : fmax;
  }
  return max;
};

var maxProduct = (nums) => {
  let res = nums[0]
  let prevMin = nums[0]
  let prevMax = nums[0]
  let temp1 = 0, temp2 = 0
  for (let i = 1; i < nums.length; i++) {
    temp1 = prevMin * nums[i]
    temp2 = prevMax * nums[i]
    prevMin = Math.min(temp1, temp2, nums[i])
    prevMax = Math.max(temp1, temp2, nums[i])
    res = Math.max(prevMax, res)
  }
  return res
}
console.log(maxProduct([-2,0,1,-2,0,3]))