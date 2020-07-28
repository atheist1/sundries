/****
 * 某个探险队在路上发现了一个洞口，隧道由两个数组组成top数组代表隧道的顶部位置 down数组代表隧道的底部位置
 * 探险队派出可伸缩高度的机器人 站在洞的底部往左右扫射激光探路，请问他能看到的最远距离是多少
 * PS: 如果顶部和底部同样高度 机器人也能使用激光穿过其中
 */
/**
 * 
 * @param {*} top 顶部数组 
 * @param {*} down 底部数组
 * @returns {number} 能看多远
 */
var ans = function (down, topAry) {
  let len = down.length;
  let res = 0;
  for (let i = 0; i < len; i += 1) {
    // 记录当前边界最大最小值为当前值
    let downmax = down[i];
    let topmin = topAry[i]
    let count = 1;
    // 从后一位开始算
    for (let j = i + 1; j < len; j += 1) {
      let currentTop = topAry[j];
      let currentDown = down[j];
      count = j - i;
      // 结束条件 当前值的top小于等于下面最大值 或者当前的down大于等于上面最小值
      if (currentTop <= downmax || currentDown >= topmin) {
        console.log(`开始位置${i} 开始值 down:${down[i]} topAry:${topAry[i]} 结束位置${j} 结束值 down${down[j]} topAry ${topAry[j]} count ${j - i}`)
        break;
      }
      // 重新记录最大最小值
      downmax = Math.max(currentDown, downmax)
      topmin = Math.min(currentTop, topmin)
    }
    res = Math.max(res, count)
  }
  return res;
}
// let down = [6,2,3,4,1,2,1,3,1,2,5,3,5,6,4]
// let topAry =  [8,7,6,8,9,5,8,7,4,6,8,9,7,8,7]
// let topAry = [7,9,6,8]
// let down =  [6,2,1,5]

let topAry = [7,9,6,8,7,9,8,7,9,6,8,7,9,8,7]
let down =[6,2,1,5,4,3,6,6,2,1,5,4,3,6,6]

console.log(ans(down, topAry))

