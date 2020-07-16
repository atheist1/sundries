/**
 * 矩形以列表 [x1, y1, x2, y2] 的形式表示，其中 (x1, y1) 为左下角的坐标，(x2, y2) 是右上角的坐标。

如果相交的面积为正，则称两矩形重叠。需要明确的是，只在角或边接触的两个矩形不构成重叠。

给出两个矩形，判断它们是否重叠并返回结果。

 

示例 1：

输入：rec1 = [0,0,2,2], rec2 = [1,1,3,3]
输出：true
示例 2：

输入：rec1 = [0,0,1,1], rec2 = [1,0,2,1]
输出：false
 

提示：

两个矩形 rec1 和 rec2 都以含有四个整数的列表的形式给出。
矩形中的所有坐标都处于 -10^9 和 10^9 之间。
x 轴默认指向右，y 轴默认指向上。
你可以仅考虑矩形是正放的情况。
 */
/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function(rec1, rec2) {
  var [xa1,ya1,xa2,ya2] = rec1;
  var [xb1,yb1,xb2,yb2] = rec2;
  const area1 = Math.abs(rec1[0] - rec1[2]) * Math.abs(rec1[1] - rec1[3]);
  const area2 = Math.abs(rec2[0] - rec2[2]) * Math.abs(rec2[1] - rec2[3]);
  if (area1 > area2) {
    [xa1,ya1,xa2,ya2] = rec2;
    [xb1,yb1,xb2,yb2] = rec1;
  }
  // xa1>xb1 && xa2>xb1 || xa1<xb2 && xa2<xb2
  return !(xa2 <= xb1 || xa1 >= xb2 || ya1 >= yb2 || ya2 <= yb1)
};