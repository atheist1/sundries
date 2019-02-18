//广播
// 为什么要用广播来实现呢
// 实际上因为这样层级的父子组件并不挂载到一个实例上,所以用$emit是会接受不到的(参见vue源码)
// 所以这里实际上是手动循环每一层父子元素,挂载方法
// 当然,如果你在main函数使用VueBus也是可以的哦
function broadcast (cpName, evName, params) {
  // 在父组件提醒所有子组件触发事件
  this.$children.forEach((item) => {
    let name = item.$options.name
    if (name === cpName) {
      item.$emit.apply(item, [evName].concat(val))
    } else {
      broadcast.apply(item, [cpName,evName].concat([val]))
    }
  })
}
export default {
  methods: {
    // 利用dispatch将事件传播至对应的父级
    dispatch (cpName, evName, val) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      // 当两个名字相等的时候跳出
      while (parent && !(name && name === cpName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [evName].concat(val));
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this,componentName, eventName, params)
    }
  }
}