/*
 * @Descripttion: 
 * @version: 
 * @Author: qitianle
 * @Date: 2019-10-16 11:45:07
 * @LastEditors: qitianle
 * @LastEditTime: 2020-08-15 15:54:09
 */
/***
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
* @param {number} n
* @return {number}
*/
var climbStairs = function (n) {
    // 普通算法
    // var fibs = (n, n1, n2) => {
    //     if (n === 1) {
    //         return n2;
    //     } else {
    //         return fibs(n-1, n2, n1 + n2);
    //     }
    // }
    // 备忘录算法， 用空间换时间
    // const hashMap = {};
    // var fibs = (n, n1, n2) => {
    //     if (n === 1) {
    //         return n2;
    //     } else if(hashMap[n] !== undefined){
    //        return hashMap[n];
    //     } else {
    //        let num = fibs(n-1, n2, n1 + n2);
    //        hashMap[n] = num;
    //        return num;
    //     }
    // } 
    // 动态规划算法 将空间复杂度降为1 后一项的只依赖于前两项
    let num = 1;
    let a = 1;
    let b = 2;
    let temp = 0;
    if (n === 1) {
        return 1;
    } else if (n === 2) {
        return 2;
    } else {
        for (let i = 2; i < n; i++) {
            temp = a + b;
            a = b;
            b = temp
        }
    }
    return temp;
};