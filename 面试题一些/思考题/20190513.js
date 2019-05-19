// 算法题
// 一个人的手指从大拇指开始数，到小拇指倒过来数 1 2 3 4 5 6 ,请问第n个数后对应的手指是哪个
let getFinger = (num) => {
    /**
        let stack = [1,2,3,4,5,4,3,2]; //[] 1 2 3 4 5 4 3 2 1 2 3 4 5 4 3 2 1 2 3 4 5 4 3 2 1 2
        // 解法1 找规律
        let index = num % 8;
        let returnVal = stack[index - 1];
        return returnVal;
    */
   /**
    *   //解法2
    *  let current = [5,4,3,2,1];
        let store = [];
        let temp;
        let before;
        for (let i = 0; i < num; i++){
            let pop = current.pop();
            store.push(pop);
            if ( before !== store[store.length - 1]) {
                before = store[store.length - 1];
            } else {
                num ++;
            }
            if (current.length === 0) {
                temp = store;
                store = current;
                current = temp;
            }
        }
        return before;
    */
    let flag = 1;
    let returnVal = 0;
    for (let i = 0 ; i < num; i++) {
        returnVal += flag;
        if (returnVal === 1) {
            flag = 1;
        } else if (returnVal === 5) {
            flag = -1;
        }
    }
    return returnVal;
}
console.log(getFinger(22));
console.log(
  '2019年05月09日题:从右手大拇指数数，从1开始，至小拇指后颠倒顺序至大拇指，至大拇指后颠倒顺序至小拇指，如下图：'
);

console.log(`      
              --
         --  |3 |
        |4 | |7 |  --
    --  |6 | |11| |2 |
   |5 | |..| |  | |8 |
   |  | |  | |  | |10|
   |  | |  | |  | |  |  ---
   |  | |  | |  | |  | | 1 |
   |  | |  | |  | |  | | 9 |
   |  | |  | |  | |  | |   |
`);

console.log('问：第1314个数在哪个手指?');

function findFinger(times) {
  const fingers = ['大拇指', '食指', '中指', '无名指', '小指'];
  let idx = 0;
  let sequence = true; // 顺序
  let finger;
  const len = times % 8 === 0 ? 8 : times % 8;
  for (let t = 0; t < len; t += 1) {
    // 标记当前数对应的指头
    finger = fingers[idx];
    // console.log('t', t + 1, idx, finger);
    // 正序
    if (sequence) {
      idx += 1;
      if (idx === 5) {
        idx = 3;
        sequence = false;
      }
    } else {
      // 反序
      idx -= 1;
      if (idx === 0) {
        idx = 0;
        sequence = true;
      }
    }
  }
  console.log(`第${times}个数对应的手指为：${finger}`);
}

function main() {
  findFinger(1314);
}

main();
