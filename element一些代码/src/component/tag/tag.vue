<template>
  <transition :name="disableTransitions ? '' : 'el-zoom-in-center'">
    <span class="el-tag"
      :class="[type ? 'el-tag--' + type : '',
      size ? 'el-tag--' + size : '',
      hit ? 'is-hit' : '']"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="el-tag__close el-icon-close" v-if="closable"
        @click.stop="handleClose"></i>
    </span>
  </transition>
</template>

<script>
export default {
  props: {
    disableTransitions: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    type: String,
    size: String,
    color: String,
    hit: Boolean
  },
  methods: {
    handleClose (event) {
      this.$emit('close', event)
    }
  }
}
</script>

<style>

</style>
