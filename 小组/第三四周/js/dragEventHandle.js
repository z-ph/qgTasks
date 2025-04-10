//实现拖拽增加layer的model
const dragEventHandel = {
    modellibrary: document.querySelector('.model-list')
}
//记录拖拽的元素
dragEventHandel.modellibrary.ondragstart = (e) => {
    dragEventHandel.draggingItem = e.target
}
dragEventHandel.modellibrary.ondragend = (e) => {
    dragEventHandel.draggingItem = null
}
//让layerList可以接受拖拽
public.layerListContainer.ondragover = (e) => {
    e.preventDefault()
}
//拖拽到layerList
public.layerListContainer.ondrop = (e) => {
    if (e.target.classList.contains('empty')) {
        //判断是不是模型dragging,不是则不做处理
        if (!dragEventHandel.draggingItem) {
            return
        }
        //修改数据
        const modelId = dragEventHandel.draggingItem.getAttribute('data-id')
        const layerIndex = e.target.parentNode.parentNode.getAttribute('data-rank') - 1
        const model = data.modelList.filter(item => item.id == modelId)[0]
        const layerModel = {
            ...model,
            weight: null,
            prompt: null,
        }
        data.layerList[layerIndex].modelList.push(layerModel)
        dragEventHandel.draggingItem = null
        //渲染修改后的数据
        renderLayer.render()
        //保存
        methods.saveData()
    }
}





public.layerListContainer.addEventListener('dragstart', e => {
    if (e.target.classList.contains('added')) {
        dragEventHandel.draggingItem = e.target
        const grandParent = e.target.parentNode.parentNode
        const layerIndex = grandParent.getAttribute('data-rank') - 1
        const nodeArray = Array.from(e.target.parentNode.children)
        const index = nodeArray.indexOf(e.target)
        dragEventHandel.layerIndex = layerIndex
        dragEventHandel.modelIndex = index
    }
})


public.del.addEventListener('drop', e => {
    if (dragEventHandel.draggingItem.classList.contains('added')) {
        //删掉拖拽的元素对应的数据
        console.log('asdf')
        data.layerList[dragEventHandel.layerIndex].modelList.splice(dragEventHandel.index, 1)
        renderLayer.render()
        methods.saveData()
    }
})
