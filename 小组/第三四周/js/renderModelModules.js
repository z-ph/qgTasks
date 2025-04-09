
function renderModelModules() {
    const modules = document.querySelector('section.model-container')
    modules.innerHTML = ''
    const modelHTML = (model,index) => `
    <div class="card center">
        <a class="model" draggable="true" data-id="${index}">${model.name}</a>
    </div>
    `
    for (const model of data.modelList) {
        modules.innerHTML += modelHTML(model,data.modelList.indexOf(model));
    }
}
renderModelModules();