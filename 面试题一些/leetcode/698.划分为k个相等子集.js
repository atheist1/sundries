/**
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
  let sum = 0;
  let groupNum = 0;
  let result = true;
  nums.forEach(item => sum += item);
  nums.sort((a, b) => b - a );
  let search = function (nums, sub, exist) {
    if (sub === 0 && exist === nums.length) {
      // 一次查找完成
      return true;
    }
    if (sub === 0) { // 一次查找没完成但是sub变成0了
      return search(nums, groupNum, exist);
    }
    let flag = false;
    for (let i = 0; i < nums.length; i += 1) {
      if (nums[i] == '.') continue // 剪枝；已遍历
      if (nums[i] > sub) continue; // 剪枝；当前元素 > 需要的
       if (nums[i] == nums[i - 1]) continue; //  剪枝；相同元素
      let val = nums[i];
      nums[i] = '.';
      flag = flag || search(nums, sub  - val, exist + 1);
      nums[i] = val;
    }
    return flag;
  }
  if (sum % k !== 0) {
    return false;
  } else {
    groupNum = sum / k;
    return search(nums, groupNum, 0);
  }
};