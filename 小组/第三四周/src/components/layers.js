import layer from "./layer.js";
export default {
  components: { layer },
  template: /*html*/ `
  <div class="layers">
    <layer v-for="layer in layerList" :layer="layer" @drop="drop"></layer>
  </div>`,
  props: {
    layerList: {
      type: Array,
      default: () => [],
    },
    drop: {
      type: Function,
    },
  },

  
};
