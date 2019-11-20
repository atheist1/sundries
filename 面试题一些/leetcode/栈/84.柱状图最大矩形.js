/**
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

  求在该柱状图中，能够勾勒出来的矩形的最大面积。
  以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
 */

// 1. 暴力解法 o(n2)时间复杂度 空间复杂度为n
var largestRectangleArea = function(heights) {
  let maxArea = 0;
  let minWidth = 0;
  if (heights.length === 0) {
    return 0;
  }
  for (let i = 0; i < heights.length; i += 1) {
    minWidth = heights[i];
    for (let j = i; j >= 0; j -= 1) {
      minWidth = Math.min(minWidth, heights[j]);
      maxArea = Math.max(maxArea, minWidth * (i - j + 1));
    }
  }
  return maxArea;
};
// 2. 分治算法
var largestRectangleArea = function(heights) {
  // 找到传入数组的最小高度 当前最大面积是最小高度乘数组长度
  // 子问题是最小高度左边的数组的最大面积和数组右边的最大面积
  var findLarge = function(arr) {
    let min = Math.min.apply(null, arr);
    let minIdx = arr.indexOf(min);
    if (arr.length === 1) {
      min = arr[0];
      minIdx = 0;
    }
    // 两个矩形相连是出口
    if (arr.length <= 2) {
      return min * arr.length || 0;
    }
    let area = min * arr.length;
    let leftArea = findLarge(arr.slice(0, minIdx));
    let rightArea = findLarge(arr.slice(minIdx + 1));
    return Math.max.apply(null, [area, leftArea, rightArea]);
  };
  return findLarge(heights);
};
