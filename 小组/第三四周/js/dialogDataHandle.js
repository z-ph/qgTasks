
public.dialogs.addNewModelDialog.onclick = e => {
    const dialog = public.dialogs.addNewModelDialog
    if (e.target.classList.contains('cancel')) {
        //清空输入框
        public.dialogs.addNewModelInputNodeList.forEach(item => item.value = '')
        dialog.close()
    }
    if (e.target.classList.contains('confirm')) {
        //获取数据
        
        const addNewModelInfo = public.getAddNewModelInfo()
        const newModel = {
            id: data.modelList.length + 1,
            ...addNewModelInfo
        }
        //判断数据完整性
        if (!(addNewModelInfo.name && addNewModelInfo.url && addNewModelInfo.desc)) {
            alert('请填写完整')
            return
        }

        //添加数据
        data.modelList.push(newModel)
        //渲染数据
        renderlibrary.render()
        //清空输入框
        public.dialogs.addNewModelInputNodeList.forEach(item => item.value = '')
        //保存数据
        methods.saveData();
        //关闭弹窗
        dialog.close()
    }

}

public.dialogs.layerModelInfoDialog.onclick = e => {
    const dialog = public.dialogs.layerModelInfoDialog
    if (e.target.classList.contains('cancel')) {
        //清空输入框
        public.dialogs.layerModelInfoInputNodeList.forEach(item => item.value = '')
        dialog.close()
    }
    if (e.target.classList.contains('confirm')) {
        //获取数据
        const layerModelInfo = public.getLayerModelInfo()
        const modelInfo = data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex]
        //判断数据是否填写完整
        if (!layerModelInfo.weight || !layerModelInfo.prompt) {
            alert('请填写完整')
            return
        }

        //修改数据
        data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex] = {
            ...modelInfo,
            ...layerModelInfo
        }
        //清空输入框
        public.dialogs.layerModelInfoInputNodeList.forEach(item => item.value = '')
        //保存数据
        methods.saveData();
        //关闭弹窗
        dialog.close()
    }

}
public.del.addEventListener('dragover', e => {
    e.preventDefault()
})
public.del.addEventListener('drop', e => {
    //获取真正拖拽元素的数据位置
    const id = dragEventHandel.draggingItem.getAttribute('data-id')
    // console.log(id)
    //删除对应数据
    data.modelList = data.modelList.filter(item => item.id != id)
    //重置数据id
    data.modelList.forEach((item, index) => {
        item.id = index + 1
    })
    //重新渲染列表
    renderlibrary.render()
    //保存数据
    methods.saveData()
})



public.dialogs.uploadDataDialog.addEventListener('click', async e => {
    const dialog = public.dialogs.uploadDataDialog
    if (e.target.classList.contains('close')||e.target.parentNode.classList.contains('close')||e.target.classList.contains('cancel')) {
        dialog.close()
    }
    if (e.target.classList.contains('run')) {
        const inputData = await uploadData.getInputData()
        data = {
            ...data,
            ...inputData
        }
        methods.saveData()
        dialog.close()
        alert('数据上传成功(只做了映射，映射的数据保存在localStorage中以及全局变量transformedData中)')
    }
})

