// 求1到n的和，不能用乘除以及if else while 等计算
var sumNums = function(n) {
  var sum = function(n) {
    // 或找帧与找假
     return n != 0 && (sum(n - 1, n) + n);
  }
  return sum(n)
};