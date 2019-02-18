<template>
    <div class="el-select">
      <inputs
        :class="{ 'is-focus': visible }"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <template slot="prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </template>
        <i slot="suffix"
        :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"
        @click="handleIconClick"
        ></i>
      </inputs>
    </div>
</template>

<script>
import inputs from '../input/input'
import selectMenu from './select-dropdown'
import {removeClass,addClass} from '../../utils/dom'
export default {
  name: "selects",
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleIconClick () {
      this.visible = !this.visible
      if (this.visible) {

      } else {

      }
    },
    handleIconHide() {
      let icon = this.$el.querySelector('.el-input__icon')
      if (icon) {
        removeClass(icon, 'is-reverse');
      }
    },
    handleIconShow() {
      let icon = this.$el.querySelector('.el-input__icon')
      if (icon) {
        addClass(icon, 'is-reverse');
      }
    },
    handleFocus() {
      this.visible = true
      this.$emit('focus', event)
    },
    handleBlur() {
      this.visible = false
      this.$emit('blur')
    }
  },
  components: {
    inputs
  },
  watch: {
    visible (val) {
      if (!val) {
        this.handleIconHide()
      } else {
        this.handleIconShow()
      }
    }
  }
}
</script>

<style>

</style>
  