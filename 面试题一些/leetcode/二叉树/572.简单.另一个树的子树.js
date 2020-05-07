/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
  var isValidTree = function(_s, _t) {
    // 上层比较比较成功 到这层两个树都为空代表比较成功
    if (_s == null && _t == null) {
      return true;
    }
    // 上层比较成功 但是这层有一个子树没有子节点了，代表层级对应不上，比较失败
    if (_s == null || _t == null) {
      return false;
    }
    // 当前层的值不一样 比较失败
    if (_s.val != _t.val) {
      return false;
    } else {
      // 当前层值一样，比较两个树的下一层
      return isValidTree(_s.left, _t.left) && isValidTree(_s.right, _t.right);
    }
  }
  if(s == null)
      return false;
  // 一个树是另一个树的子树则要么这两个树相等 要么这个树是左树的子树 要么这个树是右树的子树
  return isValidTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};