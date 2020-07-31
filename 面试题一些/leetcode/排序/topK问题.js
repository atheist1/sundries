/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-07-31 09:15:16
 * @LastEditors: qitianle
 * @LastEditTime: 2020-07-31 17:13:13
 * TopK问题是一个经典的排序变种题 题目的意思是求数组中的前K个最大或者最小的数 解法非常多 有满足时间复杂度的有满足空间复杂度的
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
/**
 * 解法1 冒泡排序 我们只需要对其中的前k个数进行冒泡即可
 * 时间复杂度O(n2) 空间复杂度O(1)
 * @param {*} arr 
 * @param {*} k 
 */
function topK(arr, k) {
  for (let i = 0; i < k; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[i] < arr[j]) {
        swap(arr, i, j)
      }
    }
  }
  console.log(arr);
}
/**
 * 解法2 桶排序 利用空间换时间
 * 时间复杂度O(2n)
 * 空间复杂度O(n)最大由最大那个数决定
 * @param {*} arr 
 * @param {*} k 
 */
function topK(arr, k) {
  let temp = [];
  let rlt = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!temp[arr[i]]) {
      temp[arr[i]] = 1;
    } else {
      temp[arr[i]] += 1;
    }
  }
  for (let i = temp.length; i >= 0; i -= 1) {
    if (temp[i]) {
      for (let j = 0; j < temp[i]; j += 1) {
        k -= 1;
        rlt.push(i)
        if (k <= 0) return rlt;
      }
    }
  }
  return rlt;
}
/**
 * 解法3 堆排序
 * 首先构造一个最大或者最小堆
 * 堆是个二叉树 保证子节点比父节点要小或者大
 * 时间复杂度O(nlogk)
 * 空间复杂度O(k)
 * @param {*} arr 
 * @param {*} k 
 */
function topK(arr, k) {
  let rlt = [];
  if (k === 0) return rlt;
  // 递归来交换以index为父元素的中左右三个节点的值
  function maxHeap(arr, index, len) {
    // 左节点
    let leftIndex = index * 2 + 1;
    // 右节点
    let rightIndex = index * 2 + 2;
    let temp = index;
    if (leftIndex < len && arr[leftIndex] > arr[index]) {
      index = leftIndex;
    }
    if (rightIndex < len && arr[rightIndex] > arr[index]) {
      index = rightIndex;
    }
    if (temp !== index) {
      swap(arr, temp, index)
    }
  }
  // 以每个节点为起始构建最大堆
  function buildMaxHeap(len) {
    // 从最后一个父节点的位置往上开始找堆每一次将当前父节点置为最大节点 构建了一个大根堆 堆顶元素为最大元素
    let mid = parseInt(len / 2) - 1
    for (let i = mid; i >= 0; i -= 1) {
      maxHeap(arr, i, len)
    }
  }
  buildMaxHeap(arr.length);
  // 接下来这一步就是对大根堆的排序 将最后一位放到第一位重新构建大根堆 然后排序依次去除最后一位 因为最后位肯定为最大位数了
  let len = arr.length;
  for (let i = len - 1; i >= 0; i -= 1) {
    swap(arr, 0, i);
    rlt.push(arr[len - 1]);
    if (rlt.length === k) break;
    buildMaxHeap(--len)
    
  }
  return rlt;
}
/**
 * 解法4 快速选择法
 * 快速选择法是快速排序法的一个变型，思想为分治法
 * 如快排一样 用一个中间数代表中间的值 将数组分为左右两个部分 左边部分代表比中间值小的数 右边部分代表比中间值大的数
 * 这个时候判断左边部分的长度与k的长度相比较 如果相等 代表左边即为k大
 * 如果左边的长度大于k代表左边还能继续划分 继续再左边数组递归查找
 * 如果左边长度小于k的话 从右边找k - 左边长度个数的即可
 * @param {*} arr 
 * @param {*} k 
 */
function topK(arr, k) {
  let rlt = [];
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  let partition = function (arr, lo, hi) {
    let i = lo;
    let j = hi + 1;
    if (lo === hi) return
    let first = arr[i]
    
    while (true) { 
      // 第一个循环 除去第一个 从左往右找 找到第一个比基点大的 从右往左找 找到第一个比基点小的 交换两个 继续循环直到边界
      while (arr[++i] < first) {
        if (i >= hi) break;
      }
      while (arr[--j] > first) {
        if (lo >= j) break;
      }
      if (i >= j) break;
      swap(arr, i, j);
    }
    // 交换基点与j位置 这时候以j为边界两边已经分配好了
    swap(arr, lo, j);
    return j;
  }
  // let quicksort = function (arr, lo, hi) {
  //   // 跳出条件
  //   if (lo >= hi) return
  //   let m = partition(arr, lo, hi);
  //   dfs(arr, lo, m - 1)
  //   dfs(arr, m + 1, hi)
  // }
  let quickTopK = function (arr, lo, hi) {
    // 跳出条件
    if (lo >= hi) return
    let m = partition(arr, lo, hi);
    if (m === k) { // 从lo到k的数已经排序完毕
      return;
    } else if(m > k) {
      quickTopK(arr, lo, m - 1)
    } else { // k > m
      quickTopK(arr, m + 1, hi)
    }
    
    
  }
  quickTopK(arr, 0, arr.length - 1);
  for (let i = 0; i < k; i += 1) {
    rlt.push(arr[i])
  }
  console.log(arr)
  return rlt;
}
let arr = [2,3,2,1,2,5,7,9,10,6,4,2];
console.log(topK(arr, 2))
