# 数组排序
数组排序是计算机中不管什么语言都是必不可少的一个问题，我们在此进行简单的讨论。
## 冒泡排序
冒泡排序是几大数组排序中最简单的一个方法
难度: 1颗星
原理: 从数组第一位开始往后比较相邻两个数，如果前一个数大于后一个数，则交换两个数的位置，否则向后继续
时间复杂度:O(n2)
是否稳定：是
代码：
```javascript
var swap = function (arr,i ,j) {
  let temp = ''
  temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
var buble = function (arr) {
  let length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length - i - 1; j++) { // 前length-i-1位已经排序成功
      if (arr[j] > arr[j + 1]) { // 无需加等号，加了就变成了不稳定算法了
        swap(arr, i, j)
        swaped = 1
      }
    }
  }
  return arr
}
```
上述代码会有一个缺点，如果传入的数组是一个已经排序完成的算法，则一样会进行两次循环，我们需要想一个办法，把复杂度在最优的情况下减少呢，如下所示：
最优复杂度: O(n)
```javascript
var swap = function (arr,i ,j) {
  let temp = ''
  temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
var buble = function (arr) {
  let length = arr.length
  let swap = true
  for (let i = 0; i < length; i++) {
    swap = true
    for (let j = i; j < length - i - 1; j++) { // 前length-i-1位已经排序成功
      if (arr[j] > arr[j + 1]) { // 无需加等号，加了就变成了不稳定算法了
        swap(arr, i, j)
        swaped = false // 不做无用功，如果第一次比较发现每一个相邻的都不需要交换，则证明是有序数组
      }
    }
    if (swap) {
      break
    }
  }
  return arr
}
```
## 快速排序
快排是排序算法中也不算难的几种算法之一
难度：3颗星
原理: 分治法算法，对一个数组进行不断地进行一个函数处理，把左边的变成比基准小的，右边的变成比基准大的，然后改变基准递归左半部分和右半部分就可以实现排序
代码: 
```javascript
var quickSort = function (arr, left = 0, right = arr.length - 1) {
  let partition = right
  // dosomething
  quickSort(arr, left, partition - 1)
  quickSort(arr, partition + 1, right)
}
```