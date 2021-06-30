import EventEmiter from './eventEmiter.js';

const DB_CLICK_TIME = 500;

export default class Task extends EventEmiter {
    constructor(taskObj) {
        super();

        if (!taskObj.id) {
            throw new Error(`not valid id: ${taskObj.id}`);
        }

        this.error = null;
        this.state = taskObj;
        this.editing = false;
        this.hidden = false;

        this._events = {};

        this.outlineClick = this.outlineClick.bind(this);

        this.createElements();
    }

    get data() {
        return {...this.state};
    }

    get id() {
        return this.state.id;
    }

    get text() {
        return this.state.text;
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
        editEl.append(taskEditEl, changeSubmit);

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

        document.addEventListener('click', this.outlineClick);

        this.changeSubmit = changeSubmit;
        this.textEl = textEl;
        this.taskEditEl = taskEditEl;
        this.completedEl = completedEl;
        this.rootEl = rootEl;
    }

    remove() {
        this.rootEl.remove();

        document.removeEventListener('click', this.outlineClick);
    }

    destroy() {
        this.dispatch('destroy');
    }

    outlineClick(e) {
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

    setError(error, needRender = true) {
        this.error = error;

        if (needRender) {
            this.render();
        }
    }

    stateBack(error) {
        if (error) {
            this.setError(error, false);
        }

        this.setState(this.prevState);
    }

    setState(newState, needRender = true) {
        this.prevState = this.state;
        this.state = {
            ...this.state,
            ...newState
        };

        if (needRender) {
            this.render();
        }

        this.dispatch('stateChanged');
    }

    changeText(newText, needRender = true) {
        if (this.error) {
            this.setError(null, false);
        }

        this.setState({
            text: newText
        }, needRender);
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
        if (this.error) {
            this.setError(null, false);
        }

        this.setState({
            completed: this.completedEl.checked
        });
    }

    toggleCompleted() {
        if (this.error) {
            this.setError(null, false);
        }

        this.setState({
            completed: !this.state.completed
        });
    }

    toggleEditing() {
        this.editing = !this.editing;
        this.render();
    }

    setHidden(hidden) {
        this.hidden = hidden;
        this.render();
    }

    hide() {
        this.hidden = true;
        this.render();
    }

    show() {
        this.hidden = false;
        this.render();
    }

    render() {
        const { completed, text } = this.state;
        const { editing, hidden, error } = this;

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

        if (error) {
            this.rootEl.classList.add('error');
        } else {
            this.rootEl.classList.remove('error');
        }

        return this.rootEl;
    }
}
