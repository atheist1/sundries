/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
  输入:
  [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ]
  输出: 2
  解释:
  3x3 网格的正中间有一个障碍物。
  从左上角到右下角一共有 2 条不同的路径：
  1. 向右 -> 向右 -> 向下 -> 向下
  2. 向下 -> 向下 -> 向右 -> 向右
 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
// 递归 超时
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length - 1;
  let n = obstacleGrid[0].length - 1;
  /**
   * 
   * @param {number[]} arr 
   * @param {*} i 
   * @param {*} j 
   */
  let getuniquePathsWithObstacles = function (arr, i, j) {
    // 开始结束为1直接退出
    if (arr[i][j] === 1 || arr[0][0] === 1) {
      return 0;
    }
    // 边界
    if (i === 1 && j === 1) { // 四格
      return (arr[1][1] === 1 || arr[1][0] + arr[0][1] === 2 ? 0 : (arr[1][0] === 1 || arr[0][1] === 1) ? 1 : 2)
    } else if (i < 1 || j < 1) { // 只剩一行或者一列
      if (i < 1) {
         // 一行
        return arr[i].indexOf(1) !== -1 ? 0 : 1;
      } else {
        // 一列
        for (let l = 0; l < i; l += 1) {
          if (arr[l][0] === 1) {
            return 0;
          }
        }
        return 1;
      }
     
    } else { // 继续dp
      return getuniquePathsWithObstacles(arr, i - 1, j ) + getuniquePathsWithObstacles(arr, i, j - 1)
    }

    
  }
  return getuniquePathsWithObstacles(obstacleGrid, m, n);
  // 到达m,n处的路径的数量是由到达m-1,n的次数加上到达m,n+1次数的总数
};
var uniquePathsWithObstacles = function(obstacleGrid) {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let dp = new Array(m).fill(0).map(item => new Array(n).fill(0));
  if (obstacleGrid[m - 1][n - 1] === 1 || obstacleGrid[0][0] === 1) {
    return 0;
  }
  dp[0][0] = 1;
  // 初始化行数据
  for (let i = 1; i < m; i += 1) {
    // 当前行数据为0且上一行的状态是1
    // 当前行数据为1代表没有任何方法到达则置为可到达数为0
    // 当前行的前一行为0代表当前行也无法到达
    dp[i][0] = (obstacleGrid[i][0] === 0 && dp[i - 1][0] === 1) ? 1 : 0;
  }
  // 初始化列数据
  for (let j = 1; j < n; j += 1) {
    dp[0][j] = (obstacleGrid[0][j] === 0 && dp[0][j - 1] === 1) ? 1 : 0;
  }
  // 状态转移方程
  // 到达m,n处的路径的数量是由到达m-1,n的次数加上到达m,n+1次数的总数
  let left;
  let top;
  for (let i = 1; i < obstacleGrid.length; i += 1) {
    for (let j = 1; j < obstacleGrid[i].length; j += 1) {
      if (obstacleGrid[i][j] === 0) {
        left = dp[i][j - 1];
        top = dp[i - 1][j];
        dp[i][j] = left + top;
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return (dp[m - 1][n - 1]);
};