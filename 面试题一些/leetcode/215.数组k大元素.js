/**
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 函数
var findKthLargest = function(nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
};
// 选择排序
var findKthLargest = function(nums, k) {
  let max;
  for (let i = 0; i < k; i += 1) {
    max = i;
    for (let j = i + 1; j < nums.length; j += 1) {
      // console.log('countj' + countj++);
      if (nums[max] < nums[j]) {
        max = j;
      }
    }
    [nums[max], nums[i]] = [nums[i], nums[max]];
  }
  return nums[k - 1];
};
// 快排
/**
 * 
 * @param {number[]} arr 
 */
// 内存占用过多
var quicksort = function (arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    // 选标尺
    let flag = arr[0];
    let left = [];
    let right = [];
    // 大于标尺放右边小的放左边
    for (let i = 0; i < arr.length; i += 1) {
      temp = arr[i];
      if (temp < flag) {
        left.push(arr[i])
      } else {
        right.push(arr[i]);
      }
    }
    // 继续递归
    return quicksort(left).concat(flag, quicksort(right))
  }
}
var quicksort = function (arr) {
  // 9 6 4 3 2 7 1 5 8
  var findCenter = function (arr, left, right, flag) {
    while (left < right) {
      // 跳出条件是left right交换
      // 找到第一个大于flag 的数
      // while (left < right && arr[left] <= arr[flag]) {
      //   left ++;
      // }
      // while (left < right && arr[right] >= arr[flag]) {
      //   right --;
      // }
      // // 双指针查找，从左往右找比flag值大的，从右往左找比flag小的
      for (left; left < right; left += 1) {
        if (arr[left] > arr[flag]) {
          break;
        }
      }
      for (right; right > left; right -= 1) {
        if (arr[right] < arr[flag]) {
          break;
        }
      }
      // 交换左右大小，保证左边比flag小右边比flag大
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    // 交换基准位置与left的位置
    [arr[left], arr[flag]] = [arr[flag], arr[left]];
    return left;
  }
  var sort = function (arr, left, right) {
    if (left < right) {
      let flag = right;
      let center = findCenter(arr, left, right, flag);
      sort(arr, left, center - 1);
      sort(arr, center, right);
    }
    return arr;
  }
  sort(arr, 0, arr.length - 1);
  return arr;
}
// 快速排序方法实现(失败)
var findKthLargest = function(nums, k) {
  let start = 0;
  let end = nums.length - 1;
  let positionStart = 0;
  while (1) {
    start = positionStart + 1;
    while(start <= end) {
      // 交换数组元素
      while (start <= end && nums[start] >= nums[positionStart]) {
        start ++;
      }
      while (start <= end && nums[end] < nums[positionStart]) {
        end--;
      }
      [nums[start], nums[end]] = [nums[end], nums[start]];
    }
    [nums[start - 1], nums[positionStart]] = [nums[positionStart], nums[start  -1]];
    // 找到k在数组中的位置
    if (k > start) { // 右半边
      positionStart = start;
    } else if (k < start) { // 左半边
      end = start - 1 - 1;
    } else {
      console.log(nums);
      return nums[start - 1]
    }
  }
};
// 桶排序方法实现
var findKthLargest = function(nums, k) {
  var max = Math.max(...nums);
  var min = Math.min(...nums);
  if (max === min) {
    return nums[0];
  }
  var arr = new Array(max - min + 1);
  var temp;
  for (let i = 0; i < nums.length; i += 1) {
    temp = nums[i] - min;
    if (arr[temp]) {
      arr[temp] += 1;
    } else {
      arr[temp] = 1;
    }
  }
  for (let j = arr.length - 1; j >= 0; j -= 1) {
    if (k - (arr[j] || 0) > 0) {
      k -= (arr[j] || 0);
    } else {
      return j + min;
    }
  }
};
var findKthLargest = function(nums, k) {
  var rlt = [];
  for (let i = 0; i < nums.length; i+= 1) {
    if (rlt[nums[i]] == undefined) {
      rlt[nums[i]] = 1;
    } else {
      rlt[nums[i]] += 1;
    }
  }
  console.log(rlt)
  for (let i = rlt.length; i >=0; i -= 1) {
    if (rlt[i] != undefined) {
      k -= rlt[i];
    }
    if (k <= 0)
      return i
  }
  return -1;
};
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))