// tools
var _toString = Object.prototype.toString
function isTypeOf (obj, type) {
  const map = {
    array: '[object Array]',
    object: '[object Object]',
    undefined: '[object Undefined]',
    null: '[object Null]',
    number: '[object Number]',
    string: '[object String]',
    function: '[object Function]'
  }
  let _type = _toString.call(obj)
  return map[type] === _type
}