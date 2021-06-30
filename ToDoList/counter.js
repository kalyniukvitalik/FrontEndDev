export default class Counter {
    constructor(selector) {
        this.rootEl = document.querySelector(selector);

        const [digitEl, completedEl] = Array.from(this.rootEl.querySelectorAll('strong'));

        this.digitEl = digitEl;
        this.completedEl = completedEl;
    }

    setCount(newCount, newCompleted) {
        this.digitEl.innerText = newCount;
        this.completedEl.innerText = newCompleted;
    }

    getCount() {
        return +this.digitEl.innerText;
    }
}
