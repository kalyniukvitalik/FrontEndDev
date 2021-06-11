const DB_CLICK_TIME = 500;

/** @typedef {object} Task
 * @property {number} id
 * @property {string} text
 * @property {boolean} completed
 */
/** 
 * @param {Task} taskObj 
 */
function Task(taskObj) {
    if (!taskObj.id) {
        throw new Error(`not valid id: ${task.taskObj}`);
    }

    this.state = taskObj;
    this.editing = false;
    this.hidden = false;

    this.createElements();
}

Task.prototype.createElements = function() {
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

    document.addEventListener('click', this.outLineClick.bind(this));

    this.textEl = textEl;
    this.taskEditEl = taskEditEl;
    this.completedEl = completedEl;
    this.rootEl = rootEl;
};

Task.prototype.outLineClick = function (e) {
    if (!this.editing 
        || e.target === this.taskEditEl 
        || e.target === this.textEl) {
        return ;
    }

    // this.toggleEditing();
    this.changeTextData(e);
};

Task.prototype.changeTextData = function (e) {
    e.preventDefault();
    const newText = this.taskEditEl.value.trim();

    if (!newText || newText.length < 3) {
        return ;
    }

    this.changeText(newText, false);
    this.toggleEditing();
};

Task.prototype.changeText = function (newText, neddRender = true) {
    this.state.text = newText;

    if (neddRender) {
        this.render();
    }    
};

Task.prototype.onDbClickHandler = function () {
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
};

Task.prototype.onChangeCompleted = function() {
    this.state.completed = this.completedEl.checked;
    this.render(); 
}

Task.prototype.toggleCompleted = function() {
    this.state.completed = !this.state.completed;
    this.render();
};

Task.prototype.toggleEditing = function() {
    this.editing = !this.editing;
    this.render();
};

Task.prototype.hide = function() {
    this.hidden = false;
    this.render();
};

Task.prototype.show = function() {
    this.hidden = true;
    this.render();
};

Task.prototype.delete = function() { };

Task.prototype.render = function() {
    const { completed, text } = this.state;
    const { editing } = this;

    this.textEl.innerText = text;
    this.taskEditEl.value = text;

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
};