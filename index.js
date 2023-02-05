let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

async function fetchTodos()
{
    // Get request
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(function(response){
//         // console.log(response);
//         return response.json();
//     })
//     .then(function(data){   
//         tasks=data.slice(0,10);
//         renderList();
//     })
//     .catch((error)=>{
//         console.log('error',error);
//     })
//      
try{  
    const response= await fetch('https://jsonplaceholder.typicode.com/todos')
    const data= await  response.json();
    tasks=data.slice(0,10);
    renderList();
} catch(error){
    console.log(error);
}
}

function addTasktoDom(task)
{
    const li=document.createElement('li');
    li.innerHTML =
    `
        <input type="checkbox" id="${task.id}"  ${task.completed ? 'checked':'' } class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <i class="fa-solid fa-trash delete" data-id="${task.id}"></i>
    `;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTasktoDom(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

function Toggletask (taskId) {
    const task=tasks.filter(function (task){
        return task.id == Number(taskId);

    });
    if(task.length>0){
        const currentTaks=task[0];
        currentTaks.completed = !currentTaks.completed;
        renderList();
        showNotification("Task Toggle Successfully");
    }else{
        showNotification("Task not Toggle ");
    }
}

function deleteTask (taskId) {
    const newTask=tasks.filter(function (task){
        return task.id !=Number(taskId);
    })
    tasks=newTask;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task) {
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification("task added succesfully")
        return;
    }else{
        showNotification("task not added")
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        console.log('text',text);
    
    if(!text){
        showNotification("Task text should not be empty");
        return;
    }
    const task ={
        title:text,
        id:Date.now(),
        completed:false
    }
    e.target.value='';
    addTask(task);
    }
}

function handleClickListener(e)
{
    const target=e.target;
    if(target.className == 'fa-solid fa-trash delete')
    {
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className=='custom-checkbox')
    {
        const taskId=target.id;
        Toggletask(taskId);
        return;
    }
}

function intializeApp()
{
    fetchTodos();
    addTaskInput.addEventListener('keyup' ,handleInputKeypress); 
    document.addEventListener('click',handleClickListener);
}
intializeApp();
 

