/**
 * 给定一个二维数组作为神经系统，其中0代表通路,1代表不通，请问从数组arr[0][0]开始 能够连接的所有节点为多长
 */
// var data = [[1, 1, 1, 1],
//             [1, 0, 1, 1],
//             [0, 1, 0, 0],
//             [1, 1, 1, 0]];
var data = [[1,1],
            [1,0]];
var ans = function (matrix) {
  let tag = matrix[0][0];
  let col = matrix.length;
  let row = matrix[0].length;
  let dfs = function (i, j) {
    let countCurrent = 0;
    let countDown = 0;
    let countRight = 0;
    let countTop = 0;
    let countLeft = 0;
    // 越界跳出
    if (i >= col || j >= row || i < 0 || j < 0) return 0;

    if (matrix[i] && matrix[i][j] == tag) { // 如果当前节点为第一个值则当前的计数为1
      countCurrent = 1;
      // 将已经访问过的点取消 防止重复访问
      matrix[i][j] = tag === 0 ? 1 : 0;
    } else {
      // 如果不相等则返回0，并且不计算下边的与右边的
      return 0;
    }
    // 往上找
    countTop += dfs(i - 1, j)
    // 往下找
    countDown += dfs(i + 1, j);
    // 往左找
    countLeft += dfs(i, j - 1)
    // 往右找
    countRight += dfs(i, j + 1);
    // 返回当前的 右边的和下边的总共多少
    return countCurrent + countTop + countDown + countLeft + countRight;
  }
  return dfs(0,0)
}
// ans2找到与相邻节点不同的点的最大连接点
var ans2 = function (matrix) {
  let tag = matrix[0][0];
  let col = matrix.length;
  let row = matrix[0].length;
  let count = 0;
  let dfs = function (i, j, prev) {
    // 越界跳出
    if (i >= col || j >= row || i < 0 || j < 0 || prev == -1) return;
    
    let current = matrix[i][j]
    if (matrix[i] && matrix[i][j] != -1 && matrix[i][j] ^ prev == 1) { // 如果当前节点为第一个值则当前的计数为1
      // 将已经访问过的点取消 防止重复访问
      matrix[i][j] = -1;
      count += 1;
    } else {
      return;
    }
    // 往上找
    dfs(i - 1, j, current)
    // 往下找
    dfs(i + 1, j, current);
    // 往左找
    dfs(i, j - 1, current)
    // 往右找
    dfs(i, j + 1, current);
    return;
  }
  dfs(1,1, 1)
  console.log(count)
  return
}
console.log(ans2(data))