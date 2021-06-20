function List() {
    this.rootEl = document.querySelector('.todo-list');
 }

List.prototype.addItem = function (el) {
    this.rootEl.append(el);
};

List.prototype.addItems = function (elCollection) {
    this.rootEl.append(...elCollection);
};

List.prototype.clear = function () {
    this.rootEl.innerText = '';
}