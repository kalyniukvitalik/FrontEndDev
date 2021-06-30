class TasksAPI {
    constructor(serverURI) {
        this.serverURI = serverURI;
    }

    getAllTasks() {
        return fetch(`${this.serverURI}/tasks`);
    }

    addTask(data) {
        return fetch(`${this.serverURI}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            response => response.json()
        );
    }

    updateTask(data) {
        return fetch(`${this.serverURI}/tasks/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch(error => {
                return Promise.reject({
                    code: 600,
                    text: error
                });
            })
            .then(response => {
                if (response.status < 200 || response.status > 299) {
                    return response.json()
                        .then(text => Promise.reject({
                            code: response.status,
                            text
                        }));
                }

                return response.json();
            });
    }

    deleteTask(id) {
        return fetch(`${this.serverURI}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .catch(error => {
                return Promise.reject({
                    code: 600,
                    text: error
                });
            })
            .then(response => {
                if (response.status < 200 || response.status > 299) {
                    return response.json()
                        .then(text => Promise.reject({
                            code: response.status,
                            text
                        }));
                }

                return response.json();
            });
    }
}

export const tasksAPI = new TasksAPI('https://60d43f1561160900173caa3b.mockapi.io');

