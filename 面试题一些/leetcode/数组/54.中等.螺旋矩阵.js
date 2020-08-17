/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2019-11-27 08:44:27
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-17 13:54:32
 */
/**
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

  示例 1:

  输入:
  [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
  ]
  输出: [1,2,3,6,9,8,7,4,5]
  示例 2:

  输入:
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9,10,11,12]
  ]
  输出: [1,2,3,4,8,12,11,10,9,5,6,7]


   [
    [ 1, 2, 3, 4, 5, 6, 7],
    [ 8, 9,10,11,12,13,14],
    [15,16,17,18,19,20,21]
  ]
  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/spiral-matrix
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {*} matrix 
 */
var spiralOrder = function (matrix) {
  let len = 0;
  if (matrix.length === 0) {
    return [];
  }
  matrix.forEach(item => len += item.length)
  const result = [matrix[0][0]];
  matrix[0][0] = 'flag';
  // 2486下左上右
  let direction = 6;
  let row = 0;
  let col = 0;
  // 顺时针
  while (len > result.length) {
    switch (direction) {
      // 向右
      case 6:
        col++;
        if (matrix[row][col] !== undefined && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          col--;
          direction = 2;
        }
        break;
      case 2:
        row++;
        if (matrix[row] && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else {
          row--;
          direction = 4;
        }
        break;
      case 4:
        col--;
        if (matrix[row][col] !== undefined && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          col++;
          direction = 8;
        }
        break;
      case 8:
        row--;
        if (matrix[row] && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          row++;
          direction = 6;
        }
        break;
    }
  }
  return result;
};
var spiralOrder = function (matrix) {
  let rlt = [];
  let row = matrix.length;
  let col = matrix[0].length;
  let dfs = function (i, j, prev) {
    
    if (!matrix[i]) return;
    if (matrix[i][j] != 'flag') {
      rlt.push(matrix[i][j])
    }
    matrix[i][j] = 'flag';
    if (rlt.length >= row * col) return
    switch (prev) {
      case 6:
        j += 1;
        if (j < col && matrix[i][j] != 'flag') {
          dfs(i, j, 6);
        } else {
          dfs(i, j - 1, 2);
        }
        break;
      case 2:
        i += 1
        if (i < row && matrix[i][j] != 'flag') {
          dfs(i, j, 2);
        } else {
          dfs(i - 1, j, 4)
        }
        break;
      case 4:
        j -= 1;
        if (j >= 0 && matrix[i][j] != 'flag') {
          dfs(i, j, 4);
        } else {
          dfs(i, j + 1, 8)
        }
        break;
      case 8:
        i -= 1;
        if (i >= 0 && matrix[i][j] != 'flag') {
          dfs(i, j, 8);
        } else {
          dfs(i + 1, j, 6)
        }
        break;
    }
  }
  dfs(0, 0, 6)
  return rlt;
};
console.log(spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]));