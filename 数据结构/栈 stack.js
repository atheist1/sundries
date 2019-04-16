// 实现一个栈 
// 他是一个类,符合先进后出,后进先出的原理
// 操作有 pop push isEmpty top size clear
// function Stack () {
//     var _innerStack = []
//     let length = 0
//     this._innerStack = _innerStack
//     this.length = length
// }
// Stack.prototype.push = function (item) {
//     this._innerStack.push(item)
//     this.length++
// }
// Stack.prototype.pop = function () {
//     if (this.length <= 0) {
//         console.error('该栈为空')
//         return
//     }
//     this.length--
//     return this._innerStack.pop()
    
// }
// Stack.prototype.size = function () {
//     return this.length || this._innerStack.length
// }
// Stack.prototype.top = function () {
//     return this._innerStack[this.length - 1]
// }
// Stack.prototype.clear = function () {
//     this._innerStack = []
//     this.length = 0
// }
// Stack.prototype.isEmpty = function () {
//     return this._innerStack === 0 || this.length === 0
// }
class Stack {
    constructor() {
        var _innerStack = []
        let length = 0
        this._innerStack = _innerStack
        this.length = length
        this._minStack = new Stack
    }
    push(item) {
        if (this._minStack.isEmpty() || this._minStack.top() > item) {
            this._minStack.push(item)
        } else {
            // 如果后面push的数大于当前栈最小的话,直接推入最小值即可,pop出去不会改变最小值  
            this._minStack.push(this._minStack.top())
        }
        this._innerStack.push(item)
        this.length++
    }
    pop() {
        if (this.length <= 0) {
            console.error('该栈为空')
            return
        }
        this.length--
        this._innerStack.pop()
        this._minStack.pop()
        
    }
    size() {
        return this.length || this._innerStack.length
    }
    top() {
        return this._innerStack[this.length - 1]
    }
    clear() {
        this._innerStack = []
        this.length = 0
        this._minItem = void 0
    }
    isEmpty() {
        return this._innerStack === 0 || this.length === 0
    }
    // 返回栈内最小元素,且时间复杂度为o1
    min() {
        return this._minItem
    }
}
/**
let badmintons = new Stack
badmintons.push('badmin1')
badmintons.push('badmin2')
badmintons.push('badmin3')
console.log(badmintons.pop(),badmintons.size(),badmintons.clear(),badmintons.size(),badmintons.pop())
console.log(badmintons.size(),badmintons.length,badmintons.top(),badmintons.pop(),badmintons.top(),badmintons.size())
*/
/**练习1 */
// 判断字符串是否有成对括号出现
var testtify = function (str){
    var testStack = new Stack
    for (let i = 0; i < str.length; i ++) {
        if (str[i] === '(') {
            testStack.push(true)
        } else if (str[i] === ')') {
            testStack.pop()
        }
    }
    return testStack.length === 0
}
var str = '()()sd()(sd()fw))('
console.log(testtify(str))
