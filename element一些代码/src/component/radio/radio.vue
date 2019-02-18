 <template>
   <label class="el-radio" 
      :class="[border && size ? 'el-radio--' + size:'',
      {'is-disabled':disabled},
      {'is-focus':focus},
      { 'is-bordered': border },
      { 'is-checked': model === label }]"
      role="radio"
    >
     <span class="el-radio__input"
      :class="{
        'is-disabled': disabled,
        'is-checked': model === label
      }">
        <span class="el-radio__inner"></span>
        <input
          class="el-radio__original" 
          @focus="focus = true" 
          :value="label"
          type="radio"
          aria-hidden="true"
          v-model="model"
          @change="handleChange"
          :disabled="disabled"/>
     </span>
     <span class="el-radio__label" @keydown.stop> 
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
   </label>
 </template>
 <script>
 import Emitter from '../../emitter'
 export default {
   name:'radios',
   mixins: [Emitter],
   props: {
     value: {},
     label: {},
     disabled: Boolean,
     border: Boolean,
     size: String,
     name: String,
   },
   data () {
     return {
       focus: false
     }
   },
   computed: {
     model: {
        get () {
          // 这里就是v-model传过来的值
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set (val) {
          if (this.isGroup) {
            this.dispatch('radioGroups', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
     },
     isGroup () {
       let parent = this.$options.parent
       while (parent) {
         if (parent.$options._componentTag !== "radioGroups") {
           parent = parent.$options.parent
         } else {
           this._radioGroup = parent;
           return true
         }
       }
       return false
     }
   },
   mounted () {
   },
   methods: {
     handleChange () {
     }
   }
 }
 </script>
 