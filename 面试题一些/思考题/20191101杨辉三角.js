// 1. 求解杨辉三角
// n 为层数
function getTriangle(n) {
  var yanghui = [[1], [1, 1]];
  if (n < 3) {
    return yanghui;
  }
  for (let i = 0; i < n; i += 1) {
    yanghui[i] = [];
    for (let j = 0; j <= i; j += 1) {
      if (j === 0 || j === i) {
        yanghui[i].push(1);
      } else {
        let prev = yanghui[i - 1][j - 1] || 1;
        let prev1 = yanghui[i - 1][j] || 1;
        yanghui[i].push(prev + prev1);
      }
    }
  }
  for (let k = 0; k < yanghui.length; k += 1) {
    var out = ' '.repeat(n - k);
    for (let l = 0; l < yanghui[k].length; l += 1) {
      out += yanghui[k][l];
      out += ' ';
    }
    console.log(out);
  }
  console.log(yanghui);
}

// 2. 寻找第一个数 所在的行列号
function getTriangleNum(num) {
  var yanghui = [[1], [1, 1]];
  // 防止爆栈
  var maxSize = 0;
  let i;
  let j;
  if (num < 3) {
    return yanghui;
  }
  for (i = 0; ; i += 1) {
    var current = 1;
    yanghui[i] = [];
    if (maxSize > num) {
      return void 0;
    }
    maxSize += 1;
    for (j = 0; j <= i; j += 1) {
      if (j === 0 || j === i) {
        yanghui[i].push(1);
      } else {
        let prev = yanghui[i - 1][j - 1] || 1;
        let prev1 = yanghui[i - 1][j] || 1;
        current = prev + prev1;
        yanghui[i].push(prev + prev1);
      }
      if (current === num) {
        break;
      }
    }
    if (current === num) {
      break;
    }
  }
  return [i + 1, j + 1];
}

// 3. 寻找这个数所在你选中的行列号上，以及行列号的个数
/**
 * 
 * @param {*} row 构建的行数 
 * @param {*} col 构建的列数
 * @param {*} num 数字
 * @param {*} colIndex 数字所在行数
 * @param {*} rowIndex 数字所在列数
 * @param {*} direction 顺序 1.正序 2.左逆序
 */
var triangle = function ({
  row = 3, col = 3, num, rowIndex = 1, colIndex = 1, direction = 1,
}) {
  var _row = 0;
  var _col = 0;
  var _data = [[1],[1,1]];
  // 需要补充的行列数
  var countRow = row - rowIndex < 0 ? 0 : row - rowIndex;
  var countCol = col - colIndex < 0 ? 0 : col - colIndex;
  if (direction === 3 || direction === 4) {
    countRow = col - colIndex < 0 ? 0 : col - colIndex;
    countCol = row - rowIndex < 0 ? 0 : row - rowIndex;
  }
  // 下标转换
  rowIndex -= 1;
  colIndex -= 1;
  row -= 1;
  col -= 1;
  // 当前的数字
  var current;
  // 当前数字所在位置
  var findRow;
  var findCol;
  // 一边构建杨辉三角一边查找数字位置
  for (_row; ;_row += 1) {
    _data[_row] = [];
    // 0行1个 1行2个 _col行_row个
    for (_col = 0; _col <= _row; _col += 1) {
      if (_col === 0 || _col === _row) {
        _data[_row][_col] = 1;
      } else {
        var prev = _data[_row - 1][_col - 1];
        var prev1 =  _data[_row - 1][_col];
        _data[_row][_col] = prev + prev1;
      }
      if (findRow === undefined) {
        current = _data[_row][_col];
      }
      if (num === current) {
        if (findRow === undefined) {
          findRow = _row;
          findCol = _col;
        }
        // 如果当前行小于构建矩阵的最后一行则继续往下一行构建杨辉三角
        if (countRow >= 0) {
          continue;
        } else if (countCol + findCol > 0) { // 需要补齐多少列，从哪一列开始补齐
          countCol -- ;
          continue;
        }
        break;
      }
    }
    if (num === current) {
      if (countRow > 0) {
        countRow --;
        continue;
      }
      break;
    }
  }
  // 根据构建的三角找到索引处的值
  var resultArr = [];
  var _i = 0;
  var _j = 0;
  if (direction === 1) { // 正序
    for (var i = findRow - rowIndex; i <= findRow + (row - rowIndex) ; i += 1) {
      resultArr[_i] = [];
      _j = 0;
      for (var j = findCol - colIndex; j <= findCol + (col- colIndex); j += 1) {
        if (_data[i] === undefined) {
          resultArr[_i][_j] = '*';
        } else {
          resultArr[_i][_j] = _data[i][j] || '*';
        }
        _j ++;
      }
      _i ++;
    }
  } else if (direction === 2) { // 倒序
    // 行顺序是上下颠倒
    for (var i = findRow + rowIndex; i >= findRow - (row - rowIndex); i -= 1) {
      resultArr[_i] = [];
      _j = 0;
      for (var j = findCol + colIndex ; j >=  findCol - (col- colIndex); j -= 1) {
        if (_data[i] === undefined) {
          resultArr[_i][_j] = '*';
        } else {
          resultArr[_i][_j] = _data[i][j] || '*';
        }
        _j ++;
      }
      _i ++;
    }
  } else if (direction === 3) {
    // 行列转置
    var arr = new Array(row + 1).fill('').map(() => []);
    for (var i = findRow - colIndex; i <= findRow + (col - colIndex) ; i += 1) {
      resultArr[_i] = [];
      _j = 0;
      for (var j = findCol - (row - rowIndex); j <= findCol + rowIndex ; j += 1) {
        if (_data[i] === undefined) {
          resultArr[_i][_j] = '*';
        } else {
          resultArr[_i][_j] = _data[i][j] || '*';
        }
        _j ++;
      }
      _i ++;
    }
    for (var k = 0; k < resultArr.length; k += 1) {
      for (var l = 0; l < resultArr[k].length; l += 1) {
        arr[l][k] = resultArr[k][resultArr[k].length - 1 - l];
      }
    }
    resultArr = arr;
  } else if (direction === 4) {
    var arr = new Array(row + 1).fill('').map(() => []);
    // 行顺序是上下颠倒
    for (var i = findRow + colIndex; i >= findRow - (col - colIndex); i -= 1) {
      resultArr[_i] = [];
      _j = 0;
      for (var j = findCol - rowIndex ; j <=  findCol + (row - rowIndex); j += 1) {
        if (_data[i] === undefined) {
          resultArr[_i][_j] = '*';
        } else {
          resultArr[_i][_j] = _data[i][j] || '*';
        }
        _j ++;
      }
      _i ++;
    }
    for (var k = 0; k < resultArr.length; k += 1) {
      for (var l = 0; l < resultArr[k].length; l += 1) {
        arr[l][k] = resultArr[k][l];
      }
    }
    resultArr = arr;
  }
  
  return resultArr;
}
