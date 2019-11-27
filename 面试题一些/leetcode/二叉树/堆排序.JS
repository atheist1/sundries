/**
 * 堆排序的原理就是将一个数组构建成一个最大或者最小堆
 * 最大堆就是满足每一个节点的值都比他子树所有的节点的最大值都大
 * 所以这个时候的根节点的值就是数组最大值
 * 找到第一个最大值后 交换数组最大值与树的最后一个节点的数值 并将最大值移除
 * 直到树只剩一个节点，排序完成
 */
class Heap {
  constructor(arr) {
    this.data = arr;
    this.sort(arr);
  }
  sort (arr) {
    let len = arr.length;
    let count = 0;
    // 从最后一个元素开始找
    while (count < len) {
      for(let i = Math.floor((len - count) / 2); i >=0 ; i -= 1) {
        // 剔除最后一个元素 重新排序堆
        this.buildMaxHeap(arr, i , len - count);
      }
      // 将最大元素与最后一个元素交换
      [arr[0], arr[len - 1 - count]] = [arr[len - 1 - count], arr[0]];
      count += 1;
    }
  }
  // 一次排序将最大元素送到根节点
  buildMaxHeap(arr, i, size) {
    // 左节点位置
    let left = 2 * i + 1;
    // 右节点位置
    let right = 2 * i + 2;
    let max = i;
    if (left < size && arr[left] > arr[max]) {
      max = left;
    }
    if (right < size && arr[right] > arr[max]) {
      max = right;
    }
    if (max !== i) {
      // 交换位置之后 子树被破坏 继续堆查找
      [arr[i], arr[max]] = [arr[max], arr[i]];
      this.buildMaxHeap(arr, max, size);
    }
  }
}