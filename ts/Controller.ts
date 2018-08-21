import { AsyncStorage } from "react-native";
import { Database, NULL_DATE, QueryCallback } from "./Database";
import { Task } from "./Task";
import { UserDetail, WebServer } from "./WebServer";

export type NullDate = -1;

export const ASYNC_STORAGE_KEY = "@TaskReminder:sessionid";

export const Controller = {
    register: register,
    login: login,
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

async function register(userDetail: UserDetail) {
    await WebServer.register(userDetail);
}

async function login(userDetail: UserDetail) {
    const sessionId = await WebServer.login(userDetail);
    try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, sessionId);
    } catch (error) {
        alert(error);
    }
}

function createTask(
    title: string,
    content: string,
    reminder: Date | NullDate,
    callback: QueryCallback,
) {
    const newTask: Task = {
        title: title,
        content: content,
        reminder: reminder !== NULL_DATE ? reminder.getTime() : NULL_DATE ,
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
