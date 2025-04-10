const emptyShadow = {
    emptyNodeList:document.querySelectorAll('.empty')
}
// 拖拽进入时添加阴影
public.layerListContainer.addEventListener('dragenter', e => {
    if (e.target.classList.contains('empty')) {
        e.target.classList.add('shadow')
    }
})
// 拖拽离开时移除阴影
public.layerListContainer.addEventListener('dragleave', e => {
    if (e.target.classList.contains('empty')) {
        e.target.classList.remove('shadow')
    }
})