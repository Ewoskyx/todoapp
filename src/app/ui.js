import data from './taskdata.js';

const dynamicDiv = document.querySelector('.dynamicTaskDiv');
const taskFooter = document.querySelector('.taskFooter');

class UI {
  static addTask(task) {
    const divCheck = document.createElement('div');
    const checkBox = document.createElement('input');
    const contentP = document.createElement('span');
    const dotsIcon = document.createElement('button');
    divCheck.className = 'form-check task-main row d-flex align-items-center justify-content-around p-3 ms-3';
    checkBox.className = 'form-check-input checkbox col-2';
    checkBox.type = 'checkbox';
    checkBox.checked = `${task.isCompleted ? 'checked' : ''}`;
    contentP.className = 'task-desc col';
    contentP.innerText = `${task.description}`;
    dotsIcon.className = 'btn-dots col-1';
    dotsIcon.id = `${task.index}`;
    divCheck.append(checkBox, contentP, dotsIcon);
    dynamicDiv.insertBefore(divCheck, taskFooter);
  }

  static showTasks() {
    for (let i = 0; i < data.length; i += 1) {
      UI.addTask(data[i]);
    }
  }
  // TODO:

  static updateTask() {}

  static clearTask() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const taskCompleted = checkbox.parentElement;
        taskCompleted.remove();
      }
    });
  }
}
taskFooter.addEventListener('click', UI.clearTask);
export default UI;