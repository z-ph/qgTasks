class Drag {
    constructor() {
        // this.inputDemandNodeList = document.querySelectorAll('.added');
        this.draggingModel = null;
        this.doms = {
            addLayer: document.querySelector('.add-layer'),
            addModelConfirm: document.querySelector('#addModel .confirm'),
            modelModules: document.querySelector('.model-container')
        }
        this.addLayerBind();
        this.bind();
    }
    getInputDemandNodeList() {
        return document.querySelectorAll('.added');
    }
    addLayerBind() {
        const addLayer = document.querySelector('.addLayer');
        addLayer.addEventListener('click', (e) => {
            data.layerList.push({
                rank: data.layerList.length + 1,
                modelList: []
            })
            dragModelRender();
            this.bind();

        })
    }

    addModelConfirmBind() {
        this.doms.addModelConfirm.addEventListener('click', (e) => {
            this.updateModelList();
        })
    }
    bind() {
        const cardContainer = document.querySelector('.card-container');
        console.log('bind')
        cardContainer.ondrop = (e) => {
            if (e.target.classList.contains('empty')) {
                const layer = e.target.parentNode.parentNode;
                const layerRank = layer.getAttribute('data-rank');
                e.target.classList.remove('shadow');
                const id = this.draggingModel.getAttribute('data-id');
                const before = data.layerList[layerRank - 1].modelList;
                const after = data.modelList[id];
                before.push(after);
                this.render();
            }
        };

        cardContainer.ondragenter = (e) => {
            if (e.target.classList.contains('empty')) {
                e.target.classList.add('shadow');
            }
        };

        cardContainer.ondragleave = (e) => {
            if (e.target.classList.contains('empty')) {
                e.target.classList.remove('shadow');
            }
        };

        const modelModules = document.querySelector('.model-container');
        modelModules.ondragstart = (e) => {
            if (e.target.classList.contains('model')) {
                this.draggingModel = e.target;
            }
        };

        modelModules.ondragover = (e) => {
            e.preventDefault();
        };

        const dragItems = document.querySelectorAll('[draggable="true"]');
        dragItems.forEach(item => {
            item.ondragover = (e) => {
                e.preventDefault();
            };
        });
    }
    render() {
        renderModelModules();
        dragModelRender();
        this.bind();
    }
}
const drag = new Drag();