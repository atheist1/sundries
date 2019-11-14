/**
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 直接桶排序 如果max过大会出问题
var firstMissingPositive = function (nums) {
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
var firstMissingPositive = function (nums) {
  nums = nums.filter(item => item > 0);
  if (nums.length <= 1) {
    return nums[0] === 1 ? 2 : 1;
  }
  let arr = [];
  let result;
  // let min = Math.min(...nums);
  for (let i = 0; i < nums.length; i += 1) {
    arr[nums[i]] = 1;
  }
  for (let j = 1; j < arr.length + 1; j += 1) {
    if (arr[j] === undefined) {
      result = j;
      break;
    }
  }
  return result ? result : arr.length;
};
var firstMissingPositive = function (nums) {
  let arr = [];
  let result;
  nums = nums.filter(item => ((item <= nums.length) && item > 0));
  if (nums.length <= 1) {
    return nums[0] === 1 ? 2 : 1;
  }
  for (let i = 0; i < nums.length; i += 1) {
    arr[nums[i]] = 1;
  }
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] === undefined) {
      result = i;
      break;
    }
  }
  return result ? result : arr.length;
};
// 官方解法
var firstMissingPositive = function (nums) {
  let n = nums.length;
  let contains = 0;
  // 第一个缺失的正数一定小于等于n+1
  for (let i = 0; i < n; i ++) {
    if (nums[i] === 1) {
      contains += 1;
      break;
    }
  }
  if (contains === 0) {
    return 1;
  }
  if (n === 1) {
    return 2;
  }
  for (let i = 0; i < n; i += 1) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = 1;
    }
  }
  // 415231 找到4 将4号位置为负数表示4号位存在
  for (let i = 0; i < n; i += 1) {
    let a = Math.abs(nums[i]);
    // 0号位用于标志大于数组长度的位置的
    if (a == n) {
      nums[0] =  - Math.abs(nums[0]);
    } else {
      nums[a] = - Math.abs(nums[a]);
    }
  }
  // 除了0号位 第一个大于0的则为缺少的正数
  for (let i = 1; i < n; i++) {
    if (nums[i] > 0)
      return i;
  }
  //1234 99999 数组有n位，但是a[n]不是n
  if (nums[0] > 0)
    return n;

  // 已经是满足条件的顺序串了 直接长度加1
  return n + 1;
};