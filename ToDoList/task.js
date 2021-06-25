import EventEmiter from './eventEmiter.js';

const DB_CLICK_TIME = 500;

export default class Task extends EventEmiter {
    constructor(taskObj, removeTaskHandler) {
        super();

        if (!taskObj.id) {
            throw new Error(`not valid id: ${task.taskObj}`);
        }

        this.state = taskObj;
        this.editing = false;
        this.hidden = false;

        this._events = {};

        this.outLineClick = this.outLineClick.bind(this);
        this.removeTaskHandler = removeTaskHandler;

        this.createElements();
    }

    get completed() {
        return this.state.completed;
    }

    createElements() {
        const rootEl = document.createElement('li');
        const viewEl = document.createElement('div');
        const editEl = document.createElement('form');
        const completedEl = document.createElement('input');
        const textEl = document.createElement('span');
        const destroyEl = document.createElement('button');
        const taskEditEl = document.createElement('input');
        const changeSubmit = document.createElement('button');
    
        rootEl.append(viewEl, editEl);
        viewEl.append(completedEl, textEl, destroyEl);
        editEl.append(taskEditEl);
    
        taskEditEl.className = 'edit';
        taskEditEl.value = this.state.text;
        changeSubmit.className = 'visually-hidden';
        changeSubmit.type = 'submit';
    
        destroyEl.className = 'destroy';
        completedEl.className = 'toggle';
        completedEl.type = 'checkbox';
        viewEl.className = 'view';
        textEl.innerText = this.state.text;
    
        completedEl.addEventListener('change', this.onChangeCompleted.bind(this));
        textEl.addEventListener('click', this.onDbClickHandler());
        editEl.addEventListener('submit', this.changeTextData.bind(this));
        destroyEl.addEventListener('click', this.destroy.bind(this));
    
        document.addEventListener('click', this.outLineClick);
    
        this.changeSubmit = changeSubmit;
        this.textEl = textEl;
        this.taskEditEl = taskEditEl;
        this.completedEl = completedEl;
        this.rootEl = rootEl;
    }
    
    destroy() {
        this.rootEl.remove();
    
        document.removeEventListener('click', this.outLineClick);
    
        this.dispatch('destroy');
    }
    
    outLineClick(e) {
        const inInput = !this.editing 
            || e.target === this.taskEditEl 
            || e.target === this.textEl
            || e.target === this.changeSubmit;
    
        if (inInput) {    
            return ;
        }
    
        this.toggleEditing();
        // this.changeTextData(e);
    }
    
    changeTextData(e) {
        e.preventDefault();
        const newText = this.taskEditEl.value.trim();
    
        if (!newText || newText.length < 3) {
            return ;
        }
    
        this.changeText(newText, false);
        this.toggleEditing();
    }
    
    changeText(newText, needRender = true) {
        this.state.text = newText;
    
        if (needRender) {
            this.render();
        }    

        this.dispatch('stateChanger');
    } 
    
    onDbClickHandler() {
        let prevClickTime = 0;
    
       return () => {
            const currentClickTime = Date.now();
    
            if (currentClickTime - prevClickTime < DB_CLICK_TIME) {
                prevClickTime = 0;
                this.toggleEditing();
            } else {
                prevClickTime = currentClickTime;
            }
       };
    }
    
   onChangeCompleted() {
        this.state.completed = this.completedEl.checked;
        this.dispatch('stateChanger');
        this.render(); 
    }
    
    toggleCompleted() {
        this.state.completed = !this.state.completed;
        this.dispatch('stateChanger');
        this.render();
    }
    
    toggleEditing() {
        this.editing = !this.editing;
        this.render();
    }
    
    hide() {
        this.hidden = false;
        this.render();
    }
    
    show() {
        this.hidden = true;
        this.render();
    }
    
    render() {
        const { completed, text } = this.state;
        const { editing, hidden } = this;
    
        this.rootEl.hidden = hidden;
        this.textEl.innerText = text;
        this.taskEditEl.value = text;
        this.completedEl.checked = completed;
    
        if (completed) {
            this.rootEl.classList.add('completed');
        } else {
            this.rootEl.classList.remove('completed');
        }
    
        if (editing) {
            this.rootEl.classList.add('editing');
        } else { 
            this.rootEl.classList.remove('editing');
        }
    
        return this.rootEl;
    }
}