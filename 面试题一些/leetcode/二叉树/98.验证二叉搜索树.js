/**
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

  假设一个二叉搜索树具有如下特征：

  节点的左子树只包含小于当前节点的数。
  节点的右子树只包含大于当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/validate-binary-search-tree
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 想法与101题一致
var isValidBST = function(root, uppper) {
  if (!root) {
    return true;
  }
  if (uppper === undefined) {
    uppper = root.val;
  }
  if (root === null) {
    return true;
  }
  if (root.right === null && root.left === null) {
    return true;
  }
  if (root.right && root.right.val <= uppper) {
    return false;
  }
  if (root.left && root.left.val >= uppper) {
    return false;
  }
  return isValidBST(root.left, uppper) && isValidBST(root.right, uppper);
};
// 利用便利 左根右的顺序，保证数组是升序，如果满足升序则正确

var isValidBST = function(root) {
  if (!root) {
    return true;
  }
  let result = true;
  let arr = [];
  var isValid = function (root) {
    if (root === null || !result) {
      return;
    }
    isValid(root.left);
    if (arr[arr.length - 1] >= root.val) {
      result = false;
      return;
    }
    arr.push(root.val);
    isValid(root.right);
  }
  isValid(root);
  return result;
};
var isValidBST = function(root) {
  if (!root) {
    return true;
  }
  let result = true;
  let arr = [root];
  let current = root;
  let prev = Number.MIN_VALUE;
  while(current || arr.length) {
    while(current = current.left) {
      arr.push(current);
    }
    current = arr.pop();
    if (current.right < prev) {
      return false;
    }
    prev = current.val;
    current = current.right;
  }
  return result;
};