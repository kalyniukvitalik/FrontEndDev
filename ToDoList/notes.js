const HIDE_TIME = 5000;

export default class Notes {
    constructor() {
        this.rootEl = document.querySelector('.notes');
        this.clear();
    }

    addNotion(text, type) {
        const notionEl = this.createNotion(text, type);

        this.rootEl.append(notionEl);

        setTimeout(() => {
            notionEl.remove();
        }, HIDE_TIME);
    }

    createNotion(text, type) {
        const notionEl = document.createElement('div');

        notionEl.className = 'note';
        notionEl.innerText = text;

        if (type) {
            notionEl.classList.add(type);
        }

        return notionEl;
    }

    clear() {
        this.rootEl.innerText = '';
    }
}