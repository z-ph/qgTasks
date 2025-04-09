// namespace:data
console.log('data.js linked');
const data = {
    modelList: [
        {
            name: 'deepseek',
            url: 'ai.com',
            desc:'深度思考'
        },
        {
            name: 'openai',
            url: 'ai.com',
            desc:'深度思考'
        },
        {
            name: 'yuanbao',
            url: 'ai.com',
            desc:'深度思考'
        },
    ],
    layerList: [
        {
            rank: 1,
            modelList:[]
        },
        {
            rank: 2,
            modelList:[]
        }
    ]
}
data.layerList[0].modelList.push(data.modelList[0])//data.layerList[0].modelList可由drop事件的target获得
data.layerList[1].modelList.push(data.modelList[1])
data.layerList[0].modelList.push(data.modelList[2])
function closeDialog(dialog) {
    dialog.close();
}
function showDialog(dialog) {
    dialog.showModal();
}