/**
 * 编写一段程序来查找第 n 个超级丑数。

  超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。
  输入: n = 12, primes = [2,7,13,19]
  输出: 32 
  解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
*/
/**
 * 丑数是指所有由[2,3,5]为因子组成的数
 * ps: 1也是丑数
 */
/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
// 暴力法 超时
var nthSuperUglyNumber = function(n, primes) {
  // 计算num的质因数
  let getPrimes = function (num) {
    let result = [];
    for(let i = 2; i < num / 2 + 1; i += 1) {
      if (num % i === 0 && !getPrimes(i).length) {
        result.push(i);
      }
    }
    return result;
  }
  let resultArr = [1];
  let count = 1;
  let idx = 2;
  let numArr = [];
  // 从0开始循环 找到n个数后退出
  // 找到这个数的所有质数 保证所有质数都在primes质数列表列
  while(count < n) {
    let canAdd = true;
    numArr = getPrimes(idx);
    if(numArr.length === 0) {
      canAdd = false;
    }
    
    if (primes.indexOf(idx) === -1){
      for (let i = 0; i < numArr.length; i += 1) {
        if (primes.indexOf(numArr[i]) === -1) {
          canAdd = false;
          break;
        }
      }
    } else {
      canAdd = true;
    }
   
    if (canAdd) {
      count += 1;
      resultArr.push(idx);
    }
    idx += 1;
  }
  return resultArr.pop();
};
// 堆排序
var nthSuperUglyNumber = function(n, primes) {
  class Heap {
    constructor(arr) {
      this.max = arr.length;
      this.data = arr;
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
    find(val, i = 0) {
      let arr = this.data;
      let len = arr.length;
      if (val > arr[len - 1] || i > this.max) {
        return false;
      } else if (val === arr[i]) {
        return true;
      } else {
        let left = this.find(val, 2 * i + 1);
        let right = this.find(val, 2 * i + 2);
  
        return left || right;
      }
    }
  }
  // 计算num的质因数
  let getPrimes = function (num) {
    let result = [];
    for(let i = 2; i < num / 2 + 1; i += 1) {
      if (num % i === 0 && !getPrimes(i).length) {
        result.push(i);
      }
    }
    return result;
  }
  let resultArr = [1];
  let count = 1;
  let idx = 2;
  let numArr = [];
  let heap = new Heap(primes);
  // 从0开始循环 找到n个数后退出
  // 找到这个数的所有质数 保证所有质数都在primes质数列表列
  while(count < n) {
    let canAdd = true;
    numArr = getPrimes(idx);
    if(numArr.length === 0) {
      canAdd = false;
    }
    if (heap.find(idx)) {
      canAdd = true;
    } else {
      for (let i = 0; i < numArr.length; i += 1) {
        if (!heap.find(numArr[i])) {
          canAdd = false;
          break;
        }
      }
    }
    
    if (canAdd) {
      count += 1;
      resultArr.push(idx);
    }
    idx += 1;
  }
  return resultArr.pop();
};
