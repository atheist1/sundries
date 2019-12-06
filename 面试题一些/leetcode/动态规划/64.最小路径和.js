/**
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

  说明：每次只能向下或者向右移动一步。
 */
// 典型dp问题
// 每一条路的最小数字是从上面下来的总和与从左边过来总和的最小值
// dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]);
// 边界 2 * 2的格子
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let m = grid.length;
  let n = grid[0].length;
  if (m === 0 || n === 0) {
    return 0;
  }
  for (let i = 1; i < m; i += 1) {
    grid[i][0] = grid[i - 1][0] + grid[i][0];
  }
  for (let i = 1; i < n; i += 1) {
    grid[0][i] = grid[0][i - 1] + grid[0][i];
  }
  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      grid[i][j] = Math.min.apply(null, [grid[i - 1][j], grid[i][j - 1]]) + grid[i][j]
    }
  }
  return grid[m - 1][n - 1];
};