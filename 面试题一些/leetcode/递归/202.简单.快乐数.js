/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-07-16 08:56:34
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-20 14:57:26
 */
/** 
 * 
 * 编写一个算法来判断一个数 n 是不是快乐数。
    「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

    如果 n 是快乐数就返回 True ；不是，则返回 False 。

     

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/happy-number
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    输入：19
    输出：true
    解释：
    12 + 92 = 82
    82 + 22 = 68
    62 + 82 = 100
    12 + 02 + 02 = 1
*/
var isHappy = function(n) {
  let arr = [];
  let _isHappy = (n) => {
    if (arr[n] != undefined) {
      return false;
    } else {
      let strArr = `${n}`.split('');
      let num = 0;
      strArr.forEach((item) => {
        num += item * item;
      });
      if (num == 1) {
        return true;
      } else {
        arr[n] = 1;
        return _isHappy(num);
      }
    }
  }
  return _isHappy(n);
};
var isHappy = function(n) {
  let visited = {};
  let getSum = function (n) {
    let sum = 0;
    `${n}`.split('').forEach(item => {
      sum += Math.pow(item, 2)
    })
    return sum;
  }
  let _isHappy = function(n) {
    if (n == 1) return true;
    let rlt = getSum(n);
    if (visited[rlt]) return false;
    visited[rlt] = 1;
    return _isHappy(rlt);
  }
  return _isHappy(n);
};
console.log(isHappy(29));