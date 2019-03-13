
var test = [9, 8, 22, 15, 24, 11.3, 2, 7, 15, 11, 29 , 31, 27, 18, 11.3]
/** tools */
var swapArr = function (arr, i, j) {
  var temp
  temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
/**
 * 冒泡排序 
 * 原理：比较相邻的两个元素，如果第一个比第二个大则交换两个元素位置，依次对每一个元素进行对比，直到最后最后一个元素将会是最大的
 * ps: 冒泡排序是一种稳定的排序，不会改变相同数字相对位置
 * */
var bubble = (arr) => {
  // 无需到最后一个，因为会比较j与j+1
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j],arr[j + 1]] = [arr[j + 1],arr[j]]
      }
    }
  }
}
/**
 * 快速排序
 * 原理：在要排序的序列中选取一个基准值，把序列分成两个部分，循环序列，使得左半部分小于序列值，右半部分大于序列值，然后不断递归左右两个部分
 * 快排是一个不稳定的排序
 */
var quickSort = (arr, left = 0, right = arr.length - 1) => {
  let partritionIndex = right
  // 一次排序完成
  if (left < right) {
    // partritionIndex = partSort(arr, left, right, partritionIndex)
    partritionIndex = partSort1(arr, left, right, partritionIndex)
    quickSort(arr, left, partritionIndex - 1)
    quickSort(arr, partritionIndex + 1, right)
  }
}
// 左右指针法
var partSort = function (arr, left, right, partritionIndex) {
  let key = arr[right]
  // 保证left right相遇时，left左边都是比key小的，right右边都是比key大的
  while (left < right) {

    // 碰到left right不满足条件时跳出，交换
    // 为什么要判断一次left < right 因为当存在两个一样的key时，会满足arr[left] = key,让left++了，这时候left会越界到key的位置去，出现死循环
    while (left < right && arr[left] <= key) {
      ++left
    }
    while (left < right && arr[right] >= key) {
      --right
    }
    swapArr(arr, left, right)
  }
  // left right相遇，将key与left互换
  swapArr(arr, left, partritionIndex)
  return left
}
// 挖坑法
var partSort1 = function (arr, left, right) {
  let key = arr[right]
  while (left < right) {
    // left往后走
    while (left < right && arr[left] <= key) {
      left ++
    }
    // 把arr[right]的值变成left的值。此时key记录了right的值
    arr[right] = arr[left]
    while (left < right && arr[right] >= key) {
      right --
    }
    // 把上一个重复没有改变的arr[left]位置的值改成当前小于key的值
    // 一直到left跟right一样
    arr[left] = arr[right]
  }
  // 将最后一次right的值改成原来key的值
  arr[right] = key
  return right
}
console.log(quickSort(test),test)


/**圆柱部分 */
var Cylinder = function(arr){
  let cylinders = this
  // 原数组
  this.arr = arr
  // dom数组
  this.cylinderList = []
  this.init()
  this.getNodeWith()
  this.swap()
  this.animation.sort()
  return cylinders
}
// 获取节点距离
Cylinder.prototype.getNodeWith = function () {
  let nodeWith = this.nodeWith = this.getCumptedStyle(this.container.querySelector('.cylinder'),'width') || 40
  let containerWidth = this.getCumptedStyle(this.container, 'width')
  spaceWidth = this.spaceWidth = (containerWidth - nodeWith * this.arr.length) / (this.arr.length - 1)
}
// 初始化
Cylinder.prototype.init = function () {
  let body = document.body
  let container = body.querySelector('.container')
  this.container = container
  this.arr.forEach((item) => {
    let cylinder = document.createElement('div')
    cylinder.setAttribute('class', 'cylinder')
    cylinder.style.height = item * (200 / this.arr.length) + 'px'
    cylinder.innerText = item
    this.cylinderList.push(cylinder)
    container.appendChild(cylinder)
  })
}
// swap
Cylinder.prototype.swap = function (type) {
  // 匹配transform里面数据
  let reg = /(-?\d*\..\d*)/
  let temp
  let animation = this.animation =  new Animation()
  const DELAY = 1
  /** 冒泡排序 */
  var bubbleSwap = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let transformPre = this.cylinderList[j].style.transform.match(reg)
          let transformLast = this.cylinderList[j + 1].style.transform.match(reg)
          if (transformPre) {
            animation.addAnimation(this.cylinderList[j], {
              transform: (this.spaceWidth + this.nodeWith + Number(transformPre[0]))
            }, DELAY, false)
          } else {
            animation.addAnimation(this.cylinderList[j], {
              transform: this.spaceWidth + this.nodeWith
            }, DELAY, false)
          }
          if (transformLast) {
            animation.addAnimation(this.cylinderList[j + 1],{
              transform: -(this.spaceWidth + this.nodeWith ) + Number(transformLast[0])
            }, DELAY, true)
          } else {
            animation.addAnimation(this.cylinderList[j + 1],{
              transform: -(this.spaceWidth + this.nodeWith )
            }, DELAY, true)
          }
          swapArr(this.cylinderList, j, j+1)
          swapArr(arr, j, j+1)
        }
      }
    }
    
    
  }
  bubbleSwap(this.arr)
}
Cylinder.prototype.getCumptedStyle = function (node, attr) {
  return parseFloat(window.getComputedStyle(node)[attr])
}

// 动画对象
var Animation = function () {
  this.animationQueue = []
}
/**
 * {node}当前节点
 * {animation} css动画特效
 * {delay} 动画之间延迟
 * {isSync} 是否与上一帧动画同步
 */
Animation.prototype.addAnimation =  function(node, animation, delay, isSync) {
  this.animationQueue.push(
    {
      node,
      animation,
      delay,
      isSync
    }
  )

}
Animation.prototype.sort = function () {
  let reg = /(-?\d*\..\d*)/
  const arrLength = this.animationQueue.length
  this.animationQueue.reduce((pre, cur, index, arr) => {
    if (!pre.isSync) {
      cur.delay += pre.delay
    } else {
      cur.delay = pre.delay
    }
    cur.timeOut = setTimeout(() => {
      let preMove = 0
      let moveNode = function (node) {
        for (var item in node.animation) {
          if (node.node.style[item].match(reg)) {
            preMove = Number(node.node.style[item].match(reg)[0])
          }
          node.node.style[item] = 'translateX(' + (node.animation[item] + preMove) + 'px)'
        }
      }
      moveNode(pre)
      if (index === arrLength - 1) {
        moveNode(cur)
      }
      clearTimeout(cur.timeOut)
      cur.timeOut = null
      cur = null
    },cur.delay)
    return cur
  })
}
// var cylinder = new Cylinder(test)