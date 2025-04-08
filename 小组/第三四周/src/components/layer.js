export default {
  template: /*html*/ `
  <div class="layer-card">
    <h2 class="center">层级{{layer.index}}</h2>
    <div class="layer-content-container center">
      <div class="empty-card" @dragenter="addShadow" @dragleave="removeShadow"></div>
    </div>
  </div> 
  `,
  props:{

    layer:{
      type:Object,
      default:()=>[0,1]
    },
    drop:{
      type:Function,
    }
  },
  methods:{
    addShadow(e){
      if(!e.target.classList.contains('empty-card')){
        return;
      }
      e.target.classList.add('shadow');
    },
    removeShadow(e){
      if(!e.target.classList.contains('empty-card')){
        return;
      }
      e.target.classList.remove('shadow');
    }
  }
  
}