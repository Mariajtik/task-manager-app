const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskStats = document.getElementById('taskStats');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('div');
    empty.style.textAlign = 'center';
    empty.style.color = '#999';
    empty.innerHTML = `
      <p>Nenhuma tarefa ainda</p>
      <small>Adicione uma tarefa para começar!</small>
    `;
    taskList.appendChild(empty);
  } else {
    tasks.forEach((task) => {
      const div = document.createElement('div');
      div.className = `task ${task.completed ? 'completed' : ''}`;
      div.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${task.id})">✔️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      taskList.appendChild(div);
    });
  }

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  taskStats.innerHTML = `<span>Total: ${total} tarefa(s)</span><span>Concluídas: ${done}</span>`;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({
      id: Date.now(),
      text: text,
      completed: false
    });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
