/**
 * 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
 * 输入:nums = [1,1,1], k = 2
   输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
*/
// 解法1 暴力法
// 1. 按照数组循环两层循环
// 2. 当值大于等于k时第一层循环计数1(不需要跳出，跳出会少算，不跳出是以i为起点时加多少个j满足条件，如果存在0和负数的话往后加sum[j]是可以在回来的，如果是正数的话这里跳出可以减少计算量)
// 3. 时间复杂度O(n2) 空间复杂度O1
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; ++i) {
    let sum = 0;
    for (let j = i; j < nums.length; j += 1) {
      sum += nums[j];
      if (sum == k) {
        count ++;
      }
    }
    
  }
  return count; 
};
// 解法2 减少时间复杂度，用一个数组储存循环到i时前i项的和
// 时间复杂度O(n) 空间复杂度O(n)
// 单次循环数组 当前的前i项和为上一项前i项和加上当前项 [1,1,2,4,5] [1,2,4,8,13]
var subarraySum = function(nums, k) {
  let count = 0;
  let sumAry = [nums[0]];
  let map = new Map();
  map.set(0, 1)
  for (let i = 1; i < nums.length; ++i) {
    sumAry[i] = sumAry[i - 1] + nums[i];
  }
  // 求出前缀和后 该题目变成了求i j 满足sumAry[i] - sumAry[j - 1] = k的个数
  // 怎么样减少时间复杂度为O(n),即不用双重循环
  // 用空间换时间
  for (let i = 0; i < nums.length; i += 1) {
   
    // 用map去查找有没有当前位置前i项和 - k的值，有则count加该数值
    let rlt = sumAry[i] - k;
    if (map.has(rlt)) {
      count += map.get(rlt);
    }
    if(!map.has(sumAry[i])) { // 如果从0开始到i结束的前i项和作为key不存在的话存入map
      map.set(sumAry[i], 1);
    } else { // 否则将以当前前i项和相同的数更新
      map.set(sumAry[i], map.get(sumAry[i]) + 1);
    }
  }
  return count; 
};

console.log(subarraySum([28,54,7,-70,22,65,-6,0], 100))
console.log(subarraySum([0,0,0,0,0,0,0,0,0,0], 0))