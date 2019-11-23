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
    this.print();
    this.sort(this.head);
    this.print();
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
  swap(p, q) {
    var temp = p.value;
    p.value = q.value;
    q.value = temp;
  }
  sort(begin, end) { // 链表的快排
    if (begin && begin !== end) {
      let partion = this.sortBy(begin, end);
      this.sort(begin, partion);
      this.sort(partion.next, end);
    }
  }
  // 输入起始节点输入终止节点返回基准位置
  sortBy(begin, end) {
    // 这里是一次交换
    // 9 8 6 7 5 3 4 2 1
    // 找一个值为基准值，p指针移动 如果当前值小于基准值 移动q指针保持q指针左侧都比q的值小
    // 如果当前p指针指向的值大于基准元素，则交换q指针的下一个与p指针的值 q指针往后移动一个
    let q = begin.next;
    let p = begin;
    let val = begin.value;
    while (q != end) {
      // 比基准元素小 交换p的下一个节点的值与q的值并将p往下移动
      if (q.value < val) {
        p = p.next;
        this.swap(p, q);
      }
      q = q.next;
    }
    // 到达最后，将基准节点与p所在的元素交换位置，保证p的左边都比基准小
    this.swap(p, begin);
    return p;
  }
}
new Chain([1,9,8,6,7,5,3,4,3,1,2]);