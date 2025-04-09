const dialogNodeList = document.querySelectorAll('dialog');
dialogNodeList.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel')) {
            console.log(e.target)
            closeDialog(e.currentTarget)
       }
    })
});

function showDialog(dialog) {
    dialog.showModal();
}
showDialog(dialogNodeList[1])
function closeDialog(dialog) {
    dialog.close();
}