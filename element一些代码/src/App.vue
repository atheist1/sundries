<template>
  <div id="app">
    <!-- <div class="radios">
      <radios label='aa'  border size="medium" v-model="radios.a">备选a</radios>
      <radios label='bb'  border size="medium" v-model="radios.a">备选b</radios>
    </div>
    <div class="radiogroups">
      <radioGroups  v-model="groupRadios.a">
        <radios label='aa'  border size="medium">单选组备选a</radios>
        <radios label='bb'  border size="medium">单选组备选b</radios>
        <radios label='cc'  border size="medium">单选组备选c</radios>
        <radios label='dd'  border size="medium">单选组备选d</radios>
      </radioGroups>
    </div>
    <div class="inputs">
      <inputs type="text"  v-model="inputs.a" suffix-icon="el-icon-date" prefix-icon="el-icon-search"></inputs>
      <inputs type="textarea" v-model="inputs.b" size="large"> </inputs>
    </div>
    <div class="inputNumber">
      <input-number  size="medium" v-model="inputNumber.a" :max=10 :min=1 :step="1.3" controlsAtRight :precision = "2"></input-number>
    </div>
    <div class="tag">
      <tag closable size="medium" hit type="danger" @close="tagClose">xaaa</tag>
    </div>
    <div class="select">
      <selects></selects>
    </div> -->
    <div class="audio">
      <el-form>
        <el-form-item>
          <audios :theUrl="'http://172.16.1.254:8080/Records/2017-05-26/20170526050446285_285_075583498407.wav'"></audios>
        </el-form-item>
      </el-form>
    </div>
   <!-- <el-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :before-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
  </div>
</template>

<script>
import radios from './component/radio/radio'
import radioGroups from './component/radio/radioGroup'
import inputs from './component/input/input'
import inputNumber from './component/input/inputNumber'
import tag from './component/tag/tag'
import audios from './component/audio/audios'
// import selects from './component/select/select'
export default {
  name: 'App',
  components: {
    // radios,
    // radioGroups,
    // inputs,
    // inputNumber,
    // tag,
    audios
    // selects
  },
  data () {
    return {
      radios: {
        a: 'bb'
      },
      groupRadios: {
        a: 'bb'
      },
      inputs: {
        a: 'cc',
        b: 'dd'
      },
      inputNumber: {
        a: 1
      },
      fileList: 
      [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      canRemove: false

    }
  },
  mounted () {
    console.log(inputs)
  },
  methods: {
    tagClose () {
      console.log('close tag')
    },
  }
  ,
    watch: {
      c() {
        a
      }
    }
} 
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.audio {
  height: 50px;
}
</style>
