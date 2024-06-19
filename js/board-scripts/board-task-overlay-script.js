function addTask() {
    fetch('board-task-overlay.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('task-overlay').innerHTML = html;
            document.getElementById('task-overlay').classList.remove('d-none');
            initializeApp();
        });
}


function closeOverlayAdd() {
    document.getElementById('task-overlay').classList.add('d-none');
    document.getElementById('task-overlay').innerHTML = '';
}
