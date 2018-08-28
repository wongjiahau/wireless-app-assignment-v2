import { Database, NULL_DATE, QueryCallback } from "./Database";
import { deleteSessionId, getSessionId, storeSessionId } from "./SimpleStorage";
import { ConvertedTask, Task } from "./Task";
import { UserDetail, WebServer } from "./WebServer";

// @ts-ignore
import Notification from "react-native-system-notification";

export type NullDate = -1;

export const Controller = {
    register: register,
    login: login,
    logout: logout,
    downloadTask: downloadTask,
    uploadTask: uploadTask,
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

async function uploadTask(successCallback: () => void) {
    try {
        const sessionId = await getSessionId();
        getAllTask(async (tasks) => {
            const t = (tasks.map((x) => ({
                ...x,
                reminder: x.reminder === NULL_DATE ? NULL_DATE : x.reminder.getTime(),
            })));
            try {
                await WebServer.upload(sessionId, t);
                successCallback();
            } catch (error) {
                alert(error);
            }
        });
    } catch (error) {
        alert(error);
    }
}

function setupNotification(task: Task) {
    if (task.reminder !== NULL_DATE) {
        // if the reminder is later than current time, only setup the notification
        if (task.reminder > new Date().getTime() - 5000) {
            Notification.create({
                subject: task.title,
                message: task.content,
                sendAt: new Date(task.reminder),
            });
        }
    }
}

async function downloadTask() {
    try {
        const sessionId = await getSessionId();
        const tasks: Task[] =  await WebServer.download(sessionId);
        Database.clearAllData(() => {
            tasks.forEach((x) => {
                Database.createTask(x, () => {});
                setupNotification(x);
            });
        });
    } catch (error) {
        alert(error);
    }
}

async function register(userDetail: UserDetail) {
    await WebServer.register(userDetail);
}

async function login(userDetail: UserDetail) {
    const sessionId = await WebServer.login(userDetail);
    storeSessionId(sessionId);
}

async function logout() {
    const sessionId = await getSessionId();
    await WebServer.logout(sessionId);
    await deleteSessionId();
}

function createTask(
    title: string,
    content: string,
    reminder: Date | NullDate,
    callback: QueryCallback,
) {
    const newTask: Task = {
        // NOTE: this id is temporary, it will be different once stored into the local database
        // because the database have autoincrement primary key feature
        id: new Date().getTime(),
        title: title,
        content: content,
        reminder: reminder !== NULL_DATE ? reminder.getTime() : NULL_DATE ,
        pinned: 0,
        completed: 0,
    };
    Database.createTask(newTask, callback);
    setupNotification(newTask);
}

function updateTask(newTask: Task, callback: QueryCallback) {
    Database.updateTask(newTask, callback);
    setupNotification(newTask);
}

function deleteTask(taskId: number, callback: QueryCallback) {
    Database.deleteTask(taskId, callback);
}

function getAllTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
        callback(tasks) ;
    });
}

function getCompletedTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
        callback(tasks.filter((x) => x.completed === 1)) ;
    });
}

function getOnGoingTask(callback: (results: ConvertedTask[]) => void) {
    Database.retrieveTask((tasks: ConvertedTask[]) => {
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
