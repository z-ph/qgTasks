if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'))
}
else {
    data = {
        modelList: [],
        layerList: []
    }
}
const methods = {}
//保存数据
methods.saveData = () => {
    localStorage.setItem('data', JSON.stringify(data))
    localStorage.setItem('transformedData', JSON.stringify(methods.transformData()))
}
//将LayerList里的modelList装换成要求的格式
methods.transformModelList = () => {
    const modelList = []
    data.layerList.forEach(layer => {
        const models = []
        layer.modelList.forEach(model=>{
            models.push({
                modelName: model.name,
                modelUrl: model.url,
                isAPI: 0,
                weight: model.weight,
                question:model.desc
            })
        })
        modelList.push({
            layer: layer.rank,
            parallel: layer.modelList.length > 1 ? 1 : 0,
            models:models
        })
    })
    return modelList
}
//将data转换成要求的格式
methods.transformData = () => {
    const modelList = methods.transformModelList()
    return {
        image: '',
        content: '',
        modelList:modelList,
    }
}
methods.saveData()


