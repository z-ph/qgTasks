function download() {
    const todos = localStorage.getItem('todos');
    const jsonText = JSON.stringify(JSON.parse(todos), null, 2); // 格式化 JSON 文本
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // 创建下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json'; // 设置文件名
    a.click();

    // 释放 URL 对象
    URL.revokeObjectURL(url);
}

// 调用函数导出 JSON 文件
// exportToJsonFile();
