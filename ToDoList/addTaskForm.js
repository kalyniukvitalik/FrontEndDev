// module.exports = {
//  AddTaskForm: AddTaskForm
// }
export function AddTaskForm(addTaskHandler, onCompleteHandler, onInputHandler) {
    //* this.__proto__ = AddTaskForm.prototype
    this.rootEl = document.querySelector('.header');
    this.taskEl = this.rootEl.querySelector('.new-todo');
    this.checkEl = this.rootEl.querySelector('.complete-all');
    this.submitBtn = this.rootEl.querySelector('.submit');

    this.addTaskHandler = addTaskHandler;
    this.onInputHandler = onInputHandler;

    this.rootEl.addEventListener('submit', this.onSubmit.bind(this));
    this.taskEl.addEventListener('input', this.onInput.bind(this));

    if (onCompleteHandler) {
        this.checkEl.addEventListener('click', () => {
            onCompleteHandler(this.checkEl.checked);
        });
    }
}

AddTaskForm.prototype.onInput = function () {
    if (this.onInputHandler) {
        this.onInputHandler(this.taskEl.value);
    }
};

AddTaskForm.prototype.onSubmit = function (e) {
    e.preventDefault();

    const text = this.taskEl.value.trim();

    if (!text || text.length <= 3) {
        console.error(`Not valid text: ${text}`);

        return ;
    }

    this.addTaskHandler({
        text: text,
        completed: this.checkEl.checked
    });
};

AddTaskForm.prototype.clear = function () {
    this.taskEl.value = '';
};

AddTaskForm.prototype.disabled = function () {
    this.rootEl.classList.add('disabled');
    this.taskEl.disabled = true;
    this.checkEl.disabled = true;
    this.submitBtn.disabled = true;
};

AddTaskForm.prototype.enabled = function () {
    this.rootEl.classList.remove('disabled');
    this.taskEl.disabled = false;
    this.checkEl.disabled = false;
    this.submitBtn.disabled = false;
};