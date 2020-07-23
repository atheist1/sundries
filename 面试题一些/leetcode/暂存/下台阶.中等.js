/****
 * 一个二维矩阵 其中有1和0作为判断 为1的数据是可以走通的路 一次可以走x位作为台阶 同理下台阶也只能走x位如
 * 0 1 1 0 0
 * 0 0 1 1 0
 * 0 0 0 1 1 这就是一个一阶台阶
 */
var stairs = function (matrix) {
  let len = matrix.length;
  var dfs = function (origin, x, y, size, direction) {
    // 跳出条件 x || y > len
    if (x >= len || y >= len) return 0;
    if (direction === 'down') { // 向下走size次
      for (let i = 0; i < size; i += 1) {
        x += 1;
        // 如果发现不满足条件
        if (!matrix[x] || matrix[x][y] !== 1) {
          return 0;
        }
      }
      return dfs(origin,x, y, size, 'right') + 1;
    } else if (direction === 'right') { // 向右走size次
      // 注意 只有以该位置开始向右走才是以此节点为起点
      origin[x][y] = 0
      for (let i = 0; i < size; i += 1) {
        y += 1;
        if (matrix[x][y] !== 1) {
          return -1;
        }
      }
      return dfs(origin, x, y, size, 'down');
    }
  }
  
  // 步长从1到size - 1结束
  for (let currentSize = 1; currentSize < len - 1; currentSize += 1) {
    let arr = []
    // 拷贝数组
    for (let i = 0; i < len; i += 1) {
      arr[i] = [];
      for (let j = 0; j < len; j += 1) {
        arr[i][j] = matrix[i][j]
      }
    }
    for (let i = 0; i < len; i += 1) {
      for (let j = 0; j < len; j += 1) {
        // 在每一次同样步长的情况下 如果起点位置为0则不进行查找 而在每一次查找的过程中会将已经被访问过的节点置为0 即同样步长下次不会再有以该节点为起点的台阶
        if (arr[i][j] == 1) {
          // 默认的方向是向右
          let step = dfs(arr, i, j, currentSize, 'right')
          if (step > 0) {
            console.log('开始位置i:' + i,'开始位置j:' +  j, '步长:' + currentSize, '总台阶数:' + step,);
          }
        }

      }
    }
  }
  console.log(matrix)
}
let test = [
  [0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];
test = [
  [1,1,0,1,1,1,1],
  [1,1,1,1,1,1,0],
  [1,1,1,0,0,1,1],
  [0,1,1,1,1,1,1],
  [1,0,0,0,1,0,1],
  [1,1,1,0,1,1,1],
  [1,1,0,0,1,1,0]
];
console.log(stairs(test))
/*******
 *
 * dfs函数 当前的x位置 y位置 剩余步长 上一次的方向 已走层数
 *
 * var dfs = f
 *
 *
 */