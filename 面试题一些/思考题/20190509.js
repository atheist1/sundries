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
   let currentStack = new Stack();
   currentStack.push(5,4,3,2,1); // 4 3 2  1 2 3 4 5 
   let store = new Stack;
   store.push(4, 3, 2)
   let count = 0;
   while (count  != num ){
        let pop = currentStack.pop();
        store.push(pop);
        if (currentStack.size() == 0) {
            // 交换两个
            let temp = store;
            store = currentStack;
            currentStack = temp;
        }
        count++;
   }
   console.log(currentStack)
}
console.log(getFinger(5))