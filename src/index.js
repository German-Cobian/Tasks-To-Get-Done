import './style.css';

const activities = [
  { description: 'Un-clog the toilet', completed: false, index: 1 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 4 },
  { description: 'De-flea the dog', completed: true, index: 2 },
  { description: 'Dish-out ethique lessons to porcupine', completed: true, index: 3 },
];

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
      <input class="input-task" type="text" placeholder="Add to your list..." />
    </div>
  `);
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
renderList(activities);
clearCompleted();
