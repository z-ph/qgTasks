renderlibrary.modelListContainer.addEventListener('click', e => {
    const dialog = public.dialogs.queryModelInfoDialog
    const modelId = e.target.getAttribute('data-id')
    const model = data.modelList.find(item => item.id == modelId)
    const pNodeList = dialog.querySelectorAll('p')
    // 渲染数据
    pNodeList[0].textContent = model.name
    pNodeList[1].textContent = model.url
    pNodeList[2].textContent = model.desc
    dialog.showModal()
})

public.dialogs.queryModelInfoDialog.addEventListener('click', e => {
    if (e.target.classList.contains('close')) {
        const dialog = public.dialogs.queryModelInfoDialog
        dialog.close()
    }
})