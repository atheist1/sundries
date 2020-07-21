var f = function (n, count) {
  let groupCount = parseInt(n / 4);
  let res = 0;

  let arr = [groupCount, groupCount, groupCount, n - 3 * groupCount]
  console.log(arr)
  for (let i = 0; i < arr.length; i += 1) {
    let rlt = arr.length % 2 === 0 ? parseInt(arr[i] / 2) : (parseInt(arr[i] / 2) + (arr[i] % 2))
    res += rlt
  }
  console.log(res)
  if (res === 4) return 4
  if (res < 4) return res - 1
  count += f(res, count) + res
  return count
}
// console.log(f(146, 0))
function a(num) {
  if (num <= 3) return num - 1;
  if (num === 4) return 4;
  let rlt = 1;
  while (num > 4) { // 所有大于4的数都能被拆分成123的组合 所以直接用3作为第一段即可
    num -= 3;
    rlt *= 3;
  }
  return rlt * num; // return最后一次减完3剩下的值 即直接以这个作为最后一段
}
console.log(a(15))
let throttole = function (fn, delay, immediate, arguments,) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay)
    }
  }
}
let throttole2 = function (fn, delay, immediate, arguments,) {
  let old = +new Date();
  return function () {
    let now = +new Date()
    if (now - old > delay) {
      old = now;
      fn();
      timer = null;
    }
  }
}
var curryMore = function (fn, args = []) {
  let len = fn.length;
  return function () {
    Array.prototype.push.call(args, Array.prototype.slice.call(arguments))
    if (len - args.length > 0) {
      return curryMore(fn, args);
    } else {
      return fn.apply(this, args)
    }
  }
}
var add = (a, b, c, d) => a + b + c + d
var _add = curryMore(add)


// 分治算法 固定高位 向低位出发 每次达到最低位则push到数组中
var getAry = function (n) {
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let res = [];
  let num = [];
  let dfs = function (k) {
    if (k >= n) return res.push(parseInt(num.join('')));
    for (let i = 0; i < arr.length; i += 1) {
      // 固定k号位置 将其改变为0-9
      // 第一次循环num = ['0','1','2','3','4','5','6','7','8', '9']; 第二次循环 
      num[k] = arr[i];
      dfs(k + 1)
    }

  }
  dfs(0)
  return res.shift();
}
console.log(getAry(3))
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  let left = '';
  let right = ''
  let len = parseInt(s.length / 2);
  for (let i = 0; i < len + 1; i += 1) {
    if (s[i] === ' ') {
      left += '%20'
    } else {
      left += s[i]
    }
    if (s[i + len] === ' ') {
      right += '%20'
    } else {
      right += s[i + len]
    }
  }
  return left + right;
  // return s.split(/\s/g).join('%20')
};
var maxValue = function (grid) {
  let row = grid.length;
  let col = grid[0].length;
  for (let i = 1; i < row; i += 1) {
    grid[i][0] = grid[i - 1][0] + grid[i][0]
  }
  for (let j = 1; j < col; j += 1) {
    grid[0][j] = grid[0][j - 1] + grid[0][j]
  }
  for (let i = 1; i < row; i += 1) {
    for (let j = 1; j < col; j += 1) {
      grid[i][j] = Math.max(grid[i - 1][j], grid[i][j - 1]) + grid[i][j]
    }
  }
  return grid[row - 1][col - 1]
};
console.log(maxValue([[1,2,5],[3,2,1]]))