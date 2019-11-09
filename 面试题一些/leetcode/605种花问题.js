/**
 * 假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

  给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/can-place-flowers
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 输入: flowerbed = [1,0,0,0,1], n = 1
  输出: True
 */
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  // 从第一位开始填充
  for (let i = 0; i < flowerbed.length; i += 1) {
    // 上一位当前位与下一位均不为1时才能填充。
    if (flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1 && flowerbed[i] !== 1) {
      flowerbed[i] = 1;
      n --;
    }
  }
  return n <= 0;
};