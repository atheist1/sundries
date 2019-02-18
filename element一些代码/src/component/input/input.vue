<template>
  <div :class="[type === 'textarea' ? 'el-textarea' : 'el-input',
    (size ? 'el-input--'+size :''),
    {
      'is-disabled': disabled,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable,
      'el-input--prefix': $slots.prefix || prefixIcon,
    }
  ]">
    <template v-if="type !== 'textarea'">
      <input :type="type"
        class="el-input__inner"
        :disabled = disabled
        :value="currentValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span  class="el-input__suffix"
        v-if="$slots.suffix || suffixIcon || clearable  && needStatusIcon"
      >
        <span class="el-input__suffix-inner">
          <template v-if="!showClearable">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click="clear"
          ></i>
        </span>
      </span>
      
    </template>
    <textarea v-else
      class="el-textarea__inner"
      :value="currentValue"
      ref="textarea"
      :disabled="disabled"
      :readonly="readonly"
      @change="handleChange"
      @input="handleInput"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
    ></textarea>
  </div>
</template>

<script> 
import Emitter from '../../emitter'
export default {
  name: 'inputs',
  data () {
    return {
      currentValue: this.value === undefined || this.value === null ? '' : this.value
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    value: [String, Number],
    clearable: Boolean,
    readonly: Boolean,
    suffixIcon: String,
    prefixIcon: String,
    size: String
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  },
  computed: {
    showClearable () {
      return this.clearable && !this.disabled && !this.readonly && this.currentValue !== ''
    }
  },
  methods: {
    setCurrentValue (val) {
      this.currentValue = val
    },
    clear () {
      this.currentValue = ''
    },
    handleInput (e) {
      let target = e.target
      const value = e.target.value
      this.setCurrentValue(value)
      this.$emit('input', value)
    },
    handleChange (e) {
      const val = e.target.value
      this.$emit('change', val)
    },
    // 处理位置变化
    handleComposition (e) {
     
    },
    handleFocus (e) {
      this.$emit('focus')
    },
    handleBlur(e) {
      this.focus = false
      this.$emit('blur')
    }
  },
  
  mounted () {
    
  }
}
</script>

<style>

</style>
