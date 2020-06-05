/*****
 * 
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

 

示例 1：

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：

输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 * while循环 出口是找到length长度的数组
 * 记录之前的方向
 * 之前方向为左则col ++
 * 之前方向为下则row ++
 * 之前方向为右则col --
 * 之前方向为上则row --
 * 如果找到了undefined 则转向
 */
var spiralOrder = function (matrix) {
  let rlt = [];
  if(matrix.length == 0) return rlt;
  let prevDirection = 6;
  let len = matrix.length * matrix[0].length;
  let row = 0;
  let col = 0;
  while (rlt.length < len) {
    switch (prevDirection) {
      case 6:
        if (matrix[row] && matrix[row][col] != undefined) {
          rlt.push(matrix[row][col])
          matrix[row][col] = undefined;
          col += 1;
        } else {
          prevDirection = 2;
          col -= 1;
          row += 1;
        }
        break;
      case 2:
        if (matrix[row] && matrix[row][col] != undefined) {
          rlt.push(matrix[row][col])
          matrix[row][col] = undefined;
          row += 1;
        } else {
          prevDirection = 4;
          row -= 1;
          col -= 1;
        }
        break;
      case 4:
        if (matrix[row] && matrix[row][col] != undefined) {
          rlt.push(matrix[row][col])
          matrix[row][col] = undefined;
          col -= 1;
        } else {
          prevDirection = 8;
          col += 1;
          row -= 1;
        }
        break;
      case 8:
        if (matrix[row] && matrix[row][col] != undefined) {
          rlt.push(matrix[row][col])
          matrix[row][col] = undefined;
          row -= 1;
        } else {
          prevDirection = 6;
          row += 1;
          col += 1;
        }
        break;
    }

  }
  return rlt;
};
console.log(spiralOrder([]))