const renderLayer = {}
// 获取layerListContainer
renderLayer.layerListContainer = document.querySelector('.layer-list-container')
/**
 * 传入层级，返回html字符串
 * @param {number} rank 层级
 * @returns {string} html字符串
}
 */
renderLayer.createLayerCardElem = rank => `
            <div class="card flex-column" data-rank="${rank}">
                <h2 class="title">
                    层级${rank}
                </h2>
                <div class="model-container flex-row"></div>
            </div>
`
/**
 * 传入模型对象，返回html字符串
 * @param {object} model 模型对象
 * @returns {string} html字符串
 */
renderLayer.createLayerModelElem = (model) => `
        <div class="model added" draggable="true" >${model.name}</div>
`
/**
 * 创建dragenter时，有阴影的空白节点
 * @returns {string} html字符串
 */
renderLayer.createEmptyElem = () => `
    <div class="empty" ></div>
`
/**
 * 渲染layerListContainer
 */
renderLayer.render = () => {
    renderLayer.layerListContainer.innerHTML = ''
    for (const layer of data.layerList) {
        renderLayer.layerListContainer.innerHTML += renderLayer.createLayerCardElem(layer.rank)
        for (const model of layer.modelList) {
            renderLayer.layerListContainer.querySelector(`.card[data-rank="${layer.rank}"] .model-container`).innerHTML += renderLayer.createLayerModelElem(model)
        }
        renderLayer.layerListContainer.querySelector(`.card[data-rank="${layer.rank}"] .model-container`).innerHTML += renderLayer.createEmptyElem()
    }
}
renderLayer.render()