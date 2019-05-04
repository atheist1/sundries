/**
 * 
 *  2019年04月28日思考题：
 *  数组长度66，存放数据为[1,2,3,4....,65,66].
 *  每次运算如下：[1,2,3...,33],[34,35,36...66],推入另外一个数组[1,34,2,36,3,36,....33,66].
 *  问多少次运算后，数据还原为[1,2,3,4....,65,66].
 */
var arr = [];
for (let i = 1; i <= 66; i++) {
    arr.push(i);
}
const getNum = (arr) => {
    let step = 0;
    const walk = (copy) => {
        const mid = parseInt(copy.length / 2);
        let returnArr = [];
        let left = copy.slice(0, mid); // 1 2 3 4, 1 2 3 4 5
        let right = copy.slice(mid);
        for (let j = 0; j < mid; j++) {
            returnArr.push(left[j],right[j]);
        }
        if (returnArr.toString() === arr.toString()){
            return;
        } else {
            step ++;
            walk(returnArr);
        }
    }
    walk(arr);
    console.log(step);
}
getNum(arr);
