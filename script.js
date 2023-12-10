let tasks = [];
const taskslist = document.getElementById('list');
const addtaskinput = document.getElementById('add');
const taskcounter = document.getElementById('task-counter');

function addtasktodom(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png" class="delete" data-id="${task.id}" />
    `
    taskslist.append(li);
}

function renderlist(){
    taskslist.innerHTML = '';
    for(let i=0; i<tasks.length; i++){
        addtasktodom(tasks[i]);
    }
    taskcounter.innerHTML = tasks.length;
}
function markasdone(taskid){
    const newtask = tasks.filter(function (task){
        return task.id == taskid;
    }) 
    const temp = newtask[0];
    temp.done = !temp.done;
    renderlist();
    return;
}

function deletetask(taskid){
    const newtasks = tasks.filter(function (tasks) {
        return tasks.id != taskid;
    })
    tasks = newtasks;
    renderlist();
    return;
}

function addtask(task){
    tasks.push(task);
    shownotification('added successfully');
    renderlist();
}

function shownotification(text){
    alert(text);
}

function handaleinput(e){
    if(e.key === 'Enter'){
        const text =    e.target.value;
        if(!text){
            shownotification('first enter somthing');
            return;
        }
        console.log(text);
        const task = {
            text,
            id : Date.now().toString(),
            done : false
        }
        e.target.value = '';
        addtask(task);
    }
}

function handaleevent(e){
    const target = e.target;
    console.log(target);
    if(target.className == 'delete'){
        const t = target.dataset.id;
        deletetask(t);
        return;
    }else if(target.className == 'custom-checkbox'){
        const targetid = target.id;
        markasdone(targetid);
        return;
    }
}

function initial(){
    addtaskinput.addEventListener('keyup', handaleinput);
    document.addEventListener('click', handaleevent);
}

initial();