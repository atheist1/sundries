/*
* 获取计算完成属性
* element -> dom元素
* attr -> 参数名
*/
function getStyle(element, attr) {
  if(element.currentStyle) {
          return element.currentStyle[attr];
  } else {
          return getComputedStyle(element, false)[attr];
  }
}
