/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-08-04 09:40:20
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-04 10:06:06
 */
/**
 * 剑指 Offer 38. 字符串的排列
  输入一个字符串，打印出该字符串中字符的所有排列。

  

  你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

  

  示例:

  输入：s = "abc"
  输出：["abc","acb","bac","bca","cab","cba"]
  

  限制：

  1 <= s 的长度 <= 8
 */
// 这是一道全排列的变式题 最容易想到的办法是暴力解法再去重 但是这样时间复杂度比较高
var permutation = function (s) {
  
  let timeStart = new Date().getTime()
  let rlt = [];
  let arr = s.split('');
  let dfs = function (k, str) {
    if (k <= 0) {
      if (rlt.indexOf(str) < 0) {
        rlt.push(str)
      }
      return;
    };
    for (let i = 0; i < arr.length; i += 1) {
      let temp = s[i];
      if (arr[i] != -1) {
        arr[i] = -1;
        dfs(k - 1, str + temp)
        arr[i] = temp;
      }
    }
  }
  dfs(s.length, '')
  console.log(new Date().getTime() - timeStart);
  return rlt
};
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  let timeStart = new Date().getTime()
  let rlt = [];
  let arr = s.split('');
  let dfs = function (k, str) {
    let map = new Map();
    if (k <= 0) {
      rlt.push(str)
      return;
    };
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] != -1) { // 剪枝 已经访问过的不在访问
        let temp = s[i]; // 剪枝2 重复的元素不在访问
        if (map.has(temp)) continue;
        map.set(temp, 1) // 只有第一次访问才会进行
        arr[i] = -1; // 回溯 将已经访问过的节点置为-1 下次不在访问
        dfs(k - 1, str + temp)
        arr[i] = temp;
      }
    }
  }
  dfs(s.length, '')
  console.log(new Date().getTime() - timeStart);
  return rlt
};
/**
 * 我们想第二个办法 dfs 加 剪枝 即回溯法
 * 每一次要做的事情就是固定一位 变化 剩下的位数 一个for循环用于固定不同的位数 比如 固定数组第一位为字符第一个 递归 然后交换字符第一二位的位置 固定数组第一个位字符第二个
 * 递归出口是当x即总固定位数等于字符串长度-1时，即只剩最后一位没有固定
 * 然后是剪枝部分 在每次函数中记录一个set set的作用是记录当前固定位数时 交换有无重复 重复则不继续递归
 */
/**
 * @param {string} s
 * @return {string[]}
 */
// var permutation = function(s) {
//   let rlt = [];
//   let strArr = s.split('')
//   let dfs = function (x) {
//     let map = new Map()
//     if (x === s.length - 1) {
//       rlt.push(strArr.join(''))
//       return;
//     }
//     // x为当前固定的第几位
//     for (let i = x; i < strArr.length; i += 1) {
//       if (map.has(strArr[i])) continue;
//       map.set(strArr[i], 1);
//       // 交换固定的位置
//       [strArr[i], strArr[x]]  = [strArr[x], strArr[i]];
//       dfs(x + 1);
//       // 回溯 还原位置
//       [strArr[x], strArr[i]]  = [strArr[i], strArr[x]];
//     }
//   }
//   dfs(0)
//   return rlt
// };
permutation('abccbaabc')