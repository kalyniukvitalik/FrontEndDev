export default class Counter {
    constructor(selector) {
        this.rootEl = document.querySelector(selector);
        this.digiEl = this.rootEl.querySelector('strong');
    }

    setCount(newCount) {
        this.digiEl.innerText = newCount;
    }

    getCount() {
        return +this.digiEl.innerText;
    }
};