`                   
<a class="model added" draggable="true">
    deepseek
</a>
<a class="model added" draggable="true">
    deepseek
</a>`;

const layerRender = (rank) => {

    const layerRenderHTML = `
            <div class="card flex-column" data-rank="${rank}">
                <div class="title">
                    层级${rank}
                </div>
                <div class="model-container flex-row">
                    <div class="empty" draggable="true"></div>
                </div>
            </div>
    `
    return layerRenderHTML;
}
const modelRender = (item) => {
    const empty = `
    <div class="empty" draggable="true"></div>
    `;
    const modelRenderHTML = name=> `
    <a class="model added" draggable="true">
        ${name}
    </a>
    `;
    let result = '';
    for (const model of item.modelList) {
        result+=modelRenderHTML(model.name);
    }
    result+=empty;
    const modelContainer = document.querySelectorAll('div.model-container');
    modelContainer[item.rank-1].innerHTML = result;
}
function dragModelRender() {
    document.querySelector('div.card-container').innerHTML = '';
    for (const item of data.layerList) {
        document.querySelector('div.card-container').innerHTML += layerRender(item.rank);
        modelRender(item);
    }
    document.querySelectorAll('.added').forEach(Node => {
        Node.addEventListener('click', (e) => {
            console.log(e.target)
            showDialog(document.getElementById('inputInfo'))
        })
    })
}
dragModelRender();
