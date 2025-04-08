import myDialog from "./myDialog.js";
import modules from "./modules.js";
import layers from "./layers.js";
export default {
  components: { modules, myDialog, layers },
  template: /*html*/ `
  <div @dragover.prevent>
    <modules :modelInfoList="modelInfoList" :addLayer="addLayer" @dragstart="dragStart"></modules>
    <layers :layerList="layerList" :drop="drop"></layers>
    <my-dialog></my-dialog>
  </div>

  `,
  data() {
    return {
      currentModel:null,
      modelInfoList: [
        {
          name: "deepseek",
          url: "ai.com",
          desc: `深度思考大模型`,
        },
        {
          name: "yuanbao",
          url: "ai.com",
          desc: `深度思考大模型`,
        },
        {
          name: "openai",
          url: "ai.com",
          desc: `深度思考大模型`,
        },
      ],
      layerList: [
        {
          index: 1,
          modelList: [],
        },
      ],
    };
  },
  methods:{
    addLayer(){
      console.log('addLayer');
      this.layerList.push({
        index:this.layerList.length+1,
        modelList:[]
      })
    },
    dragCopy(event){
      // console.log('dragCopy');
      // console.log(event.target);
    },
    dragStart(e){
      console.log('dragStrat');
      // console.log(e.target);
      if(!e.target.parentNode.classList.contains('module-card')){
        return;
      }
      this.currentModel = e.target;
      console.log(this.currentModel);
      // this.currentModel = e.target.modelInfo;

    },
    drop(event){
      console.log('drop');
      console.log(event.target);
      if(this.currentModel===null){
        return;
      }
      if(event.target.classList.contains('empty-card')){
        const copyNode = this.currentModel.cloneNode(true);
        console.log(copyNode);
        copyNode.addEventListener('click',(event)=>{
            event.preventDefault();
            const dialog = document.getElementById('addDialog');
            console.log(dialog);
            dialog.showModal();
        });
        event.target.before(copyNode);
        
        this.currentModel = null;
        event.target.classList.remove('shadow');
      }
    },

  }
};
