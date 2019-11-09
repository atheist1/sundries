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