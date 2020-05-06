/**
 * 在给定的网格中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1。
输入：[[2,1,1],[1,1,0],[0,1,1]]
输出：4
示例 2：

输入：[[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
示例 3：

输入：[[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let rowlen = grid.length;
  let collen = grid[0].length;
  let badArr = [];
  let minute = 0;
  // 好橘子的个数
  let count = 0;
  let current;
  // 坏橘子位置
  for (let row = 0; row < rowlen; row += 1) {
    for (let col = 0; col < collen; col += 1) {
      if (grid[row][col] == 2) { // 怀橘子
        badArr.push({
          row,
          col,
        })
      } else if (grid[row][col] == 1) {
        count += 1;
      }
    }
  }
  /** 如果只有一个怀橘子的话，直接用bfs即可，每一分钟都是下一个坏橘子来感染，但是可能出现多个坏橘子的情况，所以这种方式所算出的时间可能比同步的慢 */
  // while((badArr.length != 0) && (current = badArr.pop())) {
  //   let { row, col} = current;
  //   let next;
  //   let effect = false;
  //   // 向下感染
  //   if (row < rowlen - 1) {
  //     next = grid[row + 1][col];
  //     if (next == 1) {
  //       grid[row + 1][col] = 2;
  //       badArr.push({
  //         row: row + 1,
  //         col
  //       });
  //       effect = true;
  //       count -= 1;
  //     }  
  //   }
  //   // 向上感染
  //   if (row > 0) {
  //     next = grid[row - 1][col];
  //     if (next == 1) {
  //       grid[row - 1][col] = 2;
  //       badArr.push({
  //         row: row - 1,
  //         col
  //       });
  //       effect = true;
  //       count -= 1;
  //     }
  //   }
  //   // 向左感染
  //   if (col > 0) {
  //     next = grid[row][col - 1];
  //     if (next == 1) {
  //       grid[row][col - 1] = 2;
  //       badArr.push({
  //         row,
  //         col: col - 1
  //       })
  //       effect = true;
  //       count -= 1;
  //     }
  //   }
  //   // 向右感染
  //   if (col < collen - 1) {
  //     next = grid[row][col + 1];
  //     if (next == 1) {
  //       grid[row][col + 1] = 2;
  //       badArr.push({
  //         row,
  //         col: col + 1
  //       })
  //       effect = true;
  //       count -= 1;
  //     }
  //   }
  //   effect && (minute += 1);
  // }
  /** 考虑到多个坏橘子的情况，在while内部在做一次循环，循环的是当前坏橘子数组中的橘子，这些橘子感染都只在一次时间计算之内 */
  while (badArr.length != 0) {
    let next;
    let len = badArr.length;
    let effect = false;
    for (let i = 0; i < len; i += 1) {
      let { row, col } = badArr[i];
      // 向下感染
      if (row < rowlen - 1) {
        next = grid[row + 1][col];
        if (next == 1) {
          grid[row + 1][col] = 2;
          badArr.push({
            row: row + 1,
            col,
          });
          effect = true;
          count -= 1;
        }
      }
      // 向上感染
      if (row > 0) {
        next = grid[row - 1][col];
        if (next == 1) {
          grid[row - 1][col] = 2;
          badArr.push({
            row: row - 1,
            col,
          });
          effect = true;
          count -= 1;
        }
      }
      // 向左感染
      if (col > 0) {
        next = grid[row][col - 1];
        if (next == 1) {
          grid[row][col - 1] = 2;
          badArr.push({
            row,
            col: col - 1,
          });
          effect = true;
          count -= 1;
        }
      }
      // 向右感染
      if (col < collen - 1) {
        next = grid[row][col + 1];
        if (next == 1) {
          grid[row][col + 1] = 2;
          badArr.push({
            row,
            col: col + 1,
          });
          effect = true;
          count -= 1;
        }
      }
    }
    for (let j = 0; j < len; j += 1) {
      badArr.shift();
    }
    effect && (minute += 1);
  }
  if (count > 0) {
    minute = -1;
  }
  console.log(minute)
  return minute;
}
orangesRotting([[0]]);