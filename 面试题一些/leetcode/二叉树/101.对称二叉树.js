/**
 * 给定一个二叉树，检查它是否是镜像对称的。
 * Definition for a binary tree node.
 *
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
class Tree {
  constructor(arr) {
    this.init(arr);
  }
  init(arr) {
    let nodeList = [];
    // 思路 根据下一层元素构建上一层元素的左右节点 根据索引位置找到上一层位置
    for (let i = 0; i < arr.length; i += 1) {
      nodeList.push(new TreeNode(arr[i]));
      if(i > 0) {
        // 当前节点所在哪一层  
        let q = Math.floor(Math.log2(i + 1));
        // 当前层的元素个数
        let n = Math.pow(2, q);
        // 当前元素在当前层所在的位置
        let idx = i + 1 - n;
        // 当前元素的父亲所在的位置
        let parendIdx = Math.floor(idx / 2);
        // 当前父元素在数组中的位置
        let arrParentIdx = Math.pow(2, q - 1) + parendIdx - 1;
        // 当前元素在数组中的位置
        let arrIdx = Math.pow(2, q) + idx - 1;
        let parent = nodeList[arrParentIdx];
        if (parent.left) {
          parent.right = nodeList[arrIdx];
        } else {
          parent.left = nodeList[arrIdx];
        }
      }
    }
    this.root = nodeList.shift();
    nodeList = null;
  }
}
// 左边的左子树和右边的右子树是否相等 与上右边的左子树与左边的右子树是否相等 只有一个为空返回false
var isSymmetric = function(root) {
  if (root === null) {
      return true;
  }
  var isTree = function (left, right) {
      if (left === null && right === null) {
          return true;
      }
      if (left === null || right === null) {
          return false;
      }
      if (right.val === left.val) {
          return isTree(left.left, right.right) && isTree(left.right, right.left);
      } else {
          return false;
      }
  }
  return isTree(root.left, root.right);
};
