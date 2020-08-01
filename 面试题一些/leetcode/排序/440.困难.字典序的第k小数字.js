/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-08-01 10:10:52
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-01 15:34:06
 * 给定整数 n 和 k，找到 1 到 n 中字典序第 k 小的数字。

注意：1 ≤ k ≤ n ≤ 109。

示例 :

输入:
n: 13   k: 2

输出:
10

解释:
字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */ 
/**解法1 快排 超时
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function(n, k) {
  let arr = [];
  if (k === 1) return 1
  let swap = function (arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }
  for (let i = 1; i <= n; i += 1) {
    arr.push(i);
  }
  var partition = function (arr, lo, hi) {
    let i = lo;
    let j = hi + 1;
    let first = arr[i]
    while(true) {
      while(`${arr[++i]}` < `${first}`) {
        if (i >= hi) break;
      }
      while (`${arr[--j]}` > `${first}`) {
        if (j <= lo) break;
      }
      if (i >= j) {
        break;
      }
      swap(arr, i , j)
    }
    swap(arr, lo, j)
    return j;
  }
  let quickSort = function (arr, lo, hi) {
    if (lo >= hi) return;
    // 找到分界点
    let m = partition(arr, lo, hi);
    
    quickSort(arr, lo, m - 1);
    quickSort(arr, m + 1, hi);
  }
  quickSort(arr, 0, arr.length - 1)
  console.log(arr);
  return arr[k - 1]
};
/**
 * 解法2 树的规律 超时
 * @param {*} n 
 * @param {*} k 
 */
var findKthNumber = function(n, k) {
  let rlt;
  if (k === 1) return 1;
  let getDigital = function (n) {
    let digital = 1;
    while (n = parseInt(n / 10)) {
      digital += 1;
    }
    return digital
  }
  let dfs = function (m, prev) {
    if (m < 1 || prev > n || k <= 0) {
     
      return;
    };
    for (let i = 0; i <= 9; i += 1) {
      let next = prev * 10 + i;
      if (k <= 0) break;
      if (next <= n) {
        k -= 1;
        rlt = next;
        dfs(m - 1, next)
      }
    }
    return;
  }
  let digital = getDigital(n);
  for (let i = 1; i <= 9; i += 1) {
    if (k <= 0) break
    rlt = i;
    k -= 1;
    dfs(digital, i)
  }
  return rlt;
};
/**
 * 解法3 跟解法2思路类似 使用十叉树为一个思想去算
 * @param {*} n 
 * @param {*} k 
 */
var findKthNumber = function(n, k) {
  let p = 1; // 指针 表示当前是第几个数
  let prefix = 1;
  // 找到以某个数字为前缀 到 n中最大能包含的节点数 比如1->2 n = 3时 包含了一个 n = 20时 包含了10个
  let getCount = function(prefix, n) {
    // 当前子树
    let start = prefix;
    // 右边子树
    let next = prefix + 1;
    let count = 0;
    while (start <= n) { // 如果start > n了代表节点已经移动到右边的十叉树里去了 回退一步 多余的几个节点数由下次移动计算
      if (next > n) { // 如果右边子树的位置已经比n大了代表这不是一个满的十叉树 count计算的值就不需要用下个子树的位置减去这个了
        count += n - start + 1; // 只到n就结束了二叉树
      } else {
        count += next - start;
      }
      // 十叉树向下移动一层
      start *= 10;
      next *= 10;
    }
    return count;
  }
  /**
   * 举个例子 求 n= 20 k = 3的
   * 从1开始找 找到 1->2之间能包含的数量 为1 进入下面的if 找2->3 3 -> 4
   */
  // p从1开始找子树
  while (p < k) {
    // 以当前为开始做一个区间 找 以当前为前缀到n能容纳的节点数
    let count = getCount(prefix, n)
    if (count + p > k) { // 当前位置加上以当前数字为前缀 到下一个数字能容纳的节点数大于k 代表k在以当前为前缀的区间内 只需要到区间内部去找即可，即前缀向下移动 * 10
      prefix *= 10; // 当前节点到k节点已经超出了，要走子节点一个个移动
      p += 1; // 只移动了一位 即向下移动 prefix本来是1 移动变成 10 p本来是1 移动到了第2位
    } else if (count + p <= k) { // 以当前数字为前缀到n这个区间 能找到的count 加上自己本身在的位置小于k代表当前数字为前缀已经不够了 需要向右挪动当前位置
      prefix += 1; // 移动子树到右边 即当前节点到右边节点不需要走子节点 直接算所有即可
      p += count; // 把中间移动的所有节点数加上 下次从右边子树开始算
    }
  }
  return prefix;
};
console.log(findKthNumber(10
 ,3))