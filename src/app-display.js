import {
  assignIndexToActivity,
  updateCheckboxStatus,
  editActivityDescription,
  repopulateList,
} from './app-functionality';

// Rendering of App

const heading = () => {
  const header = document.getElementById('task-list-header');
  header.insertAdjacentHTML('beforeend', ` 
      <div id="list-heading" class="">
        <h3>Today\'s Tasks</h3>
        <i id="refresh-icon" class="fa fa-refresh"></i>
      </div> 
  `);
  const i = document.getElementById('refresh-icon');
  i.addEventListener('click', () => {
    window.location.reload();
  });
};

const addtask = () => {
  const input = document.getElementById('task-list-input');
  input.insertAdjacentHTML('beforeend', ` 
    <div id="new-tasks">
      <input id="input-task" type="text" placeholder="Add to your list..." />
    </div>
  `);
  const addActivity = document.getElementById('input-task');
  addActivity.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      assignIndexToActivity(addActivity.value);
      addActivity.value = '';
    }
  });
};

const renderList = (activities) => {
  const display = document.getElementById('task-list-display');
  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => {
    display.insertAdjacentHTML('beforeend', ` 
    <li class="task-item" draggable="true" data-id="${activity.index}">
      <div class="chk-descr">
        <input 
          data-a1="${activity.index}"
          type="checkbox"
          name="completed"
          class="completed"
          />
        <p data-b1="${activity.index}" class="description" contenteditable="true">${activity.description}</p>
      </div>
        <i class="clear-item fa fa-trash"/></i>
    </li> 
    `);
    const checkbox = document.querySelectorAll(`[data-a1="${activity.index}"]`)[0];
    if (activity.completed === true) {
      checkbox.setAttribute('checked', 'checked');
    }
    checkbox.addEventListener('click', (e) => {
      const activityId = e.target.getAttribute('data-a1');
      let check;
      if (activity.completed === false) {
        checkbox.checked = true;
        check = true;
      } else {
        checkbox.checked = false;
        check = false;
      }
      updateCheckboxStatus(activityId, check);
    });
    const text = document.querySelectorAll(`[data-b1="${activity.index}"]`)[0];
    text.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const activityId = text.getAttribute('data-b1');
        const descriptionEdit = text.textContent;
        editActivityDescription(activityId, descriptionEdit);
      }
    });
    display.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
    });
    display.addEventListener('dragover', (e) => {
      e.preventDefault();
      [...display.querySelectorAll('li')].forEach((li) => li.classList.remove('over'));
      e.target.closest('li.task-item').classList.add('over');
    });
    display.addEventListener('drop', (e) => {
      e.preventDefault();
      [...display.querySelectorAll('li')].forEach((li) => li.classList.remove('over'));
      const original = document.querySelector(`li[data-id="${e.dataTransfer.getData('text/plain')}"]`);
      const clone = original.cloneNode(true);
      const target = e.target.closest('li.task-item');
      display.insertBefore(clone, target);
      display.removeChild(original);
      repopulateList();
    });
  });
};

// Place event listener for clear-item outside of renderList() so that the click handler is
// not added every time the item is added
document.body.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('clear-item')) {
    el.parentNode.remove();
    localStorage.clear();
    repopulateList();
  }
});

const clearCompleted = () => {
  const clear = document.getElementById('task-list-clear');
  clear.insertAdjacentHTML('beforeend', `
    <p id="clear-tasks">Clear Completed Tasks</p>
  `);
  clear.addEventListener('click', () => {
    const display = document.getElementById('task-list-display');
    const listItems = [...document.querySelectorAll('.task-item')];
    const incompletes = listItems.filter((listItem) => listItem.getElementsByClassName('completed')[0].checked === false);
    
    listItems.forEach((listItem) => display.removeChild(listItem));
    incompletes.forEach((item) => display.appendChild(item));
    
    localStorage.clear();
    repopulateList();
  });
};

heading();
addtask();
clearCompleted();

export default renderList;
