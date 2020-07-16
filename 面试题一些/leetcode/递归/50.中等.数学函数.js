/****
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 */
var myPow = function(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  var _mayPow = function(x, n) {
    if(n === 0) return 1;
    if (n / 2 < 1) {
      return x;
    }
    if (n % 2 == 0) {
      return _mayPow(x * x, n / 2)
    } else {
      return _mayPow(x * x, (n - 1) / 2) * x;
    }
    
   
  }
  return _mayPow(x, n);
};
console.log(myPow(2,3));