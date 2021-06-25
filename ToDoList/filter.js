import EventEmiter from './eventEmiter.js';

const SELECTED_LINK_CLASS = 'selected';

export default class Filter extends EventEmiter {
    constructor() {
        super();

        this.rootEl = document.querySelector('.filters');
        this.links = Array.from(this.rootEl.querySelectorAll('a'));
        this.avaibleFilters = this.links.map(link => link.hash);

        const selectedLink = this.links.find(
            link => link.classList.contains(SELECTED_LINK_CLASS)
        );
        const selectedHash = selectedLink && selectedLink.hash;
        const activeHash = this.getActiveLinkHash();

        this.currentFilter = activeHash || selectedHash || this.avaibleFilters[0];

        if (!this.avaibleFilters.includes(this.currentFilter)) {
            this.currentFilter = this.avaibleFilters[0];
        }

        // this.rootEl.addEventListener('click',  this.setCurrentLink.bind(this));
        window.addEventListener('hashchange', this.onHashChange.bind(this));

        this.render();
    }

    get value() {
        return this.currentFilter; 
    }

    setValue(newValue) {
        if (!this.avaibleFilters.includes(newValue)) {
            return ;
        }

        this.currentFilter = newValue;
        this.dispatch('change');
        this.render();
    }

    getActiveLinkHash() {
        const { hash } = window.location;
        let activeLink;

        if (hash) {
            activeLink = this.links.find(link => link.hash === hash);
        }

        if (activeLink && this.avaibleFilters.includes(activeLink.hash)) {
            return activeLink.hash;
        }

        return null;
    }

    onHashChange() {
        const newHash = this.getActiveLinkHash();

        if (newHash)
            this.setValue(newHash);
    }

    setCurrentLink(e) {
        const newHash = e.target.hash;

        this.setValue(newHash);
    }

    render() {
        this.links.forEach(link => {
            if(link.hash === this.currentFilter) {
                link.classList.add(SELECTED_LINK_CLASS);
            } else {
                link.classList.remove(SELECTED_LINK_CLASS);
            }
        });
    }
}