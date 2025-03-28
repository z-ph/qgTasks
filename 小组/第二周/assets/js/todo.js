
// todos的数据格式
// [
//     {
//       "id": 0,
//       "title": "a",
//       "completed": false,
//       "removed": false
//     },
// ]
const doms = {}
doms.todos = JSON.parse(localStorage.getItem('todos')) || [];
doms.index = doms.todos.length;
doms.notHiddenIdList = [];
doms.allDoneBtn = document.querySelector('#todo-app > div.container.main > div.todo-list-box > div > input');
function checkLS() {
    console.log(localStorage.getItem('todos'));
}
function init() {
    //重置id
    doms.todos.forEach((item, index) => {
        item.id = index;
    });
    //全部已完成按钮绑定事件
    doms.allDoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        allDone();
    });
    save();
    render();
}
init();



function add(value) {
    //如果输入为空，则不执行后续代码
    if (value.trim() === '') return;
    doms.todos.unshift({
        id: doms.index++,
        title: value,
        completed: false,
        removed: false,
    });
    save();
    render();
}
function save() {
    localStorage.setItem('todos', JSON.stringify(doms.todos));
}
function remove(index) {
    doms.todos.splice(index, 1);
    save();
    render();
}

function edit(id, editWrapper,) {
    doms.todos.forEach((item, i) => {
        if (item.id == id) {
            const wrapper = editWrapper.querySelector('.edit-todo-wrapper');
            wrapper.classList.remove('hidden');
            doms.notHiddenIdList.push(id);
        }
    });
}
function clearEmptyTip() {
    // clear emptytip
    const emptyTip = document.querySelector('#todo-app > div.container.main > div.todo-list-box > ul.empty-tips');
    if (doms.todos.length !== 0) {
        emptyTip.style.display = 'none';
    }
    else {
        emptyTip.style.display = 'block';
    }
}
function updateTodo(todoList) {
    // 渲染todos
    let ulInnerHTML = '';
    for (let index = 0; index < doms.todos.length; index++) {
        const item = doms.todos[index];
        const content = item.title;
        const btnStatus = item.completed ? 'btn-unfinish' : 'btn-finish';
        const editHidden = doms.notHiddenIdList.includes(doms.todos[index].id) ? '' : 'hidden';
        const completed = item.completed ? 'completed' : '';
        const iconHidden = item.completed ? '' : 'hidden';
        if (!item.removed) {
            ulInnerHTML += `
            <li data-delay="${index}" draggable="true" class="todo-item">
                <div class="todo-content ${completed}">
                    ${content}
                </div>
                <div class="todo-btn ${btnStatus}">
                    <img src="./assets/icon/check.svg" class="${iconHidden}" alt="完成">
                </div>
                <div class="todo-btn btn-delete">
                    <img src="./assets/icon/del.svg"alt="删除">
                </div>
                <div class="edit-todo-wrapper ${editHidden}">
                    <input type="text" value="${content}" class="edit-todo">
                    <div class="todo-btn btn-edit-submit"><img src="./assets/icon/upArrow.svg" alt="提交"></div>
                </div>
            </li>`
        }
    }
    todoList.innerHTML = ulInnerHTML;
}
function bindEvent(liList) {
    //由于li是动态生成的
    //所以每次调用render函数渲染的li及其他某些动态生成的元素，都要重新绑定事件
    for (let index = 0; index < liList.length; index++) {
        //获取当前li元素和todo对象
        const li = liList[index];
        const todo = doms.todos[index];
        const id = todo.id;
        const contentWrapper = li.querySelector('.todo-content');
        const editWrapper = li.querySelector('.edit-todo-wrapper');
        const delBtn = li.querySelector('.btn-delete');
        const editInput = li.querySelector('.edit-todo');
        const btnEditSubmit = li.querySelector('.btn-edit-submit');
        const btnFinish = li.querySelector('.btn-finish');
        const btnUnfinish = li.querySelector('.btn-unfinish');
        const btn = btnFinish || btnUnfinish;
        //给contentwrapper绑定双击事件，双击弹出修改框
        contentWrapper.addEventListener('dblclick', () => {
            editWrapper.classList.remove('hidden');
            doms.notHiddenIdList.push(id);
            editInput.focus();
            editInput.setSelectionRange(editInput.value.length, editInput.value.length); // 将光标移动到末尾
        });

        //给当前li的删除按钮绑定点击事件，点击删除
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            remove(index);
        });

        //给编辑框绑定input事件，并与li的内容绑定同步
        editInput.addEventListener('input', (e) => {
            e.stopPropagation();
            //同步数据
            todo.title = editInput.value;
            contentWrapper.textContent = editInput.value;
            save();
        });

        //给编辑框绑定收起事件
        btnEditSubmit.addEventListener('click', (e) => {
            e.stopPropagation();
            editWrapper.classList.add('hidden');
        });

        // 给圆框添加点击事件，标记完成
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            change(index);
        });
    }
    const downloadBtn = document.querySelector('#download');
    const allDoneShortcut = document.querySelector('#todo-app > div.container.main > div.footer.side-bar > div.todo-footer-box > ul.todo-func-list.batch > li:nth-child(1) > input');
    const clearAllBtn = document.querySelector('#todo-app > div.container.main > div.footer.side-bar > div.todo-footer-box > ul.todo-func-list.batch > li:nth-child(2) > input');
    //下列与li元素无关
    //给导出按钮绑定事件
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        download();
    });
    //给全部完成的侧边快捷键绑定事件
    allDoneShortcut.addEventListener('click', (e) => {
        e.stopPropagation();
        allDone();
    });
    //给导入按钮绑定事件
    bindRealFileBtn();
    //清楚全部的侧边快捷键绑定事件
    clearAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearAll();
    });

}
function sideBarBtn() {
    const batch = document.querySelector('.batch');
    const datasave = document.querySelector('.datasave');
    if (doms.todos.length === 0) {
        batch.innerHTML = '';
        datasave.innerHTML = '<li><input value="导入(txt/json)" type="button" id="import" class="btn-small action-import"></li>';
        return;
    }
    const templateBatch = `<li><input type="button" value="全部标为已完成" class="btn-small completed-all"></li> <!----> <li><input type="button" value="清除全部" class="btn-small clear-all"></li>`
    const templateDatasave = `<li><input type="button" value="导出数据" id="download" onclick="handleClickDownload()" class="btn-small  action-download"></li> <li><input value="导入(txt/json)" type="button" id="import" class="btn-small action-import"></li>`
    batch.innerHTML = templateBatch;
    datasave.innerHTML = templateDatasave;

}
function render() {
    clearEmptyTip();
    sideBarBtn();

    const todoList = document.querySelector('.todo-list');
    updateTodo(todoList);

    const liList = document.querySelectorAll('#todo-app > div.container.main > div.todo-list-box > ul.todo-list > li');
    bindEvent(liList);

}
function allDone(){
    if(!confirm('Confirm to mark all as completed?'))return;
    doms.todos.forEach(item => {
        item.completed = true;
    });
    save();
    render();
}

function change(index) {
    //
    doms.todos[index].completed = !doms.todos[index].completed;
    save();
    render();
}
function clearAll() {
    if(!confirm('Confirm to clear all?'))return;
    doms.todos = [];
    save();
    render();
}

