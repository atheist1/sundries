/**
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

  对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

  你可以返回任何满足上述条件的数组作为答案。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {*} A 
 */
// 用时间换空间
var sortArrayByParityII = function(A) {
  for (let i = 0; i < A.length; i += 1) {
    for (let j = i + 1; j < A.length; j+= 1) {
      if (A[i] % 2 === 1 && i % 2 === 0) {
        if (A[j] % 2 === 0 && j % 2 === 1) {
          [A[i], A[j]] = [A[j], A[i]];
          break;
        }
      }
      if (A[i] % 2 === 0 && i % 2 === 1) {
        if (A[j] % 2 === 1 && j % 2 === 0) {
          [A[i], A[j]] = [A[j], A[i]];
          break;
        }
      }
    }
  }
  return A;
};
// 时间减少一半
var sortArrayByParityII = function(A) {
  let j = 1;
  // 偶数行
  for (let i = 0; i < A.length - 1; i += 2) {
    // 如果偶数行是奇数
    if (A[i] & 1 != 0) {
      // 查找奇数行是偶数的并交换
      while (A[j] & 1 !== 0) {
        j += 2;
      }
      [A[i], A[j]] = [A[j], A[i]];
    }
  }
  return A;
};