const public = {
    dialogs: {
        //addNewModelDialog
        addNewModelDialog: document.querySelector('#add-new-model-in-library'),
        addNewModelInputNodeList: document.querySelectorAll('#add-new-model-in-library input'),
        //addLayerInfo
        layerModelInfoDialog: document.querySelector('#input-layer-model-info'),
        layerModelInfoInputNodeList: document.querySelectorAll('#input-layer-model-info input'),
    },
    layerListContainer: document.querySelector('.layer-list-container'),
    /**
     * 返回输入框中的值组成的对象
     * @returns {weight:number,demand:number}
     */
    getLayerModelInfo() {
        return {
            weight: weight.value,
            demand: demand.value
        }
    },
    /**
     * 返回新增模型信息对象
     * @returns {name:string,url:string,desc:string}
     */
    getAddNewModelInfo() {
        return {
            name: public.dialogs.addNewModelInputNodeList[0].value,
            url: url.value,
            desc: desc.value
        }
    }

}

public.dialogs.addNewModelDialog.onclick = e => {
    const dialog = public.dialogs.addNewModelDialog
    if (e.target.classList.contains('cancel')) {
        dialog.close()
    }
    if (e.target.classList.contains('confirm')) {
        //添加数据
        const addNewModelInfo = public.getAddNewModelInfo()
        const newModel = {
            id: data.modelList.length + 1,
            ...addNewModelInfo
        }
        data.modelList.push(newModel)
        //渲染数据
        renderlibrary.render()
        //清空输入框
        public.dialogs.addNewModelInputNodeList.forEach(item => item.value = '')
        dialog.close()
    }
}

public.dialogs.layerModelInfoDialog.onclick = e => {
    const dialog = public.dialogs.layerModelInfoDialog
    if (e.target.classList.contains('cancel')) {

        dialog.close()
    }
    if (e.target.classList.contains('confirm')) {
        //修改数据
        const layerModelInfo = public.getLayerModelInfo()
        const modelInfo = data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex]
        data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex] = {
            ...modelInfo,
            ...layerModelInfo
        }
        //清空输入框
        public.dialogs.layerModelInfoInputNodeList.forEach(item => item.value = '')
        dialog.close()
    }
}