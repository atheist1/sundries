/**
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 直接桶排序 如果max过大会出问题
var firstMissingPositive = function(nums) {
  if (nums.length === 0) {
    return 1;
  }
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  let heap = [];
  let temp;
  let result;
  for (let i = 0; i < nums.length; i += 1) {
    temp = nums[i] - min;
    if (heap[temp] !== undefined) {
      heap[temp] += 1;
    } else {
      heap[temp] = 1;
    }
  }
  for (let j = 0; j < heap.length; j += 1) {
    if (heap[j] === undefined && j + min > 0) {
      result = j + min;
      break;
    }
  }
  return result ? result : heap.length + min;
};
// 桶排序改进
var firstMissingPositive = function(nums) {
  if (nums.length === 0) {
    return 1;
  }
  let heap = [];
  let temp = 0;
  for (let i = 0; i < nums.length - 1; i += 1) {
    temp = nums[i + 1] - nums[i];
    if (heap[temp]) {

    } else {
      
    }
  }
};