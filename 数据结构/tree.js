// 实现一个树
// 1.实现一个节点
class Node{
  constructor(data) {
    this.parentNode = null
    this.leftChild = null
    this.rightChild = null
    this.data = data || ''
  }
}
class Tree {
  constructor(str)  {
    // A(B(D,E(G)),C(,F))
    this.node = null
    this.init(str)
    // 遇到
  }
  // init(str) {
  //   let stack = new Stack()
  //   // 左右括号逗号都表示不同的情况
  //   let newNode = null
  //   let k = 1
  //   for (let i = 0 ;  i < str.length; i++) {
  //     var item = str[i]
  //     if (item === '(') {
  //       // 将节点推入
  //       stack.push(newNode)
  //       k = 1
  //     } else if (item === ',') {
  //       k = 2
  //     } else if (item === ')'){
  //       // 将父节点推出
  //       stack.pop()
  //     } else { // 单数据出现表示是一个节点
  //       newNode = new Node(item)
  //       // 这里是精髓，栈顶元素是当前的父元素，每当碰到左括号时将会把当前父元素推入栈内
  //       // 遇到右括号证明当前节点父亲处理完毕，出栈
  //       // 栈顶元素就是当前处理的节点的父元素
  //       let topNode = stack.top()
  //       newNode.parentNode = topNode
  //       if (topNode){
  //         if (k === 1) { // 表示上一个处理的是左括号
  //           topNode.leftChild = newNode
  //         } else if (k === 2) {
  //           topNode.rightChild = newNode
  //         }
  //       }
  //     }
  //   }
  // }
  init(str) {
    var stack = new Stack
    let newNode = null
    var k = 1
    var topNode = null
    this.length = 0
    this.height = 0
    let walkTree =(str) => {
      var item = str[0]
      if (item === '(') {
        // 将节点推入
        stack.push(newNode)
        // 推入节点表示有一个父级
        this.height ++
        k = 1
      } else if (item === ',') {
        k = 2
      } else if (item === ')'){
        this.node = stack.pop()
      } else { // 单数据出现表示是一个节点
        item && this.length ++
        newNode = new Node(item)
        topNode = stack.top()
        if (topNode) {
          newNode.parentNode = topNode
          if (k === 1) {
            topNode.leftChild = newNode
          } else {
            topNode.rightChild = newNode
          }
        }
      }
      if (!item) {
        return
      }
      walkTree(str.slice(1))
    }
    walkTree(str)
  }
  // 返回节点个数
  size() {
    let root = this.node
    let length = 0
    var countNode = (node) => {
      if (node) {
        length ++
        countNode(node.rightChild)
        countNode(node.leftChild)
      }
    }
    countNode(root)
    return length
  }
  // 返回数的高度
  getHeight() {
    // return this.height
    // 其他做法，左子树右子树高度取最大值，最后加上当前高度
    let root = this.node
    let count_height = (node) => {
      if (!node) {
        // 到达最底层，返回0
        return 0
      }
      let left_height = count_height(node.leftChild)
      let right_height = count_height(node.rightChild)
      // 返回的是最深层的
      if (left_height > right_height) {
        return left_height + 1
      } else {
        return right_height + 1
      }
    }
    return count_height(root)
  }
  // 查找节点
  findNode(node, data) {
    if (!node) {
      return null
    }
    if (node.data === data) {
      return node
    }
    let res = this.findNode(node.leftChild,data)
    if (res) {
      return res
    }
    return this.findNode(node.rightChild,data)
  }
  // 中序优先遍历
  // 左根右
  in_order(cb) {
    let root = this.node
    let mid = (node) => {
      if (!node) {  
        return
      }
      mid(node.leftChild)
      cb.call(this, node.data)
      mid(node.rightChild)
    }
    mid(root)
  }
  // 先序优先遍历
  // 根左右
  pre_order(cb) {
    let root = this.node
    let pre = (node) => {
      if (!node) {  
        return
      }
      cb.call(this, node.data)
      pre(node.leftChild)
      pre(node.rightChild)
    }
    pre(root)
  }
  // 后序优先遍历
  // 左右根
  last_order(cb) {
    let root = this.node
    let last = (node) => {
      if (!node) {  
        return
      }
      last(node.leftChild)
      last(node.rightChild)
      cb.call(this, node.data)
    }
    last(root)
  }
  // 翻转左右节点
  // 练习题，翻转一个链表
  // 每个节点的左右子树进行对换
  reverse(node) {
    if (!node) {
      return
    }
    this.reverse(node.leftChild)
    this.reverse(node.rightChild)
    let temp = node.rightChild
    node.rightChild = node.leftChild
    node.leftChild = temp
  }
  closetsParent(node, o1, o2) {
    // 向下递归，找到节点相同时则返回节点
    if (node === null || node === o1 || node === o2) {
      return node
    }
    let left = this.closetsParent(node.leftChild, o1, o2)
    let right = this.closetsParent(node.rightChild, o1, o2)
    // 左右都找到的话代表在node的子层找到了，不管有多深代表我都找到了
    if (left !== null && right !== null) {
      return node
    }
    // 左右有一个为空的话表示该node下只找到了一个节点，或者干脆没有，回溯到上上层
    // 同样的事情做层数次，每次node保存的都是父节点
    return left != null ? left : right
  }
}
let tree = new Tree('A(B(D,E(G,)),C(,F))')
tree.pre_order(console.log)
console.log('//////')
tree.in_order(console.log)
console.log('//////')
tree.last_order(console.log)
console.log(tree.size(),tree.getHeight())
// tree.reverse(tree.node)
console.log(tree.findNode(tree.node, 'N'),tree.in_order(console.log),tree.node)
console.log(tree.closetsParent(tree.node, tree.findNode(tree.node, 'D'), tree.findNode(tree.node, 'F')))
// 寻找两个节点的最近公共父节点