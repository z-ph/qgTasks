//实现拖拽增加层级
const dragEventHandel = {
    modellibrary: document.querySelector('.model-list')
}
//记录拖拽的元素
dragEventHandel.modellibrary.ondragstart = (e) => {
    dragEventHandel.draggingItem = e.target
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
            prompt:null,
        }
        data.layerList[layerIndex].modelList.push(layerModel)
        dragEventHandel.draggingItem = null
        //渲染修改后的数据
        renderLayer.render()
    }
}







