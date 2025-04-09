const addNewModel = {}
const addNewModelProxy = new Proxy(addNewModel, {
    set(target, key, value) {
        console.log(target, key, value)
        target[key] = value
        return true
    }
})

addNewModel.addBtn = document.querySelector('.add-new-model-in-library')

addNewModel.addBtn.addEventListener('click', () => {
    public.dialogs.addNewModelDialog.showModal()
})