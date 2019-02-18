<template>
  <div 
  class="el-input-number"
  :class="[size ? 'el-input-number--' + size : '', { 'is-controls-right': controlsAtRight }] "
  
  >
    <span
      class="el-input-number__decrease"
      role="button"
      @click="decrease"
      :class="{'is-disabled': minDisabled}">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="el-input-number__increase"
      role="button"
      @click="increase"
      :class="{'is-disabled': plusDisabled}">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <inputs 
      ref="input"
      :size="size"
      :value="currentInputValue"
      @input="handleChange"
    ></inputs>
  </div>
</template> 

<script>
import inputs from './input'
export default {
  name:'inputNumber',
  data(){
    return {
      currentValue : ''
    }
  },
  props: {
    controlsAtRight: Boolean,
    size: String,
    value: [Number,String],
    max: Number,
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    }
  },
  components: {
    inputs
  },
  computed: {
    currentInputValue () {
      return this.currentValue || 0
    },
    minDisabled () {
      return this.currentValue <= this.min
    },
    plusDisabled () {
      return this.currentValue >= this.max
    }
  },
  methods: {
    handleChange (val) {
      this.setCurrentValue(val)
      this.$refs.input.setCurrentValue(val)
    },
    setCurrentValue (newValue) {
      this.currentValue = newValue
      this.$emit('change', newValue)
      this.$emit('input', newValue)
    },
    increase () {
      let addVal = 0
      if (this.max) {
        if (this.currentValue >= this.max) {
          addVal = this.max
        } else {
          addVal = this.currentValue + this.step
        }
      } else {
        addVal = this.currentValue + this.step
      }
      if (this.precision) {
        addVal = addVal.toFixed(this.precision)
      }
      this.handleChange(addVal)
    },
    decrease () {
      let minusVal = 0
      let min = typeof this.min === 'undefined' ? 0 : this.min
     
        if (this.currentValue <= this.min) {
          minusVal = this.min
        } else {
          minusVal = this.currentValue - this.step
        }
      if (this.precision) {
        minusVal = minusVal.toFixed(this.precision)
      }
      this.handleChange(minusVal)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        let newValue = typeof value === undefined ? 0 : Number(value)
        if (newValue !== undefined) {
          if (Number.isNaN(newValue)) {
            return
          }
        }
        if (this.max) {
          if (newValue >= this.max) newValue = this.max
        }
        if (newValue <= this.min) newValue = this.min
        this.currentValue = Number(this.currentValue)
        if (this.precision) this.currentValue = this.currentValue.toFixed(this.precision)
        this.currentValue = newValue
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style>

</style>
