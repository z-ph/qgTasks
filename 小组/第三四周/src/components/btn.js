export default{
  template:/*html*/ `
  <a role="button" class="center" onclick="">{{btnName}}</a>
  `,
  props:{
    btnName:{
      type:String,
      default:'按钮'
    }
  }
}