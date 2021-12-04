import './main.scss';
import 'bootstrap';
import Task from './app/task.js';
import Store from './app/store.js';
import UI from './app/ui.js';

// Show TASK
UI.showTasks();
const form = document.querySelector('.dynamicTaskDiv');
const newTask = document.querySelector('.task-input');
const taskFooter = document.querySelector('.taskFooter');

// Add TASK
const add = () => {
  let counter = 1;
  const taskArray = JSON.parse(localStorage.getItem('tasks'));
  if (taskArray !== null) {
    counter = taskArray.length + 1;
  }

  if (newTask.value === '') {
    UI.clearInput();
  } else {
    const task = new Task(newTask.value, counter);

    UI.addTask(task);
    Store.addToStore(task);
    UI.clearInput();
  }
};

form.addEventListener('submit', add);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    add();
  }
});

// Delete selected TASK/TASKS
taskFooter.addEventListener('click', () => {
  UI.clearTask();
  Store.deleteFromStore();
  UI.reloadUI();
  UI.showTasks();
});

// Drag&Drop
UI.reloadUI();
UI.showTasks();
UI.dragOver();
