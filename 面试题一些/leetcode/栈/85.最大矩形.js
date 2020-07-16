/**
 * 
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 * 输入:
    [
      ["1","0","1","0","0"],
      ["1","0","1","1","1"],
      ["1","1","1","1","1"],
      ["1","0","0","1","0"]
    ]
    输出: 6

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/maximal-rectangle
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var input = [
  ['1', '0', '1', '0', '0', '1'],
  ['1', '1', '1', '1', '1', '1'],
  ['1', '1', '1', '1', '1', '1'],
  ['1', '0', '1', '1', '1', '1']
];
var maximalRectangle = function(matrix) {
  var arr = [];
  // 1. 找到每一行每一列的1的开始位置与1结束位置
  // 获取转换矩阵
  for (let i = 0; i < matrix.length; i += 1) {
    arr[i] = [];
    let start;
    let end = matrix[i].length - 1;
    let width = 0;
    for (let j = 0; j < matrix[i].length + 1; j += 1) {
      if (matrix[i][j] == 1) {
        if (start === undefined) {
          start = j;
        }
      } else {
        if (matrix[i][j] == 0) {
          end = j - 1;
        } else { // 列超出了
          end = matrix[i].length - 1;
        }
        width = end - start;
        if (width > 0) {
          arr[i].push([start, end]);
        }
        start = undefined;
      }
    }
  }
  var getRectangle = function(arr, n) {
    if (arr.length <= 1) {
      console.log(n, arr);
      return;
    }
    let first = arr.pop();
    let second = arr.pop();
    // 2. 递归合并两个
    let temp = [];
    let width = 1;
    let maxWidth = 1;
    for (let i = 0; i < first.length; i += 1) {
      for (let j = 0; j < second.length; j += 1) {
        let start = Math.max(first[i][0], second[j][0]);
        let end = Math.min(first[i][1], second[j][1]);
        width = end - start;
        if (width > maxWidth) {
          maxWidth = width;
          temp.push([start, end]);
        }
      }
    }
    if (temp.length > 0) {
      arr.push(temp);
      getRectangle(arr, n + 1, length);
    }
  };
  for (let i = 0; i < arr.length; i += 1) {
    let data = arr.slice(i);
    console.log([].concat(data))
    getRectangle([].concat(data), 0);
  }
};
/**
 * 暴力解法 时间复杂度row2col 空间复杂度row * col
 * 思路就是 从上往下，先给循环到的列求出宽度， 然后从当前列当前行往上找矩形
 * 矩形宽度是当前列所在的位置上面所有行的最小宽度
 * 矩形高度就是从第一行到当前行的距离
 * 查找每一个矩形，储存最大值
 * @param {*} matrix 
 */
var maximalRectangle = function(matrix) {
  let len = matrix.length;
  let width = new Array(len).fill('').map(() => []);
  let maxArea = 0;
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      // 每一行列的宽度是由连续的1的个数算出来的 动态规划，最大可能宽度
      if (matrix[row][col] == 1) {
        // 第一列
        if (col === 0) {
          width[row][col] = 1;
        } else {
          // 当前宽度就是有几个连续1
          width[row][col] = width[row][col - 1] + 1;
        }
      } else {
        width[row][col] = 0
      }
      // 向上延伸行 所有行的最小列数就是宽度
      let minWidth = width[row][col];
      for (let temp = row; temp >= 0; temp -= 1) {
        // 找到最小的数作为宽
        minWidth = Math.min(minWidth, width[temp][col]);
        // 高度就是往上走了几行
        let height = row - temp + 1;
        let area = minWidth * height;
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }
  return maxArea;
};