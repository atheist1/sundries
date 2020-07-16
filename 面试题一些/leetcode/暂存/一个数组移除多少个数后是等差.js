var arr = [5,10,14,15,20,25,26,27,28,30,31];
let temp = [];
let max = 0;
let len = arr.length;
// 循环数组 从1开始到长度结束
for (let i = 1; i < arr.length; i += 1) {
  let map = {};
  // 当前位置的差值 5 10 14对应的每次循环是 10 - 5|| 14 - 10
  let radix = arr[i] - arr[i - 1];
  // 复制这个数组
  let brr = arr.slice();
  // 循环复制的数组 自增条件在里面控制
  let j = i;
  while (true) {
    if (j >= brr.length) break;
    // 如果当前位置减去上一个位置的值与外层的差值相等 证明这是一个连续的等差 j自增，往下走
    if (brr[j]  - brr[j - 1] === radix) {
      map[radix] = map[radix] ? map[radix] + 1 : 2;
      j += 1
    } else {
      // 不等 如 brr[j]是14 j - 1位置是10 则删除brr数组中j号位置的值 即删除14 循环继续
      brr.splice(j, 1);
      continue;
    }
  }
}

/******
 * list a = [5,10,14,15,20,25,26]
 * 第一层循环i = 1 arr[i] - arr[i - 1] = 5 以5作为差值 复制list a 到 list b;
 * 第二层循环j开始位置为j = i = 1;
 * 判断list b[j] - list b[j - 1] === radix 当前位置减去上一个位置是否为radix 
 * 当前 j = 1 b[j] - b[j - 1] = 5 跟radix相等 j自增 j = 2
 * 第二层循环 j现在 = 2; b[j] - b[j - 1] = 4不等于radix 将b[j](14)从数组中删除 数组变成 [5,10,15,20,25,26]
 */


[5,10,14,15,20,21]