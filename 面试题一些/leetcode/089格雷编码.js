/**
 * 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

  给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/gray-code
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  var getGray = function (n) {
    if (n > 1) {
      var result = getGray(n - 1);
      var temp = result.map(item => '0' + item);
      var temp1 = result.reverse().map(item => '1' + item);
      return temp.concat(temp1);
    } else {
      return ['0', '1']
    }
  }
  if (n === 0) {
    return [0];
  }
  let result = getGray(n).map(item => parseInt(item, 2));
  return result;
}
var grayCode = function (n) {
  var arr = [];
  for (let i = 0; i < 1 << n; i += 1) {
    arr.push(i ^ i >> 1)
  }
  return arr;
}