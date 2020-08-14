/***
 * 给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

 

示例 1:

输入: [1,2,0]
输出: 3
示例 2:

输入: [3,4,-1,1]
输出: 2
示例 3:

输入: [7,8,9,11,12]
输出: 1
你的算法的时间复杂度应为O(n)，并且只能使用常数级别的额外空间。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/first-missing-positive
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
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
var firstMissingPositive = function (nums) {
  let max = Number.MIN_VALUE;
  let min = Number.MAX_SAFE_INTEGER;
  let sum = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] >= 0) {
      sum += nums[i];
      min = Math.min(min, nums[i]);
      max = Math.max(max, nums[i]);
    }
  }
  for (let i = min; i <= max; i += 1) {
    sum -= i;
  }
  if (min == Number.MAX_SAFE_INTEGER)return 0
  if (min < 0) return 0;
  if (min > 1) return 1;
  if (sum == 0) return max + 1;
  if (sum < 0) return Math.abs(sum);
};
console.log(firstMissingPositive( [2147483647,2147483646,2147483645,3,2,1,-1,0,-2147483648]))