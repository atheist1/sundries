/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-08-05 16:14:39
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-10 17:39:54
 */
/***
 * 还记得童话《卖火柴的小女孩》吗？现在，你知道小女孩有多少根火柴，请找出一种能使用所有火柴拼成一个正方形的方法。不能折断火柴，可以把火柴连接起来，并且每根火柴都要用到。

  输入为小女孩拥有火柴的数目，每根火柴用其长度表示。输出即为是否能用所有的火柴拼成正方形。

  示例 1:

  输入: [1,1,2,2,2]
  输出: true

  解释: 能拼成一个边长为2的正方形，每边两根火柴。
  示例 2:

  输入: [3,3,3,3,4]
  输出: false

  解释: 不能用所有火柴拼成一个正方形

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/matchsticks-to-square
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var makesquare = function (nums) {
  let sum = 0;
  let count = 0;
  let borderWidth = 0;
  for (let i = 0; i < nums.length; i += 1) {
    sum += nums[i];
  }
  // 拿到每边长
  borderWidth = sum / 4;
  // let dfs = function (arr, num, prev) {
  //   let rlt;
  //   if (num < 0) return false;
  //   if (num === 0) {
  //     count += 1;
  //     return true;
  //   };
  //   for (let i = prev + 1; i < arr.length; i += 1) {
  //     if (arr[i] === 0) continue;
  //     if (arr[i] > sum) return false;
  //     let temp = arr[i];
  //     arr[i] = 0
  //     rlt = dfs(arr, num - temp, i);
  //     if (rlt) {
  //       arr[i] = 0;
  //       return true
  //     } else {
  //       arr[i] = temp;
  //     }
  //   }
  // }
  // for (let i = 0; i < nums.length; i += 1) {
  //   dfs(nums, sum - nums[i], i);
  // }
  // return count === 4;






  nums = nums.sort((a, b) => b - a);
  let left = 0;
  let right = 1;
  let len = nums.length;
  sum = 0;
  while (left < len && right < len) {
    if (right === len) {
      sum = 0;
      left += 1;
      right = left + 1;
    }
    if (nums[left] === borderWidth) {
      left = right;
      right = left + 1;
      count += 1;
      sum = 0;
    } else if (nums[right] === borderWidth) {
      right += 1;
      count += 1;
      sum = 0;
    } else {
      sum += nums[left] + nums[right];
      if (sum === borderWidth) {
        left += 1;
        right = left + 1;
        count += 1;
        sum = 0;
      } else if (sum < borderWidth) {
        right += 1;
        sum -= nums[left];
      } else {
        sum -= nums[left];
        sum -= nums[right];
        right += 1;
      }
    }


  }
  console.log(count)
};
var makesquare = function (nums) {
  let sum = 0;
  let count = 0;
  let borderWidth = 0;
  let len = nums.length;
  for (let i = 0; i < len; i += 1) {
    sum += nums[i];
  }
  // 拿到每边长
  borderWidth = sum / 4;
  nums = nums.sort((a, b) => a - b);
  let dfs = function (num, prev) {
    let rlt;
    if (num < 0) return false;
    if (num === 0) {
      return true;
    };
    for (let i = prev - 1; i >= 0; i -= 1) {
      if (nums[i] === 0) continue;
      if (nums[i] > sum) return false;
      let temp = nums[i];
      nums[i] = 0
      rlt = dfs(num - temp, i);
      if (rlt) {
        if (prev === len) {
          count += 1;
        } else {
          return true;
        }
      } else {
        nums[i] = temp;
      }
    }
  }
  dfs(borderWidth, len)
  return count === 4;
};
console.log(makesquare( [1,1,2,2,2,2,2,4]
))