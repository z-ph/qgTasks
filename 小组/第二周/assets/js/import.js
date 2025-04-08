function merge(todos,data){
    return [...todos,...data];
}
function importJson() {
    const fileInput = document.querySelector('#import~input')
    const file = fileInput.files[0]; // 获取用户选择的文件
    console.log(file);
    if (!file) {
        alert('请选择一个 JSON 文件！');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const jsonText = event.target.result; // 获取文件内容
        try {
            const data = JSON.parse(jsonText); // 解析 JSON 文本
            doms.todos = merge(doms.todos,data);
            save();
            render();
        } catch (error) {
            console.log(error);
            alert('文件格式错误，请确保导入的是有效的 JSON 文件！');
        }
    };
    reader.readAsText(file); // 读取文件内容
}
function bindRealFileBtn(){
    const beautyBtn = document.querySelector('#import'); 
    const functionBtn = document.createElement('input');
    functionBtn.type = 'file';
    functionBtn.accept = '.txt,.json';
    functionBtn.classList.add('hidden');
    beautyBtn.after(functionBtn);
    beautyBtn.addEventListener('click',()=>{
        functionBtn.click();
    })
    functionBtn.addEventListener('change',()=>{
        importJson();
    })
}

