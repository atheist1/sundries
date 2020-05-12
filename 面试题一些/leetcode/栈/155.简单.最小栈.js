/****
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
 

示例:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/min-stack
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * initialize your data structure here.
 */
// 解法1 利用链表实现栈 但是不需要完全实现，利用链表储存当增加节点时所对应的最小数字
// class Node {
//   constructor(val, min) {
//     this.value = val;
//     this.next = null;
//     this.min = min;
//   }
// }
// class Link {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }
//   addNode(val) {
//     let node;
//     if (this.head == null) {
//       node = new Node(val, val);
//       this.head = this.tail = node;
//     } else {
//       // 将增加节点后的最小值记录在链表中，代表拥有这个节点时最小值
//       node = new Node(val, Math.min(this.tail.min, val))
//       const tail = this.tail;
//       tail.next = node;
//       node.prev = tail;
//       this.tail = node;
//     }
//     return node;
//   }
//   removeLast() {
//     if (this.tail.prev) {
//       this.tail = this.tail.prev;
//       this.tail.next = null;
//     } else {
//       this.head = this.tail = null;
//     }
//   }
// }
// var MinStack = function () {
//   this.data = [];
//   this.link = new Link()
// };

// /**
//  * @param {number} x
//  * @return {void}
//  */
// MinStack.prototype.push = function (x) {
//   let node = this.link.addNode(x)
//   this.data.push(node);
// };

// /**
//  * @return {void}
//  */
// MinStack.prototype.pop = function () {
//   this.data.pop();
//   this.link.removeLast()
// };

// /**
//  * @return {number}
//  */
// MinStack.prototype.top = function () {
//   return this.data[this.data.length - 1].value;
// };

// /**
//  * @return {number}
//  */
// MinStack.prototype.getMin = function () {
//   if(!this.link.tail) return null;
//   return this.link.tail.min;
// };
// 解法2 在添加的时候用另一个数组储存排序数据
// var MinStack = function () {
//   this.data = [];
//   this._data = [];
// };

// /**
//  * @param {number} x
//  * @return {void}
//  */
// MinStack.prototype.push = function (x) {
//   this.data.push(x);
//   this._data.push(x);
//   this._data.sort((a, b) => b - a)
// };

// /**
//  * @return {void}
//  */
// MinStack.prototype.pop = function () {
//   let rlt = this.data.pop();
//   let idx = this._data.indexOf(rlt);
//   this._data.splice(idx, 1);
// };

// /**
//  * @return {number}
//  */
// MinStack.prototype.top = function () {
//   return this.data[this.data.length - 1];
// };

// /**
//  * @return {number}
//  */
// MinStack.prototype.getMin = function () {
//   return this._data[this._data.length - 1];
// };


// 解法3的原理跟解法1是一样的，不过解法1是重新用链表实现了栈，而这个是直接将最小值追加到data数组中，每次pop pop两个数据出来，每次push push当前值与以当前值为最小值得值

var MinStack = function () {
  this.data = [];
  this.min = Number.MAX_SAFE_INTEGER;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.data.push(x);
  this.min = Math.min(x, this.min);
  this.data.push(this.min);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.data.pop();
  this.data.pop();
  this.min = this.getMin();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.data[this.data.length - 2];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  if(this.data.length === 0) return Number.MAX_SAFE_INTEGER
  return this.data[this.data.length - 1];
};

let minstack = new MinStack();
minstack.push(2147483646);
minstack.push(2147483646);
minstack.push(2147483647);
minstack.pop();
minstack.pop();
console.log(minstack.getMin())
minstack.push(2147483647);
minstack.push(-2147483648);

console.log(minstack)