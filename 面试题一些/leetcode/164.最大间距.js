/**
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

  如果数组元素个数小于 2，则返回 0。  
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 最基础做法
var maximumGap = function(nums) {
  if (nums.length < 2) {
    return 0;
  }
  nums.sort((a,b) => a - b);
  let max = 0;
  for (let i = 0; i < nums.length - 1; i += 1) {
    if (nums[i + 1] - nums[i] > max) {
      max = nums[i + 1] - nums[i];
    }
  }
  return max;
};
// 尝试on
var maximumGap = function(nums) {
  var max = Math.max(...nums);
  var min = Math.min(...nums);
  if (nums.length < 2 || max - min === 0) {
    return 0;
  }
  var heap = new Array(max - min);
  var maxCount = 0;
  let tempCount = 0;
  var temp;
  for (let i = 0; i < nums.length; i += 1) {
    temp = nums[i] - min;
    if (heap[temp]) {
      heap[temp] += 1
    } else {
      heap[temp] = 1;
    }
  }
  for (let j = 0; j < heap.length; j += 1) {
    if (!heap[j]) {
      tempCount += 1;
    } else {
      if (tempCount > maxCount) {
        maxCount = tempCount;
      }
      tempCount = 0;
    }
  }
  return maxCount + 1;
};