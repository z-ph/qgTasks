const addNewModel = {}


addNewModel.addBtn = document.querySelector('.add-new-model-in-library')

addNewModel.addBtn.addEventListener('click', () => {
    public.dialogs.addNewModelDialog.showModal()
})