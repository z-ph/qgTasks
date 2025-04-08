import top from "./top.js";
import moduleCard from "./moduleCard.js";
import btn from "./btn.js";
export default {
  components: { top, moduleCard, btn },
  template: /* html */ `
  <div class="modules">
    <top></top>
    <div class="btn-container">
    <btn btnName="添加层级" @click="addLayer"></btn>
    <btn btnName="上传" ></btn>
    </div>
    <div v-if="modelInfoList">
      <module-card v-for="modelInfo in modelInfoList" :modelInfo="modelInfo"></module-card>
    </div>
  </div>
`,
props:{
  modelInfoList:{
    type:Array,
    default:()=>[]
  },
  addLayer:{
    type:Function,
  }

},
    
  
};
