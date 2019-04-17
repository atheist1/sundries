// 队列
// 与栈不同的是满足先进先出后进后出原则
class Queue {
    constructor() {
        this._innerQueue = []
    }
    enqueue(item) {
        this._innerQueue.push(item)
    }
    dequeue() {
        return this._innerQueue.shift() 
    }
    size() {
        return this._innerQueue.length
    }
    head () {
        return this._innerQueue[0]
    }
    isEmpty() {
        return this._innerQueue.length === 0
    }
    tail() {
        return this._innerQueue[this._innerQueue.length - 1]
    }
}
var numberQueue = function (num) {
    var numQueue = new Queue
    var index = 0
    for (let i = 0; i <= num; i ++) {
        numQueue.enqueue(i)
    }
    // 0 1 2 3 4 5 6 7 8 9 10
    // 0 1 3 4 6 7 9 10
    while (numQueue.size() != 1) {
        let item = numQueue.dequeue()
        index += 1
        if (index % 3 !== 0) {
            numQueue.enqueue(item)
        }
    }
    return numQueue.head()
}
console.log(numberQueue(10))
// 斐波那契
// 下一个数等于上两个数的和
var fibnaci = function (num) {
    var fib = new Queue
    fib.enqueue(1)
    fib.enqueue(1)
    var index = 0
    // 让队列里只存在两个数据
    while (index < num - 2) {
        index ++
        // 把第一个数据移除,等下用作移入下一个数据
        let del = fib.dequeue()
        let head = fib.head()
        fib.enqueue(del + head)
    }
    fib.dequeue()
    return fib.head()
}
console.log(fibnaci(8))
// 用两个队列实现栈
class Stack {
    constructor() {
        var queue1 = new Queue
        var queue2 = new Queue
        this.queue1 = queue1
        this.queue2 = queue2
        this.data_queue = void 0
        this.empty_queue = void 0
    }
    // 保证一个队列为空队列,另一个队列为储存数据的队列
    init() {
        if (this.queue1.isEmpty() && this.queue2.isEmpty()) {
            this.data_queue = this.queue1
            this.empty_queue = this.queue2
        } else if (this.queue1.isEmpty()){
            this.data_queue = this.queue2
            this.empty_queue = this.queue1
        } else {
            this.data_queue = this.queue1
            this.empty_queue = this.queue2
        }
    }
    push(item) {
        this.init()
        this.data_queue.push(item)
    }
    pop() {
        this.init()
        // 这里实际上是一个指针引用,改变的是queue1和queue2的值,当调用init的时候会重置empty和data的
        while(this.data_queue.size > 1) {
            this.empty_queue.enqueue(this.data_queue.dequeue())
        }
        return this.data_queue.head()
    }
    top() {
        return this.data_queue.tail()
    }
}
