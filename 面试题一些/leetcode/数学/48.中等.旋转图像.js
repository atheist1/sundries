/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2019-11-27 08:44:27
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-14 18:03:28
 */
/**
 * 给定一个 n × n 的二维矩阵表示一个图像。
 * 将图像顺时针旋转 90 度。
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/**
 * 
 * 思路 首先将数组沿中心轴交换位置 如果数组长度为奇数，则中心轴为arr.length - 1 / 2否则中心轴为arr.length / 2
 * 然后将交换后的数组沿对角线做轴交换位置
 * 示例 1:

给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
示例 2:

给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
 */
var rotate = function(matrix) {
  if (matrix.length === 0) {
    return;
  }
  let len = matrix.length;
  // 1. 沿中心轴交换位置
  let axis = Math.floor(len / 2);
  for (let i = 0; i < len; i += 1) {
    if (i < axis) { // 不是轴交换位置
      [matrix[i], matrix[len - i - 1]] = [matrix[len - i - 1], matrix[i]];
    }
  }
  // 2. 沿对角线交换位置
  for (let j = 0; j < len; j += 1) {
    for (let k = 0; k < matrix[j].length; k += 1) {
      if (j < k) {
        [matrix[j][k], matrix[k][j]] = [matrix[k][j], matrix[j][k]];
      }
    }
  }
};
var rotate = function(matrix) {
  let len = matrix.length;
  let line;
  line = parseInt(len / 2);
  for (let i = 0; i <= line; i += 1) {
    if (i != line) {
      [matrix[i], matrix[len - i - 1]] = [matrix[len  - i - 1], matrix[i]];
    }
  }
  for (let i = 0; i < len; i += 1) {
    for (let j = i + 1; j < len; j += 1) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  return matrix;
};
rotate([
  [1,2,3],
  [4,5,6],
  [7,8,9]
],)