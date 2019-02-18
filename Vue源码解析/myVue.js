/**
 * tools
 */
//basic attr
var basicAttr = ['class','value','id','name','checked']
var attrInArray = function (name) {
  return !!~basicAttr.indexOf(name)
}
function parsePath (path) {
  // 转换路径 取值和赋值函数
  var bailRE = /[^\w.$]/;
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.')
  return function (obj) {
    for ( let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]] 
    }
    return obj
  }
}
function findThis (obj, path, newVal) {
  let pathArr = path.split('.')
  for (let i = 0; i < pathArr.length; i ++ ) {
    // 如果不用undefined的话会出现输入空数值将不会监听变化
    if (obj[pathArr[i]] !== undefined) {
      if (i === pathArr.length-1) {
        obj[pathArr[i]] = newVal
        break
      }
      obj = obj[pathArr[i]]
    }
  }
  return obj
}
function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 * Define a property.
 * 定义一个对象的property
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

//proxy代理
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: null,
  set: null
}
function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxyGetter (val) {
    this[sourceKey][key] = val
  } 
  Object.defineProperty(target, key, sharedPropertyDefinition)
}


/**
 * render
 */
function compiles (el) {
  let dom = document.getElementById(el)
  let nodeToFragment = function (dom) {
    let fragment = document.createDocumentFragment()
    var child = dom.firstChild
    while (child) {
      fragment.appendChild(child)
      // 这里不是一个重复的过程，appendChild会将firstChild移除，然后一如fragment里面
      child = dom.firstChild
    }
    return fragment
  }
  let frag = nodeToFragment(dom)
  return frag
}
function compileElment (vm, el) {
  let childNodes = el.childNodes
  let self = this;
  [].slice.call(childNodes).forEach(function (node) {
    let reg = /\{\{(.*)\}\}/
    let text = node.textContent
    // 解析{{}}
    if (self.isTextNode(node) && reg.test(text)) {
      self.compileText(vm, node, reg.exec(text)[1])
    }else if(self.isDomNode(node)) {
      self.compile(vm, node)
      if (node.childNodes && node.childNodes.length) {
        self.compileElment(vm,node)
      } 
    }
    
  })
}
function compileText (vm, node, data) {
  let self = this
  let exp
  let path = parsePath(data)
  let val = path(vm)
  try {
    exp = new Function(("return " + data))
  }catch(e){
    console.error(e)
  }
  update(node, vm, val, exp)
  new Watcher(vm, data, function (value) {
    self.update(node, vm, value, exp)
  })
}
function compileModel (vm, node, data) {
  let self = this
  let path = parsePath(data)
  let val = path(vm)
  this.updateModel(node, vm, val)
  new Watcher(vm, data, function (value) {
    self.updateModel(node, vm,value)
  })
  node.addEventListener('input', function (e) { 
    let newVal = e.target.value
    if (val === newVal) {
      return
    }
    findThis(vm, data, newVal)
  })
}
function compileBind (vm, node, data, attrName) {
  let self = this
  let path = parsePath(data)
  let val = path(vm)
  let trueAttrName = attrName.split(':')[1]
  this.updateAttr(node, vm, val)
  new Watcher(vm, data, function (value) {
    self.updateAttr(node, vm, value)
  })
}
function compile (vm, node) {
  let attributes = node.attributes
  let self = this
  Array.prototype.forEach.call(attributes, function (item) {
    let attrName = item.name
    let value = item.value
    if (self.isDirective(attrName)) {
        if (attrName.slice(2) === 'model') {
          node.removeAttribute(attrName)
          self.compileModel(vm, node, value)
        } else if (attrName.slice(2) === 'bind') {
          self.compileBind(vm, node, value, attrName)
        }
    }
  })
}
function update(node, vm, data,exp) {
  node.nodeValue = data
}
function updateModel (node, vm, data) {
 
  node.value = data
}
function updateAttr (node, vm, data) {
  node.setAttribute(data,)
}
function isTextNode (node) {
  if (node) {
    return node.nodeName === '#text'
  }
  return false
}
function isDomNode (node) {
  return node.nodeType === 1
}
function isDirective (name) {
  return (!this.attrInArray(name) && name.indexOf('v-') === 0)
}
function initRender (vm) {
  compileElment(vm, vm.$option.el)
}


/**
 * Vue
 */

var uid$1 = 0
function Vue (options) {
  if(!(this instanceof Vue)) {
    console.error('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
Vue.prototype._init = function (options) {
  var vm = this
  vm._uid = uid$1 ++
  vm.$option = options
  initState(vm)
  initRender(vm)
}
Vue.prototype.$watch = function (expOrFn, handler, options = {}) {
  var vm = this
  options.user = true
  var watcher = new Watcher(vm, expOrFn, handler, options)
  if (options.immediate) {
    handler.call(vm, watcher.value)
  }
  return function unwatchFn () {
  
  }
}
//初始化状态
function initState (vm) {
  vm._watchers = []
  let opt = vm.$option
  if (opt.data) {
    initData(vm)
  }else{
    observe(vm._data = {}, true)
  }
  if (opt.computed) {
    initComputed(vm, opt.computed)
  }
  if (opt.watch && opt.watch !== opt.nativeWatch) {
    initWatch(vm, opt.watch)
  }
}
// 初始化数据
function initData (vm) {
  let data = vm.$option.data
  data = vm._data = typeof data === 'function'
    ? data()
    : data || {}
  let keys = Object.keys(data)
  let i = keys.length
  while(i--){
    proxy(vm, '_data', keys[i])
  }
  observe(data)
} 
// 初始化计算属性
function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null)
  vm._computed = {}
 
  for (let key in computed) {
    var userDef = computed[key]
    var getter = typeof userDef === 'function'
      ? userDef
      : userDef.get || {}
    // 获取用户定义函数
    
    // computed不需要cb，在他的get上定义了真实的数据
    // 这一步用于保存watcher
    watchers[key] = new Watcher(vm, getter,() => {})
    // 这一步才是真正的劫持
    defineComputed(vm, key, getter)
  }
  
}
// 初始化watch
/**
 * watch实际上是对watch数据的监听
 */
function initWatch (vm, watch) {
  for (let key in watch) {
    let handler = watch[key]
    if (Array.isArray(handler)) {
      for(let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
/**
 * 这里时computed的关键所在
 */
function defineComputed (
  target,
  key,
  userDef
) {
  // 此处将computed的属性代理到vm上去，当访问{{c}}时调用了.get方法，
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = userDef
  } else {
    /**
     * 处理
     * computed : {
     *  c: {
     *    get () {
     *      return this.a + this.b
     *    },
     *    set (newVal) {
     *    
     *    } 
     *  }
     * }
     */
    sharedPropertyDefinition.get = userDef.get
      ? createComputterGetter(key)
      : userDef.get
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : userDef.set
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
function createComputterGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      
        watcher.evaluate()
     
      if (Dep.target) {
        // 把watcher推入当前的get中
        watcher.depend()
      }
      return watcher.value
    }
  }
}
function createWatcher (vm, key, handler, options = {}) {
  if (isPlainObject(handler)) {// 如果是一个存粹的数组
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    // 查找method里面的handler
    handler = vm[handler]
  }
  return vm.$watch(key, handler, options)
}


/**
 * Observe
 */
// 数组方法
var arrayMethods = Object.create(Array.prototype)
// 如 concat这样的方法会返回一个新数组，然后让旧数组等于新数组
var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach((method) => {
  var origin = Array.prototype[method]
  
  def(arrayMethods, method, function mutator () {
    let insert
    var args = [], len = arguments.length
    while ( len-- ) args[ len ] = arguments[ len ]
    let result = origin.apply(this, args)
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        insert = args
        break
      case 'splice':
        insert = args.slice(2)
        break
    }
    if (insert) { observe(insert) }
    ob.dep.notify()
    return result
  })
})
// es2015 Proxy监听数组变化 
// 相当于一个适配器，只需要
var track = function track (obj, fn) {
  new Proxy (obj, {
    set (obj, prop, val) {
      const oldVal = obj[prop]
      Reflect.set(obj, prop, val)
      fn(obj, prop, oldVal, val)
    },
    deleteProperty (obj, prop, oldVal, val) {
      const oldVal = obj[prop]
      Reflect.set(obj, prop, val)
      fn(obj, prop, oldVal, val)
    }
  })
}
var protoAugment = function protoAugment (target, src ,keys) {
  target.__proto__ = src
}
var observe = function observe (value) {
  var ob
  if (value === null || typeof value !== 'object') {
    return
  }
  if (Object.prototype.hasOwnProperty.call(value, '__ob__')) {
    ob = value.__ob__
  }else if (!value.isVue || isPlainObject(value) || Array.isArray(value)) {
    ob =  new Observe(value)
  }
  return ob
}
var Observe = function Observe (value) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
    var argument = protoAugment
    // 将数组方法重新覆盖
    argument(value, arrayMethods)
    this.observeArray(value)
  } else {
    this.walk(value)
  } 
}
Observe.prototype.walk = function (obj) {
  var keys = Object.keys(obj)
  for(let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i])
  }
}
Observe.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
function defineReactive (obj, key, val) {
  //获取本有的描述
  var property = Object.getOwnPropertyDescriptor(obj, key)
  var dep = new Dep()
  if (arguments.length === 2) {
    val = obj[key]
  }
  var getter = property && property.get
  var setter = property && property.set
  var childOb = observe(val)
  // 劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      var value = getter ? getter.call(obj) : val
      // 观察
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return value
    },
    set: function (newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      val = newVal
      // 这一步用于在this.a = xxx时重新监听
      // 不加这一步数据监听将会失效
      childOb = observe(newVal)
      // 提醒订阅者
      dep.notify() 
    }
  })
}

/**
 * Dep 用于联动Observe和Watcher
 */
var uid = 0
var Dep = function Dep () {
  this.subs = []
  this.id = uid++
}
Dep.prototype.depend = function () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}
Dep.prototype.notify = function () {
  let subs = this.subs.slice()
  for(let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}
/**
 * watcher 订阅者
 */
var Watcher = function Watcher (vm, fn, cb, opt) {
  this.vm = vm
  if (opt) {
    // 判断是不是是watcher
    this.user = !!opt.user
  }
  vm._watchers.push(this)
  this.getter = fn
  this.cb = cb
  this.depsId = []
  this.deps = []
  this.value = this.get()
  
}
Watcher.prototype.addDep = function addDep (dep) {
  let id = dep.id
  if (!~this.depsId.indexOf(id)) {
    dep.addSub(this)
    this.depsId.push(id)
    this.deps.push(dep)
  }
 
}
Watcher.prototype.update = function update () {
  // 表示是watcher
  if (this.user) {
    // this.cb.call(this.vm, this.value, this.get())
    this.cb.call(this.vm, this.value, this.get())
  } else {
    this.cb.call(this.vm, this.get())
  }
  
}
Watcher.prototype.get = function get () {
  pushTarget(this)
  var value
  try {
    // 调用了data的get，将当前的target推入
    // value = this.vm[this.getter]
    // 底下这部操作是为了监视a.b.c这样的数据变化
    if(typeof this.getter === 'function') {
      value = this.getter.call(this.vm,this.vm)
    }else{
      let path = parsePath(this.getter)
      value = path(this.vm)
    }
  } catch{
    console.error ("getter for watcher \"" + (this.getter) + "\"")
  }finally {
    popTarget()
  }
  this.value = value
  return value
}
Watcher.prototype.depend = function depend () {
  var this$1 = this
  var i = this.deps.length
  while (i--) {
    this$1.deps[i].depend()
  }
}
Watcher.prototype.evaluate = function () {
  this.get()
 
}
/**
 * target
 */
Dep.target = null
var targetStack = []
function pushTarget (target) {
  if(Dep.target) {
    targetStack.push(target)
  }
  Dep.target = target
}
function popTarget () { 
  Dep.target = targetStack.pop()
}

