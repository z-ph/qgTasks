const addNewLayer = {
    addLayerBtn: document.querySelector('.add-new-layer'),
}

addNewLayer.addLayerBtn.onclick = () => {
    const layerRank = data.layerList.length + 1
    data.layerList.push({
        rank: layerRank,
        modelList: [],
    })
    renderLayer.render()
}

