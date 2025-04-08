export default{
  template:/* html */`
  <div class="module-card center">
    <div class="content center" draggable="true" @dragover.prevent v-if="modelInfo.name!==''">{{modelInfo.name}}</div>
  </div>
`,
props:{
  modelInfo:{
    type:Object,
    default:{
      name:'deepseek',
      url:'',
      desc:''
    }
  }

}
}