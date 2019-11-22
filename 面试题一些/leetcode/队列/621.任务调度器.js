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
  let head = 0;
  let rear = tasks.length;
  let count = 0;
  let temp;
  for (;;) {
    if (tasks[head] === tasks[head + 1]) { // 队列头相等，将头后移
      temp = tasks.shift();
      tasks.push(temp);
      rear -= 1; 
    } else {
      tasks.shift()
      rear -= 1; 
      count += 1;
    }
    if (head === rear) {
      if (tasks.length === 0) {
        count += n;
        break;
      }
      if (tasks.length > 1) {
        head = 0;
        rear = tasks.length;
        if (tasks[head] === tasks[rear - 1]) {
          count += ((tasks.length  - 1)* n) + tasks.length;
          break;
        }
      }
    }
  }
  return count;
};
var leastInterval = function(tasks, n) {
  let head = 0;
  let rear = tasks.length;
  let count = 0;
  let groupLen = 0;
  let temp;
  for (;;) {
    if (tasks[head] === tasks[head + 1]) { // 队列头相等，将头后移
      temp = tasks.shift();
      tasks.push(temp);
      rear -= 1; 
    } else {
      tasks.shift()
      debugger
      groupLen += 1;
      rear -= 1; 
      count += 1;
    }
    if (head === rear) {
      if (tasks.length === 0) {
        break;
      }
      if (tasks.length > 1) {
        head = 0;
        rear = tasks.length;
        if (tasks[head] === tasks[rear - 1]) {
          break;
        }
        if (groupLen - n <= 0) {
          count += (n - groupLen + 1);
        }
      }
      groupLen = 0;
    }
  }
  return count;
};