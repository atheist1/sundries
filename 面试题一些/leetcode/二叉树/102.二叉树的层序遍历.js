/**
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * [3,9,20,null,null,15,7],
 *     3
      / \
      9  20
        /  \
      15   7
 * [
  [3],
  [9,20],
  [15,7]
]
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 解法1 递归 即广度优先遍历
 */
// 1. 找到根元素 根为空 返回null 根不为空 返回
// 2. 递归节点的左节点和右节点 如果左右节点不为空 推入数组
var levelOrder = function (root) {
  let rlt = [];
  // 用一个idx记录当前层数，相同层的则推入同一个数组
  var _levelOrder = function (root, level) {
    if (!root) {
      return null;
    }
    // 当前层
    if (!rlt[level]) {
      rlt[level] = [];
    }
    rlt[level].push(root.val);
    // 左边下层
    _levelOrder(root.left, level + 1);
    // 右边下层
    _levelOrder(root.right, level + 1);
  };
  _levelOrder(root, 0);
  return rlt;
};
/**
 * 深度搜索2
 * @param {*} root
 */
var levelOrder = function (root) {
  let stack = [
    {
      level: 0,
      root,
    },
  ];
  let rlt = [];
  let current;
  while (stack.length > 0 && root) {
    current = stack.pop();
    let root = current.root;
    let level = current.level;
    if (!rlt[level]) rlt[level] = [];
    rlt[level].push(current.root.val);

    level += 1;
    if (root.left) {
      stack.unshift({
        root: root.left,
        level,
      });
    }
    if (root.right) {
      stack.unshift({
        root: root.right,
        level,
      });
    }
  }
  return rlt;
};
// 宽度优先搜索 用空间换取时间 一半利用队列 换取递归的时间
var levelOrder = function (root) {
  if(root == null) {
    return [];
  }
  let stack = [root];
  let rlt = [];
  while (stack.length > 0) {
    let _rlt = [];
    let len = stack.length;
    // 一次遍历一层
    for (let i = 0; i < len; i += 1) {
      let current = stack.pop();
      if(current) _rlt.push(current.val);
      if(current.left) stack.unshift(current.left);
      if(current.right) stack.unshift(current.right);
    }
    rlt.push(_rlt);
  } 
  return rlt;
};
