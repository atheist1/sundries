/**
 * 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

  顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

  每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

  注意，一开始你手头没有任何零钱。

  如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
  输入：[5,5,5,10,20]
  输出：true
  解释：
  前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
  第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
  第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
  由于所有客户都得到了正确的找零，所以我们输出 true。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/lemonade-change
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */
// 穷举法
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let mapArr = [0, 0];
  for (let i = 0; i < bills.length; i += 1) {
    let bill = bills[i];
    if (bill === 5) {
      mapArr[0] += 1;
    } else if (bill === 10) {
      if (mapArr[0] < 1) {
        return false;
      } else {
        mapArr[0] -= 1;
        mapArr[1] += 1;
      }
    } else {
      if (mapArr[1] >= 1 && mapArr[0] >= 1) {
        mapArr[1] -= 1;
        mapArr[0] -= 1;
      } else if (mapArr[1] < 1 && mapArr[0] >= 3) {
        mapArr[1] -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
};
var lemonadeChange = function (bills) {
  let hand = [];
  for (let i = 0; i < bills.length; i += 1) {
    let bill = bills[i];
    if (bill === 5) {
      hand.push(bill);
    } else {
      // 降序排序
      hand = hand.sort((a, b) => b - a);
      let change = bill - 5;
      // 从前往后找，如果零钱小于等于需要找的钱，则需要找的钱减去零钱，删除当前的零钱
      // 如果不小于循环继续
      for (let j = 0; j < hand.length; j += 1) {
        if (hand[j] <= change) {
          change -= hand[j];
          hand.splice(j, 1);
          // 删除元素，数组长度发生了变化
          j--;
        }
        if (change === 0) {
          break;
        }
      }
      // 如果循环完手中零钱发现还没找完代表错误
      if (change !== 0) {
        return false;
      } else {
        hand.push(bill)
      }
    }
  }
  return true;
};
var lemonadeChange = function (bills) {
  let hand = [0, 0];
  for (let i = 0; i < bills.length; i += 1) {
    if (bills[i] == 5) {
      hand[0] += 1;
    } else if (bills[i] == 10) {
      if (hand[0] == 0) return false;
      hand[0] -= 1;
      hand[1] += 1;
    } else {  // 15 5 + 5 + 5 10 + 5
      if (hand[1] == 0) {
        if (hand[0] < 3)
          return false
        else
          hand[0] -= 3
      } else if (hand[0] >= 1) {
        hand[1] -= 1;
        hand[0] -= 1;
      } else {
        return false
      }
    }
  }
  return true
};
console.log(lemonadeChange([5, 5, 10, 10, 20]))