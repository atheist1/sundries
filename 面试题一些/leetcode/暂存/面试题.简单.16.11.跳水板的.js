/****
 * 你正在使用一堆木板建造跳水板。有两种类型的木板，其中长度较短的木板长度为shorter，长度较长的木板长度为longer。你必须正好使用k块木板。编写一个方法，生成跳水板所有可能的长度。

  输入：
  shorter = 1
  longer = 2
  k = 3
  输出： {3,4,5,6}
 */
/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
// var divingBoard = function(shorter, longer, k) {
//   if (k === 0) return []
//   if(shorter === longer) return [k * longer];
//   let map = new Map();
//   map.set(shorter, 1);
//   map.set(longer, 1);
//   var deep = function(k, arr) {
//     let rlt = [];
//     if (arr.length === 0) arr = [shorter, longer];
//     if (k <= 1) return arr;
//     arr.forEach((item) => {
//       let first = item + shorter;
//       let second = item + longer;
//       if (!map.has(first)) {
//         rlt.push(first)
//         map.set(first, 1)
//       }
//       if (!map.has(second)) {
//         rlt.push(second)
//         map.set(second, 1)
//       }
//     });
//     return deep(k - 1, rlt);
//   }
//   return deep(k, []);
// };
var divingBoard = function(shorter, longer, k) {
  if (k === 0) return []
  if(shorter === longer) return [k * longer];
  let deep = (k, rlt) => {
    let arr = [];
    if(rlt.length === 0) {
      rlt[shorter] = 1;
      rlt[longer] = 1;
    }
    if (k === 1) return rlt;
    let len = rlt.length;
    for (let i = 0; i < len; i += 1) {
      if(rlt[i]) {
        arr[i + longer] = i + longer;
        arr[i + shorter] = i + shorter;
      }
    }
    return deep(k - 1, arr.filter((item, index) => {
      if (arr[index + shorter]!= undefined || arr[index + longer] != undefined || !item) {
        return false;
      }
      return true;
    }))
  }
  return deep(k, [])
};
console.log(divingBoard(1,2,3))