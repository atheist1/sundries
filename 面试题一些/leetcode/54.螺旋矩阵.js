/**
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 输入:
    [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
    ]
    输出: [1,2,3,6,9,8,7,4,5]
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  const result = [];
  // 2486下左上右
  let direction = 6;
  let prevDirection = 8;
  let row = 0;
  let col = 0;
  // 顺时针
  while(1) {
    switch(direction) {
      case 6:
        row ++;
        if (matrix[row]) {
          
        } else { // 不存在

        }
        break;
    }
  }
};