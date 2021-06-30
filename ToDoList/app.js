import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';
import TaskStorage from './taskStorage.js';
import Counter from './counter.js';
import Task from './task.js';
import Filter from './filter.js';
import { tasksAPI } from './tasksAPI.js';
import Notes from './notes.js';

const loader = document.querySelector('.loader');

const notes = new Notes();
const addForm = new AddTaskForm(addTaskHandler, onCompleteHandler, onInputHandler);
const filter = new Filter();
const taskStorage = new TaskStorage();
const listComponent = new List();
const counter = new Counter('.todo-count');

taskStorage.addEventListener('read', onReadData);
filter.addEventListener('change', onChangeFilter);

listComponent.clear();
counter.setCount(0, 0);
taskStorage.readServer()
    .then(() => hideLoader());

function isTaskHidden(task) {
    const showCompleted = filter.value === '#/completed';
    const showAll = filter.value === '#/all';
    const showActive = filter.value === '#/active';

    return !showAll && (
        showCompleted && !task.completed
        || showActive  && task.completed
    );
}

function onReadData() {
    const renderedItems = taskStorage.items.map(task => {
        task.addEventListener('destroy', removeTaskHandler);
        task.addEventListener('stateChanged', onStateChanged);

        if (isTaskHidden(task)) {
            task.hide();
        }

        return task.render();
    });

    listComponent.addItems(renderedItems);
    updateCounter();
}

function addTaskHandler(taskObj) {
    addForm.disabled();
    showLoader();

    tasksAPI.addTask(taskObj)
        .then(taskData => {
            const task = new Task(taskData);

            if (isTaskHidden(task)) {
                task.hide();
            }

            taskStorage.addItem(task);
            task.addEventListener('destroy', removeTaskHandler);
            task.addEventListener('stateChanged', onStateChanged);

            listComponent.addItem( task.render() );
            updateCounter();

            addForm.enabled();
            addForm.clear();
            hideLoader();
        })
        .catch(() => {
            const answer = confirm('Мы не смогли добавить задачу. Повторить?');

            if (answer) {
                addTaskHandler(taskObj);
            } else {
                addForm.enabled();
                hideLoader();
            }
        });
}

function removeTaskHandler({ target: task }) {
    tasksAPI
        .deleteTask(task.id)
        .then(() => {
            task.remove();
            taskStorage.removeItem( task );
            updateCounter();
        })
        .catch((error) => {
            task.setError(error);
            notes.addNotion(error.text, 'error');
        });
}

async function onStateChanged({ target: task }) {
    if (!task.error) {
        try {
            await tasksAPI.updateTask(task.data);

            const hidden = isTaskHidden(task);

            if (hidden && !task.hidden) {
                task.hide();
            } else if (!hidden && task.hidden) {
                task.show();
            }

            updateCounter();
        } catch(error) {
            task.stateBack(error);
            notes.addNotion(error.text, 'error');
            updateCounter();
        }
    }
}

function onChangeFilter() {
    onInputHandler(addForm.taskEl.value);
    updateCounter();
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

function hideLoader() {
    loader.hidden = true;
}

function showLoader() {
    loader.hidden = false;
}

function updateCounter() {
    counter.setCount( ...taskStorage.getVisibleAndVisibleCompleted() );
}

function onInputHandler(inputText) {
    let viewed = 0;
    let completed = 0;

    taskStorage.items.forEach(task => {
        const isHidden = isTaskHidden(task);

        if (!inputText) {
            task.setHidden(isHidden);
        } else if (!isHidden) {
            const matched = task.text.indexOf(inputText) >= 0;

            if (matched) {
                viewed++;

                if (task.completed) {
                    completed++;
                }

                if (task.hidden) {
                    task.show();
                }
            } else {
                task.hide();
            }
        } else {
            task.hide();
        }
    });

    counter.setCount( viewed, completed );
}