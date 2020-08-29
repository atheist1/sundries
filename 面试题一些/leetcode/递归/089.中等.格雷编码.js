/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2019-11-09 14:04:00
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-29 15:33:02
 */
/**
 * 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

  给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/gray-code
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
  输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
示例 2:

输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
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
var grayCode = function (n) {
  let num = ['0', '1'];
  let rlt = ['0', '1'];
  let dfs = function (arr) {
    if (n <= 1) return;
    let len = arr.length;
    for(let i = 0; i < len; i += 1) {
      for (let j = 0; j < num.length; j += 1) {
        arr.push(`${num[j]}${arr[i]}`);
      }
      num.reverse()
    }
    arr.splice(0, len);
    n -= 1;
    dfs(arr)
  }
  dfs(rlt)
  if (n == 0) return [0]
  return rlt.map((item) => parseInt(item, 2))
}
console.log(grayCode(2))