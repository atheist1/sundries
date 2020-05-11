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
 * 暴力解法 题目与85一样 思想是循环行列找到当前位置的最小宽度，以此点为右下角找到能够构成的最大矩形面积，每往上一层就要更新下在当前行下能构成的宽度
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
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
        if (col == 0) {
          // 第0列的宽度必为0或者1
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
        let height = row - h + 1;
        if (height == minWidth) {
          maxArea = Math.max(height * minWidth, maxArea);
        }
      }
    }
  }
  return maxArea;
};
/**
 * 解法2 维持一个单调递增的栈，跟84题类似，只是以行为坐标轴去求最大矩形面积而已
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  let maxArea = 0;
  /*
   * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
   *  1 0 1 0 0
      1 0 1 1 1  
      1 1 1 1 1
      1 0 0 1 0
      
      1 0 1 0 0
      2 0 2 1 1
      3 1 3 2 2
      4 0 0 3 0
  */
  var calculateMaxArea = (height) => {
    let maxArea = 0;
    let stack = [];
    height.push(0); // 守卫条件
    for (let i = 0; i < height.length; i += 1) {
      let prev = stack[stack.length - 1];
      while (stack.length > 0 && height[i] <= height[prev]) {
        // 找到最高的
        let top = stack.pop();
        // 找到次高的
        prev = stack[stack.length - 1];
        // 高度
        let width = 0;
        width = stack.length === 0 ? i : i - prev - 1;
        // 宽比高长的时候，高度限制了矩形的大小，取高度的平方则为矩形大小
        if (width >= height[top]) {
          maxArea = Math.max(maxArea, height[top] * height[top]);
        }
      }
      stack.push(i);
    }
    return maxArea;
  };
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      if (matrix[row][col] == 1) {
        if (row == 0) {
          matrix[row][col] = 1;
        } else {
          matrix[row][col] = matrix[row - 1][col] + 1;
        }
      } else {
        matrix[row][col] = 0;
      }
    }
    // 第row行的高度计算完毕，开始计算最大面积
    maxArea = Math.max(maxArea, calculateMaxArea(matrix[row].slice()));
    console.log(matrix);
  }
  return maxArea;
};

/**
 * 解法3 动态规划
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  // 以当前位置为右下角，能够构成的最大的正方形的边
  // 转移方程 当前位置能构成最大的边是他左边上面左上方的值中最小的一个+1 即 dp[row][col] = min(dp[row - 1][col], dp[row][col -1], dp[row - 1][col - 1])
  // 最小解 行为0和列为0时边长为1
  let max = 0;
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {

      matrix[row][col] = parseInt(matrix[row][col]);
      if (matrix[row][col] == 1) {
        if (row != 0 && col != 0) {
          matrix[row][col] =
            Math.min(
              matrix[row - 1][col],
              matrix[row][col - 1],
              matrix[row - 1][col - 1]
            ) + 1;
        }
        max = Math.max(matrix[row][col], max);
      }
      
    }
  }
  return max * max;
};
console.log(
  maximalSquare([
    ['1', '0', '0', '1', '1', '0', '1', '1'],
    ['1', '0', '0', '0', '0', '1', '0', '0'],
    ['0', '1', '1', '1', '0', '0', '1', '1'],
    ['0', '0', '0', '1', '0', '0', '0', '1'],
    ['0', '0', '0', '0', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0', '1', '1', '0'],
    ['0', '1', '1', '0', '1', '1', '1', '0'],
  ])
);
