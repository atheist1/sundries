/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2020-07-30 16:25:04
 * @LastEditors: qitianle
 * @LastEditTime: 2020-07-30 17:06:51
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let row = board.length;
  let col = board[0].length
  if (word.length === 0) return false;
  if (row === col && row === 1) {
    return board[0][0] === word;
  }
  let dfs = function (i, j, idx) {
    if (i >= row || j >= col || i < 0 || j < 0) return false;

    if (idx === word.length) {
      return true;
    }
    let temp = board[i][j];
    if (word[idx] === board[i][j]) {
      board[i][j] = 1;
    } else {
      return false
    }
    let nextIdx = idx + 1;
    if (dfs(i - 1, j, nextIdx) ||
      dfs(i + 1, j, nextIdx) ||
      dfs(i, j - 1, nextIdx) ||
      dfs(i, j + 1, nextIdx)) {
      return true;
    }
    board[i][j] = temp;
  }
  let flag = false;
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }
  return flag
};
console.log(exist([["C","A","A"],["A","A","A"],["B","C","D"]]
  , "AAB"))