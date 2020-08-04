/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-08-03 15:29:14
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-04 17:23:30
 */
/***
 * 
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

 

示例:

现有矩阵 matrix 如下：

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。

给定 target = 20，返回 false。

 

限制：

0 <= n <= 1000

0 <= m <= 1000

 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 
 */
// 暴力解法和递归解法不做解释
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  let n = matrix.length;
  if (n === 0) return false;
  let m = matrix[0].length;
  let cutData = function (arr) {
    if (m <= 1 || n <= 1) return
    for (let i = 0; i < n; i += 1) {
      if (arr[i][0] > target) {
        arr.splice(i, 1);
        i -= 1;
        n -= 1;
      }
    }
    if (n === 0) return
    for (let j = 0; j < m; j += 1) {
      if (arr[0][j] > target) {
        for (let i = 0; i < n; i += 1) {
          arr[i].splice(j, 1);
        }
        j -= 1;
        m -= 1;
      }
    }
  }
  let dfs = function (i, j) {
    if (i >= n || j >= m) return false;
    let temp = matrix[i][j];
    if (temp === 'visited') return false
    matrix[i][j] = 'visited';
    let rlt = false;
    if (temp === target) {
      rlt = true;
    } else if (temp > target) {
      rlt = false
    } else if (temp < target) {
      rlt = dfs(i + 1, j) || dfs(i, j + 1)
    }
    matrix[i][j] = temp;
    return rlt;
  }
  cutData(matrix);
  return dfs(0, 0)
};
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * 换个思路 从右上角的节点往下看 不就是个二叉搜索树吗，满足左根右依次增大的顺序 所以我们自上往下搜索时间复杂降为logn级别
 */
var findNumberIn2DArray = function (matrix, target) {
  let binaryTree = function (i, j) {
    let rlt = false;
    if (j < 0 || i >= row) return false;
    // 根节点
    if (matrix[i][j] === target) {
      rlt = true;
    } else if (matrix[i][j] > target) { // target小 左子树查找
      rlt = binaryTree(i, j - 1);
    } else {
      rlt = binaryTree(i + 1, j)
    }
    return rlt;
  }
  let row = matrix.length;
  if (row === 0 ) return false;
  let col = matrix[0].length
  return binaryTree(0, col - 1)
};
var findNumberIn2DArray = function (matrix, target) {
  let row = matrix.length;
  if (row === 0 ) return false;
  let col = matrix[0].length;
  let i = 0;
  let j = col - 1;
  let rlt = false;
  while(i < row && j >= 0) {
    if (target === matrix[i][j]) {
      rlt = true;
      break;
    } else if (target > matrix[i][j]) {
      i += 1;
    } else {
      j -= 1
    }
  }
  return rlt;
};
console.log(findNumberIn2DArray(
  [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]
, 5))