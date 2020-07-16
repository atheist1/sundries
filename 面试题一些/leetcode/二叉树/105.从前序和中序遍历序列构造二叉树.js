/****
 * 根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
前序遍历 根左右
中序遍历 左根右
后项遍历 左右根
从前序遍历开始
第一个元素肯定是这个树的根元素
找到根元素在中序遍历中的位置 如果为第一个 代表该树没有左节点 那么中序的下一个必然为右节点
如果不为第一个 代表根元素左边的一半是他的左子树 右边的一半是右子树 切割build就好了
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  
  let _buildTree = function(preorder, inorder) {
    if(inorder.length === 0) return null;
    let val = preorder[0];
    let root = new TreeNode(val);
    let index = inorder.indexOf(val);
    let left = inorder.slice(0, index);
    let right =  inorder.slice(index + 1);
    root.left = _buildTree(preorder.slice(1, index + 1), left);
    root.right = _buildTree(preorder.slice(index + 1), right);
    return root;
  }
  
  return _buildTree(preorder, inorder);
};