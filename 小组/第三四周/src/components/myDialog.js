import btn from "./btn.js";
export default {
  components: { btn },
  template: /* html */ `
  <dialog id="addDialog" class="dialog center-self">
        <h1>自定义信息</h1>
        <form class="dialog-form">
            <label>
                权重
                <input type="url" id="weight" required placeholder="1">
            </label>
            <label>
                要求
                <input type="text" id="require" required placeholder="">
            </label>
            <div class="dialog-buttons">
                <a role="button" class="flex-center " @click="confirmAdd" tabindex="0">confirm</a>
                <a role="button" class="flex-center " @click="closeDialog" tabindex="0">cancel</a>
            </div>
        </form>
    </dialog>
  `,
  methods: {
    handleAddLink(event) {
      event.preventDefault();
      const dialog = document.getElementById("addDialog");
      dialog.showModal();
    },

    confirmAdd() {
     
    },
    closeDialog() {
      const dialog = document.getElementById("addDialog");
      dialog.close();
      document.getElementById("linkUrl").value = "";
      document.getElementById("linkName").value = "";
    },
  },
};
