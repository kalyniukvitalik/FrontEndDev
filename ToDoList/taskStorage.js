import EventEmiter from './eventEmiter.js';
import Task from './task.js';
import { tasksAPI } from './tasksAPI.js';

export default class TaskStorage extends EventEmiter {
    constructor(storageKey) {
        super();

        this.storageKey = storageKey;
        this.items = [];
    }

    getVisibleAndVisibleCompleted() {
        const visibleTasks = this.items.filter(task => !task.hidden);
        const visibleCompleted = visibleTasks.filter(task => task.completed);

        return [visibleTasks.length, visibleCompleted.length];
    }

    getLength() {
        return this.items.filter(task => !task.hidden).length;
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }

    readServer() {
        return tasksAPI.getAllTasks()
            .then(response => response.json())
            .then(parsedData => {
                if (Array.isArray(parsedData)) {
                    this.items = parsedData
                        .map(data => new Task(data));
                }
            })
            .catch((ex) => {
                console.log('wrong server data', ex);
            })
            .finally(() => this.dispatch('read'));
    }

    readLocal() {
        const localData = localStorage[this.storageKey];

        if (!localData) {
            return ;
        }

        try {
            const parsedData = JSON.parse(localData);

            if (Array.isArray(parsedData)) {
                this.items = parsedData
                    .map(data => new Task(data));
            }
        } catch(ex) {
            console.log('wrong storage data', ex.message);
        }

        this.dispatch('read');
    }

    write() {
        localStorage[this.storageKey] = JSON.stringify(
            this.items.map(task => task.state)
        );
    }

    addItem(task) {
        this.items.push( task );

        if (this.storageKey) {
            this.write();
        }
    }

    removeItem(task) {
        this.items = this.items.filter(t => t !== task);

        if (this.storageKey) {
            this.write();
        }
    }
}