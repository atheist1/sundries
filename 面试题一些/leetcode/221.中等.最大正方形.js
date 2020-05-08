/****
 * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
 *  1 0 1 0 0
    1 0 1 1 1
    1 1 1 1 1
    1 0 0 1 0
 */
// 边界 只有一个1返回1 只有一个0返回0 没有1返回0 没有0返回长乘宽
// 条件2 要是正方形
/**
 * 暴力解法 题目与85一样
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  let len = matrix.length;
  // width为一个二维数组 为当前行所在某列的最大连续1的个数既最大宽度
  let width = new Array(len).fill('').map(() => []);
  let maxArea = 0;
  // 循环行列 找到当前行当前列位置的最大宽度(既连续1个数)
  /*
   * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
   *  1 0 1 0 0
      1 0 1 1 1  
      1 1 1 1 1
      1 0 0 1 0
      
      1 0 1 0 0
      1 0 1 2 3
      1 2 3 4 5
      1 0 0 1 0
  */
  for (let row = 0; row < len; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] == 1) {
        if (col == 0) { // 第0列的宽度必为0或者1
          width[row][col] = 1;
        } else {
          width[row][col] = width[row][col - 1] + 1;
        }
      } else {
        width[row][col] = 0;
      }
      let minWidth = width[row][col];
      // 向上延展，找到所有行夹杂列的最小宽度作为宽度，向上延展的高度作为高度构建矩形
      for (let h = row; h >= 0; h -= 1) {
        // 找到当前行当前列的宽度，如果小于最小宽度则更新最小宽度，找到中间夹杂的最小宽度
        minWidth = Math.min(minWidth, width[h][col]);
        let height = (row - h + 1);
        if (height == minWidth) {
          maxArea = Math.max(height * minWidth, maxArea);
        }
        
      }
    }
  }
  return maxArea;
};
console.log(maximalSquare([]));