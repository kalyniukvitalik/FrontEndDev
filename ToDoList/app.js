/* eslint-disable no-undef */

new AddTaskForm(addTaskHandler);

const taskStorage = new TaskStorage('localServer');
const listComponent = new List();
const counter = new Counter('.todo-count');

taskStorage.addEventListener('read', onReadData);

listComponent.clear();
counter.setCount(0);
taskStorage.read();

function onReadData() {
   const renderedItems =  taskStorage.items.map(task => {
      task.addEventListener('destroy', removeTaskHandler);
      task.addEventListener('stateChanger', onStateChanged);

      return task.render();   
   });

   listComponent.addItems(renderedItems);
   counter.setCount( taskStorage.getLength() );
}

function addTaskHandler(taskObj) {
   const taskData = {
      ...taskObj,
      id: Date.now() 
   };
   const task = new Task(taskData);

   taskStorage.addItem(task);
   task.addEventListener('destroy', removeTaskHandler);
   task.addEventListener('stateChanger', onStateChanged);

   listComponent.addItem( task.render() );
   counter.setCount( taskStorage.getLength() );
}

function removeTaskHandler({ target: task }) {
   taskStorage.removeItem(task);
   counter.setCount( taskStorage.getLength() );
}

function onStateChanged() {
   taskStorage.write();
}