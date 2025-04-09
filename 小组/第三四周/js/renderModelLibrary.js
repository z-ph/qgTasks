const renderlibrary = {}
//获取model-list 容器
renderlibrary.modelListContainer = document.querySelector('div.model-list')
/**
 * 传入model的信息,返回其对应元素的HTML字符串
 * @param {domElem} model 
 * @returns {string} htmlCode
 */
renderlibrary.createModelElem = (model) => `
    <div class="card center">
        <a class="model" draggable="true" data-id="${model.id}">${model.name}</a>
    </div>
    `
/**
 * 渲染model-list,将html字符串拼接给model-list的innerHTML
 */
renderlibrary.render = () => {
    renderlibrary.modelListContainer.innerHTML = ''
    for (const model of data.modelList) {
        renderlibrary.modelListContainer.innerHTML += renderlibrary.createModelElem(model)
    }
}
//调用渲染函数
renderlibrary.render()
