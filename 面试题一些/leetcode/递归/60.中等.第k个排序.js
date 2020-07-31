/**
 * 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。

说明：

给定 n 的范围是 [1, 9]。
给定 k 的范围是[1,  n!]。
示例 1:

输入: n = 3, k = 3
输出: "213"
示例 2:

输入: n = 4, k = 9
输出: "2314"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutation-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

// 递归解法 因为全排列排序后的数字可以找到规律 第一位进位的次数为(n-1)!次 比如123->213 进位需要2! = 2次 123 132 213 
// 因此 我们可以得出找到n阶乘中的第k个排序的数字 为(n-1)阶乘中的k - 已经排除的个数 然后递归
var getPermutation = function (n, k) {
  let arr = [];
  let getFactorial = function (n) { // 获取阶乘次数
    let prev = 1;
    let next = 1;
    if (n <= 0) return 0;
    for (let i = n; i >= 1; i -= 1) {
      prev = i;
      next *= prev;
    }

    return next;
  }
  let str = '';
  let dfs = function (n, k) {
    if (k === 0 || n === 1)  {
      str += arr[0];
      return;
    };
    // 找到进位一次需要的次数
    let factorial = getFactorial(n - 1);
    // 找到进位数
    let digitalIndex = Math.ceil(k / factorial) - 1
    // 从数组中剔除进位数
    str += arr.splice(digitalIndex, 1)
    
    dfs(n - 1, k - (digitalIndex) * factorial)
  }
  for (let i = 1; i <= n; i += 1) {
    arr.push(i);
  }
  dfs(n, k)
  return str;
};
// 1. 暴力解法
// var getPermutation = function(n, k) {
//   let count = 0;
//   let arr = [];
//   let dfs = function (n, str) {
//     if (str.length === n) {
//       arr.push(str);
//       count += 1;
//     };
//     for (let i = 1; i <= n; i += 1) {
//       if (str.indexOf(i) == - 1 && count < k)
//         dfs(n, str + i);
//     }
//     return str;
//   }
//   dfs(n, '')
//   return arr[k - 1];
// };



console.log(getPermutation(4, 4))
