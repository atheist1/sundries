/*****
 * 给定正整数数组 A，A[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的距离为 j - i。

一对景点（i < j）组成的观光组合的得分为（A[i] + A[j] + i - j）：景点的评分之和减去它们两者之间的距离。

返回一对观光景点能取得的最高分。

 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-sightseeing-pair
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
输入：[8,1,5,2,6]
输出：11
解释：i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11
 */
/**
 * @param {number[]} A
 * @return {number}
 */
// 暴力解法会超时
var maxScoreSightseeingPair = function(A) {
  // arr[i] + arr[j] + i - j变形为 arr[i] + i + arr[j] - j即找到这两个的最大值 且满足i>j即可
  let max = 0;
  let prevMax = A[0] + 0;
  for (let i = 0; i < A.length - 1; i += 1) {
    prevMax = Math.max(prevMax, A[i] + i); // 储存 i + 1之前 A[i] + i的最大值
    max = Math.max(max, prevMax + A[i + 1] - i - 1)
  }
  
  return max;
};
console.log(maxScoreSightseeingPair([8,1,5,2,6]))