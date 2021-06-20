/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class TaskStorage extends EventEmiter {
    constructor(storageKey) {
        super();

        this.storageKey = storageKey;
        this.items = [];
    }

    getLength() {
        return this.items.length;
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }

    read() {
       const localData = localStorage[this.storageKey];

       if (!localData) {
           return ;
       }

       try {
            const parsedData = JSON.parse(localData);

            if (Array.isArray(parsedData)) {
                this.items = parsedData
                .map(data => new Task(data));
            }
       } catch(ex) {
            console.log('wrong storage data', ex.message)
       } 

       this.dispatch('read');
    }

    write(){
        localStorage[this.storageKey] = JSON.stringify(
            this.items.map(task => task.state)
        );
    }

    addItem(task) {
        this.items.push( task );
        this.write();
    }

    removeItem(task){
        this.items = this.items.filter(t => t !== task);
        this.write();
    }
}