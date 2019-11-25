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