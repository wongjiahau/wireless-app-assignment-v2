import { Database, QueryCallback } from "./Database";
import { Task } from "./Task";

export const Controller = {
    // signUp:
    // login:
    // logout:
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    getAllTask: getAllTask,
    getCompletedTask: getCompletedTask,
    getOnGoingTask: getOnGoingTask,
    encompleteTask: encompleteTask,
    decompleteTask: decompleteTask,
    enpinTask: enpinTask,
    depinTask: depinTask,
};

function createTask(
    title: string,
    content: string,
    reminder: Date | null,
    callback: QueryCallback,
) {
    const newTask: Task = {
        title: title,
        content: content,
        reminder: reminder ? reminder.getTime() : null ,
        pinned: 0,
        completed: 0,
    };
    Database.createTask(newTask, callback);
}

function updateTask(newTask: Task, callback: QueryCallback) {
    Database.updateTask(newTask, callback);
}

function deleteTask(taskId: number, callback: QueryCallback) {
    Database.deleteTask(taskId, callback);
}

function getAllTask(callback: (results: Task[]) => void) {
    Database.retrieveTask((tasks: Task[]) => {
        callback(tasks) ;
    });
}

function getCompletedTask(callback: (results: Task[]) => void) {
    Database.retrieveTask((tasks: Task[]) => {
        callback(tasks.filter((x) => x.completed === 1)) ;
    });
}

function getOnGoingTask(callback: (results: Task[]) => void) {
    Database.retrieveTask((tasks: Task[]) => {
        callback(tasks.filter((x) => x.completed === 0)) ;
    });
}

function encompleteTask(task: Task, callback: QueryCallback) {
    task.completed = 1;
    Database.updateTask(task, callback);
}

function decompleteTask(task: Task, callback: QueryCallback) {
    task.completed = 0;
    Database.updateTask(task, callback);
}

function enpinTask(task: Task, callback: QueryCallback) {
    task.pinned = 1;
    Database.updateTask(task, callback);
}

function depinTask(task: Task, callback: QueryCallback) {
    task.pinned = 0;
    Database.updateTask(task, callback);
}
