<template>
  <div class="el-radio-group"
    role="radiogroup"
    @keydown="handleKeydown">
    <!-- 用于插入radios -->
    <slot></slot>
  </div>
</template>
<script>
const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
})
export default {
  name: 'radioGroups',
  methods: {
    handleKeydown (e) {// 上下左右键可以在radio组切换选项
      const target = e.target
      // 判断当前是label还是input
      const className = target.nodeName === 'INPUT' ? '[type="radio"]' : '[role="radio"]'
      const radios = this.$el.querySelectorAll(className)
      const index = [].indexOf.call(radios, target)
      const length = radios.length
      switch (e.keyCode) {
        case keyCode.UP:
        case keyCode.LEFT:
          e.stopPropagation()
          e.preventDefault()
          if (index === 0) {
            radios[length - 1].click()
            radios[length - 1].focus()
          } else {
            radios[index - 1].click()
            radios[index - 1].focus()
          }
          break
        case keyCode.DOWN:
        case keyCode.RIGHT:
          e.stopPropagation()
          e.preventDefault()
          if (index === length -1) {
            radios[0].click()
            radios[0].focus()
          } else {
            radios[index + 1].click()
            radios[index + 1].focus()
          }
          break
        default:
          break
      }
    }
  },
  props:{
    // 用value接受v-model
    value: {},
  },
  mounted () {
  },
  created() {
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    },
  watch : {
    value (value) {
    }
  }
}
</script>
