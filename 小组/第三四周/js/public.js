const public = {
    dialogs: {
        //addNewModelDialog
        addNewModelDialog: document.querySelector('#add-new-model-in-library'),
        addNewModelInputNodeList: document.querySelectorAll('#add-new-model-in-library input'),
        //addLayerInfo
        layerModelInfoDialog: document.querySelector('#input-layer-model-info'),
        layerModelInfoInputNodeList: document.querySelectorAll('#input-layer-model-info input'),
        //queryModelInfo
        queryModelInfoDialog: document.querySelector('#query-model-info'),


        //uploadDataDialog
        uploadDataDialog: document.querySelector('#upload-data-dialog'),
        

    },
    layerListContainer: document.querySelector('.layer-list-container'),
    del:document.querySelector('.del'),
    /**
     * 返回输入框中的值组成的对象
     * @returns {weight:number,prompt:number}
     */
    getLayerModelInfo() {
        return {
            weight: weight.value,
            prompt: promptWords.value
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
