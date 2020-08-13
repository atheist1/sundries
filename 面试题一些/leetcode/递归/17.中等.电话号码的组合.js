/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2019-11-07 17:08:15
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-12 10:52:57
 */
/**
 * 
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。



示例:

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations1 = function (digits) {
  if (!digits) {
    return [];
  }
  var map = ['', ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
  var digitals = digits.split('');
  digitals = digitals.map((item) => {
    return map[item - 1];
  })
  // 两个数字 直接组合
  // 三个数字 递归组合
  let getResult = function (digitalArr) {
    // 每次只组合两个
    // 然后splice前两个为组合完成的字母
    // 递归调用
    // 出口为arr的长度为1
    if (digitalArr.length >= 2) {
      var temp = [];
      for (let i = 0; i < digitalArr[0].length; i += 1) {
        for (let j = 0; j < digitalArr[1].length; j += 1) {
          temp.push(digitalArr[0][i] + digitalArr[1][j]);
        }
      }
      digitalArr.splice(0,2,temp);
      getResult(digitalArr);
    }
    return digitalArr;
  }
  return getResult(digitals)[0];
};
var letterCombinations = function (digits) {
  var map = ['', ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
  var digitsArr = digits.split('');
  if (!digits) {
    return [];
  }
  // 两个数字 直接组合
  // 三个数字 递归组合
  let getResult = function (digitalArr) {
    var result = [];
    var temp = [];
    if (digitalArr.length > 1) {
      let digitNum = digitalArr[digitalArr.length - 1] - 1;
      let arr = digitalArr.slice(0, digitalArr.length - 1);
      result = getResult(arr);
      temp = [];
      if (result.length > 0) {
        for (let idx = 0; idx < result.length; idx += 1) {
          for (let charIdx = 0; charIdx < map[digitNum].length; charIdx += 1) {
            temp.push(result[idx] + map[digitNum][charIdx]);
          }
        }
        result = temp;
      }
    } else {
      for (let j = 0; j < map[digitalArr[0] - 1].length; j += 1) {
        temp.push(map[digitalArr[0] - 1][j]);
      }
      result = temp;
    }
    
    return result;
  }
  return getResult(digitsArr);
};
var letterCombinations = function (digits) {
  var map = [ '', ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
  let arr = digits.split('').map((item) => {
    return map[item - 1];
  })
  let dfs = function (arr) {
    let temp = [];
    if (arr.length >= 2) {
      for (let i = 0; i < arr[0].length; i += 1) {
        for (let j = 0; j < arr[1].length; j += 1){
          temp.push(arr[0][i] + arr[1][j]);
        }
      }
      arr.splice(0, 2, temp);
      dfs(arr);
    }
    return arr;
  }
  dfs(arr)
  return arr[0];
}
console.log(letterCombinations('223'));