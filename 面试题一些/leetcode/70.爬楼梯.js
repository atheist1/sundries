 /**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
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
