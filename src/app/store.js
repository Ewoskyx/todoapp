import Task from './task.js';

class Store {
  static getFromStore() {
    let taskArray;
    if (localStorage.getItem('tasks') === null) {
      taskArray = [];
    } else {
      taskArray = JSON.parse(localStorage.getItem('tasks'));
    }
    return taskArray;
  }

  static addToStore(task) {
    const newTaskArray = Store.getFromStore();
    newTaskArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(newTaskArray));
  }

  static updateToStore(e) {
    const tasks = Store.getFromStore();
    const newTask = new Task();
    const taskIndex = e.target.parentElement.firstChild.id;
    const taskDescription = e.target.value;
    tasks.forEach((task, position) => {
      if (task.index === Number(taskIndex)) {
        newTask.description = taskDescription;
        newTask.index = task.index;
        tasks.splice(position, 1, newTask);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static updateStatus(e) {
    const cbId = e.target.id;
    const tasks = Store.getFromStore();
    tasks.forEach((tsk) => {
      if (tsk.index === Number(cbId)) tsk.isCompleted = !tsk.isCompleted;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  static deleteFromStore() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTasks = tasks.filter((task) => task.isCompleted === false);
    newTasks.forEach((task, i) => {
      task.index = i + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  static deleteSelected(e) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const { id } = e.target.parentElement.firstChild;
    const newTasks = tasks.filter((task) => task.index !== Number(id));
    newTasks.forEach((task, i) => {
      task.index = i + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
}
export default Store;
