// 链表的实现
// 单链表
// 单链表包括几个部分 数据部分 + 指针部分 => 节点
// 操作 append insert remove remove_head remove_tail indexOf get head tail length  isEmpty clear print
// 下面是一个简单的无头单链表,他的头节点和首节点是一个节点
class Node {
    constructor(item) {
        this.data = item
        this.next = null
    }
}
class List {
    constructor(item) {
        this.head = null
        this.tail = null
        this.length = 0
    }
    append(item) {
        var node = new Node(item)
        if (this.length === 0) {
            this.tail = this.head = node
        } else {
            this.tail.next = node
            this.tail = node
        }
        this.length ++
    }
    print(cb) {
        let node = this.head
        while(node) {
            cb.call(this,node.data)
            node = node.next
        }
    }
    insert(index, data) {
        let node = new Node(data)
        index = index < 0 ? 0 : 
            index > this.length - 1 ? this.length - 1: index
        let current = this.get(index - 1)
        if (index !== 0) {
            let temp = current.next
            current.next = node
            node.next = temp
        } else {
            node.next = current
            this.head = node
        }
        
    }
    remove(index) {
        let current = this.head,prev,delNode
        index = index < 0 ? 0 : 
            index > this.length - 1? this.length - 1: index
        if (index === 0) {
            delNode = this.head
            this.head = this.head.next
        } else {
            while (index > 0) {
                index --
                prev = current
                current = current.next
            }
            if (current.next) {
                delNode = current
                prev.next = current.next
            } else { // 尾结点
                delNode = this.tail
                this.tail = prev
            }
        }
        return delNode
    }
    get(index) {
        let current = this.head
        while (index > 0) {
            index --
            current = current.next
        }
        return current
    }
    remove_head() {
        this.remove(0)
    }
    remove_tail() {
        this.remove(this.length - 1)
    }
}
let list = new List
list.append(1)
list.append(2)
list.append(31)
list.append(4)
list.insert(1,'a')
list.print(function(data) {
    console.log(data)
})
list.remove(1)
console.log(list,list.get(1))
// 使用链表实现一个栈
class ListStack {
    constructor () {
        let stack = new List()
        this.stack = stack
    }
    pop() {
        return stack.remove_tail()
    }
    push(item) {
        stack.append(item)
    }
    top() {
        return stack.tail()
    }
    size() {
        return stack.length
    }
}
// 使用链表实现一个队列
class ListQueue {
    constructor () {
        let stack = new List()
        this.stack = stack
    }
    enqueue(item) {
        stack.append(item)
    }
    dequeue() {
        return stack.remove_head()
    }

}
/**
 * 翻转列表
 */
var	node1 = new Node(1);
var	node2 = new Node(2);
var	node3 = new Node(3);
var	node4 = new Node(4);
var	node5 = new Node(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
function print(node){
    var	curr_node	=	node;
    console.log(node)
    while(curr_node){
        console.log(curr_node.data);
        curr_node	=	curr_node.next;
    }
};
//	迭代翻转
function reverse_iter(head){
    if (!head) {
        return null
    }
    var pre_node = null
    var current_node = head
    while(current_node) {
        // 保存当前node和上一步node,并进行翻转
        // 单个节点翻转后将node与prevnode向后滑动一格
        var next_node = current_node.next
        current_node.next = pre_node
        pre_node = current_node
        current_node = next_node
    }
    return pre_node
};
print(reverse_digui(node1))
//	递归翻转
// https://blog.csdn.net/FX677588/article/details/72357389
function reverse_digui(head){
    if (!head) {
        return null
    }
    // 递归终止条件,当没有next时,即递归达到最底层,尾结点,直接返回本身
    if (!head.next) {
        return head
    }
    // newhead存放的是尾结点的地址空间
    var newHead = reverse_digui(head.next)
    // 翻转,将当前的下一个节点指向传来的上一个节点
    // 当到达尾结点时,newhead'
    head.next.next = head
    // 避免成环 why
    // 不置空的本来指向的是下一个,递归下层会变成n->next->next将会改变下一个指向
    head.next = null
    return newHead
}
