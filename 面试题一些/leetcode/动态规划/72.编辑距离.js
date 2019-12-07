/**
 * 给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。

  你可以对一个单词进行如下三种操作：

  插入一个字符
  删除一个字符
  替换一个字符

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/edit-distance
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 
 * 输入: word1 = "horse", word2 = "ros"
    输出: 3
    解释: 
    horse -> rorse (将 'h' 替换为 'r')
    rorse -> rose (删除 'r')
    rose -> ros (删除 'e')
 * @param {*} word1 
 * @param {*} word2 
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 分析
// 从a[0...i - 1] 变成b[0 ... j - 1]需要k步
// 如果a[i] === b[j] 则a[0...i]变成b[0...j]需要k步
// 否则需要替换一个元素 则k+1步

// 从a[0...i]变成b[0...j - 1]需要k步
// 则从a[0...i]变成b[0...j]需要k + 1步 插入一个b[j - 1]

// 从a[0...i - 1]到b[0...j]需要k步
// 则从a[0...i]变成b[0...j]需要增加一个b[j] 则k + 1步
// 所以从a[0...i]变成b[0...j]需要用步数最小的那个dp
var minDistance = function(word1, word2) {
  let m = word1.length;
  let n = word2.length;
  // dp[i][j]代表word1从0-i转换成word2从0-j所需要的步骤
  let dp = new Array(m + 1).fill('').map(item => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) {
    // 删除i个才能到0
    dp[i][0] = i;
  }
  for (let i = 0; i <= n; i += 1) {
    // 删除i个才能到0
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      let shouldAdd = word1[i - 1] !== word2[j - 1];
      let f1 = (dp[i - 1][j - 1] || 0) + (shouldAdd ? 1 : 0);
      let f2 = (dp[i][j - 1] + 1) || 0;
      let f3 = (dp[i - 1][j] + 1) || 0;
      let min = Math.min(...[f1,f2,f3]);
      dp[i][j] = min;
    }
  }
  return dp[m ][n];
};