const Task = require('./Task');
require('colors');


class Tasks {
    _list = {};

    get listArr(){
        const list = [];

        Object.keys(this._list).forEach(key => list.push(this._list[key]))

        return list;
    }

    loadTasksFromArray(tasks = []){
        console.log(tasks);
        tasks.forEach( task => this._list[task.id] = task)

    }

    constructor(){
        this._list = {};
    }

    createTask (desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    listAll(){

        Object.keys(this._list).forEach((key, i) => {
            let task_number = `${i+1}`.green;
            let status = this._list[key].completed ? "Completed".green : "Pending".red;
            console.log(`${task_number}. ${this._list[key].description} :: ${status}`);
        })
    }

    listPendingAndCompleted(listCompleted=true){

        let counter = 0;

        this.listArr.forEach( task => {
            const {description, completed} = task;
            let status = completed ? "Completada".green : "Pendiente".red;

            if(listCompleted){
                if(completed !== null){
                    counter += 1;
                    console.log(`${counter.toString().green}. ${description} :: ${completed.green}`);                    
                }
            }
            else{
                if(completed === null){
                    counter += 1;
                    console.log(`${counter.toString().green}. ${description} :: ${status}`);                    
                }
            }
        })
    }

    toggleCompleted(ids){
        ids.forEach(id => {
            const task = this._list[id];
            if(!task.completed){
                task.completed = new Date().toISOString()
            }
        })

        this.listArr.forEach(task => {
            if( !ids.includes(task.id) ){
                this._list[task.id].completed = null;
            }
        })
    }
}

module.exports = Tasks