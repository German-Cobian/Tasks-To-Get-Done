import { assignIndexToActivity } from './app-functionality';

// Rendering of App

const heading = () => {
  const header = document.getElementById('task-list-header');
  header.insertAdjacentHTML('beforeend', ` 
      <div id="list-heading" class="">
        <h3>Today\'s Tasks</h3>
        <i id="refresh-icon" class="fa fa-refresh"></i>
      </div> 
  `);
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
    console.log(activity);
    display.insertAdjacentHTML('beforeend', ` 
    <li id="task-item">
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
  });
};

const clearCompleted = () => {
  const clear = document.getElementById('task-list-clear');
  clear.insertAdjacentHTML('beforeend', `
    <p id="clear-tasks">Clear Completed Tasks</p>
  `);
};

heading();
addtask();
clearCompleted();

export default renderList;
