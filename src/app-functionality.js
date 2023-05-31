import renderList from './app-display';

// #1 Check display of dummy variables

//const activities = [
//  { description: 'Un-clog the toilet', completed: false, index: 2 },
//  { description: 'Complain to the neighbor about his brats', completed: false, index: 4 },
////  { description: 'De-flea the dog', completed: true, index: 1 },
//  { description: 'Dish-out ethique lessons to porcupine', completed: true, index: 3 },
//];

// #4 Create the activities array where values will truly be stored
// eslint-disable-next-line import/no-mutable-exports
let activities = [];

// #6 load activities inmediately upon page load
const loadActivitiesList = () => {
  let loadActivities = JSON.parse(localStorage.getItem('activities'));
  if (loadActivities == null) {
    loadActivities = [];
  }
  activities = loadActivities;
  renderList(activities);
};

// #5 Add new activity into localStorage (set the updated activities array)
const archiveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

// #3 Add inputted activity to the activities array
const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index: parseInt(index, 10) });
};

// #2 Create index for the inputed activity
const assignIndexToActivity = (description) => {
  let index = 0;
  if (activities.length > 0) {
    index = activities[activities.length - 1].index + 1;
  }
  inputActivity(description, false, index);
  archiveActivities();
};

// #7 Checkbox status
const updateCheckboxStatus = (index, check) => {
  const parsedInt = parseInt(index, 10);
  const doneActivities = activities.find((activity) => activity.index === parsedInt);
  doneActivities.completed = check;
  archiveActivities();
};

export {
  activities,
  assignIndexToActivity,
  loadActivitiesList,
  updateCheckboxStatus,
};
