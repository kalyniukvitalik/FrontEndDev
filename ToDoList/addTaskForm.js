function AddTaskForm(addTaskHandler) {
    // this.__proto__ = AddTaskForm.prototype
    this.rootEl = document.querySelector('.header');
    this.taskEl = document.querySelector('.new-todo');
    this.checkEl = this.rootEl.querySelector('.complete-all');

    this.addTaskHandler = addTaskHandler;

    this.rootEl.addEventListener('submit', this.onSubmit.bind(this));
}

AddTaskForm.prototype.onSubmit = function (e) {
    e.preventDefault();

    const text = this.taskEl.value.trim();

    if(!text || text.length <= 3) {
        console.error(`Not valid text: ${text}`);

        return ;
    }

    this.taskEl.value = '';

    this.addTaskHandler({
        text: text, 
        completed: this.checkEl.checked
    });
};