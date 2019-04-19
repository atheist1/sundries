# 数据结构之如何实现一个树
## 前言
这是js数据结构进阶篇之树的实现，树状结构在js中用法非常广泛，作为一个计算机程序员了解他是必不可少的。  
从json树状结构，到vnode父子树结构，每一个都是非常经典的应用。  
## 定义
### 二叉树
一种特殊的树，他的节点最多只有两个，左节点和右节点
### 满二叉树
每一个子集的孩子都拥有两个
### 完全二叉树
完全二叉树类似于满二叉树，但是有点不同的是，满二叉树只要保证倒数第二层是满的即可，最后一层只要保证从右向左连续缺若干个节点即可
### 代码实现
节点实现
```javascript
class Node {
  constructor(data) {
    this.data = data
    this.parenNode = null
    this.leftChild = null
    this.rightChild = null
  }
}
```
树的实现是基于节点实现的
```javascript
class Tree{
  // 用某种方式实现树的表示
  // A(B(D,E(G,)),C(,F))
  constructor(str) {
    init(str)
  }
  init(str) {
    // 利用栈保存当前父节点
    let stack = new Stack
    let newNode = null
    let k = 1
    for (let i = 0; i < str.length; i++) {
      let item = str[0]
      if (item === '(') {
        stack.push(newNode)
        // 下一个要处理的是左节点
        k = 1
      } else if (item === ',') {
        k = 2
        // 碰到逗号表示上一个处理的是左节点，下一个要处理的是右节点
      } else if (item === ')') {
        // 碰到右括号出栈，表示当前树节点处理完毕
        // 最后一次处理将会把栈顶元素覆给根元素
        this.root = stack.pop()
      } else {
        // 拿到当前栈顶元素，栈顶元素是当前处理元素的父元素，如果没有栈顶元素表示处理完毕
        let top = stack.top()
        if (!top) {
          return
        }
        newNode = new Node(item)
        newNode.parentNode = top
        // 判断下当前处理的node是左节点还是右节点
        if (k === 1) {
          top.leftChild = newNode
        } else {
          top.rightChild = newNode
        }
      }
    } 
  }
}
```
树的初始化完毕后我们来研究下树的三种排序方式

```javascript
// 前序排序 左右根
inOrder = function(cb) {
  var in_order = (node) => {
    if (!node) {
      // 递归结束条件
      return
    }
    cb.call(this, node)
    in_order(node.leftChild)
    in_order(node.rightChild)
  }
}
// 中序排序 左根右
midOrder = function(cb) {
  var mid_order = (node) => {
    if (!node) {
      // 递归结束条件
      return
    }
    mid_order(node.leftChild)
    cb.call(this, node)
    mid_order(node.rightChild)
  }
}
// 后序排序 左右根
lastOrder = function(cb) {
  var last_order = (node) => {
    if (!node) {
      // 递归结束条件
      return
    }
    last_order(node.leftChild)
    cb.call(this, node)
    last_order(node.rightChild)
  }
}
```