// #1 Check display of dummy variables

const activities = [
  { description: 'Un-clog the toilet', completed: false, index: 2 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 4 },
  { description: 'De-flea the dog', completed: true, index: 1 },
  { description: 'Dish-out ethique lessons to porcupine', completed: true, index: 3 },
];

// #3 add inputted activity to the activities array
const inputActivity = (description, completed, index) => {
  console.log(description, completed, index);
  activities.push({ description, completed, index: parseInt(index, 10) });
};

// #2 Create index for the inputed activity
const assignIndexToActivity = (description) => {
  let index = 0;
  if (activities.length > 0) {
    index = activities[activities.length - 1].index + 1;
  }
  inputActivity(description, false, index);
};

export {
  activities,
  assignIndexToActivity,
};
