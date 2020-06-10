/****
 * 
 * 给定一个未排序的整数数组，找出最长连续序列的长度。

  要求算法的时间复杂度为 O(n)。

  示例:

  输入: [100, 4, 200, 1, 3, 2]
  输出: 4
  解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/longest-consecutive-sequence
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  let max = 0;
  let map = new Map();
  let left = 0;
  let right = 0;
  let current = 0;
  if(nums.length === 0) return 0;
  for (let i = 0; i < nums.length; i += 1) {
    left = map.get(nums[i] - 1) ;
    right = map.get(nums[i] + 1);
    if (!left) {
      map.set(nums[i] - 1, 1);
      left = 0;
    }
    if (!right) {
      map.set(nums[i] + 1, 1);
      right = 0;
    }
    current = left + right + 1;
    map.set(nums[i], current);
  }
  map.forEach(value => {
    max = Math.max(value, max)
  })
  console.log(map)
  return max;
};
console.log(longestConsecutive([4, 1, 3, 2]))