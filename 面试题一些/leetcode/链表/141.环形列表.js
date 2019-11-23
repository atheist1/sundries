class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class Chain{
  constructor(arr) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.init(arr);
  }
  append(item) {
    var node = new Node(item)
    if (this.length === 0) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }
  print() {
    var temp = '';
    var p = this.head;
    while(p) {
      temp += p.value;
      console.log(temp);
      p = p.next;
    }
  }
  init(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      this.append(arr[i]);
    }
  }
  isCircle() {
    let fast = this.head.next;
    let slow = this.head;
    while (1) {
      if (!fast || !fast.next) {
        return false;
      } else if (fast === slow || fast.next === slow) {
        return true;
      } else {
        fast = fast.next.next;
        slow = slow.next;
      }
    }
  }
}
new Chain([1,9,8,6,7,5,3,4,3,1,2]);