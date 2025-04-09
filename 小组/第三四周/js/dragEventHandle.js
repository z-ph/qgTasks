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
        //修改数据
        const id = dragEventHandel.draggingItem.getAttribute('data-id')
        const index = e.target.parentNode.parentNode.getAttribute('data-rank') - 1
        const model = data.modelList.filter(item => item.id == id)[0]
        data.layerList[index].modelList.push(model)
        //渲染修改后的数据
        renderLayer.render()
    }
}







