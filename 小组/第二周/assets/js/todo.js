
// 格式
// [
//     {
//       "id": 0,
//       "title": "a",
//       "completed": false,
//       "removed": false
//     },
//     {
//       "id": 1,
//       "title": "a",
//       "completed": false,
//       "removed": false
//     },
//     {
//       "id": 2,
//       "title": "a",
//       "completed": false,
//       "removed": false
//     }
//   ]
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const notHiddenIdList = [];
// const todos = [];
function checkLS() {
    console.log(localStorage.getItem('todos'));
}
function init() {
    //重置id
    todos.forEach((item, index) => {
        item.id = index;
    });
    save();
    render();
}
init();


let index = todos.length;

function add(value) {
    //如果输入为空，则不执行后续代码
    if (value.trim() === '') return;
    todos.unshift({
        id: index++,
        title: value,
        completed: false,
        removed: false,
    });
    save();
    render();
}
function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function remove(index) {
    todos.splice(index, 1);
    save();
    render();
}

function edit(id, editWrapper,) {
    todos.forEach((item, i) => {
        if (item.id == id) {
            const wrapper = editWrapper.querySelector('.edit-todo-wrapper');
            wrapper.classList.remove('hidden');
            notHiddenIdList.push(id);
        }
    });
}
function clearEmptyTip() {
    // clear emptytip
    const emptyTip = document.querySelector('#todo-app > div.container.main > div.todo-list-box > ul.empty-tips');
    if (todos.length !== 0) {
        emptyTip.style.display = 'none';
    }
    else {
        emptyTip.style.display = 'block';
    }
}
function updateTodo(todoList) {
    // 渲染todos
    let str = '';
    for (let index = 0; index < todos.length; index++) {
        let hidden = 'hidden';
        if (notHiddenIdList.includes(todos[index].id)) {
            hidden = '';
        }
        let item = todos[index];
        let content = item.title;
        if (!item.removed) {
            str += `
            <li data-delay="${index}" draggable="true" class="todo-item">
                <div class="todo-content">
                    ${content}
                </div>
                <div class="todo-btn btn-finish"></div>
                <div class="todo-btn btn-delete">
                    <img src="./assets/icon/del.svg"alt="删除">
                </div>
                <div class="edit-todo-wrapper ${hidden}">
                    <input type="text" value="${content}" class="edit-todo">
                    <div class="todo-btn btn-edit-submit"><img src="./assets/icon/upArrow.svg" alt="提交"></div>
                </div>
            </li>`
        }
    }
    todoList.innerHTML = str;
}
function bindEvent(liList) {
    for (let index = 0; index < liList.length; index++) {
        //给当前li的内容绑定双击事件
        let id = todos[index].id;
        let content = liList[index].querySelector('.todo-content');
        const wrapper = liList[index].querySelector('.edit-todo-wrapper');
        content.addEventListener('dblclick', () => {
            // edit(id, liList[index]);
            todos.forEach((item, i) => {
                if (item.id == id) {
                    wrapper.classList.remove('hidden');
                    notHiddenIdList.push(id);
                }
            });
        });
        //给当前li的删除按钮绑定点击事件
        let delBtn = liList[index].querySelector('.btn-delete');
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            remove(index);
        });
        //给编辑框绑定input事件，并与li的内容绑定同步
        let editInput = liList[index].querySelector('.edit-todo');
        editInput.addEventListener('input', (e) => {
            e.stopPropagation();
            todos[index].title = editInput.value;
            save();
            content = liList[index].querySelector('.todo-content');
            content.textContent = editInput.value;
        });
        //给编辑框绑定收起事件
        let btnEditSubmit = liList[index].querySelector('.btn-edit-submit');
        btnEditSubmit.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}
function render() {
    clearEmptyTip();

    const todoList = document.querySelector('.todo-list');
    updateTodo(todoList);

    const liList = document.querySelectorAll('#todo-app > div.container.main > div.todo-list-box > ul.todo-list > li');
    bindEvent(liList);
}

function finish(index) {
    todos[index].completed = !todos[index].completed;
    save();
    render();
}
function reset() {
    todos = [];
    save();
    render();
}
function test(n) {
    for (let i = 0; i < n; i++) {
        add(i);
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 在这里处理表单数据
    const input = document.querySelector('.add-content');
    add(input.value);
    input.value = '';
});