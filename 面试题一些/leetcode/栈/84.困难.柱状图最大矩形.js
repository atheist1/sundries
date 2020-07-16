/**
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

  求在该柱状图中，能够勾勒出来的矩形的最大面积。
  以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
 */

// 1. 暴力解法 o(n2)时间复杂度 空间复杂度为n
var largestRectangleArea = function (heights) {
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
var largestRectangleArea = function (heights) {
  // 找到传入数组的最小高度 当前最大面积是最小高度乘数组长度
  // 子问题是最小高度左边的数组的最大面积和数组右边的最大面积
  var findLarge = function (arr) {
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
var largestRectangleArea = function (heights) {
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
    maxArea = Math.max(maxArea, (rightIdx - leftIdx - 1) * heights[i]);
  }
  return maxArea;
};
// 4. 栈
var largestRectangleArea = function (heights) {
  // 守卫边界条件
  heights.push(0);
  // heights.unshift(0);
  let maxArea = 0;
  let stack = [];
  // 找到i号位置的右边比他低的矩形位置，两个位置夹着的宽度乘i号位置的高度则是他的最大面积
  for (let i = 0; i <= heights.length; i += 1) {
    while (stack.length > 0 && heights[i] <= heights[stack[stack.length - 1]]) {
      let top = stack.pop();
      let top2 = stack[stack.length - 1];
      maxArea = Math.max(
        maxArea,
        heights[top] * (stack.length === 0 ? i : i - top2 - 1)
      );
    }
    stack.push(i);
  }
  return maxArea;
};
// 栈方法的原理
// 通俗方法讲就类似于水桶锯木头，从左往右找，保证递增，当找到第一个木头比左边木头低代表上一块木头戳出来了，那上一块木头所能达到的最大高度就确定了，我们算出
// 这个戳出来的木头所对应的最大高度，再把这个木头锯成次高木头的高度(其实就相当于下次计算这个木头就不用算了)，然后继续往下走，如果是递增的就不用管，保证最后是一个递增的序列
// 当所有均为递增时，加入守卫条件，头尾加入高度为0的木头计算，之前戳出来的木头的宽度仅为1，但是递增之后的木头宽度是由第一块开始递增的木头到最后一块结束的木头的宽度，最后比较大小。

// 伪代码 1.加入守卫条件 2.循环数组，后一项比前一项大则推入栈 3.后一项比前一项小则更新最大面积 后一项比前一项低，代表前项的前项是左边第一个比前项低的柱子，而后项则为右边第一个比前项低的柱子，前项所占据的面积即为两者夹着的宽度*前项的高度
var largestRectangleArea = function (heights) {
  let stack = [];
  let maxArea = 0;
  heights.push(0);
  for (let i = 0; i < heights.length; i += 1) {
    let prev = stack[stack.length - 1]; // 找到上一根柱子
    // while循环找到stack中当前柱子高度如果高于之前的，则把之前的柱子出栈，计算高度，保证栈的单调递增
    while (stack.length > 0 && heights[i] <= heights[prev]) {
      // 推出上一根柱子
      let top = stack.pop();
      prev = stack[stack.length - 1];
      maxArea = Math.max(
        (stack.length === 0 ? i : i - prev - 1) * heights[top],
        maxArea
      );
    }
    stack.push(i);
  }
  return maxArea;
};
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
