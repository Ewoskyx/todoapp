import Store from './store.js';

const dynamicDiv = document.querySelector('.dynamicTaskDiv');
const taskFooter = document.querySelector('.taskFooter');

class UI {
  static addTask(task) {
    // Create elements
    const divCheck = document.createElement('div');
    const checkBox = document.createElement('input');
    const contentP = document.createElement('textarea');
    const dotsIcon = document.createElement('button');
    // Classnames & Id's & attributes
    divCheck.className = 'form-check task-main row d-flex align-items-center justify-content-around p-1 ms-3';
    checkBox.className = 'form-check-input checkbox col-2';
    checkBox.id = `${task.index}`;
    checkBox.type = 'checkbox';
    checkBox.checked = `${task.isCompleted ? 'checked' : ''}`;
    checkBox.addEventListener('change', Store.updateStatus);
    contentP.className = 'task-desc col';
    contentP.id = 'task-desc';
    contentP.innerHTML = `${task.description}`;
    contentP.addEventListener('change', Store.updateToStore);

    dotsIcon.className = 'btn-dots col-1';
    // Propagate at DOM
    divCheck.append(checkBox, contentP, dotsIcon);
    dynamicDiv.insertBefore(divCheck, taskFooter);
  }

  static showTasks() {
    const tasks = Store.getFromStore();
    tasks.forEach((task) => {
      UI.addTask(task);
    });
  }

  static clearTask() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const taskCompleted = checkbox.parentElement;
        taskCompleted.remove();
      }
    });
  }

  static clearInput() {
    const newTask = document.querySelector('.task-input');
    newTask.value = '';
  }
}

export default UI;