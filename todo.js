let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE82ZBUglCzMDuDUNWDLAz0EHyF_mE7aaG3len2mkh&s" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';
    for (var i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete(taskId) {
    const newTask = tasks.filter(function(task) {
        return task.id === taskId;
    });
    if (newTask.length > 0) {
        const currTask = newTask[0];
        currTask.done = !currTask.done;
        renderList();
        saveTasksToLocalStorage(); 
        showNotification("Task toggled successfully");
        return;
    }
    showNotification("Task couldn't be toggled successfully");
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
    saveTasksToLocalStorage(); 
    showNotification("The task has been removed successfully");
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        saveTasksToLocalStorage(); 
        showNotification("Task added successfully");
        return;
    }
    showNotification("This task can't be added");
}

function showNotification(text) {
    alert(text);
}

function handleInput(event) {
    if (event.key === 'Enter') {
        const text = event.target.value;
        console.log(text);
        if (!text) {
            showNotification("This field can't be empty");
            return;
        }
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        };
        event.target.value = '';
        addTask(task);
    }
}

function handleClick(event) {
    const target = event.target;
    console.log(target);
    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderList();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
});

addTaskInput.addEventListener('keyup', handleInput);
document.addEventListener('click', handleClick);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("Service Worker Registered");
    });
}