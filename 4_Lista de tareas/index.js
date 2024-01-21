document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const markAllCompletedButton = document.getElementById('markAllCompleted');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        if (title && description) {
            createTask(title, description);
            taskForm.reset();
        }
    });

    markAllCompletedButton.addEventListener('click', function () {
        removeAllTasks();
    });

    function createTask(title, description) {
        const li = document.createElement('li');
        li.innerHTML = `<h3>${title}</h3> ${description}
        <br> <button class="completeButton">Completada</button>`;
        taskList.appendChild(li);

        const completeButton = li.querySelector('.completeButton');
        completeButton.addEventListener('click', function () {
            taskList.removeChild(li);
        });
    }

    function removeAllTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
});