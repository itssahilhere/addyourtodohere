let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function addTaskToDom(task){
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.done? 'checked':''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE82ZBUglCzMDuDUNWDLAz0EHyF_mE7aaG3len2mkh&s" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li)
}


function renderList () {
    taskList.innerHTML='';
    for(var i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function markTaskAsComplete (taskId) {
    const newtask=tasks.filter(function(task){
        return task.id===taskId
    });
    if(newtask.length>0){
        const currtask=newtask[0];
        currtask.done=!currtask.done;           
        renderList();
        showNotification("task toggled successfully");
        return;
    }
    showNotification("task couldn't be toggled successfully");
    
}

function deleteTask (taskId) {
    const newtask=tasks.filter(function(task){
        return task.id!==taskId
    });
    tasks=newtask;
    renderList();
    showNotification("the task has been removed successfully");
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
    }
    showNotification("this task can't be added");
}

function showNotification(text) {
    alert(text);
}
// console.log(event)
function handleinput(event){
    if(event.key==='Enter'){
        const text=event.target.value;
        console.log(text);
        if(!text){
            showNotification("this filed can't be empty");
            return;
        }
    const task={
        text:text,
        id:Date.now().toString(),
        done:false
    }
    event.target.value='';
    addTask(task);
    }
}
function handleclick(event){
    const target=event.target;
    console.log(target);
    if(target.className==='delete'){
        const taskid=target.dataset.id;
        deleteTask(taskid);
        return
    }
    else if(target.className==='custom-checkbox'){
        const taskid=target.id;
        markTaskAsComplete(taskid);
        return;
    }
}
addTaskInput.addEventListener('keyup',handleinput);
document.addEventListener('click',handleclick);