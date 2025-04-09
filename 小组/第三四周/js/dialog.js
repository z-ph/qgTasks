class Dialog {
    constructor() {
        this.inputDemandNodeList = document.querySelectorAll('.added');
        this.uploadModelBtn = document.querySelector('.uploadModel');
        // this.layerNodeList = document.querySelectorAll('[data-rank]');
        this.dialogNodeList = document.querySelectorAll('dialog');
        this.bindEventOnce();
        // console.log(this.layerNodeList)
    }
    getLayerNodeList() {
        return document.querySelectorAll('[data-rank]');
    }
    closeDialog(dialog) {
        dialog.close();
    }
    showDialog(dialog) {
        dialog.showModal();
    }
    getAddModelInfo() {
        const addModelInputs = document.querySelectorAll('#addModel input');
        const info = {
            name: addModelInputs[0].value || '',
            url: addModelInputs[1].value || '',
            desc: addModelInputs[2].value || '',
        }
        return info;
    }
    bindEventOnce() {
        //close
        this.dialogNodeList.forEach(node => {
            node.addEventListener('click', e => {
                if (e.target.classList.contains('cancel')) {
                    closeDialog(e.currentTarget)
                }
                else if (e.target.classList.contains('confirm')) {
                    // console.log(e.target)
                    const inputNodeList = e.currentTarget.querySelectorAll('input');
                    let flag = true;//标记是否填写完整
                    inputNodeList.forEach(node => {
                        // console.log(node.value)
                        if (!flag) return;
                        if (!node.value) {
                            alert('请填写完整信息')
                            flag = false;
                            return;
                        }
                    })
                    if (!flag) return;
                    data.modelList.push(this.getAddModelInfo())
                    renderModelModules();
                    closeDialog(e.currentTarget)
                }
            })
        })

        // show
        this.uploadModelBtn.addEventListener('click', (e) => {
            showDialog(document.getElementById('addModel'))
        })
        this.inputDemandNodeList.forEach(node => {
            node.addEventListener('click', e => {
                showDialog(document.getElementById('inputInfo'))
            })
        })
    }
    bindEventActively() {
        this.getLayerNodeList().forEach(node => {
            node.onclick = (e) => {
                if (!e.target.classList.contains('added')) return;
                showDialog(document.getElementById('inputInfo'))
            }
        })
    }
}

// function showDialog(dialog) {
//     dialog.showModal();
// }
// function closeDialog(dialog) {
//     dialog.close();
// }
// const cancel = document.querySelectorAll('.cancel')
// const confirm = document.querySelectorAll('.confirm');
// const inputInfo = document.querySelectorAll('.added');
// const uploadModel = document.querySelector('.uploadModel');

// cancel.forEach(item => {
//     item.addEventListener('click', e => {
//         const dialog = e.target.parentNode.parentNode.parentNode;
//         closeDialog(dialog);
//     })
// })
// confirm.forEach(item => {
//     item.addEventListener('click', e => {
//         const dialog = e.target.parentNode.parentNode.parentNode;
//         closeDialog(dialog);
//     })
// })
// inputInfo.forEach(item => {
//     item.addEventListener('click', function (e) {
//         showDialog(document.getElementById('inputInfo'));
//     })
// })
// uploadModel.addEventListener('click', function (e) {
//     const uploadDialog = document.getElementById('addModel');
//     uploadDialog.showModal();
// })
new Dialog();