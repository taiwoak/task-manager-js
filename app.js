let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const taskName = input.value.trim();
    if (taskName === "") return alert("Field cannot be empty!");
    const task = {
    id: Date.now(),
    name: taskName,
    completed: false
    };
    tasks.push(task);
    input.value = "";
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed};
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function sortTasks() {
    tasks.sort((a,b) => a.name.localeCompare(b.name));
    renderTasks();
}

function reverseTasks() {
    tasks.reverse();
    renderTasks();
}

function searchTasks() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filtered = tasks.filter(task => task.name.toLowerCase().includes(searchValue));
    renderTasks(filtered);
}

function findTask() {
    const name = document.getElementById("findInput").value.trim().toLowerCase();
    const found = tasks.find(task => task.name.toLowerCase() === name);
    if (found) {
        alert(`Task found: "${found.name}" - ${found.completed ? "✅ Completed": "❌ Not Completed"}`);
        highlightTask(found.id);
    } else {
        alert("Task not found!");
    }
}

function highlightTask(id) {
    const listItems = document.querySelectorAll("#taskList li");
    listItems.forEach(li => li.classList.remove("highlight"));
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex >= 0) {
        listItems[taskIndex].classList.add("highlight");
    }
}

function renderTasks(list = tasks) {
    const ul = document.getElementById("taskList");
    ul.innerHTML = "";
    list.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "done" : "";
        li.innerHTML = `
        ${task.name}
        <button onclick="toggleTask(${task.id})">✅</button>
        <button onclick="deleteTask(${task.id})">❌</button>
        `;
        ul.appendChild(li);
    });
    updateSummary();
}

function updateSummary() {
    const summary = document.getElementById("summary");
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const allDone = tasks.every(task => task.completed);
    const hasAny = tasks.some(task => task.completed);
    const totalChars = tasks.reduce((sum, task) => sum + task.name.length, 0);
    const completedChars = tasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + task.name.length, 0);
    summary.innerHTML = `
    📝 Total Tasks: ${total} | ✅ Done: ${completed} <br/>
    🔠 Total Characters: ${totalChars} | ✔️ Done Characters: ${completedChars} <br/>
    All done? ${allDone ? "Yes 🎉" : "No 😅"} |
    Any done? ${hasAny ? "Yes" : "No"}
    `;
}