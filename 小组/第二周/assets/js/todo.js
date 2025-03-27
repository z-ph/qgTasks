
// 初始化页面时从 localStorage 加载数据
function initTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    renderTodos(todos);
}

// 渲染待办事项列表
function renderTodos(todos) {

    const emptyTip = document.querySelector('#todo-app > div.container.main > div.todo-list-box > ul.empty-tips');

    if (todos.length !== 0) {
        emptyTip.style.display = 'none';
    }
    else {
        emptyTip.style.display = 'block';
    }
    const todoList = document.querySelector('.todo-list');
    const template = (index, content) => {
        return `<li data-delay="${index}" draggable="true" class="todo-item">
                            <div class="todo-content">
                                ${content}</div>
                            <div class="todo-btn btn-finish"></div> <!---->
                            <div class="todo-btn btn-delete"><img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4wOTkzIDE3Ljc1OTdDMTUuNzk0OSAxOC4yMDk4IDE2LjcyMzUgMTguMDEwOCAxNy4xNzM2IDE3LjMxNTJDMTcuNjIzNiAxNi42MTk3IDE3LjQyNDYgMTUuNjkxMSAxNi43MjkxIDE1LjI0MUMxMy4zMDc5IDEzLjAyNzMgMTAuODIwOSAxMC45OTU5IDguOTIyNTEgOS4wMzczOUM5LjA5NzQyIDguODQ5ODIgOS4yNzI5MSA4LjY2NTcxIDkuNDQ4ODggOC40ODUzNEMxMS44ODY0IDUuOTg2OTIgMTQuMjQ3MiA0LjM4MDY2IDE2LjI5NDQgMy45NzEyMkMxNy4xMDY3IDMuODA4NzUgMTcuNjMzNSAzLjAxODUyIDE3LjQ3MTEgMi4yMDYxOEMxNy4zMDg2IDEuMzkzODQgMTYuNTE4NCAwLjg2NzAxMyAxNS43MDYgMS4wMjk0OEMxMi43NTMyIDEuNjIwMDUgOS44NjQwNiAzLjc2Mzc5IDcuMzAxNTQgNi4zOTAzN0M3LjE4MTUxIDYuNTEzNCA3LjA2MTgxIDYuNjM3ODkgNi45NDI0OSA2Ljc2Mzc1QzUuNDIwMDEgNC44MDQzMyA0LjM3MDU4IDIuODc2MzIgMy40MjU5MSAwLjg2MzE2NEMzLjA3Mzk5IDAuMTEzMjAyIDIuMTgwNzMgLTAuMjA5NDc1IDEuNDMwNzcgMC4xNDI0NDVDMC42ODA4MDkgMC40OTQzNjUgMC4zNTgxMzIgMS4zODc2MiAwLjcxMDA1MSAyLjEzNzU4QzEuODIwODggNC41MDQ4MSAzLjA3ODk5IDYuNzY1MTEgNC45MjkzMiA5LjA1MzA2QzMuMjIyMDYgMTEuMTM0MSAxLjYyNjY5IDEzLjQzMjggMC4yMjI3MjMgMTUuNzE0MkMtMC4yMTE0NTMgMTYuNDE5NyAwLjAwODUyNzUyIDE3LjM0MzcgMC43MTQwNjQgMTcuNzc3OEMxLjQxOTYgMTguMjEyIDIuMzQzNTIgMTcuOTkyIDIuNzc3NyAxNy4yODY1QzQuMDQ4MTkgMTUuMjIyIDUuNDY0MDUgMTMuMTcyNiA2Ljk1NTU5IDExLjMxNjhDOC45ODUgMTMuMzc2NSAxMS41OTU5IDE1LjQ5MjggMTUuMDk5MyAxNy43NTk3WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K"
                                    alt="删除"></div> <!---->
                                    <div class="edit-todo-wrapper"><input type="text" value="${content}" class="edit-todo hidden">
            <div class="todo-btn btn-edit-submit"><img src="../assets/icon/upArrow.svg" alt="提交"></div>
        </div>
                        </li>`
    }
    todoList.innerHTML = '';
    for(let index in todos){
        todoList.innerHTML += template(index, todos[index]);
    }
    const delBtns =document.querySelectorAll('#todo-app > div.container.main > div.todo-list-box > ul.todo-list > li > div.todo-btn.btn-delete');
    for(let index =0;index<delBtns.length;index++){
        delBtns[index].addEventListener('click', () => {
            deleteTodo(index);
            
        });
    }
    const li = document.querySelectorAll('#todo-app > div.container.main > div.todo-list-box > ul.todo-list > li');
    for(let index =0;index<li.length;index++){
        li[index].addEventListener('dblclick', () => {
            editTodo(index, li);
        });
    }
    const inputWrappers = document.querySelectorAll('.edit-todo-wrapper');
    for(let index =0;index<inputWrappers.length;index++){
        inputWrappers[index].classList.toggle('hidden');
    }
    // const todoList = document.querySelector('.todo-list');
    // todoList.innerHTML = '';
    // todos.forEach((todo, index) => {
    //     const li = document.createElement('li');
    //     li.textContent = todo;
    //     li.setAttribute('data-index', index);
    //     li.draggable = true;

    //     // 添加删除按钮
    //     const deleteBtn = document.createElement('button');
    //     deleteBtn.textContent = '删除';
    //     deleteBtn.addEventListener('click', () => {
    //         deleteTodo(index);
    //     });
    //     li.appendChild(deleteBtn);

    //     // 添加双击编辑功能
    //     li.addEventListener('dblclick', () => {
    //         editTodo(index, li);
    //     });

    //     todoList.appendChild(li);
    // });
}

// 添加新的待办事项
function addTodo(text) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// 删除指定索引的待办事项
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// 编辑指定索引的待办事项
function editTodo(index, element) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newText = prompt('请输入新的内容:', todos[index]);
    if (newText !== null) {
        todos[index] = newText;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
    }
    // const todoList = document.querySelector(`.todo-list li:nth-child(${index+1})`);

    // const template = ()=>{
    //     return `
    //     `
    // }
    // todoList.innerHTML += template();
    // localStorage.setItem('todos', JSON.stringify(todos));
    // renderTodos(todos);
}

// 动态加载 Sortable 库
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js';
document.head.appendChild(script);

// // 处理拖拽排序
// document.addEventListener('DOMContentLoaded', function () {
//     // 确保 Sortable 已加载后再使用
//     if (typeof Sortable === 'undefined') {
//         console.error('Sortable library is not loaded.');
//         return;
//     }
//     const todoList = document.querySelector('.todo-list');
//     new Sortable(todoList, {
//         animation: 150,
//         onEnd: function (evt) {
//             const todos = JSON.parse(localStorage.getItem('todos')) || [];
//             const item = todos.splice(evt.oldIndex, 1)[0];
//             todos.splice(evt.newIndex, 0, item);
//             localStorage.setItem('todos', JSON.stringify(todos));
//         }
//     });
// });

// 监听新增待办事项输入框的提交事件
document.querySelector('.add-content').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const text = e.target.value.trim();
        if (text !== '') {
            addTodo(text);
            e.target.value = '';
        }
    }
});

// 页面加载时初始化待办事项
initTodos();
