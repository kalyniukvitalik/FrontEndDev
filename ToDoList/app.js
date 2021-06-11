/* eslint-disable no-undef */

const addTaskForm = new AddTaskForm(addTaskHandler);
const listComponent = new List();

listComponent.clear();

console.log(addTaskForm, listComponent);

function addTaskHandler(taskObj) {
   const task = new Task( {...taskObj, id: Date.now() });

   console.log( task );
   console.log( task.render() );

   listComponent.addItem( task.render() );
}