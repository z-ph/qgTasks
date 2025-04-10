const uploadData ={}
uploadData.btn = document.querySelector('.upload-data')
uploadData.btn.addEventListener('click',()=>{
    const dialog = document.querySelector('#upload-data-dialog')
    dialog.showModal()
})

uploadData.upload = () => {}
uploadData.inputNodeList = public.dialogs.uploadDataDialog.querySelectorAll('input')
/**
 * 获取表单输入数据并进行预处理
 * 
 * 功能说明：
 * 1. 遍历所有输入节点，收集常规输入框的值
 * 2. 处理图片上传输入框的特殊逻辑：
 *    - 将图片文件转换为Base64编码
 *    - 捕获图片转换过程中的错误
 * 3. 提交后自动清空输入框：
 *    - 普通输入框直接清空
 *    - 文件输入框通过DOM替换方式重置
 * 
 * @returns {Object} 包含所有输入值的对象，图片字段为Base64字符串或空字符串
 */
uploadData.getInputData = async () => {
    const inputData = {}
    
    // 收集所有输入框的当前值
    uploadData.inputNodeList.forEach(input => {
        inputData[input.id] = input.value
    })

    // 处理图片上传的特殊逻辑
    const imageInput = Array.from(uploadData.inputNodeList).find(input => input.id === 'image')
    const image = imageInput.files[0]
    if (image) {
        try {
            // 异步文件读取（封装为Promise）
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(image);
            });
            inputData.image = base64;
        } catch (error) {
            inputData.image = '';
            console.error('图片转换失败:', error);
        }
    } else {
        inputData.image = '';
        console.log('未选择图片');
    }

    // 清空非文件类型的输入框
    uploadData.inputNodeList.forEach(input => {
        if (input.type !== 'file') {
            input.value = '';
        }
    });

    // 通过DOM替换重置文件输入框（绕过浏览器安全限制）
    const fileInput = document.querySelector('#image');
    if (fileInput) {
        const newFileInput = fileInput.cloneNode(true);
        fileInput.parentNode.replaceChild(newFileInput, fileInput);
    }
    
    return inputData
}