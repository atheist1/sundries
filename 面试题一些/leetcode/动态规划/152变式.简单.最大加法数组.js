/****
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)
 */
// 暴力解法双重循环
// dp算法 dp表示当前以当前下标之前的所有子数组的最大和
var maxSubArray = function (nums) {
  let dp = [0]; 
  let max = nums[0];
  for (let i = 0; i < nums.length; i += 1) {
    dp[i + 1] = Math.max(dp[i] + nums[i], nums[i]);
    max = Math.max(dp[i + 1], max);
  }
  return max;
};
var maxSubArray = function (nums) {
  let max = nums[0];
  let prev = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    prev = nums[i] + prev > nums[i] ? nums[i] + prev : nums[i];
    max = max > prev ? max : prev;
  }
  return max;
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
