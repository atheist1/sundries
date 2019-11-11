/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
  if (deck.length <= 1) {
      return false;
   }
  // 3. 查找每两项之间的公约数，保证每个公约数都存在且大于1才能保证分派成功
  let gcd = function (a, b) {
      if (b === 0) {
          return a;
      }
      return gcd(b, a % b);
  }
  var result = {};
  for (let i = 0; i < deck.length; i += 1) {
    if (result[deck[i]] === undefined) {
      result[deck[i]] = 1;
    } else {
      result[deck[i]] += 1;
    }
  }
  var arr = [];
  for (let item in result) {
    arr.push(result[item]);
  }
  var first;
  var second;
  while(arr.length > 1) {
    first = arr.shift();
    second = arr.shift();
    var temp = gcd(first, second);
    arr.unshift(temp);
  }
  return arr[0] > 1;
};