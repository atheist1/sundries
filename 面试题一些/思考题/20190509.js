// 算法题
// 一个人的手指从大拇指开始数，到小拇指倒过来数 1 2 3 4 5 6 ,请问第n个数后对应的手指是哪个
class Stack {
    constructor() {
        this._innerStack = [];
    }
    push(...items) {
        this._innerStack.push(...items)
    }
    pop(item) {
        return this._innerStack.pop();
    }
    top() {
        return this._innerStack[this.size() - 1];
    }
    size() {
        return this._innerStack.length || 0;
    }
    get(index) {
        return this._innerStack[index];
    }
}
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
console.log(getFinger(22))