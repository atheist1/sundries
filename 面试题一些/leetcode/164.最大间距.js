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
// 这个方法会超时
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
  for (let item in heap) {
    heap[item] = min + parseInt(item);
  }
  console.log(heap);
  // for (let j = 0; j < heap.length; j += 1) {
  //   if (!heap[j]) {
  //     tempCount += 1;
  //   } else {
  //     if (tempCount > maxCount) {
  //       maxCount = tempCount;
  //     }
  //     tempCount = 0;
  //   }
  // }
  return maxCount + 1;
};
// 桶排序
var maximumGap1 = function(nums) {
  var max = Math.max(...nums);
  var min = Math.min(...nums);
  var bocket = [];
  if (nums.length < 2 || max - min === 0) {
    return 0;
  }
  // 区间长度 相邻的最大差值一定不小于该数组的最大值减去最小值除以间隔个数
  var bucketSize = Math.ceil(Math.max(1, (max - min) / (nums.length - 1)));
  // 区间里面的元素最大与最小相减不会大于这个bucketSize 即相邻间隔小于gap的数放在一个桶里，那么最大间隔则在相互桶的最大值与最小值之差出现的
  console.log(bucketSize);
  let idx;
  for (let i = 0; i < nums.length; i += 1){
    // 相差在一个bucketSize内，证明在一个桶里
    idx = Math.ceil((nums[i] - min) / bucketSize);
    if (bocket[idx]) {
      bocket[idx].min = Math.min(nums[i], bocket[idx].min);
      bocket[idx].max = Math.max(nums[i], bocket[idx].max);
    } else {
      bocket[idx] = {
        min: nums[i],
        max: nums[i],
      }
    }
  }
  let maxGap = 0;
  let prevBucketMax = min;
  console.log(bocket)
  for (let item of bocket) {
    if (!item) {
      continue;
    }
    maxGap = Math.max(maxGap, item.min - prevBucketMax);
    prevBucketMax = item.max;
  }
  return maxGap;
};