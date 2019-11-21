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

// 3. 其他解法
var largestRectangleArea = function(heights) {
  let leftIdx = 0;
  // 守卫边界条件
  heights.push(-1);
  heights.unshift(-1);
  let rightIdx = heights.length;
  let maxArea = 0;
  // 找到i号位置的最大矩形面积就是找到左边第一个i低的矩形的位置
  // 找到i号位置的右边比他低的矩形位置，两个位置夹着的宽度乘i号位置的高度则是他的最大面积
  for (let i = 0; i < heights.length; i += 1) {
    leftIdx = 0;
    rightIdx = heights.length;
    for (let left = i - 1; left >= 0; left -= 1) {
      if (heights[left] < heights[i]) {
        leftIdx = left;
        break;
      }
    }
    for (let right = i + 1; right < heights.length; right += 1) {
      if (heights[right] < heights[i]) {
        rightIdx = right;
        break;
      }
    }
    maxArea = Math.max(maxArea, (rightIdx - leftIdx - 1) * heights[i])
  }
  return maxArea;
};
// 4. 栈
var largestRectangleArea = function(heights) {
  // 守卫边界条件
  heights.push(0);
  // heights.unshift(0);
  let maxArea = 0;
  let stack = [];
  // 找到i号位置的右边比他低的矩形位置，两个位置夹着的宽度乘i号位置的高度则是他的最大面积
  for (let i = 0; i <= heights.length; i += 1) {
    while(stack.length > 0 && heights[i] <= heights[stack[stack.length - 1]]) {
      let top = stack.pop();
      let top2 = stack[stack.length - 1];
      maxArea = Math.max(maxArea, heights[top] * (stack.length === 0 ? i : i - top2 - 1))
    }
    stack.push(i);
   
  }
  return maxArea;
};