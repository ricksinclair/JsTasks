//Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert(
      "Add a task to proceed. This will eventually be a modal or js popper."
    );
  }

  //Create li element
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove" ></i>';
  //Append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  //CLear input value
  taskInput.value = "";
  console.log(li);
  e.preventDefault();
}

//Remove Tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);
    if (confirm("are you sure? This CANNOT be undone!")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  e.preventDefault();
}

//Clear Tasks
function clearTasks(e) {
  //slower
  //taskList.innerHTML = "";

  //  Faster;
  if (confirm("are you sure? this cannot be undone!")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    //https://jsperf.com/innerhtml-vs-removechild/47
  }
  e.preventDefault();
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  //The below returns a node list
  //If we use document.getElementByClass would return an html collection (which we'd have to convert to an array)
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
  console.log("testing testing 123");
}
