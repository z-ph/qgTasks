const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为
    // 在这里处理表单数据
    const input = document.querySelector('.add-content');
    add(input.value);
    input.value = '';
});
