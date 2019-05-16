  /**
   * 按如下格式输出斐波那契数列，可选入参（行数，列数, 顺时针/逆时针).
      例子：3 X 3 逆时针 输出如下：
      154 89 55
        2  1 34
        3  1 21
        5  8 13
  */
  const main = (row, col, flag) => {
    const getFibArr = (num) => {
      let len = 0;
      const arr = [];
      const fibs = (n, n1) => {
        len++;
        if (len > num) {
          return;
        }
        const next = n + n1;
        n = n1;
        arr.push(n);
        return fibs(n, next);
      }
      fibs(0, 1);
      return arr;
    }
    const getTwoDimensionArr = (row, col) => {
      return new Array(row).fill('').map(item => new Array(col));
    }
    /**
     * 
     * @param {*} row 行
     * @param {*} col 列
     * @param {*} flag 顺时针逆时针
     */
    const fn = (row, col, flag) => {
      // 行数比列数大1或等于行数
      if (col > row || row > col + 2) {
        console.error('该行列无法构成');
        return;
      }
      const firstDirection = 2; // 默认第一次往下
      let direction = 2;
      const arr = getFibArr(col * row);
      const emptyArr = getTwoDimensionArr(row, col);
      let startX = 0;
      let startY = 0;
      let len = 0;
      let isEnd = false;
      if (flag) {
        startX = Math.floor((row - 1) / 2);
        startY = Math.floor(row / 2);
      } else {
        startX = Math.floor((row - 1) / 2);
        startY = Math.floor((row - 1) / 2);
      }
      for (let r = startX; r < row;) {
        for (let c = startY; c < col;) {
          emptyArr[r][c] = arr[len];
          len++;
          if (len >= col * row) isEnd = true; 
          if (isEnd) break;
          if (!flag) {
            switch (direction) {
              case 2:
                r += 1;
                break;
              case 4:
                c -= 1;
                break;
              case 6:
                c += 1;
                break;
              case 8:
                r -= 1;
                break;
              default:
                break;
            }

            // 判断是否需要转向
            let next = direction;
            let tempc = c;
            let tempr = r;
            switch (next) {
              case 4:
                direction = 8;
                tempr--;
                break;
              case 8:
                direction = 6;
                tempc++;
                break;
              case 6:
                direction = 2;
                tempr++;
                break;
              case 2:
                direction = 4;
                tempc--;
                break;
            }
            if (emptyArr[tempr][tempc]) {
              direction = next;
            }
          } else {
            switch (direction) {
              case 2:
                r += 1;
                break;
              case 4:
                c -= 1;
                break;
              case 6:
                c += 1;
                break;
              case 8:
                r -= 1;
                break;
              default:
                break;
            }

            // 判断是否需要转向
            let next = direction;
            let tempc = c;
            let tempr = r;
            switch (next) {
              case 4:
                direction = 2;
                tempr++;
                break;
              case 8:
                direction = 4;
                tempc--;
                break;
              case 6:
                direction = 8;
                tempr--;
                break;
              case 2:
                direction = 6;
                tempc++;
                break;
            }
            if (emptyArr[tempr][tempc]) { 
              direction = next;
            }
          }
        }
        if (isEnd) break;
      }
      return emptyArr;
    }
    return fn(row, col, flag);
  }
