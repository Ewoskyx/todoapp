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
    divCheck.className = 'task-main col-12 d-flex align-items-center justify-content-center';
    divCheck.draggable = true;
    divCheck.addEventListener('dragstart', UI.dragUI);
    divCheck.addEventListener('dragend', UI.stopDrag);
    checkBox.className = 'form-check-input checkbox col-2 me-4';
    checkBox.id = `${task.index}`;
    checkBox.type = 'checkbox';
    checkBox.checked = `${task.isCompleted ? 'checked' : ''}`;
    checkBox.addEventListener('change', Store.updateStatus);
    contentP.className = 'task-desc col';
    contentP.id = 'task-desc';
    contentP.innerHTML = `${task.description}`;
    contentP.addEventListener('change', Store.updateToStore);

    dotsIcon.className = 'btn-dots col-1';
    dotsIcon.addEventListener('click', (e) => {
      Store.deleteSelected(e);
      UI.reloadUI();
      UI.showTasks();
    });
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

  static reloadUI() {
    const childs = dynamicDiv.querySelectorAll('.task-main');
    childs.forEach((child) => child.remove());
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

  static dragUI(e) {
    e.target.classList.add('drag');
  }

  static stopDrag(e) {
    e.target.classList.remove('drag');
  }

  static dragOver() {
    dynamicDiv.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = UI.getDragAfterEl(dynamicDiv, e.clientY);
      const dragItem = document.querySelector('.drag');
      if (afterElement.offset === Number.NEGATIVE_INFINITY) {
        dynamicDiv.insertBefore(dragItem, taskFooter);
      } else {
        dynamicDiv.insertBefore(dragItem, afterElement.element);
      }
    });
  }

  static getDragAfterEl(container, mouseY) {
    const itemNodes = container.querySelectorAll('.task-main:not(.drag)');
    const items = Array.from(itemNodes);
    return items.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = mouseY - box.top - box.height / 2;
      if (offset < 0 && closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY });
  }
}

export default UI;