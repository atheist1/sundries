var spiralOrder = function(matrix) {
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
  while(len > result.length) {
    switch(direction) {
      // 向右
      case 6:
        col ++;
        if (matrix[row][col] !== undefined && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          col --;
          direction = 2;
        }
      break;
      case 2:
        row ++;
        if (matrix[row] && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else {
          row --;
          direction = 4;
        }
      break;
      case 4:
        col --;
        if (matrix[row][col] !== undefined && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          col ++;
          direction = 8;
        }
      break;
      case 8:
        row --;
        if (matrix[row] && matrix[row][col] !== 'flag') {
          result.push(matrix[row][col]);
          matrix[row][col] = 'flag';
        } else { // 不存在
          row ++;
          direction = 6;
        }
        break;
    }
  }
  return result;
};