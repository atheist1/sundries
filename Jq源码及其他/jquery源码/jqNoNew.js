// 实现一个jquery的无new构造
function jQuery(selector, context) {
    return new jQuery.prototype.init(selector, context)
}
jQuery.prototype = {
    constructor: jQuery,
    init: function(selector, context) {
        console.log(this) // 这里的this指向的是init，init原型也不是jquery
        return this
    }
}
jQuery.prototype.init.prototype = jQuery.prototype
jQuery('#id')