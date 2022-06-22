// Define UI Vars
const form = document.querySelector('#task-form'); 
const taskList= document.querySelector('.collection'); 
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task'); 
const clearBtn = document.querySelector('.clear-tasks')

//  load All Event listeners 
// loadEventListeners();

// DOM  load event
document.addEventListener('DOMContentLoaded', getTasks )
// load all event listeners

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);

// GET Tasks from localStorage (LS)
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    // Local storge stor just string , WE use JSON.parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task){
    const li = document.createElement('li');
    // Add cleass
    li.className = 'collection-item';
    // Create text element
    li.appendChild(document.createTextNode(task));

    // Create a link 
    const link = document.createElement('a');

    // Add className
    link.className = 'delete-item secondary-content';

    // Add icon to HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append Li to Ul 
    taskList.appendChild(li);
  })
}


// ADD Task 
function addTask(e){

  if (taskInput.value === ''){
    alert('Add a task')
  }
  
  // Cerate Li element
  const li = document.createElement('li'); 
  // Add cleass
  li.className='collection-item';
  // Create text element
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a link 
  const link= document.createElement('a');

  // Add className
  link.className = 'delete-item secondary-content';

  // Add icon to HTML
  link.innerHTML ='<i class="fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

// Append Li to Ul 
taskList.appendChild(li);
// console.log(li)

// Store in lS
storeTaskInLocalStorage(taskInput.value);

// clear input 
taskInput.value = '';


  e.preventDefault();
}

// Store Task to LS
function storeTaskInLocalStorage(task) {
  let tasks; 
  if (localStorage.getItem('tasks') == null) {
    tasks = []; 
  }else {
    // Local storge stor just string , WE use JSON.parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  // Set back to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task 
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?!'))
e.target.parentElement.parentElement.remove();

// Remove from localStorage
removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }

}

// Remove From localStorage
function removeTaskFromLocalStorage(taskItem){
  // console.log(taskItem)
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks= [];
      }else {
        tasks= JSON.parse(localStorage.getItem('tasks'))
      }
      tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e){
  // One option to remove all tasks
  // taskList.innerHTML = ''; 

  // Faster option 
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorge()
}

// Clear Tasks from localStorage
function clearTasksFromLocalStorge() {
  localStorage.clear(); 
}

// Filter Function 
function filterTasks(e){
  const text= e.target.value.toLowerCase(); 
  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) !== -1) {
        task.style.display= 'block';
      }else{
        task.style.display= 'none';
      }
    }
  )
}



