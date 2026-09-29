const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.textContent = "✓ " + task.text;
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
         completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
         deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Add task using button
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (!text) {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
});

// Add task by pressing Enter
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

displayTasks();