// 前序1
/***
 * 
  数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
  你可以假设数组是非空的，并且给定的数组总是存在多数元素。
  最容易想到的两种方式 第一种是双重for 时间复杂度O(n2)空间复杂度O1
  第二种是用map去取代第一次循环 即用空间换时间 
  我们这里用的是第三种方式 摩尔投票法
 */
var majorityElement = function(nums) {
  // 摩尔投票法的 存在一个数 他出现的次数比数组长度的一半还要大 那我们可以推定 设置一个众数 设置一个count为0 遇到众数则加一遇到非众数则减一 那么数组循环完成
  // 必然count是大于1的 因为正负抵消
  // 那么我们先设定这个众数为nums[0]开始计算 如果后面的等于nums[0]则count自增否则count自减 当count小于0时代表到i这个点这个数肯定不是众数 因为他不能抵消所有的数
  let user = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] === user) {
      count += 1
    } else {
      count -= 1;
      if (count < 0) {
        user = nums[i];
        count = 0;
      }
    }
  }
};

/****
 *
 * 给定一个大小为 n 的数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

  说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。
 */
var majorityElement2 = function(nums) {
  if (nums.length < 2) return nums
  let prev;
  let next;
  let count = 0;
  let count1 = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === prev) {
      count += 1;
      continue;
    }
    if (nums[i] === next) {
      count1 += 1;
      continue;
    } 
    // 重置count 金 银 一金一银
    if (count === 0) {
      prev = nums[i];
      count += 1;
      continue;
    }
    // 重置count1
    if (count1 === 0) {
      next = nums[i];
      count1 += 1;
      continue;
    }
    
    count -= 1;
    count1 -= 1;
  }
  // 这里找到的两个数肯定是可能满足条件的前两个数 因为只可能出现两个 不可能有第三个数大于n / 3
  count = count1 = 0;
  // 用第二次for循环找到满足的条件
  let rlt = [];
  console.log(prev, next)
  let len = parseInt(nums.length / 3)
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === prev) count += 1;
    else if (nums[i] === next) count1 += 1;
  }
  if (count > len) rlt.push(prev)
  if (count1 > len) rlt.push(next)
  return rlt;
};
console.log(majorityElement2([1,2]))