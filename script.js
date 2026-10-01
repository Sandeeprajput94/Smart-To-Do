console.log("Smart To-Do JS Loaded");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() 
   { localStorage.setItem ("tasks", JSON.stringify (tasks)); }
function getPriority(taskText) {
  const text = taskText.toLowerCase();
  let category = "Personal";
  if (
    text.includes("college") ||
    text.includes("class") ||
    text.includes("assignment") ||
    text.includes("exam") ||
    text.includes("study") ||
    text.includes("project")
  ) {
    category = "College";
  } else if (
    text.includes("gym") ||
    text.includes("doctor") ||
    text.includes("medicine") ||
    text.includes("health") ||
    text.includes("workout")
  ) {
    category = "Health";
  }

  let priority = "Low";

  if (
    text.includes("urgent") ||
    text.includes("important") ||
    text.includes("deadline") ||
    text.includes("tomorrow")
  ) {
    priority = "High";
  } else if (
    text.includes("study") ||
    text.includes("assignment")
  ) {
    priority = "Medium";
  }
  return { category, priority };
}
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
const span = document.createElement("span");
span.textContent = task.text;
const label = document.createElement("span"); 
label.classList.add("status-label");
if (task.completed) { label.classList.add("completed"); }
else { label.classList.add(task.priority .toLowerCase()); }
const statusText = task.completed ? 'Completed' : `${task.priority}`;
label.textContent = statusText;
li.appendChild(span);
        const completeBtn = document.createElement("button");
        const checkBtn = document.createElement("button");
checkBtn.classList.add("check-btn");

if (task.completed) {
  checkBtn.textContent = "✓";
  checkBtn.classList.add("checked");
} else {
  checkBtn.textContent = "";
}

checkBtn.addEventListener("click", () => {
  task.completed = !task.completed;
  saveTasks();
  displayTasks();
});
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("buttonGroup");
const editBtn = document.createElement("button");
editBtn.textContent = "✏️";
editBtn.classList.add("edit-btn");

editBtn.addEventListener("click", () => {
    const newText = prompt("Edit your task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        const updatedInfo = getPriority(task.text);
        task.category = updatedInfo.category;
        task.priority = updatedInfo.priority;
        saveTasks();
        displayTasks();
    }
});
        const deleteBtn = document.createElement("button");
deleteBtn.textContent = "🗑️";
         deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
li.appendChild(checkBtn);
li.appendChild(span);
li.appendChild(label);
        buttonGroup.appendChild(editBtn);
buttonGroup.appendChild(deleteBtn);

li.appendChild(buttonGroup);

        taskList.appendChild(li);
    });
}
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (!text) {
        return;
    }
    const taskInfo = getPriority(text);

tasks.push({
  text: text,
  completed: false,
  priority: taskInfo.priority,
  category: taskInfo.category
});
    saveTasks();

    taskInput.value = "";

    displayTasks();
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

displayTasks();
const filterButtons = document.querySelectorAll(".task-filters button");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
