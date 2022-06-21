// Define UI Vars
const form = document.querySelector('#task-form'); 
const taskList= document.querySelector('.collection'); 
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task'); 
const clearBtn = document.querySelector('.clear-tasks')

//  load All Event listeners 
// loadEventListeners();

// load all event listeners


form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);

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

// clear input 
taskInput.value = '';


  e.preventDefault();
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?!'))
e.target.parentElement.parentElement.remove();
  }


}


// Clear Tasks
function clearTasks(e){
  // One option to remove all tasks
  // taskList.innerHTML = ''; 

  // Faster option 
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

}


// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase(); //
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


