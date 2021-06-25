import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';
import TaskStorage from  './taskStorage.js';
import Counter from './counter.js';
import Task from './task.js';
import Filter from './filter.js';

new AddTaskForm(addTaskHandler, onCompleteHandler);
 
const filter = new Filter();
const taskStorage = new TaskStorage('localServer');
const listComponent = new List();
const counter = new Counter('.todo-count');

taskStorage.addEventListener('read', onReadData);
filter.addEventListener('change', onChangeFilter);

listComponent.clear();
counter.setCount(0);
taskStorage.read();

function isTaskHidden(task) {
   const showCompleted = filter.value === '#/completed';
   const showAll = filter.value === '#/all';
   const showActive = filter.value === '#/active';

   return !showAll && (
      showCompleted && !task.completed
      || showActive && task.completed
   );
}

function onReadData() {
   const renderedItems =  taskStorage.items.map(task => {
      task.addEventListener('destroy', removeTaskHandler);
      task.addEventListener('stateChanger', onStateChanged);

      if (isTaskHidden(task)) {
         task.hide();
      }
   
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

   if (isTaskHidden(task)) {
      task.hide();
   }

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

function onStateChanged({ target: task }) {
   const hidden = isTaskHidden(task);

   if (hidden && !task.hidden)  {
      task.hide();
   } else if (!hidden && task.hidden) {
      task.show();
   }

   taskStorage.write();
   counter.setCount( taskStorage.getLength() );
}

function onChangeFilter() {
   taskStorage.items.forEach(task => {
      const hidden = isTaskHidden(task);

      if (hidden && !task.hidden)  {
         task.hide();
      } else if (!hidden && task.hidden) {
         task.show();
      }
   });

   counter.setCount( taskStorage.getLength() );
}

function onCompleteHandler(checked) {
   if (checked) {
      taskStorage.items.forEach(task => {
         if (task.completed !== checked) {
            task.toggleCompleted();
         }
      });
   }
}