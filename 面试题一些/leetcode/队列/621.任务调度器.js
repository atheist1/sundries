/**
 * 
  给定一个用字符数组表示的 CPU 需要执行的任务列表。其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。

  然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

  你需要计算完成所有任务所需要的最短时间。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/task-scheduler
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
let input = ['a', 'b', 'c', 'c', 'a'];
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  let q = '';
  let Q = {};
  tasks.forEach(item => {
    if (Q[item]) {
      Q[item] += 1;
    } else {
      Q[item] = 1;
    }
  });
  while(1) {
    let keys = Object.keys(Q);
    if (!keys[0]) {
      break;
    }
    let temp = [];
    // n+1为一组， 按照最大的key一个个填充
    for (let i = 0; i < n + 1; i += 1) {
      let max = 0;
      let key;
      let pos = 0;
      keys.forEach((item, idx) => {
        if (Q[item] > max) {
          max = Q[item];
          key = item;
          pos = idx;
        }
      });
      if (key) {
        temp.push(key);
        // 一个组里不能出现同一个字符

        keys.splice(pos, 1);
        Q[key] --;
        if(Q[key] < 1) {
          delete Q[key]
        }
      } else {
        break;
      }
    }
    q += temp.join('').padEnd(n + 1, '-');
  }
  q = q.replace(/-+$/, '')
  return q;
};
// 桶的做法
/**
 * 我们设计桶的大小为 n+1，则相同的任务恰好不能放入同一个桶，最密也只能放入相邻的桶。

对于重复的任务，我们只能将每个都放入不同的桶中，因此桶的个数就是重复次数最多的任务的个数。

一个桶不管是否放满，其占用的时间均为 n+1，这是因为后面桶里的任务需要等待冷却时间。最后一个桶是个特例，由于其后没有其他任务需等待，所以占用的时间为桶中的任务个数。

最终我们得到：

总排队时间 = (桶个数 - 1) * (n + 1) + 最后一桶的任务数

最后，当任务重复率很低时，计算得到的桶个数很少。但由于任务很多，可能出现桶不够用的情况。此时可以假想在最后一桶之后又补充了很多个桶，且所有的桶均装满，因此任务的总等待时间即为任务的总个数。
最后一个桶的任务数是出现最大次数的字母的个数 多余的单独成一组 其余的往最大的字母中填充
AAABBBC最后一个桶的任务数是2
这种方法与第一种方法很像，先排出现次数最多的字母。其余的字母往出现最多的字母中填充，这样保证最后一组永远填充的是出现最多的字母的组合
 * @param {*} tasks 
 * @param {*} n 
 */
var leastInterval = function (tasks, n) {
  if (n == 0) return tasks.length
  let times = new Array(26).fill(0)
  for (let c of tasks) {
      times[c.charCodeAt(0) - "A".charCodeAt(0)]++
  }
  let maxTimes = times[0],
      maxItems = [0]
  for (let i = 1; i < 26; i++) {
      if (times[i] == maxTimes) {
          maxItems.push(i)
      } else if (times[i] > maxTimes) {
          maxTimes = times[i]
          maxItems = [i]
      }
  }
  let ans = (maxTimes - 1) * (n + 1) + maxItems.length
  return Math.max(ans, tasks.length)
};