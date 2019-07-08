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
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from local storage

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove" ></i>';
    //Append the link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
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

  //Store in local Storage
  storeTaskInLocalStorage(taskInput.value);

  //CLear input value
  taskInput.value = "";
  console.log(li);
  e.preventDefault();
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);
    if (confirm("are you sure? This CANNOT be undone!")) {
      e.target.parentElement.parentElement.remove();

      //Remove from local storage
      console.log(e.target.parentElement.parentElement);
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}
//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  console.log("task item text content is: " + taskItem);
  console.log(taskItem + " task item");
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  console.log(tasks);
  tasks.forEach(function(task, index) {
    console.log("index is: " + index);
    if (taskItem.textContent == task) {
      // index = tasks.indexOf(task);
      console.log("task at index: " + index + " is a match");
      tasks.splice(index, 1);
    } else {
      console.log("task at index: " + "index is not a match");
    }
  });
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
  clearTasksFromLocalStorage();
}

//Clear Tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
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
