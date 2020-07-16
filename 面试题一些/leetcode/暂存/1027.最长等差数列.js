/****
 * 给定一个整数数组 A，返回 A 中最长等差子序列的长度。

  回想一下，A 的子序列是列表 A[i_1], A[i_2], ..., A[i_k] 其中 0 <= i_1 < i_2 < ... < i_k <= A.length - 1。并且如果 B[i+1] - B[i]( 0 <= i < B.length - 1) 的值都相同，那么序列 B 是等差的。

  输入：[3,6,9,12]
  输出：4
  解释： 
  整个数组是公差为 3 的等差数列。

  输入：[9,4,7,2,10]
  输出：3
  解释：
  最长的等差子序列是 [4,7,10]。
 */
/**
 * @param {number[]} A
 * @return {number}
 */
// n3的解决方案 三次循环 前两次循环固定第一个和第二个位置 固定公差为两数之差 如果没有重复元素可以使用Set优化 但是可能存在重复元素
var longestArithSeqLength = function(A) {
  let res = 0;
  for (let i = 0; i < A.length - 2; i += 1) {
    for (let j = i + 1; j < A.length - 1; j += 1) {
      let count = 2;
      let cur = j;
      let minus = A[j] - A[i];
      for (let k = j + 1; k < A.length; k += 1) {
        if (A[k] - A[cur] === minus) {
          count += 1;
          cur = k;
        }
      }
      res = Math.max(res, count);
    }
  }
  return res;
};
// dp优化
var longestArithSeqLength = function(A) {
  // dp[i][j]代表以A[i] A[j]作为前两个元素为起始的等差数列的长度
  let dp = new Array(A.length).fill('').map(() => new Array(A.length).fill(2));
  let res = 0;
  let map = new Map();
  for (let i = 0; i < A.length; i += 1) {
    for (let j = i + 1; j < A.length; j += 1) {
      let minus = A[j] - A[i];
      // 上下两个方法都是一样的，不过是从头往后找即ijk的顺序和从后往头找kij的顺序
      for (let k = j + 1; k < A.length; k += 1) {
        if (A[k] - A[j] === minus) {
          dp[j][k] = dp[i][j] + 1
        }
      }
      res = Math.max(dp[i][j], res)
      // for (let k = i - 1; k >= 0; k -= 1) {
      //   if (A[i] - A[k] === minus) {
      //     dp[i][j] = dp[k][i] + 1;
      //     break;
      //   }
      // }
      // res = Math.max(dp[i][j], res)
    }
  }
  return res;
};
// 上述的优化其实还是n3的过程 而且内存开销反而变大了 我们需要优化n3的时间复杂度
var longestArithSeqLength = function(A) {
  // dp[i][j]代表以A[i] A[j]作为前两个元素为起始的等差数列的长度
  let dp = new Array(A.length).fill('').map(() => new Array(A.length).fill(2));
  let res = 0;
  let map = {};
  // for (let i = A.length - 1; i >= 0;  i-= 1) map[A[i]] = i;
  for (let i = 0; i < A.length - 1; i += 1) {
    for (let j = i + 1; j < A.length; j += 1) {
      // 下一个要找的数字
      let target = 2 * A[j] - A[i]
      console.log(target)
      if (map[target]) { // 找到最后一次出现的位置
        dp[j][map[target]] = dp[i][j] + 1
        res = Math.max(dp[j][map[target]], res)
      }
      map[A[i]] = i;
    }
  }
  return res;
};
console.log(longestArithSeqLength([1,3,1,3]))