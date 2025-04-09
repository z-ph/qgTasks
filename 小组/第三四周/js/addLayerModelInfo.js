const addLayerModelInfo = {
    
     layerListContainer: document.querySelector('.layer-list-container')
}




//由于事件是委托在不变的祖先元素上的，所以重新渲染后不需要重新绑定事件
addLayerModelInfo.layerListContainer.onclick = e => {
    const dialog = public.dialogs.layerModelInfoDialog
    if (e.target.classList.contains('added')) {
        //获取点击事件的所在的layer-rank 和 modelIndex
        addLayerModelInfo.layerIndex = e.target.parentNode.parentNode.getAttribute('data-rank')-1
        addLayerModelInfo.modelIndex = Array.from(e.target.parentNode.children).indexOf(e.target)
        //如果对应的modelInfo存在，则填充数据
        if (data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex].weight) {
            public.dialogs.layerModelInfoInputNodeList[0].value = data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex].weight
        }
        if (data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex].demand) {
            public.dialogs.layerModelInfoInputNodeList[1].value = data.layerList[addLayerModelInfo.layerIndex].modelList[addLayerModelInfo.modelIndex].demand
        }
        dialog.showModal()
    }
}